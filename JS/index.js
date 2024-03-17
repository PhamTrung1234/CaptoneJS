// hien thi san pham
const apiindex = new ApiIndex();
const dsdt = new DSPHONE();
const dsgh = new DSGH();

function getListProduct() {
  //pending => show loader
  document.getElementById("loader").style.display = "block";
  const promise = apiindex.fecthData();

  promise
    .then(function (result) {
      // success => hide loader
      document.getElementById("loader").style.display = "none";
      renderUIindex(result.data);
    })
    .catch(function (error) {
      document.getElementById("loader").style.display = "none";
      console.log(error);
    });
}

getListProduct();

function renderUIindex(data) {
  let content = "";
  // for(let i=0; i<data.length; i++){
  //     const product=data[i];
  //     content += ``;
  // }
  data.forEach(function (product) {
    content += `
        <div class="col-9 col-md-4  col-lg-2 product__item">
                <div class="product--item">
                  <a href="#">
                    <div class="product__img">
                      <img class="img-fluid" src="./img/${product.image}" alt="...">
                    <span class="product__giamgia">-5%</span>
                    </div>
                    <h3 class="mt-2">${product.phonename}</h3>
                    <p class="d-flex justify-content-between align-items-center">
                      <span>${product.phoneprice}</span>
                      <span>-5%</span>
                    </p>
                    <p class="d-flex justify-content-between align-items-center">
                      <span>màn hình </span>
                      <span>${product.screen}</span>
                    </p>
                    <p class="d-flex justify-content-between align-items-center">
                      <span>camera trước</span>
                      <span>${product.fontcamera}</span>
                    </p>
                    <p class="d-flex justify-content-between align-items-center">
                      <span>camera sau</span>
                      <span>${product.fontcamera}</span>
                    </p>
                    <p class="d-flex justify-content-between align-items-center">
                      <span>So luong</span>
                      <span>${product.Quantity}</span>
                    </p>
                    <div class="product__button mt-2 d-flex justify-content-between align-items-center">
                      <div class="product__icon">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                      </div>
                      <div class="product__buy">
                        <button onclick="ThemGH(${product.id})"><i class="fa-solid fa-cart-shopping"></i><span>buy now</span></button>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
        `;
    dsdt.ThemPhone(product);
  });
  document.getElementById("phone_content_main").innerHTML = content;
}

function hienthidsPhone(arrdt) {
  let content = "";
  arrdt.forEach(function (product) {
    content += ` <div class="col-9 col-md-4  col-lg-2 product__item">
        <div class="product--item">
          <a href="#">
            <div class="product__img">
              <img class="img-fluid" src="./img/${product.image}" alt="...">
            <span class="product__giamgia">-5%</span>
            </div>
            <h3 class="mt-2">${product.phonename}</h3>
            <p class="d-flex justify-content-between align-items-center">
              <span>${product.phoneprice}</span>
              <span>-5%</span>
            </p>
            <p class="d-flex justify-content-between align-items-center">
              <span>màn hình </span>
              <span>${product.screen}</span>
            </p>
            <p class="d-flex justify-content-between align-items-center">
              <span>camera trước</span>
              <span>${product.fontcamera}</span>
            </p>
            <p class="d-flex justify-content-between align-items-center">
              <span>camera sau</span>
              <span>${product.fontcamera}</span>
            </p>
            <p class="d-flex justify-content-between align-items-center">
              <span>So luong</span>
              <span>${product.Quantity}</span>
            </p>
            <div class="product__button mt-2 d-flex justify-content-between align-items-center">
              <div class="product__icon">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-regular fa-star"></i>
              </div>
              <div class="product__buy">
                <button onclick="ThemGH(${product.id})><i class="fa-solid fa-cart-shopping"></i><span>buy now</span></button>
              </div>
            </div>
          </a>
        </div>
      </div>`;
  });
  document.getElementById("phone_content_main").innerHTML = content;
}

function findPhone(type) {
  const mangtimkiem = dsdt.timdienthoaitheoloai(type);
  if (mangtimkiem == null || mangtimkiem.length == 0) {
    console.log("array is empty");
  } else {
    hienthidsPhone(mangtimkiem);
  }
}

//them gio hang
const apigiohang = new ApiGH();
function ThemGH(id) {
  
  dsdt.arr.forEach(function (item) {
    if (item.id == id) {
      let newCartItem = new Cartitem(
        item.id,
        item.phonename,
        item.phoneprice,
        item.image,
        1
      );
      console.log(newCartItem.name)
     apigiohang.fesdata()
        .then((win)=>{
          return win.data;
        })
        .then((data)=>{
          
          let found =false
          for(let i=0;i<data.length;i++){
              if(data[i].name == newCartItem.name){
                found = true;
                data[i].quantity = Number(data[i].quantity) + 1;
                
                apigiohang.updatapro(data[i])
                .then(()=>{})
              }
          }
          if(!found){
            apigiohang.addproduct(newCartItem)
              .then(()=>{})
          }


      
        })
     

      
    }
  });
}
