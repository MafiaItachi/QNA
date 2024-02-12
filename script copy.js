document.addEventListener("DOMContentLoaded", function() {
    // Initial folder index
    var folderIndex = 1;

    // Fetch image from the initial folder
    fetchImage(folderIndex);

    // Display filenames in the QNA folder
    displayFileList();

    // Add event listener to the Next button
    var nextButton = document.getElementById("nextButton");
    nextButton.addEventListener("click", function() {
        folderIndex++;
        fetchImage(folderIndex);
        displayFileList();
    });
});

function fetchImage(folderIndex) {
    var folderPath = "QNA/Folder" + folderIndex + "/";
    var imageElement = document.getElementById("imagePlaceholder");

    // Fetching the image
    fetch(folderPath)
        .then(response => response.text())
        .then(html => {
            // Extracting image filenames from directory listing
            var parser = new DOMParser();
            var doc = parser.parseFromString(html, "text/html");
            var links = Array.from(doc.querySelectorAll("a"));
            var imageLinks = links.filter(link => link.href.match(/\.(jpg|jpeg|png|gif)$/i));

            if (imageLinks.length > 0) {
                // Use the first image found
                var imageUrl = imageLinks[0].href;
                imageElement.src = imageUrl;
            } else {
                console.error("No images found in the directory.");
            }
        })
        .catch(error => console.error("Error fetching images:", error));
}

function displayFileList() {
    var folderPath = "QNA/";
    var fileListDiv = document.getElementById("fileList");

    // Fetching file names in the QNA folder
    fetch(folderPath)
        .then(response => response.text())
        .then(html => {
            // Extracting filenames from directory listing
            var parser = new DOMParser();
            var doc = parser.parseFromString(html, "text/html");
            var links = Array.from(doc.querySelectorAll("a"));
            var fileNames = links.map(link => link.textContent.trim());

            // Display filenames in the list div
            fileListDiv.innerHTML = "<h2>Files in QNA Folder:</h2><ul>" + fileNames.map(name => "<li>" + name + "</li>").join("") + "</ul>";
        })
        .catch(error => console.error("Error fetching file list:", error));
}
