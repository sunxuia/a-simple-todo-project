(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2cff4f10"],{"0611":function(t,e,o){t.exports={toolbar:"PCLayout_toolbar_3dRm0",container:"PCLayout_container_DPhQC","main-content":"PCLayout_main-content_3bKaJ",mainContent:"PCLayout_main-content_3bKaJ",footer:"PCLayout_footer_1NdeC"}},baae:function(t,e,o){"use strict";var i=o("0611"),a=o.n(i);e["default"]=a.a},bd0d:function(t,e,o){"use strict";o.r(e);var i=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-app",[o("v-toolbar",{class:t.$style.toolbar,attrs:{app:"",dark:"",color:"primary",flat:""}},[o("v-toolbar-side-icon",{on:{click:function(e){t.showLeftSide=!t.showLeftSide}}}),o("v-toolbar-title",{staticClass:"headline text-uppercase"},[o("span",{staticClass:"font-weight-light"},[t._v("simple todo list")])]),o("v-spacer"),o("v-menu",{attrs:{"offset-y":""}},[o("v-btn",{attrs:{slot:"activator",color:"primary",dark:"",icon:""},slot:"activator"},[o("v-icon",[t._v("more_vert")])],1),o("v-list",[o("v-list-tile",{style:{cursor:"pointer"},on:{click:t.switchLayout}},[o("v-list-tile-title",[t._v("切换为手机版")])],1)],1)],1)],1),o("v-content",{class:t.$style.container},[o("v-container",[o("left-side",{ref:"leftSide",attrs:{mobile:!1,show:t.showLeftSide}}),o("main-content",{ref:"mainContent",class:t.$style.mainContent})],1)],1),o("footer",{staticClass:"pa-2",class:t.$style.footer},[o("div",[t._v("© "+t._s((new Date).getFullYear()))])]),t.editingItem?o("confirm-dialog",{attrs:{title:"修改"},on:{confirm:t.modifyTodoItem,cancel:function(e){t.editingItem=null}}},[o("edit-detail",{ref:"editingDetail",attrs:{todoItem:t.editingItem}})],1):t._e()],1)},a=[],n=o("9fa2"),s=o("113e"),r=o("2e01"),l=o("1741"),c=o("6f9e"),d={name:"App",components:{MainContent:n["a"],LeftSide:r["a"],ConfirmDialog:l["a"],EditDetail:s["a"]},data:function(){return{showLeftSide:!1,editingItem:null,categoryId:0}},methods:{editItem:function(t){this.editingItem=t},modifyTodoItem:function(){var t=this.$refs.editingDetail.submit();return t&&(this.editingItem=null),t},switchLayout:function(){this.$router.push({name:"mobile"})},categoryDeleted:function(t){this.categoryId===t.id&&c["a"].$emit("view-category",0)},viewCategory:function(t){this.categoryId=t}},created:function(){c["a"].$on("edit-todo-item",this.editItem),c["a"].$on("view-category",this.viewCategory),c["a"].$on("category-deleted",this.categoryDeleted)},mounted:function(){c["a"].$emit("view-category",0)}},f=d,u=o("baae"),m=o("2877"),v=o("6544"),y=o.n(v),p=o("7496"),h=o("8336"),b=o("a523"),g=o("549c"),_=o("132d"),w=o("8860"),C=o("ba95"),I=o("5d23"),L=o("e449"),V=o("9910"),$=o("71d9"),T=o("706c"),D=o("2a7f");function S(t){this["$style"]=u["default"].locals||u["default"]}var k=Object(m["a"])(f,i,a,!1,S,null,null);k.options.__file="PCLayout.vue";e["default"]=k.exports;y()(k,{VApp:p["a"],VBtn:h["a"],VContainer:b["a"],VContent:g["a"],VIcon:_["a"],VList:w["a"],VListTile:C["a"],VListTileTitle:I["b"],VMenu:L["a"],VSpacer:V["a"],VToolbar:$["a"],VToolbarSideIcon:T["a"],VToolbarTitle:D["b"]})}}]);