// Mỗi lần web load thì chạy các function
window.addEventListener('load', fetchdatamenu);
window.addEventListener('load', displayHash);

// Fetch API Data Menu
function fetchdatamenu(){
    let myHeaders = new Headers();
    myHeaders.append('x-apikey', '610fb14469fac573b50a5331');
    fetch('https://gohub-b49c.restdb.io/rest/menu?q={}&h={%22$orderby%22:%20{%22id%22:%201}}', {
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
        document.getElementById('menu-items').innerHTML += "<li class='navbar-item'><a href=" + menu[i].menuUrl + ">" + menu[i].menuTitle + "</a></li>"
    }
}

//Function check xem # trên URL nó là gì thì sẽ insert phần HTML có id giống tên nó mà đang hide trên trang.

function displayHash() {
    let theHash = window.location.hash;
    if (theHash.length == 0) { theHash = "#home"; }
    let pagecontentload = document.getElementById("main-body-display");
    pagecontentload.innerHTML = document.getElementById(theHash).innerHTML;

    if (theHash == "#products") {fetchdataproduct()};

    if (theHash == "#blog") {fetchdatablog()}
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
        document.getElementById('product-name').innerHTML += "<div id='product-detail' class='column is-one-third'>" + "<img class='product-image' src=" + sanpham[i].imageurl + ">" + "<div class='product-title'>" + sanpham[i].name + "</div>" + "<div class='product-description'>" + sanpham[i].description + "</div>" + "<br>" + "<span class='tag'>" + sanpham[i].price + " $ / month </span>" + "<button class='product-button snipcart-add-item' data-item-id=" + sanpham[i].id + " data-item-price=" + sanpham[i].price + " data-item-description=" + "'" + sanpham[i].description + "'" + " data-item-url='https://saigonsouvenir.com/rest/product/" + sanpham[i]._id + "?apikey=610fb14469fac573b50a5331' data-item-name='" + sanpham[i].name + "'> ADD TO CART </button>"

        }
        
    }
    }
function checklogin() {
    let uid = document.getElementById('username').value;
    let upw = document.getElementById('password').value;

    if (uid == "admin" && upw == "admin") {
        alert('Welcome Admin');
        window.open('/admin.html');
    }
    else {
        alert('You are not admin')
    }
}

function nosubmit(event){
    event.preventDefault();
}

///////////////////////////////////////// BLOG PAGE ////////////////////////////////
// Fetch API Data Menu
function fetchdatablog(){
    fetch('https://gohub-b49c.restdb.io/rest/blog', {
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
        listblog(data)
        latestmenuid = parseInt(data.length);
        });
  }
  // Show blog list
  function listblog(data) {
    let blog = data;
    document.getElementById('blog-content-display').innerHTML =  " ";
    for (i = 0; i < blog.length; i++ ) {
      document.getElementById('blog-item').innerHTML += "<div id='blog-detail' class='column'>" + "<img class='blog-image' src=" + blog[i].imageurl + ">" + "<div class='blog-title'>" + blog[i].title + "</div>" + "<div class='blog-excerp'>" + blog[i].excerp + "<div><br><br><button onclick=renderblogarticle(this.id) id='"+ blog[i]._id + "' class='button'>Read more</button></div>" + "</div>";
      }
  }

  function renderblogarticle(id) {
    fetch(`https://gohub-b49c.restdb.io/rest/blog/${(id)}`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'x-apikey': '610fb14469fac573b50a5331'
    }
}).then(function(response) {
      bdata = response.json();
      return bdata;
  })

  .then(function(bdata) {
      console.log(bdata);
      let article = bdata;
      document.getElementById('blog-item').innerHTML = " ";
      document.getElementById('blog-content-display').innerHTML = "<div><img class='article-image' src='" + article.imageurl + "'></div>" + "<div class='article-heading'>" + article.title + "</div>" + "<div class='article-content'>" + article.content + "</div>" + "<div><br><br><button class='button' onclick='backblog()'>Back to Blog List</button></div>"; 
  }
  )}

  function backblog() {
    document.getElementById('blog-content-display').innerHTML = "";
    location.reload();
  }