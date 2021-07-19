window.addEventListener('load', addmenu)
function addmenu() {
    let menu = [
        { id:"m-home" , title: "Home", url: "#home", f: "onclick='load_page_home()'" },
        { id: "m-globalsim", title: "Global SIM", url: "#globalsim", f: "onclick='load_page_globalsim()'"  },
        { id: "m-esim", title: "E-SIM", url: "#esim", f: "onclick='load_page_esim()'"  },
        { id: "m-contact", title: "Contact", url: "#contact", f: "onclick='load_page_contact()'" }
    ]       

    for (i = 0; i <= menu.length; i++ ) {
        document.getElementById('menu-items').innerHTML += "<li><a id=" + menu[i].id + " href=" + menu[i].url + ">" + menu[i].title + "</a></li>"
    }
}

// Mỗi lần load web thì Check xem # trên URL nó là gì thì sẽ insert phần HTML có id giống tên nó mà đang hide trên trang.
window.addEventListener('load', displayHash)
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


function newmenuitem() {
    document.getElementById('menu-items').innerHTML += "<li><a id=" + menu[i].id + " href=" + menu[i].url + ">" + menu[i].title + "</a></li>"
}