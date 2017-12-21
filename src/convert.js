/*
 *  数据绑定方法 Create BY pangys@170809
 *  @param obj      {object} 数据对象
 *  @param key      {string} 当前成员属性名称
 *  @param val      {string} 成员属性的值
 *  @param absolute {string} 原始成员属性路径
 *  @param type     {number} 成员属性类型，0为对象，1为基本数据
 */
 
viewModel.prototype.convert=function(obj,key,val,absolute,type){
    var binding=this._binding[absolute];

    if(type===1){                           //非对象数据
        Object.defineProperty(obj,key,{
            get:function(){
                //console.log(`获取${val}`);
                return val;
            },
            set:function(newVal){
                //console.log(`更新${newVal}`);
                if(val!=newVal){
                    val=newVal;
                    //console.log(binding);
                    try{
                        binding._directive.forEach(function(item){
                            item.updata();
                        })
                    }catch(e){

                    }
                    
                }
            }
        })
    }

    else{                                   //对象
        var subObj=obj[key]  || {};

        // 绑定每个子对象
        Object.defineProperty(obj,key,{
            get:function(){
                //console.log(`获取${subObj}`);
                return subObj;
            },
            set:function(newVal){
                //console.log(`更新${newVal}`);
                if(typeof newVal==='object') {
                    //不能直接subObj=newVal,否则将无法触发已有属性的响应式更新
                    
                    // for (var kkey in newVal) {
                    //     subObj[kkey] = newVal[kkey]
                    // }
                    subObj=newVal;
                }
                else subObj=newVal;
                try{
                    binding._directives.forEach(function(item){
                        item.update();
                    })
                }catch(e){

                }
                
            }

        });
    }
    
}

