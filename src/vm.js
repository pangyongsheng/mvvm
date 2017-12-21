/*
 * 构造viewModel实例  Create BY pangys@170809
 * 初始化、数据、方法
 */
function viewModel(options){
    this._init(options);                            //creat 
}
/*
 * 初始化函数
 */
viewModel.prototype._init=function(options){

    this.$options=options;                          //实例配置
    this.$ele=document.querySelector(options.el);   //DOM根节点
    this.$data=options.data;                        //数据域
    this.$methods=options.methods;                  //方法域
    this.$create=options.create;                    //业务逻辑块

    //this.$ele.style.visibility="hidden";          //隐藏

    //data扩展$get和$set方法
    //directive中获取属性值
    this.$data.$get=function(path){
        var getter=new Function('return this.'+path);
        return getter.call(this);
    }
    this.$data.$set=function(path,val){
        var setter=new Function('newVal','this.'+path+' = newVal;');
        setter.call(this,val);
    }
   
    if(this.$create) this._create();

}

/*
 * 处理data
 *  -添加bindings域
 *  -添加数据监测 convert
 */

viewModel.prototype._eachData=function(obj,path){
    var OBJ=0,VAL=1;                        //传参数据类型
    path=path||'';                          //节点路径
    var value;

    for (var key in obj){
        if(obj.hasOwnProperty(key)){
            this._binding[path+key]={       //创建对应_binding节点
                _directive:[]
            }
            value=obj[key];
            //console.log(this._binding);
            //如果属性值为对象 
            if(typeof value === 'object'){
                this.convert(obj,key,value,path+key,OBJ);   //当前节点covert
                this._eachData(value,path+key+'.');         //子节点递归
            }
            //非对象
            else{
                this.convert(obj,key,value,path+key,VAL); 
            }
        }
    }
}
/*
 * 方法处理
 */
viewModel.prototype._eachFunc=function(attrVal){
    var args=/\(.*\)/.exec(attrVal);                    //截取方法传参字段
    var regB=/^{{/;
    var regC=/\[/;
    var _this=this;
    if(args){   //有传参
        args=args[0];                                   //获取方法传参字符串     
        attrVal=attrVal.replace(args,"");               //获取方法名称（去除传参）
        args=args.replace(/[\(\)\'\"]/g,'').split(","); //转化为数组形式
        args.forEach(function(v,k){
            if(regB.test(v)){
                var x=v.replace('{{','').replace('}}','');
                if(regC.test(x)){
                    
                }else{
                    
                    args[k]=_this.$data[x];
                }
            }
        })
        //console.log(args);
    }else{
        args=[];
    }
    
    return this.$methods[attrVal].bind(this.$data,args);
}

viewModel.prototype._create=function(){
    var _this=this;
    return this.$create.bind(this.$data)(function(){       //this指向data
        _this._binding={};                                 //dom配置数据域
        if(_this.$data) _this._eachData(_this.$data);      //为data添加监控（convert)
        if(_this.$ele) _this._compile(_this.$ele);         //dom-编译
    });            
}