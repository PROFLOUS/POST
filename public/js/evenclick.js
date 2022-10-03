import storage from '../util/storage.js';
// var isActive = false;
        var check = document.querySelectorAll('.check')
        var tempid =[];
        check.forEach(function(item,index){
            var wish= storage.get();
            wish.forEach(function(item){
                check[item.index].checked = true
            })
                if(item.checked){
                    var opTemp={
                        id:item.id,
                        index:index
                    }
                    tempid.push(opTemp)
                    storage.set(tempid)
                }
        })
        check.forEach(function(item,index){
            item.addEventListener('click',function(e){
                if(item.checked){
                    var opTemp={
                        id:item.id,
                        index:index
                    }
                    tempid.push(opTemp)
                    storage.set(tempid)
                }else{
                    tempid.forEach(function(item,index){
                        if(item.id==e.target.id){
                            tempid.splice(index,1)
                        }
                    })
                    storage.set(tempid)
                }
            })
        })
        
        var wish = document.querySelectorAll('.wish')
        wish.forEach(function(item){
            item.addEventListener('click',function(e){
                // isActive=!isActive;
                // item.classList.toggle("active",isActive);
                // console.log(isActive)
                // if(isActive){
                // }
                // console.log(e.target.id)
            }
            
            )
            
        }
        )



