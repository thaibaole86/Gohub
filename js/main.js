// Mỗi lần web load thì chạy các function
window.addEventListener('load', addmenu);
window.addEventListener('load', addsanpham);
window.addEventListener('load', displayHash);


// Function add thanh menu
function addmenu() {
    let menu = [
        { title: "Home", url: "#home"},
        { title: "Global SIM", url: "#globalsim" },
        { title: "E-SIM", url: "#products" },
        { title: "Contact", url: "#contact"}
    ]       

    for (i = 0; i < menu.length; i++ ) {
        document.getElementById('menu-items').innerHTML += "<li><a href=" + menu[i].url + ">" + menu[i].title + "</a></li>"
    }
}

//Function check xem # trên URL nó là gì thì sẽ insert phần HTML có id giống tên nó mà đang hide trên trang.

function displayHash() {
    let theHash = window.location.hash;
    if (theHash.length == 0) { theHash = "#home"; }
    let pagecontentload = document.getElementById("main-body-display");
    pagecontentload.innerHTML = document.getElementById(theHash).innerHTML;
  }

  // Mỗi lần # trên URL thay đổi thì chạy lại lệnh displayHash
window.addEventListener("hashchange", function() {
    console.log("hashchange event");
    displayHash();
  });

// Function hiện Sản phẩm

function addsanpham() {
    let sanpham = [
    {
        id: 1, 
        title: "Asia 17 countries",
        image: "/img/asia.jpg",
        slug:"asia",
        package: [{data:"1GB",price: 10}, {data:"5GB", price: 20}, {data:"10GB", price: 30}],
        category: "asia",
        description: "Asia Economy Packages" 
    },

    { 
        id: 2, 
        title: "Asia Premium 22 countries",
        image: "/img/asia.jpg",
        slug:"asia-premium",
        package: [{data:"6GB",price: 10}, {data:"10GB", price: 20}, {data:"30GB", price: 30}],
        category: "asia",
        description: "Asia Economy Packages" 
    },
    {
        id: 3, 
        title: "Middle East Region",
        image: "/img/asia.jpg",
        slug:"middle-east",
        package: [{data:"6GB",price: 10}, {data:"10GB", price: 20}, {data:"30GB", price: 30}],
        category: "middle-east",
        description: "Middle East Packages" 
    },
    {
        id: 4, 
        title: "Africa Region",
        image: "/img/asia.jpg",
        slug:"africa",
        package: [{data:"6GB",price: 10}, {data:"10GB", price: 20}, {data:"30GB", price: 30}],
        category: "africa",
        description: "Africa Packages" 
    },
    {
        id: 5, 
        title: "Europe 46 countries",
        image: "/img/asia.jpg",
        slug:"europe",
        package: [{data:"6GB",price: 10}, {data:"10GB", price: 20}, {data:"30GB", price: 30}],
        category: "africa",
        description: "Europe Packages" 
    },
    {
        id: 6, 
        title: "World Basic 36 countries",
        image: "/img/asia.jpg",
        slug:"world-basic",
        package: [{data:"6GB",price: 10}, {data:"10GB", price: 20}, {data:"30GB", price: 30}],
        category: "world",
        description: "World Basic Packages" 
    },
    ]


    for (i = 0; i< sanpham.length; i++) {        
        document.getElementById('product-name').innerHTML += "<div id='product-detail'>" + "<img class='product-image' src=" + sanpham[i].image + ">" + "<div class='product-title'>" + sanpham[i].title + "</div>" + "<div class='product-description'>" + sanpham[i].description + "</div>" + "<br>" + "<div id='data-package-" + sanpham[i].id +  "' ></div>" + "<button class='product-button'> Buy Now </button>" + "</div>";   
        
        let sppk = sanpham[i].package;
        let dtpk = 'data-package-' + sanpham[i].id;

            for (j = 0; j < sppk.length; j++) {
            document.getElementById(dtpk).innerHTML += "<input type='radio'" + " name=" + sppk + "value=" + sppk[j] + " id=" + dtpk + "-" + sppk[j].data + " >" + "<label for=" + dtpk + "-" + sppk[j].data + ">" + sppk[j].data + " - " + sppk[j].price + "$" + "</label>" ;
        }
    }
}