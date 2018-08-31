/*This is a bookmark app that allows you to store the name 
and url of a website in the html5 local store using a form 
created via html.The web app is mobile firs app,(internship ongoing)*/

document.getElementById("myForm").addEventListener("submit", storeBookmark);
//save bookmark
function storeBookmark(e) {
  //get form values
  var siteName = document.getElementById("sitename").value;
  var siteUrl = document.getElementById("siteurl").value;

  if (!validateForm(siteName, siteUrl)) {
    return false;
  }

  var bookmark = {
    name: siteName,
    url: siteUrl
  };
  console.log(bookmark);
  /* //local storage Test
    localStorage.setItem("test","Hello world");
    console.log(localStorage.getItem("test"));
    localStorage.removeItem("test");
    console.log(localStorage.getItem("test"));
   
    */
  //Test if bokmarks is null
  if (localStorage.getItem("bookmarks") === null) {
    //array initialization
    var bookmarks = [];
    //add to array
    bookmarks.push(bookmark);
    //set to local storage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  } else {
    //get bookmarks from local storage
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    //add bookmark to array
    bookmarks.push(bookmark);
    //reset to local storage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
  //clear form
  document.getElementById("myForm").reset();

  //refetch bookmark
  fetchBookmarks();

  //prevent form from submitting
  e.preventDefault();
}

function deletBookmark(url) {
  //console.log(url);
  // get bookmarks from localstorage
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url == url) {
      //remove from array
      bookmarks.splice(i, 1);
    }
  }
  //reset back to local storage
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  //refetch bookmarks,continue from here
  fetchBookmarks();
}

//fetch bookmarks
function fetchBookmarks() {
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  //console.log(bookmarks);
  //get output id
  var results = document.getElementById("results");

  //build output

  results.innerHTML = "";

  for (var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    results.innerHTML +=
      "<div class='well'>" +
      "<h3>" +
      name +
      "<a class='btn btn-default' target='_blank' href='" +
      url +
      "'>Visit</a>  " +
      "<a onClick='deletBookmark(\"" +
      url +
      "\")' class='btn btn-danger'  href='#'>Delete</a>" +
      "<h3>" +
      "</div>";
  }
}
//site validation
function validateForm(siteName, siteUrl) {
  //sitename and url Validation
  if (!siteName || !siteUrl) {
    alert("Wetin dey do u");
    return false;
  }
  //http validation,not yet working
  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if (!siteUrl.match(regex)) {
    alert("This no be url");
    return false;
  }
  return true;
}
