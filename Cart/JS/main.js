const apigh = new ApiGH();

getlistitem();


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
      <div class="quantity-selector">
        <button class="quantity-selector__button minus">-</button>
        <input class="quantity-selector__input" type="text" value="${item.quantity}">
        <button class="quantity-selector__button plus">+</button>
      </div>
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
            setlocal(win.data);
       HienThiGH(win.data)
        }
        
      })
}
// =========lưu local================
function setlocal(data) {
  const arrstring = data;
  const arrJson = JSON.stringify(arrstring);
  localStorage.setItem("phonesave", arrJson);
}
// ========= lấy dữ liệu từ local ===
function getlocal() {
  if (!localStorage.getItem("phonesave")) return;
  const arrJson = localStorage.getItem("phonesave");
  const arrstring = JSON.parse(arrJson);
  HienThiGH(arrstring);
}






