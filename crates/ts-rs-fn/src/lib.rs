use proc_macro::TokenStream;
use quote::quote;
use syn::{
    parse::{Parse, ParseStream},
    punctuated::Punctuated,
    spanned::Spanned,
    token::Paren,
    Ident, ItemFn, LitBool, Type, TypeTuple,
};

struct DeriveAttributes {
    skip_arg: LitBool,
}
impl Parse for DeriveAttributes {
    fn parse(input: ParseStream) -> syn::Result<Self> {
        let path: Option<LitBool> = input.parse()?;

        Ok(Self {
            skip_arg: path.unwrap_or(LitBool::new(false, input.span())),
        })
    }
}

#[proc_macro_attribute]
pub fn ts_command(attributes: TokenStream, item: TokenStream) -> TokenStream {
    let args = syn::parse_macro_input!(attributes as DeriveAttributes);
    let function = {
        let item = item.clone();
        syn::parse_macro_input!(item as ItemFn)
    };
    let item_tokens = syn::parse_macro_input!(item);

    expand_ts_command(args, function, item_tokens)
        .unwrap_or_else(syn::Error::into_compile_error)
        .into()
}

fn expand_ts_command(
    attributes: DeriveAttributes,
    item: ItemFn,
    item_tokens: proc_macro2::TokenStream,
) -> syn::Result<proc_macro2::TokenStream> {
    let return_ty = match &item.sig.output {
        syn::ReturnType::Default => &Box::new(Type::Tuple(TypeTuple {
            paren_token: Paren::default(),
            elems: Punctuated::new(),
        })),
        syn::ReturnType::Type(_, ty) => ty,
    };

    let fn_name = Ident::new(&format!("gen_type_{}", item.sig.ident), item.sig.span());
    let ident_str = item.sig.ident.to_string();

    let arg_token: proc_macro2::TokenStream;
    if attributes.skip_arg.value {
        arg_token = quote!("");
    } else {
        let first_arg = match &item.sig.inputs.first().ok_or(syn::Error::new(
            item.sig.inputs.span(),
            "Expected at least one argument",
        ))? {
            syn::FnArg::Receiver(receiver) => {
                return Err(syn::Error::new(
                    receiver.span(),
                    "Expected function to not be a method",
                ));
            }
            syn::FnArg::Typed(arg) => arg,
        };

        let arg_ty = &first_arg.ty;
        let arg_name = match &*first_arg.pat {
            syn::Pat::Ident(ident) => &ident.ident,
            _ => {
                return Err(syn::Error::new(
                    first_arg.pat.span(),
                    "Expected an identifier",
                ))
            }
        };
        let arg_name_str = arg_name.to_string();

        arg_token = quote!(format!("{}: {}", #arg_name_str, <#arg_ty>::ident()));
    }

    Ok(quote! {
        #item_tokens

        #[cfg(test)]
        #[test]
        pub fn #fn_name() {
            use std::fs;
            use ts_rs::TS;

            let data = format!("export type {} = ({}) => {};", #ident_str, #arg_token, <#return_ty>::ident()).to_string();

            fs::create_dir_all("bindings").unwrap();
            fs::write(format!("bindings/{}.d.ts", #ident_str), data).unwrap();
        }
    })
}
