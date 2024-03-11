const api = new Api();
let dssp = new DSProduct();

function getId(id){
    return document.getElementById(id)
}
getlocal();


function renderUI(data){
    let content = ""
    for(let i=0;i<data.length;i++){
        let sp = data[i];
        content += `
        <tr>
        <td>${i}</td>
        <td>${sp.phonename}</td>
        <td>${sp.phoneprice}</td>
        <td><img width="50" src="../img/${sp.image}" alt="..."></td>
        <td>${sp.desc}</td>
        <td>
        <button class="btn btn-danger">Xóa</button>
        <button class="btn btn-primary">Sửa</button>
        </td>
        </tr>
        `
    }
    getId("tblDanhSachSP").innerHTML = content;
}

function setlocal(data){
    const arrstring = data
    const arrJson = JSON.stringify(arrstring)
    localStorage.setItem("phone",arrJson)
}
function getlocal(){
    if(!localStorage.getItem("phone")) return;
    const arrJson =localStorage.getItem('phone');
    const arrstring =JSON.parse(arrJson)
    dssp =arrstring
    renderUI(arrstring);
}

getId('themsp').onclick = function(){
    const name = getId('TenSP').value;
    const price = getId('GiaSP').value;
    const screen =getId('screen').value;
    const back = getId('backcam').value;
    const font = getId('fontcam').value;
    const img = getId('HinhSP').value;
    const desr = getId('MoTa').value;
    const type = getId('inptype').value;
    const sp = new Product("",name,price,screen,back,font,img,desr,type,"")
    api.addphone(sp)
      .then(function(win){
        console.log(win.data)
        setlocal(win.data)
        document.getElementsByClassName('close')[0].click()
        getlistphone();
      })
}



function getlistphone(){
    api.fesdata()
      .then(function(win){
        dssp = win.data
       
        renderUI(win.data)
        setlocal(win.data)
      })
      .catch()
}
getlistphone();