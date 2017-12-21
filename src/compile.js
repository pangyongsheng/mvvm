/*
 * 编译dom节点   Create BY pangys@170809
 */
viewModel.prototype._compile=function(root){
    var _this=this;
    //@获取根节点下全部节点
    var nodes=root.children;
    //@正则表达式
    var regText=/^{{[^<.+>](.+)}}$/;    //{{}}模板编译-过滤有花括号的内容
    var regTxt=/^{{(.+)}}$/;            //{{}}模板编译-提取花括号内内容
    var regFor=/\s+/;                   //非空字符串分割
    var regCss=/\:/;
    //++遍历节点
    for(var i=0;i<nodes.length;i++){

        var node=nodes[i];
        //console.log(nodes[1]);
        //@vm-for
        if(node.hasAttribute("vm-for")){
            if(node.style.display!="none"){//第一次编译
                var attrVals=node.getAttribute("vm-for").split(regFor);
                var attrVal=attrVals[2];
                _this._binding[attrVal]._directive.push(
                    new Directive("vfor",node,_this,attrVals,""));
            }else{//重新编译
                node.style.display="block";
                var f=node.parentNode;
                var childs = f.children; 
                for(var i = childs.length - 1; i > 0; i--) {
                    if(childs[i].hasAttribute("vm-for"))break;
                    f.removeChild(childs[i]); 
                }
                var attrVals=node.getAttribute("vm-for").split(regFor);
                var attrVal=attrVals[2];
                _this._binding[attrVal]._directive.push(
                    new Directive("vfor",node,_this,attrVals,""));
            }
        }

        //++递归dom节点
        if(node.children.length){       
            this._compile(node);
        }
        
        //@vm-click
        if(node.hasAttribute('vm-click')){
            node.onclick=(function(){
                //console.log(node);
                var attrVal=node.getAttribute("vm-click");
                return _this._eachFunc(attrVal);
            })()
        }

        //@vm-model
        if(node.hasAttribute('vm-model')){
            //console.log(node);
            node.addEventListener('input',(function(key){
                    //console.log(key);
                    var attrVal=node.getAttribute("vm-model");
                    _this._binding[attrVal]._directive.push(
                        new Directive("attr",node,_this,attrVal,"value"))
                    return function(){
                        _this.$data[attrVal]=nodes[key].value;
                    }
                })(i)
            )
        }

        //@vm-bind
        if(node.hasAttribute("vm-bind")){
            //console.log(node);
            var attrVal=node.getAttribute("vm-bind");
            var attrVals=attrVal.split(regCss);
            //console.log(attrVal);
            if(attrVals.length<=1){         //text绑定
                _this._binding[attrVal]._directive.push(
                new Directive("attr",node,_this,attrVal,"innerHTML"));
            }
            else{                           //style绑定
                _this._binding[attrVals[1]]._directive.push(
                new Directive("style",node,_this,attrVals[1],attrVals[0]));
            }
            
        }

        //@vm-{{}}
        if(regText.test(node.innerHTML.toString())){
            var innerTxt=node.innerHTML.toString();
            //console.log(node);
            var attrVal=regTxt.exec(innerTxt)[1];
            //兼容数组写法
            var attrValA=attrVal.replace('[','.').replace(']','');
            var parame={
                beforeTxt:innerTxt
            }
            try{    //防止与vm-for冲突
                _this._binding[attrValA]._directive.push(
                    new Directive("Txt",node,_this,attrVal,"innerHTML",parame));
            }catch(e){

            }
        }

        //@vm-show
        if(node.hasAttribute("vm-show")){
            var attrVal=node.getAttribute("vm-show").replace('{{','').replace('}}','');
            var attrValA=attrVal.replace('[','.').replace(']','');
            var beforeDpy=getComputedStyle(node)["display"];    //获取默认css样式
            var parame={                                         //私有参数
                beforeDisplay:beforeDpy
            }
            try{
                _this._binding[attrValA]._directive.push(
                new Directive("show",node,_this,attrVal,"",parame));
            }catch(e){
                
            }
            
        }

        //@vm-src   ->  (可使用attr)
        if(node.hasAttribute("vm-src")){
            var attrVal=node.getAttribute("vm-src").replace('{{','').replace('}}','');
            var attrValA=attrVal.replace('[','.').replace(']','');

            try{
                _this._binding[attrValA]._directive.push(
                    new Directive("attr",node,_this,attrVal,"src"));
            }catch(e){

            }
            
        }

        //@vm-attr vm-attr="color:{{}}""
        if(node.hasAttribute("vm-attr")){
            var attrVal=node.getAttribute("vm-attr");
            var attrValA=attrVal.split(regCss);
            var attrValC=attrValA[1].replace('{{','').replace('}}','');
            var attrValNode=attrValC.replace('[','.').replace(']','');

            try{
                _this._binding[attrValNode]._directive.push(
                    new Directive("attr",node,_this,attrValC,attrValA[0]));
                //console.log("---------")
            }catch(e){

            }
            
        }

    }
    this.$ele.style.visibility="visible";
}