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
    document.getElementById('menulist').innerHTML += "<table><tr>" + "<td>" + stt  + "</td><td><i class='fa fa-edit' onclick='editmenuinstant(this.id)'" + " id=" + menu[i].id + "></i>  " + menu[i].fields.menuTitle + "</td><td><i class='fa fa-edit' onclick='editurlinstant(this.id)'" + " id=" + menu[i].id + "></i>  " + menu[i].fields.menuUrl + "</td><td><i class='fa fa-edit' onclick='editpositioninstant(this.id)'" + " id=" + menu[i].id + "></i>  "  + menu[i].fields.id + "</td>" + "<td><i class='fa fa-trash' onclick='deletemenuinstant(this.id)'"  + " id=" + menu[i].id + "></i></td>" + "</tr></table>";
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

//Delete menu function
function deletemenu(){
  let id = document.getElementById('menu-select').value;
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

  //Edit menu function
  function editmenu(){
    let id = document.getElementById('menu-select').value;  
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

  //Edit menu URL function
  function editUrl(){
    let id = document.getElementById('menu-select').value;  
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
   function editpositioninstant(id){
    let newid = parseInt(prompt("Please enter new Menu Position"));  
    if (newid === null) {
      return;
    }
    if (newid > 0) {
      let _editdata = {
        "fields": {
          "id": newid
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
  }

  //Edit menu Position function
  function editPosition(){
    let id = document.getElementById('menu-select').value;
    let newid = parseInt(prompt("Please enter new Menu Position"));  
    if (newid === null) {
      return;
    }
    if (newid > 0) {
      let _editdata = {
        "fields": {
          "id": newid
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
  fetch('https://api.airtable.com/v0/appJuih6tuaTappGZ/products?api_key=keySoD6lDEycOXqdZ').then(function(response) {
      pdata = response.json();
      return pdata;
  })
  .then(function(pdata) {
      listproduct(pdata)
      console.log(pdata.records.length);
      });
}

// Show product list
function listproduct(pdata) {
  let products = pdata.records;
  for (i = 0; i < products.length; i++ ) {
    let stt = i + 1;
    document.getElementById('product-list').innerHTML += "<table><tr>" + "<td><i class='fa fa-edit' onclick='editproduct(this.id)'"  + " id=" + products[i].id + "></i></td><td>"  + "</td><td>" + stt + "</td><td>" + products[i].fields.productName + "</td><td>" + products[i].fields.productDescription + "</td><td>" + "<img src=" + products[i].fields.productImage[0].thumbnails.small.url + ">" + "</td><td>" + products[i].fields.Active +"</td></tr></table>";
  }
}

//Edit Product
function editproduct(id){
  fetch(`https://api.airtable.com/v0/appJuih6tuaTappGZ/menu/${id}?api_key=keySoD6lDEycOXqdZ`).then(function(response) {
      pdata = response.json();
      return pdata;
  })
  .then(function(pdata) {
      console.log(pdata);
      document.getElementById('product-id').value = pdata.id;
      document.getElementById('product-name').value = pdata.fields.productName;
      document.getElementById('product-des').value = pdata.fields.productDescription;
      document.getElementById('product-active').value = pdata.fields.Active;

      if (pdata.fields.Active == true) {
        document.getElementById('product-active').checked = true
      }
      else if (pdata.fields.Active == false) {
        document.getElementById('product-active').checked = false
      }
      });
  

}

function updateproduct(){
  let id = document.getElementById('product-id').value;
  let _editdata = {
    "fields": {
      "productName": document.getElementById('product-name').value,
      "productDescription": document.getElementById('product-des').value,
      "Active": document.getElementById('product-active').checked
        }
      }
  
fetch(`https://api.airtable.com/v0/appJuih6tuaTappGZ/products/${id}?api_key=keySoD6lDEycOXqdZ`, { 
    method: "PATCH",
    body: JSON.stringify(_editdata),
    headers: {"Content-type": "application/json; charset=UTF-8"}
  })
  .then(response => response.json()) 
  .then(json => console.log(json));

  alert('Successfully Updated Product');
  location.reload();
}