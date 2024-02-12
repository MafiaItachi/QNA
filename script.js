document.addEventListener("DOMContentLoaded", function() {
    // Initial folder index
    var folderIndex = 1;

    // Fetch image from the initial folder
    fetchImage(folderIndex);

    // Fetch and display all folders inside "QNA" directory
    fetchFolders();

    // Add event listener to the Next button
    var nextButton = document.getElementById("nextButton");
    nextButton.addEventListener("click", function() {
        folderIndex++;
        fetchImage(folderIndex);
    });

    // Add event delegation to the folders container
    var foldersContainer = document.getElementById("foldersContainer");
    foldersContainer.addEventListener("click", function(event) {
        if (event.target.classList.contains("folderLink")) {
            var clickedFolderIndex = parseInt(event.target.dataset.folderIndex);
            fetchImage(clickedFolderIndex);
        }
    });
});

function fetchFolders() {
    var qnaFolderPath = "QNA/";
    var foldersContainer = document.getElementById("foldersContainer");

    // Fetching the folders
    fetch(qnaFolderPath)
        .then(response => response.text())
        .then(html => {
            // Extracting folder names from directory listing
            var parser = new DOMParser();
            var doc = parser.parseFromString(html, "text/html");
            var links = Array.from(doc.querySelectorAll("a"));
            var folderLinks = links.filter(link => link.href.match(/\/$/));

            // Displaying folder names
            foldersContainer.innerHTML = "";
            folderLinks.forEach(function(link, index) {
                var folderIndex = index + 1;
                var folderName = link.href.split("/").filter(Boolean).pop();
                var folderLink = document.createElement("div");
                folderLink.innerHTML = "<a href='#' class='folderLink' data-folder-index='" + folderIndex + "'>" + folderName + "</a>";
                foldersContainer.appendChild(folderLink);
            });
        })
        .catch(error => console.error("Error fetching folders:", error));
}

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
