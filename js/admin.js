let latestmenuid;
window.addEventListener('load', displayHash);
// Mỗi lần # trên URL thay đổi thì chạy lại lệnh displayHash
window.addEventListener("hashchange", function() {
  console.log("hashchange event");
  displayHash();
});
///////////////////////////////////////// MENU PAGE ////////////////////////////////
// Fetch API Data Menu
function fetchdatamenu(){
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
      listmenu(data)
      latestmenuid = parseInt(data.length);
      });
}
// Show menu list
function listmenu(data) {
  let menu = data;
  for (i = 0; i < menu.length; i++ ) {
    let stt = i + 1;
    document.getElementById('menulist').innerHTML += "<table><tr>" + "<td>" + stt  + "</td><td><ion-icon name='create-outline' onclick='editmenuinstant(this.id)'" + " id=" + menu[i]._id + "></ion-icon>  " + menu[i].menuTitle + "</td><td><ion-icon name='create-outline' onclick='editurlinstant(this.id)'" + " id=" + menu[i]._id + "></ion-icon>  " + menu[i].menuUrl + "</td><td><ion-icon name='caret-down-outline' onclick='editpositioninstantup(this.id)'" + " id=" + menu[i]._id + "></ion-icon>" + "<span id='menuposition-" + menu[i]._id + "'>" + menu[i].id + "</span>" + "<ion-icon name='caret-up-outline' onclick='editpositioninstantdown(this.id)'" + " id=" + menu[i]._id + "></ion-icon>"  + "</td>" + "<td><ion-icon name='trash-outline' onclick='deletemenuinstant(this.id)'"  + " id=" + menu[i]._id + "></ion-icon></td>" + "</tr></table>";
    }
}

// Add menu function
function addmenu(){
  let newmenutitle = document.getElementById('newmenutitle').value
  let newmenuurl = document.getElementById('newmenuurl').value;

    let _data = {
        "menuTitle": newmenutitle,
        "menuUrl": newmenuurl,
        "id": latestmenuid + 1
    }
     
  fetch('https://gohub-b49c.restdb.io/rest/menu', {
    method: "POST",
    body: JSON.stringify(_data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      'x-apikey': '610fb14469fac573b50a5331'
    }
  })
  .then(response => response.json()) 
  .then(json => console.log(json));

  alert('Successfully Added New Menu Item');
  location.reload();
}

//Delete menu instantly
function deletemenuinstant(id){
  fetch(`https://gohub-b49c.restdb.io/rest/menu/${id}`, { 
    method: "DELETE",
    headers: {
      'x-apikey': '610fb14469fac573b50a5331'
    }
    })
    .then(response => response.json())
    .then(deleteConfirmation => console.log("DELETE: ", deleteConfirmation));
    alert('Successfully Deleted Menu Item');
    location.reload();
  }


//Edit menu instantly
function editmenuinstant(id){
  let _editdata = {
      "menuTitle": prompt("Please enter new Menu Name")
  }
  
  fetch(`https://gohub-b49c.restdb.io/rest/menu/${id}`, { 
    method: "PATCH",
    body: JSON.stringify(_editdata),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      'x-apikey': '610fb14469fac573b50a5331'
  }
  })
  .then(response => response.json()) 
  .then(json => console.log(json));

  alert('Successfully Edited New Menu Item');
  location.reload();

}

  //Edit menu URL instantly
  function editurlinstant(id){
    let _editdata = {
        "menuUrl": prompt("Please enter new Menu Url")
    }
    
    fetch(`https://gohub-b49c.restdb.io/rest/menu/${id}`, { 
      method: "PATCH",
      body: JSON.stringify(_editdata),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        'x-apikey': '610fb14469fac573b50a5331'
      }
    })
    .then(response => response.json()) 
    .then(json => console.log(json));
  
    alert('Successfully Edited New Menu Url');
    location.reload();
  
  }

//Edit menu Position functions
function editpositioninstantup(id){
  let position = 'menuposition-' + id;
  let currentposition = parseInt(document.getElementById(position).innerHTML);
  let newposition = currentposition + 1;
  let _editdata = {
    "id": newposition
  }
      
  fetch(`https://gohub-b49c.restdb.io/rest/menu/${id}`, { 
    method: "PATCH",
    body: JSON.stringify(_editdata),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      'x-apikey': '610fb14469fac573b50a5331'
    }
  })
  .then(response => response.json()) 
  .then(json => console.log(json));
  document.getElementById(position).innerHTML = newposition;
  alert('Successfully Adjusted Item Position');
  location.reload();
  }

function editpositioninstantdown(id){
  let position = 'menuposition-' + id;
  let currentposition = parseInt(document.getElementById(position).innerHTML);
  let newposition = currentposition - 1;
  let _editdata = {
    "id": newposition
      };

  fetch(`https://gohub-b49c.restdb.io/rest/menu/${id}`, { 
    method: "PATCH",
    body: JSON.stringify(_editdata),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      'x-apikey': '610fb14469fac573b50a5331'
    }
  })
  .then(response => response.json()) 
  .then(json => console.log(json));
  document.getElementById(position).innerHTML = newposition;
  alert('Successfully Adjusted Item Position');
  location.reload();
  }

  // Show New Menu Function
  function toogleNewMenu() {
    let newmenu = document.getElementById('new-menu-section');
    newmenu.classList.remove("hidden");
  }

  // Load page according to Hash URL
  function displayHash() {
    let theHash = window.location.hash;
    if ((theHash.length == 0) || (theHash == "#menu")) { 
      theHash = "#menu";
      fetchdatamenu();
    }
    if ((theHash == "#product")) {
    fetchdataproduct();
    }

    if ((theHash == "#blog")) {
      fetchdatablog()
    }
  
      let pagecontentload = document.getElementById("admin-display");
      pagecontentload.innerHTML = document.getElementById(theHash).innerHTML;
  }



///////////////////////////////////////// PRODUCT PAGE ////////////////////////////////

// Fetch product data
function fetchdataproduct(){
  fetch('https://gohub-b49c.restdb.io/rest/product', {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'x-apikey': '610fb14469fac573b50a5331'
    }
  })
  .then(function(response) {
      pdata = response.json();
      return pdata;
  })
  .then(function(pdata) {
      listproduct(pdata)
      console.log(pdata.length);
      });
}

// Show product list
function listproduct(pdata) {
  let product = pdata;
  for (i = 0; i < product.length; i++ ) {
    let stt = i + 1;
    document.getElementById('product-list').innerHTML += "<table><tr>" + "<td><center><ion-icon name='create-outline' onclick='editproduct(this.id)'"  + " id=" + product[i]._id + "></ion-icon></center></td><td>"  + "</td><td>" + stt + "</td><td>" + product[i].name + "</td><td>" + product[i].description + "</td><td>" + "<img width='100px' src=" + product[i].imageurl + ">" + "</td><td>" + product[i].active +"</td></tr></table>";
  }
}

//Edit Product
let productDataOption = [];
function editproduct(id){
  let editproduct = document.getElementById('product-detail');
  editproduct.classList.remove("hidden");

  productDataOption = [];  
  fetch(`https://gohub-b49c.restdb.io/rest/product/${(id)}`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'x-apikey': '610fb14469fac573b50a5331'
    }
}).then(function(response) {
      pdata = response.json();
      return pdata;
  })
  .then(function(pdata) {
      console.log(pdata);
      let packagedata = pdata.data;
      console.log(packagedata);
      document.getElementById('product-id').value = pdata._id;
      document.getElementById('product-name').value = pdata.name;
      document.getElementById('product-des').value = pdata.description;
      document.getElementById('product-active').value = pdata.active;
      document.getElementById('product-image').value = pdata.imageurl;
      document.getElementById('product-price').value = pdata.price;
      document.getElementById('product-sku').value = pdata.id;
      document.getElementById('thumbnail-preview').innerHTML = "<img width='30%' src=" + pdata.imageurl + ">"

      if (pdata.active == true) {
        document.getElementById('product-active').checked = true
      }
      else if (pdata.active == false) {
        document.getElementById('product-active').checked = false
      }
     
      });
}

function renderDataOption(){
  let sodem = 0;
  document.getElementById('product-data').innerHTML = "";
  for (j = 0; j <productDataOption.length; j++) {
    sodem = sodem + 1;
    document.getElementById('product-data').innerHTML += "<div><ion-icon name='create-outline'  onclick='editDataOption(this.id)'" +"id='" + j + "'>Edit</ion-icon> Option "+ (sodem) + " : <input disabled class='input is-small small-input-option' value=" + productDataOption[j].package + "> <input disabled class='input is-small small-input-option' value=" + productDataOption[j].price + ">" + "</div>";
  }
  console.log(productDataOption);
  return productDataOption;  
}

function editDataOption(id){
  productDataOption[id].package = prompt('Please enter new data package name');
  productDataOption[id].price = prompt('Please enter new data package price');
  console.log(productDataOption[id]);
  renderDataOption()
}

function updateproduct(){
  let id = document.getElementById('product-id').value;
  let _editdata = {
      "name": document.getElementById('product-name').value,
      "description": document.getElementById('product-des').value,
      "active": document.getElementById('product-active').checked,
      "imageurl": document.getElementById('product-image').value,
      "price": document.getElementById('product-price').value,
      "id":document.getElementById('product-sku').value
      }
  
fetch(`https://gohub-b49c.restdb.io/rest/product/${(id)}`, { 
    method: "PATCH",
    body: JSON.stringify(_editdata),
    headers: {
      'Content-Type': 'application/json',
      'x-apikey': '610fb14469fac573b50a5331'
    }
  })
  .then(response => response.json()) 
  .then(json => console.log(json));

  alert('Successfully Updated Product');
  location.reload();
}

//Function of Add Menu & Edit Menu Buttons
function toogleEditButton(){
  let productlisting = document.getElementById('product-listing');
  let newproduct = document.getElementById('new-product-detail');
  productlisting.classList.remove("hidden");
  newproduct.classList.add("hidden");
}

function toogleNewButton(){
  let editproduct = document.getElementById('product-detail');
  let newproduct = document.getElementById('new-product-detail');
  let productlisting = document.getElementById('product-listing');
  newproduct.classList.remove("hidden");
  editproduct.classList.add("hidden");
  productlisting.classList.add("hidden");
}

//Create new product
function newproduct(){
  let newname = document.getElementById('new-product-name').value;
  let newdes = document.getElementById('new-product-des').value;
  let newimage = document.getElementById('new-product-image').value;
  let newactive = document.getElementById('new-product-active').checked;
  let newprice = document.getElementById('new-product-price').value;
  let newsku = document.getElementById('new-product-sku').value;

  let _newdata = {
    "name": newname,
    "description": newdes,
    "active": newactive,
    "imageurl": newimage,
    "price": newprice,
    "id": newsku
    }

  fetch('https://gohub-b49c.restdb.io/rest/product', {
    method: "POST",
    body: JSON.stringify(_newdata),
    headers: {
      'Content-Type': 'application/json',
      'x-apikey': '610fb14469fac573b50a5331'
    }
  })
  .then(response => response.json()) 
  .then(json => console.log(json));

  alert('Successfully Added Product');
  location.reload();

}

let datapackages = [];
function addDataOption(){
  document.getElementById('new-product-data').innerHTML = " ";
  newdatavalue = document.getElementById('newdatavalue').value;
  newdataprice = document.getElementById('newdataprice').value;
  newdata = {
    "package": newdatavalue,
    "price": newdataprice
  }
  datapackages.push(newdata)

  for (i = 0; i < datapackages.length; i++) {
    document.getElementById('new-product-data').innerHTML += "<div class='tag data-item is-warning is-medium'>" + datapackages[i].package + " | " + datapackages[i].price + "$ " + "</div>";
  }  

}

//Delete product instantly
function deleteproduct(){
  let id = document.getElementById('product-id').value;
  if (id == "") {
    alert('Please choose product first');
    return;
  }

  fetch(`https://gohub-b49c.restdb.io/rest/product/${(id)}`, { 
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      'x-apikey': '610fb14469fac573b50a5331'
    }
  })
  .then(response => response.json()) 
  .then(json => console.log(json));

  alert('Successfully Deleted Product');
  location.reload();
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
  for (i = 0; i < blog.length; i++ ) {
    document.getElementById('bloglist').innerHTML += "<tr>" + "<td><center><ion-icon name='create-outline' onclick='editproduct(this.id)'"  + " id=" + blog[i]._id + "></ion-icon></center></td>"  + "<td>" + blog[i].title + "</td><td>" + blog[i].excerp + "</td><td>" + "<img width='100px' src=" + blog[i].imageurl + ">" + "</td>" + "</tr>";
    }
}