function addmenu(){
    let newmenutitle = document.getElementById('newmenutitle').value;
    let newmenuurl = document.getElementById('newmenuurl').value;
    let newmenuid = parseInt(document.getElementById('newmenuid').value);
    let _data = {
      "fields": {
        "menuTitle": newmenutitle,
        "menuUrl": newmenuurl,
        "id": newmenuid
      }
    }
     
  fetch('https://api.airtable.com/v0/appJuih6tuaTappGZ/menu?sort%5B0%5D%5Bfield%5D=id&sort%5B0%5D%5Bdirection%5D=asc&api_key=keySoD6lDEycOXqdZ', {
    method: "POST",
    body: JSON.stringify(_data),
    headers: {"Content-type": "application/json; charset=UTF-8"}
  })
  .then(response => response.json()) 
  .then(json => console.log(json));
          }