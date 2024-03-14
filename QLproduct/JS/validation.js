function Validation(){
    this.vali =function(id,value,spam){
        if(value===""){
           getId(id).innerHTML =spam;
           getId(id).style.display = "block"
           return false
        }else{
            getId(id).style.display = ""
            return true
        }
    }
    this.valinumber = function(id,value,spam){
        const numless =  /^[0-9]+$/
       if(value.match(numless)){
        getId(id).style.display = ""
        return true
       }else{
        getId(id).innerHTML = spam;
        getId(id).style.display = "block"
        return false
       }
        
    }
    this.valiimg = (id,str,spam)=>{
        let regex = new RegExp(/[^\s]+(.*?).(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/);
        if (regex.test(str)) {
            getId(id).style.display = ""
            return true;
            
        }
        else {
            getId(id).innerHTML =spam;
            getId(id).style.display = "block"
            return false;
        }
    }
}