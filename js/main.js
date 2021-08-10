// Mỗi lần web load thì chạy các function
window.addEventListener('load', fetchdatamenu);
window.addEventListener('load', displayHash);

// Fetch API Data Menu
function fetchdatamenu(){
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
    for (i = 0; i< sanpham.length; i++) {       
        if (sanpham[i].active == true) {
        document.getElementById('product-name').innerHTML += "<div id='product-detail'>" + "<img class='product-image' src=" + sanpham[i].imageurl + ">" + "<div class='product-title'>" + sanpham[i].name + "</div>" + "<div class='product-description'>" + sanpham[i].description + "</div>" + "<br>" + "<div class='data-button' id='data-package-" + sanpham[i]._id +  "' ></div>" + "<div id='data-options-" + sanpham[i].id + "'></div>" + "<button class='product-button'> Buy Now </button>" + "</div>";   
        
        let goicuoc = sanpham[i].data;
        for (j = 0; j < goicuoc.length; j++) {
        let dataoptions = 'data-package-' + sanpham[i]._id; 
        document.getElementById(dataoptions).innerHTML += "<span class='tag data-item'>" + goicuoc[j].package + " - " + goicuoc[j].price + "$" + "</span>" ;
        }  

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