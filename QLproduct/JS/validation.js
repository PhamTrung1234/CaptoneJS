function Validation(){
    this.vali =function(id,value,spam){
        if(!value){
           getId(id).innerHTML =spam;
           return true
        }else{
            return false
        }
    }
    this.valinumber = function(id,value,spam){
        const numless =  /^[0-9]+$/
        const val = value.indexOf(numless) 
        
    }
}