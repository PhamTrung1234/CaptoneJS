
function sapxepxuong (arr){
    for(let i= 0;i<arr.length-1;i++){
        for(let j=i+1;j<arr.length;j++){
            if(Number(arr[i].phoneprice)<Number(arr[j].phoneprice)){
                let temp = arr[i];
                arr[i]= arr[j];
                arr[j]=temp
            }
        }
    }
    return arr
}
function sapxeplen (arr){
    for(let i= 0;i<arr.length-1;i++){
        for(let j=i+1;j<arr.length;j++){
            if(Number(arr[i].phoneprice)>Number(arr[j].phoneprice)){
                let temp = arr[i];
                arr[i]= arr[j];
                arr[j]=temp
            }
        }
    }
    return arr
}
