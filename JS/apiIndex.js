function ApiIndex() {
    this.fecthData=function () {
        const promise = axios({
             url: "https://65dd7887e7edadead7ee0039.mockapi.io/api/Phone",
             method: "GET",
         })
       return  promise;
     };
}