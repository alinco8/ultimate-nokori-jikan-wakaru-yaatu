var le=t=>{throw TypeError(t)};var J=(t,e,s)=>e.has(t)||le("Cannot "+s);var r=(t,e,s)=>(J(t,e,"read from private field"),s?s.call(t):e.get(t)),m=(t,e,s)=>e.has(t)?le("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,s),u=(t,e,s,i)=>(J(t,e,"write to private field"),i?i.call(t,s):e.set(t,s),s),f=(t,e,s)=>(J(t,e,"access private method"),s);import{j as I,r as E}from"./jsx-runtime-D2HyDbKh.js";import{S as we,l as de,q as O,t as $,r as V,b as Oe,u as G,v as fe,w as Te,g as Ie,x as Ee,y as pe,n as ge,z as Qe}from"./QueryClientProvider-CPyVoVZx.js";import{f as Fe,u as je,b as De,B as Ue,c as Pe,g as ke,W as _e,T as Be}from"./Header-Db9aUm0L.js";import{C as Le}from"./Container-Bdeynu1Y.js";import{r as X}from"./MantineThemeProvider-eMimkJgM.js";import{T as W}from"./Table-17UojLVi.js";var Re={root:"m_18320242","skeleton-fade":"m_299c329c"};const Me={visible:!0,animate:!0},He=Pe((t,{width:e,height:s,radius:i,circle:c})=>({root:{"--skeleton-height":X(s),"--skeleton-width":c?X(s):X(e),"--skeleton-radius":c?"1000px":i===void 0?void 0:ke(i)}})),ne=Fe((t,e)=>{const s=je("Skeleton",Me,t),{classNames:i,className:c,style:h,styles:n,unstyled:v,vars:l,width:p,height:R,circle:d,visible:T,radius:b,animate:j,mod:x,...S}=s,M=De({name:"Skeleton",classes:Re,props:s,className:c,style:h,classNames:i,styles:n,unstyled:v,vars:l,varsResolver:He});return I.jsx(Ue,{ref:e,...M("root"),mod:[{visible:T,animate:j},x],...S})});ne.classes=Re;ne.displayName="@mantine/core/Skeleton";var g,a,A,y,D,k,Q,w,N,_,B,U,P,F,L,o,H,Y,Z,ee,te,se,re,ie,Ce,ve,Ae=(ve=class extends we{constructor(e,s){super();m(this,o);m(this,g);m(this,a);m(this,A);m(this,y);m(this,D);m(this,k);m(this,Q);m(this,w);m(this,N);m(this,_);m(this,B);m(this,U);m(this,P);m(this,F);m(this,L,new Set);this.options=s,u(this,g,e),u(this,w,null),u(this,Q,de()),this.options.experimental_prefetchInRender||r(this,Q).reject(new Error("experimental_prefetchInRender feature flag is not enabled")),this.bindMethods(),this.setOptions(s)}bindMethods(){this.refetch=this.refetch.bind(this)}onSubscribe(){this.listeners.size===1&&(r(this,a).addObserver(this),me(r(this,a),this.options)?f(this,o,H).call(this):this.updateResult(),f(this,o,te).call(this))}onUnsubscribe(){this.hasListeners()||this.destroy()}shouldFetchOnReconnect(){return ae(r(this,a),this.options,this.options.refetchOnReconnect)}shouldFetchOnWindowFocus(){return ae(r(this,a),this.options,this.options.refetchOnWindowFocus)}destroy(){this.listeners=new Set,f(this,o,se).call(this),f(this,o,re).call(this),r(this,a).removeObserver(this)}setOptions(e,s){const i=this.options,c=r(this,a);if(this.options=r(this,g).defaultQueryOptions(e),this.options.enabled!==void 0&&typeof this.options.enabled!="boolean"&&typeof this.options.enabled!="function"&&typeof O(this.options.enabled,r(this,a))!="boolean")throw new Error("Expected enabled to be a boolean or a callback that returns a boolean");f(this,o,ie).call(this),r(this,a).setOptions(this.options),i._defaulted&&!$(this.options,i)&&r(this,g).getQueryCache().notify({type:"observerOptionsUpdated",query:r(this,a),observer:this});const h=this.hasListeners();h&&be(r(this,a),c,this.options,i)&&f(this,o,H).call(this),this.updateResult(s),h&&(r(this,a)!==c||O(this.options.enabled,r(this,a))!==O(i.enabled,r(this,a))||V(this.options.staleTime,r(this,a))!==V(i.staleTime,r(this,a)))&&f(this,o,Y).call(this);const n=f(this,o,Z).call(this);h&&(r(this,a)!==c||O(this.options.enabled,r(this,a))!==O(i.enabled,r(this,a))||n!==r(this,F))&&f(this,o,ee).call(this,n)}getOptimisticResult(e){const s=r(this,g).getQueryCache().build(r(this,g),e),i=this.createResult(s,e);return We(this,i)&&(u(this,y,i),u(this,k,this.options),u(this,D,r(this,a).state)),i}getCurrentResult(){return r(this,y)}trackResult(e,s){const i={};return Object.keys(e).forEach(c=>{Object.defineProperty(i,c,{configurable:!1,enumerable:!0,get:()=>(this.trackProp(c),s==null||s(c),e[c])})}),i}trackProp(e){r(this,L).add(e)}getCurrentQuery(){return r(this,a)}refetch({...e}={}){return this.fetch({...e})}fetchOptimistic(e){const s=r(this,g).defaultQueryOptions(e),i=r(this,g).getQueryCache().build(r(this,g),s);return i.isFetchingOptimistic=!0,i.fetch().then(()=>this.createResult(i,s))}fetch(e){return f(this,o,H).call(this,{...e,cancelRefetch:e.cancelRefetch??!0}).then(()=>(this.updateResult(),r(this,y)))}createResult(e,s){var ue;const i=r(this,a),c=this.options,h=r(this,y),n=r(this,D),v=r(this,k),p=e!==i?e.state:r(this,A),{state:R}=e;let d={...R},T=!1,b;if(s._optimisticResults){const C=this.hasListeners(),q=!C&&me(e,s),xe=C&&be(e,i,s,c);(q||xe)&&(d={...d,...Ee(R.data,e.options)}),s._optimisticResults==="isRestoring"&&(d.fetchStatus="idle")}let{error:j,errorUpdatedAt:x,status:S}=d;if(s.select&&d.data!==void 0)if(h&&d.data===(n==null?void 0:n.data)&&s.select===r(this,N))b=r(this,_);else try{u(this,N,s.select),b=s.select(d.data),b=pe(h==null?void 0:h.data,b,s),u(this,_,b),u(this,w,null)}catch(C){u(this,w,C)}else b=d.data;if(s.placeholderData!==void 0&&b===void 0&&S==="pending"){let C;if(h!=null&&h.isPlaceholderData&&s.placeholderData===(v==null?void 0:v.placeholderData))C=h.data;else if(C=typeof s.placeholderData=="function"?s.placeholderData((ue=r(this,B))==null?void 0:ue.state.data,r(this,B)):s.placeholderData,s.select&&C!==void 0)try{C=s.select(C),u(this,w,null)}catch(q){u(this,w,q)}C!==void 0&&(S="success",b=pe(h==null?void 0:h.data,C,s),T=!0)}r(this,w)&&(j=r(this,w),b=r(this,_),x=Date.now(),S="error");const M=d.fetchStatus==="fetching",z=S==="pending",K=S==="error",he=z&&M,ce=b!==void 0;return{status:S,fetchStatus:d.fetchStatus,isPending:z,isSuccess:S==="success",isError:K,isInitialLoading:he,isLoading:he,data:b,dataUpdatedAt:d.dataUpdatedAt,error:j,errorUpdatedAt:x,failureCount:d.fetchFailureCount,failureReason:d.fetchFailureReason,errorUpdateCount:d.errorUpdateCount,isFetched:d.dataUpdateCount>0||d.errorUpdateCount>0,isFetchedAfterMount:d.dataUpdateCount>p.dataUpdateCount||d.errorUpdateCount>p.errorUpdateCount,isFetching:M,isRefetching:M&&!z,isLoadingError:K&&!ce,isPaused:d.fetchStatus==="paused",isPlaceholderData:T,isRefetchError:K&&ce,isStale:oe(e,s),refetch:this.refetch,promise:r(this,Q)}}updateResult(e){const s=r(this,y),i=this.createResult(r(this,a),this.options);if(u(this,D,r(this,a).state),u(this,k,this.options),r(this,D).data!==void 0&&u(this,B,r(this,a)),$(i,s))return;if(this.options.experimental_prefetchInRender){const n=p=>{i.status==="error"?p.reject(i.error):i.data!==void 0&&p.resolve(i.data)},v=()=>{const p=u(this,Q,i.promise=de());n(p)},l=r(this,Q);switch(l.status){case"pending":n(l);break;case"fulfilled":(i.status==="error"||i.data!==l.value)&&v();break;case"rejected":(i.status!=="error"||i.error!==l.reason)&&v();break}}u(this,y,i);const c={},h=()=>{if(!s)return!0;const{notifyOnChangeProps:n}=this.options,v=typeof n=="function"?n():n;if(v==="all"||!v&&!r(this,L).size)return!0;const l=new Set(v??r(this,L));return this.options.throwOnError&&l.add("error"),Object.keys(r(this,y)).some(p=>{const R=p;return r(this,y)[R]!==s[R]&&l.has(R)})};(e==null?void 0:e.listeners)!==!1&&h()&&(c.listeners=!0),f(this,o,Ce).call(this,{...c,...e})}onQueryUpdate(){this.updateResult(),this.hasListeners()&&f(this,o,te).call(this)}},g=new WeakMap,a=new WeakMap,A=new WeakMap,y=new WeakMap,D=new WeakMap,k=new WeakMap,Q=new WeakMap,w=new WeakMap,N=new WeakMap,_=new WeakMap,B=new WeakMap,U=new WeakMap,P=new WeakMap,F=new WeakMap,L=new WeakMap,o=new WeakSet,H=function(e){f(this,o,ie).call(this);let s=r(this,a).fetch(this.options,e);return e!=null&&e.throwOnError||(s=s.catch(Oe)),s},Y=function(){f(this,o,se).call(this);const e=V(this.options.staleTime,r(this,a));if(G||r(this,y).isStale||!fe(e))return;const i=Te(r(this,y).dataUpdatedAt,e)+1;u(this,U,setTimeout(()=>{r(this,y).isStale||this.updateResult()},i))},Z=function(){return(typeof this.options.refetchInterval=="function"?this.options.refetchInterval(r(this,a)):this.options.refetchInterval)??!1},ee=function(e){f(this,o,re).call(this),u(this,F,e),!(G||O(this.options.enabled,r(this,a))===!1||!fe(r(this,F))||r(this,F)===0)&&u(this,P,setInterval(()=>{(this.options.refetchIntervalInBackground||Ie.isFocused())&&f(this,o,H).call(this)},r(this,F)))},te=function(){f(this,o,Y).call(this),f(this,o,ee).call(this,f(this,o,Z).call(this))},se=function(){r(this,U)&&(clearTimeout(r(this,U)),u(this,U,void 0))},re=function(){r(this,P)&&(clearInterval(r(this,P)),u(this,P,void 0))},ie=function(){const e=r(this,g).getQueryCache().build(r(this,g),this.options);if(e===r(this,a))return;const s=r(this,a);u(this,a,e),u(this,A,e.state),this.hasListeners()&&(s==null||s.removeObserver(this),e.addObserver(this))},Ce=function(e){ge.batch(()=>{e.listeners&&this.listeners.forEach(s=>{s(r(this,y))}),r(this,g).getQueryCache().notify({query:r(this,a),type:"observerResultsUpdated"})})},ve);function Ne(t,e){return O(e.enabled,t)!==!1&&t.state.data===void 0&&!(t.state.status==="error"&&e.retryOnMount===!1)}function me(t,e){return Ne(t,e)||t.state.data!==void 0&&ae(t,e,e.refetchOnMount)}function ae(t,e,s){if(O(e.enabled,t)!==!1){const i=typeof s=="function"?s(t):s;return i==="always"||i!==!1&&oe(t,e)}return!1}function be(t,e,s,i){return(t!==e||O(i.enabled,t)===!1)&&(!s.suspense||t.state.status!=="error")&&oe(t,s)}function oe(t,e){return O(e.enabled,t)!==!1&&t.isStaleByTime(V(e.staleTime,t))}function We(t,e){return!$(t.getCurrentResult(),e)}var Se=E.createContext(!1),Ve=()=>E.useContext(Se);Se.Provider;function ze(){let t=!1;return{clearReset:()=>{t=!1},reset:()=>{t=!0},isReset:()=>t}}var Ke=E.createContext(ze()),qe=()=>E.useContext(Ke);function Je(t,e){return typeof t=="function"?t(...e):!!t}function Xe(){}var $e=(t,e)=>{(t.suspense||t.throwOnError)&&(e.isReset()||(t.retryOnMount=!1))},Ge=t=>{E.useEffect(()=>{t.clearReset()},[t])},Ye=({result:t,errorResetBoundary:e,throwOnError:s,query:i})=>t.isError&&!e.isReset()&&!t.isFetching&&i&&Je(s,[t.error,i]),Ze=t=>{t.suspense&&(typeof t.staleTime!="number"&&(t.staleTime=1e3),typeof t.gcTime=="number"&&(t.gcTime=Math.max(t.gcTime,1e3)))},et=(t,e)=>t.isLoading&&t.isFetching&&!e,tt=(t,e)=>(t==null?void 0:t.suspense)&&e.isPending,ye=(t,e,s)=>e.fetchOptimistic(t).catch(()=>{s.clearReset()});function st(t,e,s){var R,d,T,b,j;const i=Qe(),c=Ve(),h=qe(),n=i.defaultQueryOptions(t);(d=(R=i.getDefaultOptions().queries)==null?void 0:R._experimental_beforeQuery)==null||d.call(R,n),n._optimisticResults=c?"isRestoring":"optimistic",Ze(n),$e(n,h),Ge(h);const v=!i.getQueryCache().get(n.queryHash),[l]=E.useState(()=>new e(i,n)),p=l.getOptimisticResult(n);if(E.useSyncExternalStore(E.useCallback(x=>{const S=c?()=>{}:l.subscribe(ge.batchCalls(x));return l.updateResult(),S},[l,c]),()=>l.getCurrentResult(),()=>l.getCurrentResult()),E.useEffect(()=>{l.setOptions(n,{listeners:!1})},[n,l]),tt(n,p))throw ye(n,l,h);if(Ye({result:p,errorResetBoundary:h,throwOnError:n.throwOnError,query:i.getQueryCache().get(n.queryHash)}))throw p.error;if((b=(T=i.getDefaultOptions().queries)==null?void 0:T._experimental_afterQuery)==null||b.call(T,n,p),n.experimental_prefetchInRender&&!G&&et(p,c)){const x=v?ye(n,l,h):(j=i.getQueryCache().get(n.queryHash))==null?void 0:j.promise;x==null||x.catch(Xe).finally(()=>{l.hasListeners()||l.updateResult()})}return n.notifyOnChangeProps?p:l.trackResult(p)}function rt(t,e){return st(t,Ae)}const ft=()=>[{title:"アップデート"},{name:"description",content:""}],it=encodeURI("https://script.google.com/macros/s/AKfycbwIyttpQFg27Wkw5v1SQpm1pnoBIHrcdvHgb4vbrHw5eF5iIcBRXSe_jICKtVXJcbR0DQ/exec?sheet=日誌・自主学習&range=B7:F506");function pt(){const{data:t,isPending:e}=rt({queryKey:["diary"],queryFn:async()=>(await new Promise(s=>setTimeout(s,2e3)),JSON.parse(await(await fetch(it)).text()))});return I.jsx(_e,{children:I.jsxs(Le,{children:[I.jsx(Be,{children:"Diary"}),I.jsx(ne,{visible:e,children:I.jsx(W,{withRowBorders:!0,withColumnBorders:!0,withTableBorder:!0,children:I.jsx(W.Tbody,{children:t==null?void 0:t.map((s,i)=>I.jsx(W.Tr,{children:s.map((c,h)=>I.jsx(W.Td,{children:c.toString()},h))},i))})})})]})})}export{pt as default,ft as meta};
