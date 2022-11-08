"use strict";(self.webpackChunkjavascript_notes=self.webpackChunkjavascript_notes||[]).push([[440],{278:function(e,t,n){n.d(t,{Z:function(){return a}});const r=new Map;var o={set(e,t,n){r.has(e)||r.set(e,new Map);const o=r.get(e);o.has(t)||0===o.size?o.set(t,n):console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(o.keys())[0]}.`)},get(e,t){return r.has(e)&&r.get(e).get(t)||null},remove(e,t){if(!r.has(e))return;const n=r.get(e);n.delete(t),0===n.size&&r.delete(e)}},s=n(147),i=n(930),u=n(467),c=class{static get Default(){return{}}static get DefaultType(){return{}}static get NAME(){throw new Error('You have to implement the static method "NAME", for each component!')}_getConfig(e){return e=this._mergeConfigObj(e),e=this._configAfterMerge(e),this._typeCheckConfig(e),e}_configAfterMerge(e){return e}_mergeConfigObj(e,t){const n=(0,s.kK)(t)?u.Z.getDataAttribute(t,"config"):{};return{...this.constructor.Default,..."object"==typeof n?n:{},...(0,s.kK)(t)?u.Z.getDataAttributes(t):{},..."object"==typeof e?e:{}}}_typeCheckConfig(e,t=this.constructor.DefaultType){for(const n of Object.keys(t)){const r=t[n],o=e[n],i=(0,s.kK)(o)?"element":(0,s.Fy)(o);if(!new RegExp(r).test(i))throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${n}" provided type "${i}" but expected type "${r}".`)}}},a=class extends c{constructor(e,t){super(),(e=(0,s.sb)(e))&&(this._element=e,this._config=this._getConfig(t),o.set(this._element,this.constructor.DATA_KEY,this))}dispose(){o.remove(this._element,this.constructor.DATA_KEY),i.Z.off(this._element,this.constructor.EVENT_KEY);for(const e of Object.getOwnPropertyNames(this))this[e]=null}_queueCallback(e,t,n=!0){(0,s.e0)(e,t,n)}_getConfig(e){return e=this._mergeConfigObj(e,this._element),e=this._configAfterMerge(e),this._typeCheckConfig(e),e}static getInstance(e){return o.get((0,s.sb)(e),this.DATA_KEY)}static getOrCreateInstance(e,t={}){return this.getInstance(e)||new this(e,"object"==typeof t?t:null)}static get VERSION(){return"5.2.2"}static get DATA_KEY(){return`bs.${this.NAME}`}static get EVENT_KEY(){return`.${this.DATA_KEY}`}static eventName(e){return`${e}${this.EVENT_KEY}`}}},930:function(e,t,n){var r=n(147);const o=/[^.]*(?=\..*)\.|.*/,s=/\..*/,i=/::\d+$/,u={};let c=1;const a={mouseenter:"mouseover",mouseleave:"mouseout"},l=new Set(["click","dblclick","mouseup","mousedown","contextmenu","mousewheel","DOMMouseScroll","mouseover","mouseout","mousemove","selectstart","selectend","keydown","keypress","keyup","orientationchange","touchstart","touchmove","touchend","touchcancel","pointerdown","pointermove","pointerup","pointerleave","pointercancel","gesturestart","gesturechange","gestureend","focus","blur","change","reset","select","submit","focusin","focusout","load","unload","beforeunload","resize","move","DOMContentLoaded","readystatechange","error","abort","scroll"]);function f(e,t){return t&&`${t}::${c++}`||e.uidEvent||c++}function d(e){const t=f(e);return e.uidEvent=t,u[t]=u[t]||{},u[t]}function p(e,t,n=null){return Object.values(e).find((e=>e.callable===t&&e.delegationSelector===n))}function g(e,t,n){const r="string"==typeof t,o=r?n:t||n;let s=y(e);return l.has(s)||(s=e),[r,o,s]}function h(e,t,n,r,s){if("string"!=typeof t||!e)return;let[i,u,c]=g(t,n,r);if(t in a){const e=e=>function(t){if(!t.relatedTarget||t.relatedTarget!==t.delegateTarget&&!t.delegateTarget.contains(t.relatedTarget))return e.call(this,t)};u=e(u)}const l=d(e),h=l[c]||(l[c]={}),b=p(h,u,i?n:null);if(b)return void(b.oneOff=b.oneOff&&s);const m=f(u,t.replace(o,"")),y=i?function(e,t,n){return function r(o){const s=e.querySelectorAll(t);for(let{target:i}=o;i&&i!==this;i=i.parentNode)for(const u of s)if(u===i)return E(o,{delegateTarget:i}),r.oneOff&&v.off(e,o.type,t,n),n.apply(i,[o])}}(e,n,u):function(e,t){return function n(r){return E(r,{delegateTarget:e}),n.oneOff&&v.off(e,r.type,t),t.apply(e,[r])}}(e,u);y.delegationSelector=i?n:null,y.callable=u,y.oneOff=s,y.uidEvent=m,h[m]=y,e.addEventListener(c,y,i)}function b(e,t,n,r,o){const s=p(t[n],r,o);s&&(e.removeEventListener(n,s,Boolean(o)),delete t[n][s.uidEvent])}function m(e,t,n,r){const o=t[n]||{};for(const s of Object.keys(o))if(s.includes(r)){const r=o[s];b(e,t,n,r.callable,r.delegationSelector)}}function y(e){return e=e.replace(s,""),a[e]||e}const v={on(e,t,n,r){h(e,t,n,r,!1)},one(e,t,n,r){h(e,t,n,r,!0)},off(e,t,n,r){if("string"!=typeof t||!e)return;const[o,s,u]=g(t,n,r),c=u!==t,a=d(e),l=a[u]||{},f=t.startsWith(".");if(void 0===s){if(f)for(const n of Object.keys(a))m(e,a,n,t.slice(1));for(const n of Object.keys(l)){const r=n.replace(i,"");if(!c||t.includes(r)){const t=l[n];b(e,a,u,t.callable,t.delegationSelector)}}}else{if(!Object.keys(l).length)return;b(e,a,u,s,o?n:null)}},trigger(e,t,n){if("string"!=typeof t||!e)return null;const o=(0,r.KF)();let s=null,i=!0,u=!0,c=!1;t!==y(t)&&o&&(s=o.Event(t,n),o(e).trigger(s),i=!s.isPropagationStopped(),u=!s.isImmediatePropagationStopped(),c=s.isDefaultPrevented());let a=new Event(t,{bubbles:i,cancelable:!0});return a=E(a,n),c&&a.preventDefault(),u&&e.dispatchEvent(a),a.defaultPrevented&&s&&s.preventDefault(),a}};function E(e,t){for(const[n,r]of Object.entries(t||{}))try{e[n]=r}catch{Object.defineProperty(e,n,{configurable:!0,get(){return r}})}return e}t.Z=v},467:function(e,t){function n(e){if("true"===e)return!0;if("false"===e)return!1;if(e===Number(e).toString())return Number(e);if(""===e||"null"===e)return null;if("string"!=typeof e)return e;try{return JSON.parse(decodeURIComponent(e))}catch{return e}}function r(e){return e.replace(/[A-Z]/g,(e=>`-${e.toLowerCase()}`))}const o={setDataAttribute(e,t,n){e.setAttribute(`data-bs-${r(t)}`,n)},removeDataAttribute(e,t){e.removeAttribute(`data-bs-${r(t)}`)},getDataAttributes(e){if(!e)return{};const t={},r=Object.keys(e.dataset).filter((e=>e.startsWith("bs")&&!e.startsWith("bsConfig")));for(const o of r){let r=o.replace(/^bs/,"");r=r.charAt(0).toLowerCase()+r.slice(1,r.length),t[r]=n(e.dataset[o])}return t},getDataAttribute(e,t){return n(e.getAttribute(`data-bs-${r(t)}`))}};t.Z=o},902:function(e,t,n){var r=n(147);const o={find(e,t=document.documentElement){return[].concat(...Element.prototype.querySelectorAll.call(t,e))},findOne(e,t=document.documentElement){return Element.prototype.querySelector.call(t,e)},children(e,t){return[].concat(...e.children).filter((e=>e.matches(t)))},parents(e,t){const n=[];let r=e.parentNode.closest(t);for(;r;)n.push(r),r=r.parentNode.closest(t);return n},prev(e,t){let n=e.previousElementSibling;for(;n;){if(n.matches(t))return[n];n=n.previousElementSibling}return[]},next(e,t){let n=e.nextElementSibling;for(;n;){if(n.matches(t))return[n];n=n.nextElementSibling}return[]},focusableChildren(e){const t=["a","button","input","textarea","select","details","[tabindex]",'[contenteditable="true"]'].map((e=>`${e}:not([tabindex^="-"])`)).join(",");return this.find(t,e).filter((e=>!(0,r.pK)(e)&&(0,r.pn)(e)))}};t.Z=o},147:function(e,t,n){n.d(t,{Fj:function(){return E},Fy:function(){return o},K:function(){return i},KF:function(){return g},ZT:function(){return d},dG:function(){return u},dZ:function(){return b},e0:function(){return v},kK:function(){return c},nq:function(){return p},pF:function(){return m},pK:function(){return f},pn:function(){return l},sb:function(){return a}});const r="transitionend",o=e=>null==e?`${e}`:Object.prototype.toString.call(e).match(/\s([a-z]+)/i)[1].toLowerCase(),s=e=>{let t=e.getAttribute("data-bs-target");if(!t||"#"===t){let n=e.getAttribute("href");if(!n||!n.includes("#")&&!n.startsWith("."))return null;n.includes("#")&&!n.startsWith("#")&&(n=`#${n.split("#")[1]}`),t=n&&"#"!==n?n.trim():null}return t},i=e=>{const t=s(e);return t&&document.querySelector(t)?t:null},u=e=>{const t=s(e);return t?document.querySelector(t):null},c=e=>!(!e||"object"!=typeof e)&&(void 0!==e.jquery&&(e=e[0]),void 0!==e.nodeType),a=e=>c(e)?e.jquery?e[0]:e:"string"==typeof e&&e.length>0?document.querySelector(e):null,l=e=>{if(!c(e)||0===e.getClientRects().length)return!1;const t="visible"===getComputedStyle(e).getPropertyValue("visibility"),n=e.closest("details:not([open])");if(!n)return t;if(n!==e){const t=e.closest("summary");if(t&&t.parentNode!==n)return!1;if(null===t)return!1}return t},f=e=>!e||e.nodeType!==Node.ELEMENT_NODE||!!e.classList.contains("disabled")||(void 0!==e.disabled?e.disabled:e.hasAttribute("disabled")&&"false"!==e.getAttribute("disabled")),d=()=>{},p=e=>{e.offsetHeight},g=()=>window.jQuery&&!document.body.hasAttribute("data-bs-no-jquery")?window.jQuery:null,h=[],b=()=>"rtl"===document.documentElement.dir,m=e=>{var t;t=()=>{const t=g();if(t){const n=e.NAME,r=t.fn[n];t.fn[n]=e.jQueryInterface,t.fn[n].Constructor=e,t.fn[n].noConflict=()=>(t.fn[n]=r,e.jQueryInterface)}},"loading"===document.readyState?(h.length||document.addEventListener("DOMContentLoaded",(()=>{for(const e of h)e()})),h.push(t)):t()},y=e=>{"function"==typeof e&&e()},v=(e,t,n=!0)=>{if(!n)return void y(e);const o=(e=>{if(!e)return 0;let{transitionDuration:t,transitionDelay:n}=window.getComputedStyle(e);const r=Number.parseFloat(t),o=Number.parseFloat(n);return r||o?(t=t.split(",")[0],n=n.split(",")[0],1e3*(Number.parseFloat(t)+Number.parseFloat(n))):0})(t)+5;let s=!1;const i=({target:n})=>{n===t&&(s=!0,t.removeEventListener(r,i),y(e))};t.addEventListener(r,i),setTimeout((()=>{s||t.dispatchEvent(new Event(r))}),o)},E=(e,t,n,r)=>{const o=e.length;let s=e.indexOf(t);return-1===s?!n&&r?e[o-1]:e[0]:(s+=n?1:-1,r&&(s=(s+o)%o),e[Math.max(0,Math.min(s,o-1))])}}}]);