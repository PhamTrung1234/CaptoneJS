const apigh = new ApiGH();










function HienThiGH(gh) {
    content="";
    gh.forEach(function(item){
        let price = item.price * Number(item.quantity)
        
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
      <span>${item.price}</span>
      <input type="number" value="${item.quantity}">
      <span>${price}</span>
      <button onclick="deletesp(${item.id})" class="btn">Xóa</button>
      </div>
      `
    });
    
    document.getElementById("giohang").innerHTML=content;
}
function deletesp(id){
    console.log(id)
    apigh.deletepro(id)
      .then((win)=>{
        getlistitem();
      })
}

function getlistitem(){
    apigh.fesdata()
      .then((win)=>{
        console.log()
        if(win.data.length === 0){
            document.querySelector('.cart__slogan').style.display = "block"
            document.querySelector('.cart__product').style.display = "none"
        }else{
            document.querySelector('.cart__slogan').style.display = "none"
            document.querySelector('.cart__product').style.display = "block"
            console.log(win.data)
       HienThiGH(win.data)
        }
        
      })
}

getlistitem();





