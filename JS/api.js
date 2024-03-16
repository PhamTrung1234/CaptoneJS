function Api(){
    this.fesdata = function(){
        return axios({
            url:"https://65dd7887e7edadead7ee0039.mockapi.io/api/Phone",
            method:"GET"
        })
    }
    this.addphone = function(phone){
        return axios({
            url:"https://65dd7887e7edadead7ee0039.mockapi.io/api/Phone",
            method:"POST",
            data:phone
        })
    }
    this.deletephone = function(id){
        return axios({
            url:"https://65dd7887e7edadead7ee0039.mockapi.io/api/Phone/" + id,
            method:"DELETE",
        })
    }
    this.editphone = function(id){
        return axios({
            url:"https://65dd7887e7edadead7ee0039.mockapi.io/api/Phone/" + id,
            method:"GET"
        })
    }
    this.updatephone = function(phone){
        return axios({
            url:"https://65dd7887e7edadead7ee0039.mockapi.io/api/Phone/" + phone.id,
            method:"PUT",
            data:phone
        })
    }

}