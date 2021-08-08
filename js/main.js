// Mỗi lần web load thì chạy các function
window.addEventListener('load', fetchdatamenu);
window.addEventListener('load', displayHash);

// Fetch API Data Menu
function fetchdatamenu(){
    fetch('https://api.airtable.com/v0/appJuih6tuaTappGZ/menu?sort%5B0%5D%5Bfield%5D=id&sort%5B0%5D%5Bdirection%5D=asc&api_key=keySoD6lDEycOXqdZ').then(function(response) {
        data = response.json();
        return data;
    })
    .then(function(data) {
        addmenu(data)
        });
}

function addmenu(data) {
    let menu = data.records;
    for (i = 0; i < menu.length; i++ ) {
        document.getElementById('menu-items').innerHTML += "<li><a href=" + menu[i].fields.menuUrl + ">" + menu[i].fields.menuTitle + "</a></li>"
    }
}

//Function check xem # trên URL nó là gì thì sẽ insert phần HTML có id giống tên nó mà đang hide trên trang.

function displayHash() {
    let theHash = window.location.hash;
    if (theHash.length == 0) { theHash = "#home"; }
    let pagecontentload = document.getElementById("main-body-display");
    pagecontentload.innerHTML = document.getElementById(theHash).innerHTML;

    if (theHash == "#products") {fetchdataproduct()}
  }

  // Mỗi lần # trên URL thay đổi thì chạy lại lệnh displayHash
window.addEventListener("hashchange", function() {
    console.log("hashchange event");
    displayHash();
  });


// Fetch API Data Products
function fetchdataproduct(){
    fetch('https://api.npoint.io/2415f0e6c0284935cc16/product/').then(function(response) {
        productdata = response.json();
        return productdata;
    })
    .then(function(productdata) {
        addsanpham(productdata)
        });
}
// Function hiện Sản phẩm

function addsanpham(productdata) {
    let sanpham = productdata;
    for (i = 0; i< sanpham.length; i++) {       
        if (sanpham[i].active == true) {
        document.getElementById('product-name').innerHTML += "<div id='product-detail'>" + "<img class='product-image' src=" + sanpham[i].image + ">" + "<div class='product-title'>" + sanpham[i].name + "</div>" + "<div class='product-description'>" + sanpham[i].description + "</div>" + "<br>" + "<div id='data-package-" + sanpham[i].id +  "' ></div>" + "<div id='data-options-" + sanpham[i].id + "'></div>" + "<button class='product-button'> Buy Now </button>" + "</div>";   
        
        // let goicuoc = sanpham[i].fields;
        //for (j = 0; j < goicuoc['Name (from dataOption)'].length; j++) {
        //    let dataoptions = 'data-options-' + sanpham[i].id; 
        //    document.getElementById(dataoptions).innerHTML += goicuoc['Name (from dataOption)'] + " / " + goicuoc['Price (from dataOption)'];
        //}  

        }
        
    }
    }
function checklogin() {
    let uid = document.getElementById('username').value;
    let upw = document.getElementById('password').value;

    if (uid == "admin" && upw == "admin") {
        alert('Welcome Admin');
        document.getElementById('top-bar-buttons').innerHTML = "<a href='/admin.html'><button>ADMIN</button></a>"
        window.open('/admin.html');
    }
    else {
        alert('You are not admin')
    }
}

function nosubmit(event){
    event.preventDefault();
}