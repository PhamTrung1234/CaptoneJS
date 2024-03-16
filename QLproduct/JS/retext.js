function retext(text){
    let newText = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    newText = newText.replace(/\s/g, "");
    return newText
}


function searchpro(key){
    let sanpham = [];
    dssp.forEach((pro)=>{
        let keyword = retext(key).toLowerCase();
        let keyup = retext(pro.phonename).toLowerCase();
        if(keyup.indexOf(keyword)!= -1){
            sanpham.push(pro)
        }
    })
    return sanpham
}