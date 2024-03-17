const apigh = new ApiGH();

// getlistitem();
function getId(id){
    return document.getElementById(id)
}

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
      <span class="cart__price">${item.price}</span>
      <div class="cart__quantity d-flex justify-content-center">
        <button onclick="down(${item.id})" style="width:40px"  class="btn border text-center"><i class="fa-solid fa-angles-left"></i></button>
        <input style="width:40px; margin:0 3px" class="text-center border-0" type="text" value="${item.quantity}">
        <button onclick="uppro(${item.id})" style="width:40px" class="btn border text-center"><i class="fa-solid fa-angles-right"></i></button>
      </div>
      <span>${price}</span>
      <button onclick="deletesp(${item.id})" class="btn">Xóa</button>
      </div>
      `
    });
    
    document.getElementById("giohang").innerHTML=content;
}
function deletesp(id){
   
    apigh.deletepro(id)
      .then((win)=>{
        getlistitem();
      })
}

function getlistitem(){
    getId('loader1').style.display = "block"
    document.querySelector('.cart__product').style.display = "none"
    apigh.fesdata()
      .then((win)=>{
        
       
        if(win.data.length === 0){
            getId('loader1').style.display = "none"
            document.querySelector('.cart__slogan').style.display = "block"
            document.querySelector('.cart__product').style.display = "none"
        }else{
            getId('loader1').style.display = "none"
            document.querySelector('.cart__slogan').style.display = "none"
            document.querySelector('.cart__product').style.display = "block"
           
            // setlocal(win.data);
             HienThiGH(win.data)
        }
        
      })
}
getlistitem();



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



