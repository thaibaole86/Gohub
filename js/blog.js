//Create new product
function addblog(){
    let newtitle = document.getElementById('new-blog-title').value;
    let newimage = document.getElementById('new-blog-image').value;
    let newex = document.getElementById('new-blog-ex').value;
    let newcontent = quill.root.innerHTML;
  
    let _newdata = {
      "title": newtitle,
      "excerp": newex,
      "imageurl": newimage,
      "content": newcontent
      }
  
    fetch('https://gohub-b49c.restdb.io/rest/blog', {
      method: "POST",
      body: JSON.stringify(_newdata),
      headers: {
        'Content-Type': 'application/json',
        'x-apikey': '610fb14469fac573b50a5331'
      }
    })
    .then(response => response.json()) 
    .then(json => console.log(json))
    .then(function(){
      alert('Successfully Added Blog');
      location.reload();
    })
  
}
