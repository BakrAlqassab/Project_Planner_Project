(window.webpackJsonp=window.webpackJsonp||[]).push([[1],[,function(t,e,s){"use strict";s.r(e),s.d(e,"Tooltip",(function(){return o}));class o extends class{constructor(t,e=!1){this.hostElement=t?document.getElementById(t):document.body,this.insertBefore=e}detach(){this.element&&this.element.remove()}attach(){this.hostElement.insertAdjacentElement(this.insertBefore?"afterbegin":"beforeend",this.element)}}{constructor(t,e,s){super(s),this.closeNotifier=t,this.text=e,this.closedTooltip=()=>{this.detach(),this.closeNotifier()},this.create()}create(){const t=document.createElement("div");t.className="card";const e=document.getElementById("tooltip"),s=document.importNode(e.content,!0);s.querySelector("p").textContent=this.text,t.append(s),console.log(this.hostElement.getBoundingClientRect());const o=this.hostElement.offsetLeft,n=(this.hostElement.offsetRight,o+20),i=this.hostElement.offsetTop+this.hostElement.offsetHeight-this.hostElement.parentElement.scrollTop-10;t.style.position="absolute",t.style.left=n+"px",t.style.top=i+"px",t.addEventListener("click",this.closedTooltip),this.element=t}}}]]);