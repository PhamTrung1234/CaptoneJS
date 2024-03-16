function DSPHONE() {
    this.arr=[];

    this.ThemPhone=function (product) {
        this.arr.push(product);
    }

    //tim kiem dien thoai theo loai
    this.timdienthoaitheoloai=function(phonetype){
        let mangtimkiem = [];
        for(let i = 0;i<this.arr.length;i++){
            const product=this.arr[i];
            const phonetypeLowerCase=product.type.toLowerCase();
            const tenSearch=phonetype.toLowerCase();
            if(phonetypeLowerCase.indexOf(tenSearch)!==-1){
                 mangtimkiem.push(product);
               
            }
            
        }
        return mangtimkiem;
    }

   
}