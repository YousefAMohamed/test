var siteName = document.getElementById('siteName');
var siteUrl = document.getElementById('siteUrl');
var myForm = document.getElementById('my-form');
var bookmarksDisplay = document.getElementById('bookmarkDisplay');
var bookMarks = [];

// Load bookmarks from localStorage if they exist
if (localStorage.getItem('Bookmarks') != null) {
    bookMarks = JSON.parse(localStorage.getItem('Bookmarks'));
    displaybookMarks();
}

// Handle form submission
myForm.addEventListener('submit', function (e) {
    e.preventDefault();
    saveBookmarks();
});

// Save a new bookmark
function saveBookmarks() {
    let name = siteName.value.trim();
    let url = siteUrl.value.trim();

    // Validate fields
    if (!name || !url) {
        showError('Both fields are required!');
        return;
    }

    // Validate URL format
    if (!validateUrl(url)) {
        return; // Stops if validation fails
    }

    // Create bookmark object
    const bookmark = {
        name: name,
        url: url,
    };

    // Add to bookmarks array
    bookMarks.push(bookmark);

    // Save to localStorage
    localStorage.setItem('Bookmarks', JSON.stringify(bookMarks));

    // Refresh displayed bookmarks
    displaybookMarks();

    // Clear form fields
    siteName.value = '';
    siteUrl.value = '';
}

// Validate URL
function validateUrl(url) {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        showError('The URL must start with "http://" or "https://".');
        return false;
    }
    return true;
}

// Display bookmarks
function displaybookMarks() {
    let temp = '';
    for (let i = 0; i < bookMarks.length; i++) {
        temp += `
            <div class="bg-light mb-4 p-3">
                <h2 class="text-capitalize">${bookMarks[i].name}</h2> 
                <a class="btn btn-primary" target="_blank" href="${bookMarks[i].url}">Visit</a>
                <a onclick="deleteBookmarks(${i})" class="btn btn-warning" href="#">Delete</a>
            </div>`;
    }

    bookmarksDisplay.innerHTML = temp;
}

// Delete a bookmark
function deleteBookmarks(deletedIndex) {
    bookMarks.splice(deletedIndex, 1);

    // Update localStorage
    localStorage.setItem('Bookmarks', JSON.stringify(bookMarks));

    // Refresh displayed bookmarks
    displaybookMarks();
}

// Show error using SweetAlert
function showError(message) {
    Swal.fire({
        icon: 'error',
        title: 'Invalid Input',
        text: message,
    });
}
