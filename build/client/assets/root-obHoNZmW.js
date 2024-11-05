var lt=e=>{throw TypeError(e)};var it=(e,t,a)=>t.has(e)||lt("Cannot "+a);var i=(e,t,a)=>(it(e,t,"read from private field"),a?a.call(e):t.get(e)),g=(e,t,a)=>t.has(e)?lt("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,a),h=(e,t,a,r)=>(it(e,t,"write to private field"),r?r.call(e,a):t.set(e,a),a),j=(e,t,a)=>(it(e,t,"access private method"),a);var et=(e,t,a,r)=>({set _(n){h(e,t,n,a)},get _(){return i(e,t,r)}});import{r as D,j as d}from"./jsx-runtime-D2HyDbKh.js";import{S as Ct,h as kt,Q as Dt,n as b,m as ct,R as Ft,c as Rt,a as ut,b as Q,e as Tt,d as qt,f as _t,g as It,o as ht,r as dt,i as Vt,j as ft,p as mt,s as Ht,k as Lt}from"./QueryClientProvider-CPyVoVZx.js";import{u as xt,a as Ot,k as L,p as Kt,e as gt,g as ot,b as N,r as Nt,d as Wt,D as Bt,c as Gt,f as Qt,M as zt,h as Jt}from"./MantineThemeProvider-eMimkJgM.js";import{g as yt}from"./get-contrast-color-Ckvwn6Ac.js";import{l as Ut,n as Yt,o as Xt,p as Zt,_ as te,O as ee,M as re,L as ae,S as ie}from"./components-2OHqArC0.js";import"./index-BabtBpse.js";/**
 * @remix-run/react v2.12.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */let pt="positions";function ne({getKey:e,...t}){let{isSpaMode:a}=Ut(),r=Yt(),n=Xt();Zt({getKey:e,storageKey:pt});let s=D.useMemo(()=>{if(!e)return null;let l=e(r,n);return l!==r.key?l:null},[]);if(a)return null;let o=((l,c)=>{if(!window.history.state||!window.history.state.key){let p=Math.random().toString(32).slice(2);window.history.replaceState({key:p},"")}try{let m=JSON.parse(sessionStorage.getItem(l)||"{}")[c||window.history.state.key];typeof m=="number"&&window.scrollTo(0,m)}catch(p){console.error(p),sessionStorage.removeItem(l)}}).toString();return D.createElement("script",te({},t,{suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${o})(${JSON.stringify(pt)}, ${JSON.stringify(s)})`}}))}function vt(e){return e==="auto"||e==="dark"||e==="light"}function se({key:e="mantine-color-scheme-value"}={}){let t;return{get:a=>{if(typeof window>"u")return a;try{const r=window.localStorage.getItem(e);return vt(r)?r:a}catch{return a}},set:a=>{try{window.localStorage.setItem(e,a)}catch(r){console.warn("[@mantine/core] Local storage color scheme manager was unable to save color scheme.",r)}},subscribe:a=>{t=r=>{r.storageArea===window.localStorage&&r.key===e&&vt(r.newValue)&&a(r.newValue)},window.addEventListener("storage",t)},unsubscribe:()=>{window.removeEventListener("storage",t)},clear:()=>{window.localStorage.removeItem(e)}}}function oe(){const e=xt(),t=Ot(),a=L(e.breakpoints).reduce((r,n)=>{const s=e.breakpoints[n].includes("px"),o=Kt(e.breakpoints[n]),l=s?`${o-.1}px`:gt(o-.1),c=s?`${o}px`:gt(o);return`${r}@media (max-width: ${l}) {.mantine-visible-from-${n} {display: none !important;}}@media (min-width: ${c}) {.mantine-hidden-from-${n} {display: none !important;}}`},"");return d.jsx("style",{"data-mantine-styles":"classes",nonce:t==null?void 0:t(),dangerouslySetInnerHTML:{__html:a}})}function nt(e){return Object.entries(e).map(([t,a])=>`${t}: ${a};`).join("")}function X(e,t){return(Array.isArray(e)?e:[e]).reduce((r,n)=>`${n}{${r}}`,t)}function le(e,t){const a=nt(e.variables),r=a?X(t,a):"",n=nt(e.dark),s=nt(e.light),o=n?X(t===":host"?`${t}([data-mantine-color-scheme="dark"])`:`${t}[data-mantine-color-scheme="dark"]`,n):"",l=s?X(t===":host"?`${t}([data-mantine-color-scheme="light"])`:`${t}[data-mantine-color-scheme="light"]`,s):"";return`${r}${o}${l}`}function rt({theme:e,color:t,colorScheme:a,name:r=t,withColorValues:n=!0}){if(!e.colors[t])return{};if(a==="light"){const l=ot(e,"light"),c={[`--mantine-color-${r}-text`]:`var(--mantine-color-${r}-filled)`,[`--mantine-color-${r}-filled`]:`var(--mantine-color-${r}-${l})`,[`--mantine-color-${r}-filled-hover`]:`var(--mantine-color-${r}-${l===9?8:l+1})`,[`--mantine-color-${r}-light`]:N(e.colors[t][l],.1),[`--mantine-color-${r}-light-hover`]:N(e.colors[t][l],.12),[`--mantine-color-${r}-light-color`]:`var(--mantine-color-${r}-${l})`,[`--mantine-color-${r}-outline`]:`var(--mantine-color-${r}-${l})`,[`--mantine-color-${r}-outline-hover`]:N(e.colors[t][l],.05)};return n?{[`--mantine-color-${r}-0`]:e.colors[t][0],[`--mantine-color-${r}-1`]:e.colors[t][1],[`--mantine-color-${r}-2`]:e.colors[t][2],[`--mantine-color-${r}-3`]:e.colors[t][3],[`--mantine-color-${r}-4`]:e.colors[t][4],[`--mantine-color-${r}-5`]:e.colors[t][5],[`--mantine-color-${r}-6`]:e.colors[t][6],[`--mantine-color-${r}-7`]:e.colors[t][7],[`--mantine-color-${r}-8`]:e.colors[t][8],[`--mantine-color-${r}-9`]:e.colors[t][9],...c}:c}const s=ot(e,"dark"),o={[`--mantine-color-${r}-text`]:`var(--mantine-color-${r}-4)`,[`--mantine-color-${r}-filled`]:`var(--mantine-color-${r}-${s})`,[`--mantine-color-${r}-filled-hover`]:`var(--mantine-color-${r}-${s===9?8:s+1})`,[`--mantine-color-${r}-light`]:N(e.colors[t][Math.max(0,s-2)],.15),[`--mantine-color-${r}-light-hover`]:N(e.colors[t][Math.max(0,s-2)],.2),[`--mantine-color-${r}-light-color`]:`var(--mantine-color-${r}-${Math.max(s-5,0)})`,[`--mantine-color-${r}-outline`]:`var(--mantine-color-${r}-${Math.max(s-4,0)})`,[`--mantine-color-${r}-outline-hover`]:N(e.colors[t][Math.max(s-4,0)],.05)};return n?{[`--mantine-color-${r}-0`]:e.colors[t][0],[`--mantine-color-${r}-1`]:e.colors[t][1],[`--mantine-color-${r}-2`]:e.colors[t][2],[`--mantine-color-${r}-3`]:e.colors[t][3],[`--mantine-color-${r}-4`]:e.colors[t][4],[`--mantine-color-${r}-5`]:e.colors[t][5],[`--mantine-color-${r}-6`]:e.colors[t][6],[`--mantine-color-${r}-7`]:e.colors[t][7],[`--mantine-color-${r}-8`]:e.colors[t][8],[`--mantine-color-${r}-9`]:e.colors[t][9],...o}:o}function ce(e){return!!e&&typeof e=="object"&&"mantine-virtual-color"in e}function W(e,t,a){L(t).forEach(r=>Object.assign(e,{[`--mantine-${a}-${r}`]:t[r]}))}const Et=e=>{const t=ot(e,"light"),a=e.defaultRadius in e.radius?e.radius[e.defaultRadius]:Nt(e.defaultRadius),r={variables:{"--mantine-scale":e.scale.toString(),"--mantine-cursor-type":e.cursorType,"--mantine-color-scheme":"light dark","--mantine-webkit-font-smoothing":e.fontSmoothing?"antialiased":"unset","--mantine-moz-font-smoothing":e.fontSmoothing?"grayscale":"unset","--mantine-color-white":e.white,"--mantine-color-black":e.black,"--mantine-line-height":e.lineHeights.md,"--mantine-font-family":e.fontFamily,"--mantine-font-family-monospace":e.fontFamilyMonospace,"--mantine-font-family-headings":e.headings.fontFamily,"--mantine-heading-font-weight":e.headings.fontWeight,"--mantine-heading-text-wrap":e.headings.textWrap,"--mantine-radius-default":a,"--mantine-primary-color-filled":`var(--mantine-color-${e.primaryColor}-filled)`,"--mantine-primary-color-filled-hover":`var(--mantine-color-${e.primaryColor}-filled-hover)`,"--mantine-primary-color-light":`var(--mantine-color-${e.primaryColor}-light)`,"--mantine-primary-color-light-hover":`var(--mantine-color-${e.primaryColor}-light-hover)`,"--mantine-primary-color-light-color":`var(--mantine-color-${e.primaryColor}-light-color)`},light:{"--mantine-primary-color-contrast":yt(e,"light"),"--mantine-color-bright":"var(--mantine-color-black)","--mantine-color-text":e.black,"--mantine-color-body":e.white,"--mantine-color-error":"var(--mantine-color-red-6)","--mantine-color-placeholder":"var(--mantine-color-gray-5)","--mantine-color-anchor":`var(--mantine-color-${e.primaryColor}-${t})`,"--mantine-color-default":"var(--mantine-color-white)","--mantine-color-default-hover":"var(--mantine-color-gray-0)","--mantine-color-default-color":"var(--mantine-color-black)","--mantine-color-default-border":"var(--mantine-color-gray-4)","--mantine-color-dimmed":"var(--mantine-color-gray-6)"},dark:{"--mantine-primary-color-contrast":yt(e,"dark"),"--mantine-color-bright":"var(--mantine-color-white)","--mantine-color-text":"var(--mantine-color-dark-0)","--mantine-color-body":"var(--mantine-color-dark-7)","--mantine-color-error":"var(--mantine-color-red-8)","--mantine-color-placeholder":"var(--mantine-color-dark-3)","--mantine-color-anchor":`var(--mantine-color-${e.primaryColor}-4)`,"--mantine-color-default":"var(--mantine-color-dark-6)","--mantine-color-default-hover":"var(--mantine-color-dark-5)","--mantine-color-default-color":"var(--mantine-color-white)","--mantine-color-default-border":"var(--mantine-color-dark-4)","--mantine-color-dimmed":"var(--mantine-color-dark-2)"}};W(r.variables,e.breakpoints,"breakpoint"),W(r.variables,e.spacing,"spacing"),W(r.variables,e.fontSizes,"font-size"),W(r.variables,e.lineHeights,"line-height"),W(r.variables,e.shadows,"shadow"),W(r.variables,e.radius,"radius"),e.colors[e.primaryColor].forEach((s,o)=>{r.variables[`--mantine-primary-color-${o}`]=`var(--mantine-color-${e.primaryColor}-${o})`}),L(e.colors).forEach(s=>{const o=e.colors[s];if(ce(o)){Object.assign(r.light,rt({theme:e,name:o.name,color:o.light,colorScheme:"light",withColorValues:!0})),Object.assign(r.dark,rt({theme:e,name:o.name,color:o.dark,colorScheme:"dark",withColorValues:!0}));return}o.forEach((l,c)=>{r.variables[`--mantine-color-${s}-${c}`]=l}),Object.assign(r.light,rt({theme:e,color:s,colorScheme:"light",withColorValues:!1})),Object.assign(r.dark,rt({theme:e,color:s,colorScheme:"dark",withColorValues:!1}))});const n=e.headings.sizes;return L(n).forEach(s=>{r.variables[`--mantine-${s}-font-size`]=n[s].fontSize,r.variables[`--mantine-${s}-line-height`]=n[s].lineHeight,r.variables[`--mantine-${s}-font-weight`]=n[s].fontWeight||e.headings.fontWeight}),r};function ue({theme:e,generator:t}){const a=Et(e),r=t==null?void 0:t(e);return r?Wt(a,r):a}const st=Et(Bt);function he(e){const t={variables:{},light:{},dark:{}};return L(e.variables).forEach(a=>{st.variables[a]!==e.variables[a]&&(t.variables[a]=e.variables[a])}),L(e.light).forEach(a=>{st.light[a]!==e.light[a]&&(t.light[a]=e.light[a])}),L(e.dark).forEach(a=>{st.dark[a]!==e.dark[a]&&(t.dark[a]=e.dark[a])}),t}function de(e){return`
  ${e}[data-mantine-color-scheme="dark"] { --mantine-color-scheme: dark; }
  ${e}[data-mantine-color-scheme="light"] { --mantine-color-scheme: light; }
`}function jt({cssVariablesSelector:e,deduplicateCssVariables:t}){const a=xt(),r=Ot(),n=Gt(),s=ue({theme:a,generator:n}),o=e===":root"&&t,l=o?he(s):s,c=le(l,e);return c?d.jsx("style",{"data-mantine-styles":!0,nonce:r==null?void 0:r(),dangerouslySetInnerHTML:{__html:`${c}${o?"":de(e)}`}}):null}jt.displayName="@mantine/CssVariables";function fe(){const e=console.error;console.error=(...t)=>{t.length>1&&typeof t[0]=="string"&&t[0].toLowerCase().includes("extra attributes from the server")&&typeof t[1]=="string"&&t[1].toLowerCase().includes("data-mantine-color-scheme")||e(...t)}}function B(e,t){var r;const a=e!=="auto"?e:window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";(r=t())==null||r.setAttribute("data-mantine-color-scheme",a)}function me({manager:e,defaultColorScheme:t,getRootElement:a,forceColorScheme:r}){const n=D.useRef(),[s,o]=D.useState(()=>e.get(t)),l=r||s,c=D.useCallback(m=>{r||(B(m,a),o(m),e.set(m))},[e.set,l,r]),p=D.useCallback(()=>{o(t),B(t,a),e.clear()},[e.clear,t]);return D.useEffect(()=>(e.subscribe(c),e.unsubscribe),[e.subscribe,e.unsubscribe]),Qt(()=>{B(e.get(t),a)},[]),D.useEffect(()=>{var $;if(r)return B(r,a),()=>{};r===void 0&&B(s,a),n.current=window.matchMedia("(prefers-color-scheme: dark)");const m=S=>{s==="auto"&&B(S.matches?"dark":"light",a)};return($=n.current)==null||$.addEventListener("change",m),()=>{var S;return(S=n.current)==null?void 0:S.removeEventListener("change",m)}},[s,r]),{colorScheme:l,setColorScheme:c,clearColorScheme:p}}function ge({respectReducedMotion:e,getRootElement:t}){Qt(()=>{var a;e&&((a=t())==null||a.setAttribute("data-respect-reduced-motion","true"))},[e])}fe();function At({theme:e,children:t,getStyleNonce:a,withStaticClasses:r=!0,withGlobalClasses:n=!0,deduplicateCssVariables:s=!0,withCssVariables:o=!0,cssVariablesSelector:l=":root",classNamesPrefix:c="mantine",colorSchemeManager:p=se(),defaultColorScheme:m="light",getRootElement:$=()=>document.documentElement,cssVariablesResolver:S,forceColorScheme:q,stylesTransform:_}){const{colorScheme:M,setColorScheme:O,clearColorScheme:K}=me({defaultColorScheme:m,forceColorScheme:q,manager:p,getRootElement:$});return ge({respectReducedMotion:(e==null?void 0:e.respectReducedMotion)||!1,getRootElement:$}),d.jsx(zt.Provider,{value:{colorScheme:M,setColorScheme:O,clearColorScheme:K,getRootElement:$,classNamesPrefix:c,getStyleNonce:a,cssVariablesResolver:S,cssVariablesSelector:l,withStaticClasses:r,stylesTransform:_},children:d.jsxs(Jt,{theme:e,children:[o&&d.jsx(jt,{cssVariablesSelector:l,deduplicateCssVariables:s}),n&&d.jsx(oe,{}),t]})})}At.displayName="@mantine/core/MantineProvider";const ye=({defaultColorScheme:e,localStorageKey:t,forceColorScheme:a})=>a?`document.documentElement.setAttribute("data-mantine-color-scheme", '${a}');`:`try {
  var _colorScheme = window.localStorage.getItem("${t}");
  var colorScheme = _colorScheme === "light" || _colorScheme === "dark" || _colorScheme === "auto" ? _colorScheme : "${e}";
  var computedColorScheme = colorScheme !== "auto" ? colorScheme : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  document.documentElement.setAttribute("data-mantine-color-scheme", computedColorScheme);
} catch (e) {}
`;function pe({defaultColorScheme:e="light",localStorageKey:t="mantine-color-scheme-value",forceColorScheme:a,...r}){const n=["light","dark","auto"].includes(e)?e:"light";return d.jsx("script",{...r,"data-mantine-script":!0,dangerouslySetInnerHTML:{__html:ye({defaultColorScheme:n,localStorageKey:t,forceColorScheme:a})}})}var C,$t,ve=($t=class extends Ct{constructor(t={}){super();g(this,C);this.config=t,h(this,C,new Map)}build(t,a,r){const n=a.queryKey,s=a.queryHash??kt(n,a);let o=this.get(s);return o||(o=new Dt({cache:this,queryKey:n,queryHash:s,options:t.defaultQueryOptions(a),state:r,defaultOptions:t.getQueryDefaults(n)}),this.add(o)),o}add(t){i(this,C).has(t.queryHash)||(i(this,C).set(t.queryHash,t),this.notify({type:"added",query:t}))}remove(t){const a=i(this,C).get(t.queryHash);a&&(t.destroy(),a===t&&i(this,C).delete(t.queryHash),this.notify({type:"removed",query:t}))}clear(){b.batch(()=>{this.getAll().forEach(t=>{this.remove(t)})})}get(t){return i(this,C).get(t)}getAll(){return[...i(this,C).values()]}find(t){const a={exact:!0,...t};return this.getAll().find(r=>ct(a,r))}findAll(t={}){const a=this.getAll();return Object.keys(t).length>0?a.filter(r=>ct(t,r)):a}notify(t){b.batch(()=>{this.listeners.forEach(a=>{a(t)})})}onFocus(){b.batch(()=>{this.getAll().forEach(t=>{t.onFocus()})})}onOnline(){b.batch(()=>{this.getAll().forEach(t=>{t.onOnline()})})}},C=new WeakMap,$t),k,y,H,x,A,St,be=(St=class extends Ft{constructor(t){super();g(this,x);g(this,k);g(this,y);g(this,H);this.mutationId=t.mutationId,h(this,y,t.mutationCache),h(this,k,[]),this.state=t.state||we(),this.setOptions(t.options),this.scheduleGc()}setOptions(t){this.options=t,this.updateGcTime(this.options.gcTime)}get meta(){return this.options.meta}addObserver(t){i(this,k).includes(t)||(i(this,k).push(t),this.clearGcTimeout(),i(this,y).notify({type:"observerAdded",mutation:this,observer:t}))}removeObserver(t){h(this,k,i(this,k).filter(a=>a!==t)),this.scheduleGc(),i(this,y).notify({type:"observerRemoved",mutation:this,observer:t})}optionalRemove(){i(this,k).length||(this.state.status==="pending"?this.scheduleGc():i(this,y).remove(this))}continue(){var t;return((t=i(this,H))==null?void 0:t.continue())??this.execute(this.state.variables)}async execute(t){var n,s,o,l,c,p,m,$,S,q,_,M,O,K,Y,v,P,E,I,tt;h(this,H,Rt({fn:()=>this.options.mutationFn?this.options.mutationFn(t):Promise.reject(new Error("No mutationFn found")),onFail:(f,V)=>{j(this,x,A).call(this,{type:"failed",failureCount:f,error:V})},onPause:()=>{j(this,x,A).call(this,{type:"pause"})},onContinue:()=>{j(this,x,A).call(this,{type:"continue"})},retry:this.options.retry??0,retryDelay:this.options.retryDelay,networkMode:this.options.networkMode,canRun:()=>i(this,y).canRun(this)}));const a=this.state.status==="pending",r=!i(this,H).canStart();try{if(!a){j(this,x,A).call(this,{type:"pending",variables:t,isPaused:r}),await((s=(n=i(this,y).config).onMutate)==null?void 0:s.call(n,t,this));const V=await((l=(o=this.options).onMutate)==null?void 0:l.call(o,t));V!==this.state.context&&j(this,x,A).call(this,{type:"pending",context:V,variables:t,isPaused:r})}const f=await i(this,H).start();return await((p=(c=i(this,y).config).onSuccess)==null?void 0:p.call(c,f,t,this.state.context,this)),await(($=(m=this.options).onSuccess)==null?void 0:$.call(m,f,t,this.state.context)),await((q=(S=i(this,y).config).onSettled)==null?void 0:q.call(S,f,null,this.state.variables,this.state.context,this)),await((M=(_=this.options).onSettled)==null?void 0:M.call(_,f,null,t,this.state.context)),j(this,x,A).call(this,{type:"success",data:f}),f}catch(f){try{throw await((K=(O=i(this,y).config).onError)==null?void 0:K.call(O,f,t,this.state.context,this)),await((v=(Y=this.options).onError)==null?void 0:v.call(Y,f,t,this.state.context)),await((E=(P=i(this,y).config).onSettled)==null?void 0:E.call(P,void 0,f,this.state.variables,this.state.context,this)),await((tt=(I=this.options).onSettled)==null?void 0:tt.call(I,void 0,f,t,this.state.context)),f}finally{j(this,x,A).call(this,{type:"error",error:f})}}finally{i(this,y).runNext(this)}}},k=new WeakMap,y=new WeakMap,H=new WeakMap,x=new WeakSet,A=function(t){const a=r=>{switch(t.type){case"failed":return{...r,failureCount:t.failureCount,failureReason:t.error};case"pause":return{...r,isPaused:!0};case"continue":return{...r,isPaused:!1};case"pending":return{...r,context:t.context,data:void 0,failureCount:0,failureReason:null,error:null,isPaused:t.isPaused,status:"pending",variables:t.variables,submittedAt:Date.now()};case"success":return{...r,data:t.data,failureCount:0,failureReason:null,error:null,status:"success",isPaused:!1};case"error":return{...r,data:void 0,error:t.error,failureCount:r.failureCount+1,failureReason:t.error,isPaused:!1,status:"error"}}};this.state=a(this.state),b.batch(()=>{i(this,k).forEach(r=>{r.onMutationUpdate(t)}),i(this,y).notify({mutation:this,type:"updated",action:t})})},St);function we(){return{context:void 0,data:void 0,error:null,failureCount:0,failureReason:null,isPaused:!1,status:"idle",variables:void 0,submittedAt:0}}var w,Z,Mt,$e=(Mt=class extends Ct{constructor(t={}){super();g(this,w);g(this,Z);this.config=t,h(this,w,new Map),h(this,Z,Date.now())}build(t,a,r){const n=new be({mutationCache:this,mutationId:++et(this,Z)._,options:t.defaultMutationOptions(a),state:r});return this.add(n),n}add(t){const a=at(t),r=i(this,w).get(a)??[];r.push(t),i(this,w).set(a,r),this.notify({type:"added",mutation:t})}remove(t){var r;const a=at(t);if(i(this,w).has(a)){const n=(r=i(this,w).get(a))==null?void 0:r.filter(s=>s!==t);n&&(n.length===0?i(this,w).delete(a):i(this,w).set(a,n))}this.notify({type:"removed",mutation:t})}canRun(t){var r;const a=(r=i(this,w).get(at(t)))==null?void 0:r.find(n=>n.state.status==="pending");return!a||a===t}runNext(t){var r;const a=(r=i(this,w).get(at(t)))==null?void 0:r.find(n=>n!==t&&n.state.isPaused);return(a==null?void 0:a.continue())??Promise.resolve()}clear(){b.batch(()=>{this.getAll().forEach(t=>{this.remove(t)})})}getAll(){return[...i(this,w).values()].flat()}find(t){const a={exact:!0,...t};return this.getAll().find(r=>ut(a,r))}findAll(t={}){return this.getAll().filter(a=>ut(t,a))}notify(t){b.batch(()=>{this.listeners.forEach(a=>{a(t)})})}resumePausedMutations(){const t=this.getAll().filter(a=>a.state.isPaused);return b.batch(()=>Promise.all(t.map(a=>a.continue().catch(Q))))}},w=new WeakMap,Z=new WeakMap,Mt);function at(e){var t;return((t=e.options.scope)==null?void 0:t.id)??String(e.mutationId)}function bt(e){return{onFetch:(t,a)=>{var m,$,S,q,_;const r=t.options,n=(S=($=(m=t.fetchOptions)==null?void 0:m.meta)==null?void 0:$.fetchMore)==null?void 0:S.direction,s=((q=t.state.data)==null?void 0:q.pages)||[],o=((_=t.state.data)==null?void 0:_.pageParams)||[];let l={pages:[],pageParams:[]},c=0;const p=async()=>{let M=!1;const O=v=>{Object.defineProperty(v,"signal",{enumerable:!0,get:()=>(t.signal.aborted?M=!0:t.signal.addEventListener("abort",()=>{M=!0}),t.signal)})},K=Tt(t.options,t.fetchOptions),Y=async(v,P,E)=>{if(M)return Promise.reject();if(P==null&&v.pages.length)return Promise.resolve(v);const I={queryKey:t.queryKey,pageParam:P,direction:E?"backward":"forward",meta:t.options.meta};O(I);const tt=await K(I),{maxPages:f}=t.options,V=E?qt:_t;return{pages:V(v.pages,tt,f),pageParams:V(v.pageParams,P,f)}};if(n&&s.length){const v=n==="backward",P=v?Se:wt,E={pages:s,pageParams:o},I=P(r,E);l=await Y(E,I,v)}else{const v=e??s.length;do{const P=c===0?o[0]??r.initialPageParam:wt(r,l);if(c>0&&P==null)break;l=await Y(l,P),c++}while(c<v)}return l};t.options.persister?t.fetchFn=()=>{var M,O;return(O=(M=t.options).persister)==null?void 0:O.call(M,p,{queryKey:t.queryKey,meta:t.options.meta,signal:t.signal},a)}:t.fetchFn=p}}}function wt(e,{pages:t,pageParams:a}){const r=t.length-1;return t.length>0?e.getNextPageParam(t[r],t,a[r],a):void 0}function Se(e,{pages:t,pageParams:a}){var r;return t.length>0?(r=e.getPreviousPageParam)==null?void 0:r.call(e,t[0],t,a[0],a):void 0}var u,F,R,G,z,T,J,U,Pt,Me=(Pt=class{constructor(e={}){g(this,u);g(this,F);g(this,R);g(this,G);g(this,z);g(this,T);g(this,J);g(this,U);h(this,u,e.queryCache||new ve),h(this,F,e.mutationCache||new $e),h(this,R,e.defaultOptions||{}),h(this,G,new Map),h(this,z,new Map),h(this,T,0)}mount(){et(this,T)._++,i(this,T)===1&&(h(this,J,It.subscribe(async e=>{e&&(await this.resumePausedMutations(),i(this,u).onFocus())})),h(this,U,ht.subscribe(async e=>{e&&(await this.resumePausedMutations(),i(this,u).onOnline())})))}unmount(){var e,t;et(this,T)._--,i(this,T)===0&&((e=i(this,J))==null||e.call(this),h(this,J,void 0),(t=i(this,U))==null||t.call(this),h(this,U,void 0))}isFetching(e){return i(this,u).findAll({...e,fetchStatus:"fetching"}).length}isMutating(e){return i(this,F).findAll({...e,status:"pending"}).length}getQueryData(e){var a;const t=this.defaultQueryOptions({queryKey:e});return(a=i(this,u).get(t.queryHash))==null?void 0:a.state.data}ensureQueryData(e){const t=this.getQueryData(e.queryKey);if(t===void 0)return this.fetchQuery(e);{const a=this.defaultQueryOptions(e),r=i(this,u).build(this,a);return e.revalidateIfStale&&r.isStaleByTime(dt(a.staleTime,r))&&this.prefetchQuery(a),Promise.resolve(t)}}getQueriesData(e){return i(this,u).findAll(e).map(({queryKey:t,state:a})=>{const r=a.data;return[t,r]})}setQueryData(e,t,a){const r=this.defaultQueryOptions({queryKey:e}),n=i(this,u).get(r.queryHash),s=n==null?void 0:n.state.data,o=Vt(t,s);if(o!==void 0)return i(this,u).build(this,r).setData(o,{...a,manual:!0})}setQueriesData(e,t,a){return b.batch(()=>i(this,u).findAll(e).map(({queryKey:r})=>[r,this.setQueryData(r,t,a)]))}getQueryState(e){var a;const t=this.defaultQueryOptions({queryKey:e});return(a=i(this,u).get(t.queryHash))==null?void 0:a.state}removeQueries(e){const t=i(this,u);b.batch(()=>{t.findAll(e).forEach(a=>{t.remove(a)})})}resetQueries(e,t){const a=i(this,u),r={type:"active",...e};return b.batch(()=>(a.findAll(e).forEach(n=>{n.reset()}),this.refetchQueries(r,t)))}cancelQueries(e={},t={}){const a={revert:!0,...t},r=b.batch(()=>i(this,u).findAll(e).map(n=>n.cancel(a)));return Promise.all(r).then(Q).catch(Q)}invalidateQueries(e={},t={}){return b.batch(()=>{if(i(this,u).findAll(e).forEach(r=>{r.invalidate()}),e.refetchType==="none")return Promise.resolve();const a={...e,type:e.refetchType??e.type??"active"};return this.refetchQueries(a,t)})}refetchQueries(e={},t){const a={...t,cancelRefetch:(t==null?void 0:t.cancelRefetch)??!0},r=b.batch(()=>i(this,u).findAll(e).filter(n=>!n.isDisabled()).map(n=>{let s=n.fetch(void 0,a);return a.throwOnError||(s=s.catch(Q)),n.state.fetchStatus==="paused"?Promise.resolve():s}));return Promise.all(r).then(Q)}fetchQuery(e){const t=this.defaultQueryOptions(e);t.retry===void 0&&(t.retry=!1);const a=i(this,u).build(this,t);return a.isStaleByTime(dt(t.staleTime,a))?a.fetch(t):Promise.resolve(a.state.data)}prefetchQuery(e){return this.fetchQuery(e).then(Q).catch(Q)}fetchInfiniteQuery(e){return e.behavior=bt(e.pages),this.fetchQuery(e)}prefetchInfiniteQuery(e){return this.fetchInfiniteQuery(e).then(Q).catch(Q)}ensureInfiniteQueryData(e){return e.behavior=bt(e.pages),this.ensureQueryData(e)}resumePausedMutations(){return ht.isOnline()?i(this,F).resumePausedMutations():Promise.resolve()}getQueryCache(){return i(this,u)}getMutationCache(){return i(this,F)}getDefaultOptions(){return i(this,R)}setDefaultOptions(e){h(this,R,e)}setQueryDefaults(e,t){i(this,G).set(ft(e),{queryKey:e,defaultOptions:t})}getQueryDefaults(e){const t=[...i(this,G).values()];let a={};return t.forEach(r=>{mt(e,r.queryKey)&&(a={...a,...r.defaultOptions})}),a}setMutationDefaults(e,t){i(this,z).set(ft(e),{mutationKey:e,defaultOptions:t})}getMutationDefaults(e){const t=[...i(this,z).values()];let a={};return t.forEach(r=>{mt(e,r.mutationKey)&&(a={...a,...r.defaultOptions})}),a}defaultQueryOptions(e){if(e._defaulted)return e;const t={...i(this,R).queries,...this.getQueryDefaults(e.queryKey),...e,_defaulted:!0};return t.queryHash||(t.queryHash=kt(t.queryKey,t)),t.refetchOnReconnect===void 0&&(t.refetchOnReconnect=t.networkMode!=="always"),t.throwOnError===void 0&&(t.throwOnError=!!t.suspense),!t.networkMode&&t.persister&&(t.networkMode="offlineFirst"),t.enabled!==!0&&t.queryFn===Ht&&(t.enabled=!1),t}defaultMutationOptions(e){return e!=null&&e._defaulted?e:{...i(this,R).mutations,...(e==null?void 0:e.mutationKey)&&this.getMutationDefaults(e.mutationKey),...e,_defaulted:!0}}clear(){i(this,u).clear(),i(this,F).clear()}},u=new WeakMap,F=new WeakMap,R=new WeakMap,G=new WeakMap,z=new WeakMap,T=new WeakMap,J=new WeakMap,U=new WeakMap,Pt);const je=()=>[];function Ae({children:e}){return d.jsxs("html",{lang:"ja",children:[d.jsxs("head",{children:[d.jsx("meta",{charSet:"utf-8"}),d.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),d.jsx(re,{}),d.jsx(ae,{}),d.jsx(pe,{})]}),d.jsxs("body",{children:[e,d.jsx(ne,{}),d.jsx(ie,{})]})]})}function De(){const e=new Me;return d.jsx(At,{defaultColorScheme:"auto",children:d.jsx(Lt,{client:e,children:d.jsx(ee,{})})})}export{Ae as Layout,De as default,je as links};