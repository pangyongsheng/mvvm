/*
 * 指令 Create BY pangys@170809
 * 根据dom数据更新页面
 */
 
function Directive(name,el,vm,exp,attr,param){

    //公共参数
    this.name=name;     //@指令名称
    this.el=el;         //@dom元素
    this.vm=vm;         //@vm对象
    this.exp=exp;       //@对应数据
    this.attr=attr;     //@绑定属性名(设置属性)
    //私有参数
    if(param)  this.param=param;
    
    this.updata();      //更新dom
}
/*
 * 更新dom
 */
Directive.prototype.updata=function(){      //设置dom
    //console.log(this.name);
    //设置attribute
    if(this.name=="attr"){
        var _this=this;
        this.el[this.attr]=this.vm.$data.$get(this.exp);
        this.el.setAttribute(_this.attr,_this.vm.$data.$get(this.exp));
        
    }
    //设置style
    else if(this.name=="style"){
        this.el.style[this.attr]=this.vm.$data.$get(this.exp);
    }
    //设置display(vm-show专用)
    //判断数据真假->设置display属性值 私有属性param.beforeDisplay 保存标签默认值
    else if(this.name=="show"){
        var isShow=this.vm.$data.$get(this.exp) ? this.param.beforeDisplay : "none";
        this.el.style.display=isShow;
    }
    //{{}}绑定
    //替换所有{{}}为指定数据
    else if(this.name=="Txt"){
        var dataTxt=this.vm.$data.$get(this.exp);
        var comTxt=this.param.beforeTxt.replace(/^{{(.+)}}$/,dataTxt);
        this.el.innerHTML=comTxt;
    }
    //v-for列表循环  
    //(获取节点内容为字符串，替换所有 x.为 list[x].c；创建标签，插入节点)
    else if(this.name=="vfor"){
        var _this=this;
        var cNode=this.el.cloneNode(true).innerHTML.toString();     
        var elParet=this.el.parentNode;
        var tagName=this.el.tagName;
        var nowObj=this.exp[0];
        //elParet.removeChild(this.el);
        this.vm.$data.$get(this.exp[2]).forEach(function(va,key,obj){
            var newNode= document.createElement(tagName);               //创建标签
            var regTxt=new RegExp(nowObj+".","g");                      //创建动态正则替换循环对象
            var cInner=cNode.replace(regTxt,_this.exp[2]+'['+key+'].'); 
            newNode.innerHTML=cInner;
            elParet.appendChild(newNode);
        })
        this.el.style.display="none";
        // setTimeout(function(){
        //     elParet.removeChild(_this.el);
        // },3000) 
    }
    //++updata end++
}

