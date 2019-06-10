document.getElementById('myForm').addEventListener('submit', saveBookmark);
//save bookmark
function saveBookmark(e) {
	// get form values
	var siteName = document.getElementById('siteName').value;
	var siteURL = document.getElementById('siteURL').value;

	if (!validateForm(siteName, siteURL)) {
		return false;
	}


	var bookmark = {
		name : siteName,
		url : siteURL
	}
	if (localStorage.getItem('bookmarks') === null) {
		//init array
		var bookmarks = [];
		//add to array
		bookmarks.push(bookmark);
		// Set to localStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}else{
		// Get bookmarks from local storage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		//  Add bookmark to array
		bookmarks.push(bookmark);
		// Re- set to localStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}

	// clear form
	document.getElementById('myForm').reset();
	// Re-fetch bookmarks
	fetchBookmarks();
	// Prevent form from submitting
	e.preventDefault();
}

function deleteBookmark(url) {
	// get Bookmarks from localstorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	// Loop through bookmarks
	for (var i = 0; i < bookmarks.length; i++) {
		if (bookmarks[i].url == url){
			// Remove from array
			bookmarks.splice(i, 1)
		}
	}
	// Set to localStorage
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	// Re-fetch bookmarks
	fetchBookmarks();
}

// Fetch bookmarks
function fetchBookmarks() {
	// Get bookmarks from localStorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	// Get output id
	var bokmarksResults = document.getElementById('bookmarksResults')

	// build output
	bookmarksResults.innerHTML ='';
	for (var i = 0; i < bookmarks.length; i++) {
		var name  = bookmarks[i].name;
		var url = bookmarks[i].url;

		bookmarksResults.innerHTML +=  '<div class="well">'+
								        '<h3>'+name+
								        '<a class="btn btn-info" target="_blank" href="'+url+'">Visit</a>'+
								        '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger"  href="#bookmarksResults">delete</a>'
								        '</h3>'+
								      '</div>';
	}

}



// var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
// var regex = new RegExp(expression);
// var t = 'www.google.com';

// if (t.match(regex)) {
//   alert("Successful match");
// } else {
//   alert("No match"); 
// }

function validateForm(siteName, siteURL) {
	if (!siteName || !siteURL) {
		alert('Please fill the form')
		return false
	}
	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if (!siteURL.match(regex)) {
		alert('Please use a valid URL');
		return false
	}
	return true
}