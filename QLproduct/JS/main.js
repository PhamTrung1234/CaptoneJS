const api = new Api();
let dssp = [];
const validation = new Validation();
//==========rút gọn code ============
function getId(id) {
  return document.getElementById(id);
}
//===================================

//==hiển thì trang quản trị =========
function renderUI(data) {
  let content = "";
  for (let i = 0; i < data.length; i++) {
    let sp = data[i];
    content += `
        <tr>
        <td>${i + 1}</td>
        <td>${sp.phonename}</td>
        <td>${sp.phoneprice}</td>
        <td><img width="50" src="../img/${sp.image}" alt="..."></td>
        <td>${sp.desc}</td>
        <td>
        <button onclick="xoaproduct(${
          sp.id
        })" class="btn btn-danger">Xóa</button>
        <button onclick="editproduct(${
          sp.id
        })" class="btn btn-primary" data-toggle="modal" data-target="#myModal">Sửa</button>
        </td>
        </tr>
        `;
  }
  getId("tblDanhSachSP").innerHTML = content;
}

// ========== xóa sản phẩm ==========
function xoaproduct(id) {
  api.deletephone(id).then(() => {
    getlistphone();
   
  });
}

// ========= sửa sản phẩm ===========
function editproduct(id) {
  api.editphone(id).then((win) => {
    document.querySelector(".modal-title").innerHTML = "Edit Product";
    getId("suasp").style.display = "block";
    getId("themsp").style.display = "none";
    getId("TenSP").value = win.data.phonename;
    getId("GiaSP").value = win.data.phoneprice;
    getId("screen").value = win.data.screen;
    getId("backcam").value = win.data.backcamera;
    getId("fontcam").value = win.data.fontcamera;
    getId("HinhSP").value = win.data.image;
    getId("MoTa").value = win.data.desc;
    getId("inptype").value = win.data.type;
  });

  document.querySelector(".modal-footer").innerHTML = `
  <button id="suasp" onclick="updateproduct(${id})" class="btn btn-success">Cập Nhật</button>
  `;
}

// ======= cập nhật sản phẩm ========
function updateproduct(id) {
  const name = getId("TenSP").value;
  const price = getId("GiaSP").value;
  const screen = getId("screen").value;
  const back = getId("backcam").value;
  const font = getId("fontcam").value;
  const img = getId("HinhSP").value;
  const desr = getId("MoTa").value;
  const type = getId("inptype").value;
  const sp = new Product(
    id,
    name,
    price,
    screen,
    back,
    font,
    img,
    desr,
    type,
    ""
  );
  
  api.updatephone(sp).then((win) => {
    getlistphone();
    setlocal();
    document.getElementsByClassName("close")[0].click();
  });
}

// ======== thêm sản phẩm ===========

getId("themsp").onclick = function () {
  const name = getId("TenSP").value;
  const price = getId("GiaSP").value;
  const screen = getId("screen").value;
  const back = getId("backcam").value;
  const font = getId("fontcam").value;
  const img = getId("HinhSP").value;
  const desr = getId("MoTa").value;
  const type = getId("inptype").value;
  
  let isvalid = true;
  isvalid &= validation.vali("tbname",name,"(*)hãy nhập tên sản phẩm")
  isvalid &= validation.vali("tbprice",price,"(*)hãy nhập giá sản phẩm")&&
  validation.valinumber("tbprice",price,"(*)giá sản phẩm không đúng kiểu dữ liệu")
  isvalid &= validation.vali("tbsrceen",screen,"(*)vui lòng điền thông tin")&&
  validation.valinumber("tbsrceen",screen,"(*)không đúng kiểu dữ liệu")
  isvalid &= validation.vali("tbback",back,"(*)vui lòng điền thông tin")&&
  validation.valinumber("tbback",back,"(*)không đúng kiểu dữ liệu")
  isvalid &= validation.vali("tbfont",font,"(*)vui lòng điền thông tin")&&
  validation.valinumber("tbfont",font,"(*)không đúng kiểu dữ liệu")
  isvalid &= validation.vali("tbcamera",img,"(*)hãy điền dầy đủ thông tin")&&
  validation.valiimg('tbcamera',img,"(*)không đúng cú pháp ảnh")
  isvalid &= validation.vali('tbdesc',desr,"(*)mô tả sản phẩm")
  isvalid &= validation.vali('tbtype',type,"(*)hãy chọn loại sản phẩm")

  if(!isvalid) return null
  const sp = new Product(
    "",
    name,
    price,
    screen,
    back,
    font,
    img,
    desr,
    type,
    ""
  );
  api.addphone(sp).then(function (win) {
   
    console.log(win.data)
    document.getElementsByClassName("close")[0].click();
    getlistphone();
  });
};

// == lấy thông tin sản phẩm từ api =

function getlistphone() {
  api
    .fesdata()
    .then(function (win) {
      dssp = win.data;

      renderUI(win.data);
      
    })
    .catch();
}

// ==================================
getlistphone();


// ==== reset lại thông tin ==========
getId("btnThemSP").onclick = () => {
  document.querySelector(".modal-title").innerHTML = "Add Product";
  getId("themsp").style.display = "block";
  document.querySelector(".modal-footer").innerHTML = "";
  getId("TenSP").value = "";
  getId("GiaSP").value = "";
  getId("screen").value = "";
  getId("backcam").value = "";
  getId("fontcam").value = "";
  getId("HinhSP").value = "";
  getId("MoTa").value = "";
  getId("inptype").value = "";
};

// ===== sắp xếp sản phẩm theo giá ==
function mychange(){
  let sapxep = getId("sapxep1").value;
  if(sapxep === "uptodown"){
       renderUI(sapxepxuong(dssp))
  }else if(sapxep==="downtoup"){
       renderUI(sapxeplen(dssp))
  }else{
    getlistphone();
  }

}
//========= tìm sản phẩm ============

getId('searchpro').addEventListener("keyup",()=>{
  const keyup = getId('searchpro').value;
  let arr = searchpro(keyup);
  renderUI(arr);
})




