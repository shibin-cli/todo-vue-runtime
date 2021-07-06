(()=>{"use strict";const t={name:"TodoFooter",render:function(t){return t("footer",{attrs:{class:"info"}},[t("p","Double-click to edit a todo"),t("p",["Template by ",t("a",{attrs:{href:"http://sindresorhus.com",target:"_blank"}},"Sindre Sorhus")]),t("p",["Created by ",t("a",{attrs:{href:"https://github.com/shibin-cli",target:"_blank"}},"Shibin You")]),t("p",["Part of ",t("a",{attrs:{href:"http://todomvc.com",target:"_blank"}},"TodoMVC")])])}},e=new Vue,o={props:["value"],render:function(t){var e=this;return t("input",{domProps:{value:this.value},on:{input:function(t){e.$emit("input",t.target.value)},keydown:function(t){"Enter"===t.code||13===t.keyCode?e.$emit("enter",t.target.value):"Escape"!==t.code&&27!==t.keyCode||e.$emit("esc",t)},blur:function(t){e.$emit("blur",t.target.value)}}})}},n={name:"TodoHeader",data:function(){return{keyword:""}},methods:{addTodo:function(){""!==this.keyword.trim()&&(e.$emit("addTodo",this.keyword),this.keyword="")}},render:function(t){var e=this;return t("header",{attrs:{class:"header"}},[t("h1","todos"),t(o,{props:{value:this.keyword},attrs:{class:"new-todo",placeholder:"What needs to be done",autofocus:!0,autocomplete:"off"},on:{enter:this.addTodo,input:function(t){e.keyword=t}}})])}},i={props:["checked"],render:function(t){var e=this;return t("input",{domProps:{checked:this.checked},attrs:{type:"checkbox"},on:{change:function(t){e.$emit("change",t)}}})}},r={name:"TodoList",props:{list:{type:Array,default:[]},editId:{type:Number,default:-1}},methods:{editTodo:function(t){e.$emit("editTodo",t.id)},doneEdit:function(t,o){e.$emit("changeTodo",{id:o.id,text:t}),e.$emit("doneEditTodo")},backEdit:function(t,o){t.target.value=o.text,e.$emit("doneEditTodo")},removeTodo:function(t){e.$emit("removeTodo",t)}},render:function(t){var n=this;return t("ul",{attrs:{class:"todo-list"}},[this.list.map((function(r){return t("li",{key:r.id,class:{completed:r.completed,editing:r.id===n.editId}},[t("div",{attrs:{class:"view"}},[t(i,{attrs:{class:"toggle"},props:{checked:r.completed},on:{change:function(t){e.$emit("completedTodo",{id:r.id,completed:t.target.checked})}}}),t("label",{on:{dblclick:function(){n.editTodo(r)}}},r.text),t("button",{attrs:{class:"destroy"},on:{click:function(){n.removeTodo(r)}}})]),t(o,{attrs:{class:"edit",value:r.text},on:{enter:function(t){n.doneEdit(t,r)},blur:function(t){n.doneEdit(t,r)},esc:function(t){n.backEdit(t,r)}}})])}))])}};var d=["all","active","completed"];const c={props:["remainingCount","visibility","completedCount"],render:function(t){var o=this;return t("footer",{attrs:{class:"footer"}},[t("span",{attrs:{class:"todo-count"}},[t("strong",this.remainingCount)," item left"]),t("ul",{attrs:{class:"filters"}},d.map((function(e){return t("li",[t("a",{class:{selected:e===o.visibility},attrs:{href:"#".concat(e)}},e.slice(0,1).toUpperCase()+e.slice(1))])}))),t("button",{attrs:{class:"clear-completed"},style:{display:this.completedCount>0?"":"none"},on:{click:function(){e.$emit("clearCompleted")}}},"Clear completed")])}};var s,a=0,l=(s||(s="__TODO_VUE"),{save:function(t){t=function(t){try{t=JSON.stringify(t)}catch(e){t=""}return t}(t),window.localStorage.setItem(s,t)},get:function(){var t=window.localStorage.getItem(s);return t&&(t=function(t){try{t=JSON.parse(t)}catch(t){}return t}(t)),t}}),u={all:function(t){return t},active:function(t){return t.filter((function(t){return!t.completed}))},completed:function(t){return t.filter((function(t){return t.completed}))}};const f={data:function(){return{list:l.get()||[],visibility:"all",editId:null}},created:function(){var t=this;a=this.list.length&&this.list[0].id,function(t){window.addEventListener("hashchange",(function(){window.location.hash&&(t.visibility=window.location.hash.slice(1)||"all")}))}(this),e.$on("addTodo",(function(e){t.list.unshift({id:++a,completed:!1,text:e})})),e.$on("removeTodo",(function(e){var o=t.list.indexOf(e);t.list.splice(o,1)})),e.$on("completedTodo",(function(e){var o=e.id,n=e.completed;t.list.find((function(t){return t.id===o})).completed=n})),e.$on("changeTodo",(function(e){var o=e.id,n=e.text;t.list.find((function(t){return t.id===o})).text=n})),e.$on("toggleAll",(function(e){t.list.forEach((function(t){t.completed=e}))})),e.$on("clearCompleted",(function(){t.list=u.active(t.list)})),e.$on("editTodo",(function(e){t.editId=e})),e.$on("doneEditTodo",(function(){t.editId=null}))},watch:{list:{deep:!0,handler:l.save}},computed:{filteredTodos:function(){return u[this.visibility](this.list)},remainingCount:function(){return u.active(this.list).length},completedCount:function(){return u.completed(this.list).length},allDone:{get:function(){return 0===this.remainingCount},set:function(t){e.$emit("toggleAll",t)}}},render:function(e){var o=this;return e("div",{attrs:{id:"app"}},[e("section",{attrs:{class:"todoapp"}},[e(n),e("div",{attrs:{class:"main"}},[e(i,{props:{checked:this.allDone},attrs:{id:"toggle-all",class:"toggle-all"},on:{change:function(t){o.allDone=t.target.checked}}}),e("label",{attrs:{for:"toggle-all"}},"Mark all as complete"),e(r,{props:{list:this.filteredTodos,editId:this.editId}}),e(c,{props:{remainingCount:this.remainingCount,visibility:this.visibility,completedCount:this.completedCount},style:{display:this.list.length?"":"none"}})])]),e(t)])}};new Vue({render:function(t){return t(f)}}).$mount("#app")})();