function ApiGH(){
    this.fesdata = ()=>{
        return axios({
            url:"https://65f56c20f54db27bc0231b88.mockapi.io/product",
            method:"GET"
        })
    }
    this.addproduct =(product)=>{
        return axios({
            url:"https://65f56c20f54db27bc0231b88.mockapi.io/product",
            method:"POST",
            data:product
        })
    }
    this.deletepro =(id)=>{
        return axios({
            url:"https://65f56c20f54db27bc0231b88.mockapi.io/product/" + id,
            method:"DELETE",
            
        })
    }
    this.updatapro = (pro)=>{
            return axios({
                url:"https://65f56c20f54db27bc0231b88.mockapi.io/product/" + pro.id,
                method:"PUT",
                data:pro
            })
    }
}