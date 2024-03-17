const apigh = new ApiGH();

getlistitem();
function getId(id){
    return document.getElementById(id)
}
// =============== hiển thị sản phẩm =========
function HienThiGH(gh) {
    content="";
    total = 0;
    gh.forEach(function(item){
        let price = item.price * Number(item.quantity)
        total += price;
        let priceformat=item.price*1;
        content+=`
        <div class="cart__item d-flex align-items-center">
        <a href="#">
        <div class="row">
          <div class="col-3">
            <img class="img-fluid" src="../img/${item.image}" alt="...">
          </div>
          <div class="col-9">
             <p>${item.name}</p>
          </div>
        </div>
      </a>
      <div class="cart__clear"></div>
      <span class="cart__price">${priceformat.toLocaleString('en-US')} VNĐ</span>
      <div class="cart__quantity d-flex justify-content-center">
        <button onclick="down(${item.id})" style="width:40px"  class="btn border text-center"><i class="fa-solid fa-angles-left"></i></button>
        <input style="width:40px; margin:0 3px" class="text-center border-0" type="text" value="${item.quantity}">
        <button onclick="uppro(${item.id})" style="width:40px" class="btn border text-center"><i class="fa-solid fa-angles-right"></i></button>
      </div>
      <span>${price.toLocaleString('en-US')} VNĐ</span>
      <button onclick="deletesp(${item.id})" class="btn btn__xoa">Xóa</button>
      </div>
      `
    });
    
    document.getElementById("giohang").innerHTML=content;

    var formattedTotal = total.toLocaleString('en-US'); // Định dạng số với dấu chấm (hoặc dấu phẩy) hàng nghìn
    getId('texttotal').innerHTML = formattedTotal+" VNĐ";
}
// ============= xóa sản phẩm ================
function deletesp(id){
   
    apigh.deletepro(id)
      .then((win)=>{
        getlistitem();
      })
}
// ============ lấy dữ liệu từ api ===========
function getlistitem(){
     document.querySelector('.cart__thanhtoan').style.display = "none"
    getId('loader1').style.display = "block"
    document.querySelector('.cart__product').style.display = "none"
   
    apigh.fesdata()
      .then((win)=>{
        
       
        if(win.data.length === 0){
            getId('loader1').style.display = "none"
            document.querySelector('.cart__slogan').style.display = "block"
            document.querySelector('.cart__product').style.display = "none"
            document.querySelector('.cart__thanhtoan').style.display = "none"
        }else{
            getId('loader1').style.display = "none"
            document.querySelector('.cart__slogan').style.display = "none"
            document.querySelector('.cart__product').style.display = "block"
            document.querySelector('.cart__thanhtoan').style.display = "block"
            // setlocal(win.data);
             HienThiGH(win.data)
        }
        
      })
}



// ============= tăng quantity ================
function uppro(id){
   
   apigh.fesdata()
      .then((win)=>{
        
        let arr =[]
        for(let i=0;i<win.data.length;i++){
          if(Number(win.data[i].id) === Number(id)){
            arr = win.data[i]
          }
        }
        arr.quantity =Number(arr.quantity) + 1
        apigh.updatapro(arr)
           .then(()=>{
            getlistitem();
           })
      })
}
// ========= giảm quantity ====================
function down(id){
  
  apigh.fesdata()
  .then((win)=>{
    
    let arr =[]
    for(let i=0;i<win.data.length;i++){
      if(Number(win.data[i].id) === Number(id)){
        arr = win.data[i]
      }
    }
    arr.quantity =Number(arr.quantity) - 1
    console.log(arr.quantity)
    if(Number(arr.quantity)===0){
      apigh.deletepro(id)
         .then(()=>{
          getlistitem()
         })
    }else{
      apigh.updatapro(arr)
      .then(()=>{
       getlistitem();
      })
    }
    
  })
}
// ===== thanh toán ============================
function deleteapi(){
  
  let arr = document.querySelectorAll(".btn__xoa")
 arr.forEach(pro=>{
  pro.click();
 })
 
}


 
  
