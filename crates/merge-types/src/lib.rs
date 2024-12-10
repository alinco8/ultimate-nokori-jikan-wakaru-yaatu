use std::{error::Error, fs, io::Write, path::Path};

use convert_case::{Case, Casing};
use swc_common::{BytePos, Span, SyntaxContext};
use swc_ecma_ast::{
    BindingIdent, Decl, EsVersion, ExportDecl, Expr, Ident, Module, ModuleDecl, ModuleItem,
    TsEntityName, TsFnOrConstructorType, TsFnParam, TsFnType, TsInterfaceBody, TsInterfaceDecl,
    TsPropertySignature, TsType, TsTypeAliasDecl, TsTypeAnn, TsTypeElement, TsTypeLit, TsTypeRef,
};
use swc_ecma_parser::{self, Parser, StringInput, Syntax, TsSyntax, lexer::Lexer};

pub fn merge_types(files: Vec<String>) -> String {
    let mut modules = Vec::<ModuleItem>::new();
    let mut commands = Vec::<String>::new();

    for file in files {
        let lexer = Lexer::new(
            Syntax::Typescript(TsSyntax {
                tsx: false,
                decorators: false,
                dts: true,
                no_early_errors: true,
                disallow_ambiguous_jsx_like: false,
            }),
            EsVersion::Es2022,
            StringInput::new(&file, BytePos(0), BytePos(file.len() as u32)),
            None,
        );
        let mut parser = Parser::new_from(lexer);
        let tree_result = parser.parse_typescript_module();
        let module = tree_result.expect("パースに失敗");

        for module_item in module.body {
            match module_item {
                swc_ecma_ast::ModuleItem::ModuleDecl(decl) => match decl {
                    ModuleDecl::Import(_) | ModuleDecl::TsImportEquals(_) => {
                        continue;
                    }
                    decl => modules.push(ModuleItem::ModuleDecl(match decl {
                        ModuleDecl::ExportDecl(export_decl) => ModuleDecl::ExportDecl(ExportDecl {
                            span: export_decl.span,
                            decl: match export_decl.decl {
                                Decl::TsTypeAlias(ts_type_alias_decl) => {
                                    Decl::TsTypeAlias(Box::new(TsTypeAliasDecl {
                                        span: ts_type_alias_decl.span,
                                        declare: ts_type_alias_decl.declare,
                                        id: ts_type_alias_decl.id.clone(),
                                        type_params: ts_type_alias_decl.type_params,
                                        type_ann: Box::new(match *ts_type_alias_decl.type_ann {
                                            TsType::TsFnOrConstructorType(
                                                ts_fn_or_constructor_type,
                                            ) => TsType::TsFnOrConstructorType(
                                                match ts_fn_or_constructor_type {
                                                    TsFnOrConstructorType::TsFnType(ts_fn_type) => {
                                                        commands.push(
                                                            ts_type_alias_decl.id.sym.to_string(),
                                                        );
                                                        TsFnOrConstructorType::TsFnType(
                                                            organize_function(ts_fn_type),
                                                        )
                                                    }
                                                    other => other,
                                                },
                                            ),
                                            other => other,
                                        }),
                                    }))
                                }
                                other => other,
                            },
                        }),
                        other => other,
                    })),
                },
                swc_ecma_ast::ModuleItem::Stmt(_) => {}
            }
        }
    }

    modules.push(ModuleItem::ModuleDecl(ModuleDecl::ExportDecl(ExportDecl {
        span: Span::default(),
        decl: Decl::TsInterface(Box::new(TsInterfaceDecl {
            span: Span::default(),
            id: Ident::new("Commands".into(), Span::default(), SyntaxContext::default()),
            declare: false,
            type_params: None,
            extends: vec![],
            body: TsInterfaceBody {
                span: Span::default(),
                body: commands
                    .iter()
                    .map(|cmd| {
                        let ident = Ident::new(
                            cmd.as_str().into(),
                            Span::default(),
                            SyntaxContext::default(),
                        );
                        TsTypeElement::TsPropertySignature(TsPropertySignature {
                            span: Span::default(),
                            readonly: false,
                            key: Box::new(Expr::Ident(ident.clone())),
                            computed: false,
                            optional: false,
                            type_ann: Some(Box::new(TsTypeAnn {
                                span: Span::default(),
                                type_ann: Box::new(TsType::TsTypeRef(TsTypeRef {
                                    span: Span::default(),
                                    type_name: TsEntityName::Ident(ident),
                                    type_params: None,
                                })),
                            })),
                        })
                    })
                    .collect::<Vec<_>>(),
            },
        })),
    })));

    let merged = swc_ecma_codegen::to_code(&Module {
        span: Span::default(),
        body: modules,
        shebang: None,
    });

    merged
}

pub fn merge_types_from_dir(dir: impl AsRef<Path>, delete: bool) -> Result<(), Box<dyn Error>> {
    let dir = dir.as_ref();

    let files = fs::read_dir(dir)?
        .filter_map(|f| f.ok())
        .filter_map(|f| {
            if f.path().file_name().and_then(|f| f.to_str()) != Some("types.d.ts") {
                Some(fs::read_to_string(f.path()).ok()).flatten()
            } else {
                None
            }
        })
        .collect::<Vec<_>>();

    if delete {
        fs::remove_dir_all(dir)?;
    }

    let out = merge_types(files);

    fs::create_dir_all(dir)?;
    fs::OpenOptions::new()
        .write(true)
        .create(true)
        .truncate(true)
        .open(dir.join("types.d.ts"))?
        .write_all(out.as_bytes())?;

    Ok(())
}

pub fn organize_function(func: TsFnType) -> TsFnType {
    TsFnType {
        span: func.span,
        params: {
            if func.params.len() == 0 {
                vec![]
            } else {
                [TsFnParam::Ident(BindingIdent {
                    id: Ident::new("args".into(), Span::default(), SyntaxContext::default()),
                    type_ann: Some(Box::new(TsTypeAnn {
                        span: Span::default(),
                        type_ann: Box::new(TsType::TsTypeLit(TsTypeLit {
                            span: Span::default(),
                            members: func
                                .params
                                .iter()
                                .map(|param| match param {
                                    TsFnParam::Ident(_) => {
                                        let param = param.as_ident().expect("not ident");
                                        TsTypeElement::TsPropertySignature(TsPropertySignature {
                                            span: Span::default(),
                                            readonly: false,
                                            key: Box::new(Expr::Ident(Ident {
                                                span: Span::default(),
                                                ctxt: SyntaxContext::default(),
                                                sym: param
                                                    .sym
                                                    .to_string()
                                                    .to_case(Case::Camel)
                                                    .into(),
                                                optional: false,
                                            })),
                                            computed: false,
                                            optional: false,
                                            type_ann: param.type_ann.clone(),
                                        })
                                    }
                                    _ => panic!("not implemented"),
                                })
                                .collect::<Vec<_>>(),
                        })),
                    })),
                })]
                .to_vec()
            }
        },
        type_params: func.type_params,
        type_ann: func.type_ann,
    }
}
