(function(e){function t(t){for(var o,r,c=t[0],u=t[1],d=t[2],l=0,s=[];l<c.length;l++)r=c[l],a[r]&&s.push(a[r][0]),a[r]=0;for(o in u)Object.prototype.hasOwnProperty.call(u,o)&&(e[o]=u[o]);f&&f(t);while(s.length)s.shift()();return i.push.apply(i,d||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],o=!0,r=1;r<n.length;r++){var c=n[r];0!==a[c]&&(o=!1)}o&&(i.splice(t--,1),e=u(u.s=n[0]))}return e}var o={},r={app:0},a={app:0},i=[];function c(e){return u.p+"js/"+({}[e]||e)+"."+{"chunk-1d1cd0c0":"d3798bb9","chunk-1b356a8c":"e25a9868","chunk-2cff4f10":"e4bde337"}[e]+".js"}function u(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.e=function(e){var t=[],n={"chunk-1d1cd0c0":1,"chunk-1b356a8c":1,"chunk-2cff4f10":1};r[e]?t.push(r[e]):0!==r[e]&&n[e]&&t.push(r[e]=new Promise(function(t,n){for(var o="css/"+({}[e]||e)+"."+{"chunk-1d1cd0c0":"ab94161e","chunk-1b356a8c":"44bd19d2","chunk-2cff4f10":"4bb00148"}[e]+".css",a=u.p+o,i=document.getElementsByTagName("link"),c=0;c<i.length;c++){var d=i[c],l=d.getAttribute("data-href")||d.getAttribute("href");if("stylesheet"===d.rel&&(l===o||l===a))return t()}var s=document.getElementsByTagName("style");for(c=0;c<s.length;c++){d=s[c],l=d.getAttribute("data-href");if(l===o||l===a)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var o=t&&t.target&&t.target.src||a,i=new Error("Loading CSS chunk "+e+" failed.\n("+o+")");i.request=o,delete r[e],f.parentNode.removeChild(f),n(i)},f.href=a;var m=document.getElementsByTagName("head")[0];m.appendChild(f)}).then(function(){r[e]=0}));var o=a[e];if(0!==o)if(o)t.push(o[2]);else{var i=new Promise(function(t,n){o=a[e]=[t,n]});t.push(o[2]=i);var d,l=document.getElementsByTagName("head")[0],s=document.createElement("script");s.charset="utf-8",s.timeout=120,u.nc&&s.setAttribute("nonce",u.nc),s.src=c(e),d=function(t){s.onerror=s.onload=null,clearTimeout(f);var n=a[e];if(0!==n){if(n){var o=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src,i=new Error("Loading chunk "+e+" failed.\n("+o+": "+r+")");i.type=o,i.request=r,n[1](i)}a[e]=void 0}};var f=setTimeout(function(){d({type:"timeout",target:s})},12e4);s.onerror=s.onload=d,l.appendChild(s)}return Promise.all(t)},u.m=e,u.c=o,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)u.d(n,o,function(t){return e[t]}.bind(null,o));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="/a-simple-todo-project/dist/",u.oe=function(e){throw console.error(e),e};var d=window["webpackJsonp"]=window["webpackJsonp"]||[],l=d.push.bind(d);d.push=t,d=d.slice();for(var s=0;s<d.length;s++)t(d[s]);var f=l;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"15fd0":function(e,t,n){},1741:function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-dialog",{attrs:{"max-width":e.maxWidth},model:{value:e.visible,callback:function(t){e.visible=t},expression:"visible"}},[n("v-card",[n("v-card-title",{staticClass:"headline"},[e._v(e._s(e.title))]),n("v-card-text",[e._t("default")],2),n("v-card-actions",[n("v-spacer"),e.showCancel?n("v-btn",{attrs:{color:"red darken-1",flat:"flat"},on:{click:function(t){e.click("cancel")}}},[e._v("取消")]):e._e(),n("v-btn",{attrs:{color:"green darken-1",flat:"flat"},on:{click:function(t){e.click("confirm")}}},[e._v(e._s(e.confirmText))])],1)],1)],1)},r=[],a=(n("c5f6"),{props:{visible:{type:Boolean,default:!0},title:{type:String,default:"确认"},maxWidth:{type:Number,default:600},showCancel:{type:Boolean,default:!0},confirmText:{type:String,default:"好"}},methods:{click:function(e){this.$emit(e)}}}),i=a,c=n("2877"),u=n("6544"),d=n.n(u),l=n("8336"),s=n("b0af"),f=n("99d9"),m=n("12b2"),p=n("169a"),h=n("9910"),g=Object(c["a"])(i,o,r,!1,null,null,null);g.options.__file="ConfirmDialog.vue";t["a"]=g.exports;d()(g,{VBtn:l["a"],VCard:s["a"],VCardActions:f["a"],VCardText:f["b"],VCardTitle:m["a"],VDialog:p["a"],VSpacer:h["a"]})},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("097d");var o=n("2b0e"),r=n("bb71");n("da64");o["a"].use(r["a"],{iconfont:"md"});n("d1e7"),n("d4b8");var a=n("859b"),i=n.n(a),c=(n("e10f"),n("456d"),n("f751"),n("ac4d"),n("8a81"),n("ac6a"),n("2f62")),u=n("6f9e"),d=n("0e44");o["a"].use(c["a"]);var l=null;function s(e,t){var n=!0,o=!1,r=void 0;try{for(var a,i=e[Symbol.iterator]();!(n=(a=i.next()).done);n=!0){var c=a.value;if(c.id===t)return c}}catch(u){o=!0,r=u}finally{try{n||null==i.return||i.return()}finally{if(o)throw r}}}function f(e){var t=-1,n=!0,o=!1,r=void 0;try{for(var a,i=e[Symbol.iterator]();!(n=(a=i.next()).done);n=!0){var c=a.value;t=Math.max(t,c.id)}}catch(u){o=!0,r=u}finally{try{n||null==i.return||i.return()}finally{if(o)throw r}}return t+1}function m(e,t,n){e.categories[0].uncompleteCount+=n,s(e.categories,t).uncompleteCount+=n}var p=new c["a"].Store({plugins:[Object(d["a"])({key:"todo-vuex"})],state:{user:l,categories:[],todoItems:[],categoryTodoItems:{}},getters:{user:function(e){return e.user},categories:function(e){return e.categories},todoList:function(e){return function(t){return 0===t?e.todoItems:e.categoryTodoItems[t]}}},mutations:{addCategory:function(e,t){var n={id:f(e.categories),title:t,uncompleteCount:0};e.categories.push(n),e.categoryTodoItems[n.id]=[]},deleteCategory:function(e,t){var n=s(e.categories,t);e.categories.splice(e.categories.indexOf(n),1),delete e.categoryTodoItems[t];for(var o=e.todoItems.length-1;o>=0;o--)e.todoItems[o].category===t&&e.todoItems.splice(o,1);u["a"].$emit("category-deleted",n)},changeCompleteStatus:function(e,t){var n=t.id,o=t.completed,r=s(e.todoItems,n);o?(m(e,r.category,-1),r.endTime=new Date):(m(e,r.category,1),delete r.endTime),r.completed=o},addTodoItem:function(e,t){var n=t.categoryId,o=t.title,r={id:f(e.todoItems),title:o,description:"",star:!1,category:n,time:new Date,completed:!1,children:[]};e.todoItems.push(r),m(e,n,1),e.categoryTodoItems[n].push(r),u["a"].$emit("todo-item-added",r)},editTodoItem:function(e,t){var n=s(e.todoItems,t.id);Object.assign(n,t)},deleteTodoItem:function(e,t){for(var n=0;n<e.todoItems.length;n++){var o=e.todoItems[n];if(o.id===t)return e.todoItems.splice(n,1),m(e,o.category,-1),void u["a"].$emit("todo-item-deleted",o)}},recoverData:function(e){function t(e){var t=!0,n=!1,o=void 0;try{for(var r,a=e[Symbol.iterator]();!(t=(r=a.next()).done);t=!0){var i=r.value;i.time&&(i.time=new Date(i.time)),i.endTime&&(i.endTime=new Date(i.endTime))}}catch(c){n=!0,o=c}finally{try{t||null==a.return||a.return()}finally{if(n)throw o}}}t(e.todoItems);for(var n=Object.keys(e.categoryTodoItems),o=0;o<n.length;o++){var r=n[o];t(e.categoryTodoItems[r])}}}});0===p.state.categories.length?p.commit("addCategory","全部"):p.commit("recoverData");var h=p,g=n("8c4f"),v=[{path:"/",redirect:"/pc"},{path:"/pc",component:function(){return Promise.all([n.e("chunk-1d1cd0c0"),n.e("chunk-2cff4f10")]).then(n.bind(null,"bd0d"))},name:"pc",meta:{title:"this is a todo app",description:"some description"}},{path:"/mobile",component:function(){return Promise.all([n.e("chunk-1d1cd0c0"),n.e("chunk-1b356a8c")]).then(n.bind(null,"2e42"))},name:"mobile",meta:{title:"this is a todo app",description:"some description"}},{path:"*",redirect:"/",meta:{}}];o["a"].use(g["a"]);var y=function(){return new g["a"]({routes:v,mode:"hash",fallback:!0})},b=n("15fd"),w=n("1741"),k=o["a"].extend({props:{dialogProps:Object,confirmHandler:{type:Function,default:function(){return!0}},content:Object},component:{ConfirmDialog:w["a"]},methods:{onConfirm:function(){this.confirmHandler()&&this.$destroy()},onCancel:function(){this.$destroy()}},render:function(e){return e(w["a"],{props:this.dialogProps,on:{confirm:this.onConfirm,cancel:this.onCancel}},[this.content])},destroyed:function(){document.body.removeChild(this.$el)}}),x=function(e){e.prototype.$showConfirmDialog=function(e){var t=e.content,n=e.confirmHandler,o=Object(b["a"])(e,["content","confirmHandler"]),r=new k({propsData:{content:t,confirmHandler:n,dialogProps:o}});r.$mount(),document.body.appendChild(r.$el)}},T=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("transition",{attrs:{name:"fade",mode:"out-in"}},[n("router-view")],1)},C=[],I=n("2877"),_={},j=Object(I["a"])(_,T,C,!1,null,null,null);j.options.__file="App.vue";var O=j.exports;n("15fd0");o["a"].use(i.a),o["a"].use(x),o["a"].config.productionTip=!1,new o["a"]({store:h,router:y(),render:function(e){return e(O)}}).$mount("#app")},"6f9e":function(e,t,n){"use strict";var o=n("2b0e"),r=new o["a"];t["a"]=r},e10f:function(e,t,n){"use strict";n.r(t),n.d(t,"format",function(){return o}),n.d(t,"today",function(){return r}),n.d(t,"tomorrow",function(){return a});n("3b2b"),n("a481"),n("cadf"),n("551c"),n("097d");function o(e,t){var n={"M+":e.getMonth()+1,"d+":e.getDay(),"H+":e.getHours(),"h+":e.getHours()%12>12?e.getHours()%12:e.getHours(),"m+":e.getMinutes(),"s+":e.getSeconds(),S:e.getMilliseconds()};for(var o in/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(e.getFullYear()+"").substr(4-RegExp.$1.length))),n)new RegExp("("+o+")").test(t)&&(t=t.replace(RegExp.$1,1===RegExp.$1.length?n[o]:("00"+n[o]).substr((""+n[o]).length)));return t}function r(e){var t=new Date(e);return t.setHours(0),t.setMinutes(0),t.setSeconds(0),t.setMilliseconds(0),t}function a(e){var t=new Date(e);return t.setDate(t.getDate()+1),r(t)}}});