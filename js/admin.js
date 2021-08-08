let latestmenuid;
window.addEventListener('load', displayHash);

function fetchdatamenu(){
  fetch('https://api.airtable.com/v0/appJuih6tuaTappGZ/menu?sort%5B0%5D%5Bfield%5D=id&sort%5B0%5D%5Bdirection%5D=asc&api_key=keySoD6lDEycOXqdZ').then(function(response) {
      data = response.json();
      return data;
  })
  .then(function(data) {
      listmenu(data)
      console.log(data.records.length);
      latestmenuid = parseInt(data.records.length);
      });
}


// Show menu list
function listmenu(data) {
  let menu = data.records;
  for (i = 0; i < menu.length; i++ ) {
    let stt = i + 1;
    document.getElementById('menulist').innerHTML += "<table><tr>" + "<td>" + stt  + "</td><td><ion-icon name='create-outline' onclick='editmenuinstant(this.id)'" + " id=" + menu[i].id + "></ion-icon>  " + menu[i].fields.menuTitle + "</td><td><ion-icon name='create-outline' onclick='editurlinstant(this.id)'" + " id=" + menu[i].id + "></ion-icon>  " + menu[i].fields.menuUrl + "</td><td><ion-icon name='caret-down-outline' onclick='editpositioninstantup(this.id)'" + " id=" + menu[i].id + "></ion-icon>" + "<span id='menuposition-" + menu[i].id + "'> " + menu[i].fields.id + "</span>" + "<ion-icon name='caret-up-outline' onclick='editpositioninstantdown(this.id)'" + " id=" + menu[i].id + "></ion-icon>"  + "</td>" + "<td><ion-icon name='trash-outline' onclick='deletemenuinstant(this.id)'"  + " id=" + menu[i].id + "></ion-icon></td>" + "</tr></table>";
    }
}

// Add menu function
function addmenu(){
  let newmenutitle = document.getElementById('newmenutitle').value
  let newmenuurl = document.getElementById('newmenuurl').value;

    let _data = {
      "fields": {
        "menuTitle": newmenutitle,
        "menuUrl": newmenuurl,
        "id": latestmenuid + 1
      }
    }
     
  fetch('https://api.airtable.com/v0/appJuih6tuaTappGZ/menu?sort%5B0%5D%5Bfield%5D=id&sort%5B0%5D%5Bdirection%5D=asc&api_key=keySoD6lDEycOXqdZ', {
    method: "POST",
    body: JSON.stringify(_data),
    headers: {"Content-type": "application/json; charset=UTF-8"}
  })
  .then(response => response.json()) 
  .then(json => console.log(json));

  alert('Successfully Added New Menu Item');
  location.reload();
}

//Delete menu instantly
function deletemenuinstant(id){
  fetch(`https://api.airtable.com/v0/appJuih6tuaTappGZ/menu/${id}?api_key=keySoD6lDEycOXqdZ`, { method: "DELETE" })
    .then(response => response.json())
    .then(deleteConfirmation => console.log("DELETE: ", deleteConfirmation));
    alert('Successfully Deleted Menu Item');
    location.reload();
  }


//Edit menu instantly
function editmenuinstant(id){
  let _editdata = {
    "fields": {
      "menuTitle": prompt("Please enter new Menu Name"),
    }
  }
  
  fetch(`https://api.airtable.com/v0/appJuih6tuaTappGZ/menu/${id}?api_key=keySoD6lDEycOXqdZ`, { 
    method: "PATCH",
    body: JSON.stringify(_editdata),
    headers: {"Content-type": "application/json; charset=UTF-8"}
  })
  .then(response => response.json()) 
  .then(json => console.log(json));

  alert('Successfully Edited New Menu Item');
  location.reload();

}

  //Edit menu URL instantly
  function editurlinstant(id){
    let _editdata = {
      "fields": {
        "menuUrl": prompt("Please enter new Menu Url"),
      }
    }
    
    fetch(`https://api.airtable.com/v0/appJuih6tuaTappGZ/menu/${id}?api_key=keySoD6lDEycOXqdZ`, { 
      method: "PATCH",
      body: JSON.stringify(_editdata),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json()) 
    .then(json => console.log(json));
  
    alert('Successfully Edited New Menu Url');
    location.reload();
  
  }

   //Edit menu Position function
   function editpositioninstantup(id){
    let position = 'menuposition-' + id;
    let currentposition = parseInt(document.getElementById(position).innerHTML);
      let _editdata = {
        "fields": {
          "id": currentposition + 1
          }
        }
      
      fetch(`https://api.airtable.com/v0/appJuih6tuaTappGZ/menu/${id}?api_key=keySoD6lDEycOXqdZ`, { 
        method: "PATCH",
        body: JSON.stringify(_editdata),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      .then(response => response.json()) 
      .then(json => console.log(json));
      alert('Successfully Edited New Menu Position');
      location.reload();
    
  }

  function editpositioninstantdown(id){
    let position = 'menuposition-' + id;
    let currentposition = parseInt(document.getElementById(position).innerHTML);
      let _editdata = {
        "fields": {
          "id": currentposition - 1
          }
        }
      
      fetch(`https://api.airtable.com/v0/appJuih6tuaTappGZ/menu/${id}?api_key=keySoD6lDEycOXqdZ`, { 
        method: "PATCH",
        body: JSON.stringify(_editdata),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      .then(response => response.json()) 
      .then(json => console.log(json));
      alert('Successfully Edited New Menu Position');
      location.reload();
    
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
      let pagecontentload = document.getElementById("admin-display");
      pagecontentload.innerHTML = document.getElementById(theHash).innerHTML;
  }

  // Mỗi lần # trên URL thay đổi thì chạy lại lệnh displayHash
window.addEventListener("hashchange", function() {
    console.log("hashchange event");
    displayHash();
  });

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
function editproduct(id){
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
      document.getElementById('thumbnail-preview').innerHTML = "<img width='400px' src=" + pdata.imageurl + ">"

      if (pdata.active == true) {
        document.getElementById('product-active').checked = true
      }
      else if (pdata.active == false) {
        document.getElementById('product-active').checked = false
      }

      let sodem = 0;
      document.getElementById('product-data').innerHTML = "";
      for (i = 0; i < packagedata.length; i++) {
        sodem = sodem + 1;
        document.getElementById('product-data').innerHTML += "<div> Option"+ (sodem) + " : <input class='input is-small small-input-option' value=" + packagedata[i].package + "> <input class='input is-small small-input-option' value=" + packagedata[i].price + ">" + "</div>";
      }  
      });
}

function updateproduct(){
  let id = document.getElementById('product-id').value;
  let _editdata = {
      "name": document.getElementById('product-name').value,
      "description": document.getElementById('product-des').value,
      "active": document.getElementById('product-active').checked,
      "imageurl": document.getElementById('product-image').value
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
  let editproduct = document.getElementById('product-detail');
  let productlisting = document.getElementById('product-listing');
  let newproduct = document.getElementById('new-product-detail');
  editproduct.classList.remove("hidden");
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

  let _newdata = {
    "name": newname,
    "description": newdes,
    "active": newactive,
    "imageurl": newimage,
    "data": datapackages
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
    document.getElementById('new-product-data').innerHTML += "<div>" + datapackages[i].package + " | " + datapackages[i].price + "$ " + "</div>";
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
