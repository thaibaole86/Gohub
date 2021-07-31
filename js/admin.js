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
      document.getElementById('newmenuid').value = latestmenuid + 1;
      });
}

// Show menu list
function listmenu(data) {
  let menu = data.records;
  let id =  document.getElementById('menu-select').value;
  for (i = 0; i < menu.length; i++ ) {
      
    document.getElementById('menulist').innerHTML += "<table><tr>" + "<td>" + menu[i].id + "</td><td>" + menu[i].fields.menuTitle + "</td><td>" + menu[i].fields.menuUrl + "</td><td>" + menu[i].fields.id + "</td></tr></table>";

    document.getElementById('menu-select').innerHTML += "<option>" + menu[i].id + "</option>"

    if (menu[i].id == id) {
        document.getElementById('selected-menu-name').innerHTML += menu[i].fields.menuTitle ;
      }
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

//Delete menu function
function deletemenu(){
  let id = document.getElementById('menu-select').value;
  fetch(`https://api.airtable.com/v0/appJuih6tuaTappGZ/menu/${id}?api_key=keySoD6lDEycOXqdZ`, { method: "DELETE" })
    .then(response => response.json())
    .then(deleteConfirmation => console.log("DELETE: ", deleteConfirmation));
    alert('Successfully Deleted Menu Item');
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

  function displayHash() {
    let theHash = window.location.hash;
    if ((theHash.length == 0) || (theHash == "#menu")) { 
      theHash = "#menu";
      fetchdatamenu();
    }
    
      let pagecontentload = document.getElementById("admin-display");
      pagecontentload.innerHTML = document.getElementById(theHash).innerHTML;
  }

  // Mỗi lần # trên URL thay đổi thì chạy lại lệnh displayHash
window.addEventListener("hashchange", function() {
    console.log("hashchange event");
    displayHash();
  });