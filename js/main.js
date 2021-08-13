// Mỗi lần web load thì chạy các function
window.addEventListener('load', fetchdatamenu);
window.addEventListener('load', displayHash);

// Fetch API Data Menu
function fetchdatamenu(){
    let myHeaders = new Headers();
    myHeaders.append('x-apikey', '610fb14469fac573b50a5331');
    fetch('https://gohub-b49c.restdb.io/rest/menu', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'x-apikey': '610fb14469fac573b50a5331'
        }
    }).then(function(response) {
        data = response.json();
        return data;
    })
    .then(function(data) {
        addmenu(data)
        });
}

function addmenu(data) {
    let menu = data;
    for (i = 0; i < menu.length; i++ ) {
        document.getElementById('menu-items').innerHTML += "<li><a href=" + menu[i].menuUrl + ">" + menu[i].menuTitle + "</a></li>"
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
    fetch('https://gohub-b49c.restdb.io/rest/product', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'x-apikey': '3d05b2dcad1a8586d19bc0f2f303e5061387d'
        }
    }).then(function(response) {
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
    document.getElementById('product-name').innerHTML = ""
    for (i = 0; i< sanpham.length; i++) {       
        if (sanpham[i].active == true) {
        document.getElementById('product-name').innerHTML += "<div id='product-detail'>" + "<img class='product-image' src=" + sanpham[i].imageurl + ">" + "<div class='product-title'>" + sanpham[i].name + "</div>" + "<div class='product-description'>" + sanpham[i].description + "</div>" + "<br>" + "<span class='tag'>" + sanpham[i].price + " $ / month </span>" + "<button class='product-button snipcart-add-item' data-item-id=" + sanpham[i].id + " data-item-price=" + sanpham[i].price + " data-item-description=" + "'" + sanpham[i].description + "'" + " data-item-url='https://saigonsouvenir.com/rest/product/" + sanpham[i]._id + "?apikey=610fb14469fac573b50a5331' data-item-name='" + sanpham[i].name + "'> Add to cart </button>"

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