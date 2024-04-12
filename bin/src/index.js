// write your code here
document.addEventListener("DOMContentLoaded", () => {
    const baseUrl = "http://localhost:3000";
  
    const cardTitle = document.getElementById("card-title");
    const cardImage = document.getElementById("card-image");
    const likeCount = document.getElementById("like-count");
    const likeButton = document.getElementById("like-button");
    const commentsList = document.getElementById("comments-list");
    const commentForm = document.getElementById("comment-form");
  
    // Function to fetch image data and render it on the page
    const fetchImageData = () => {
      fetch(`${baseUrl}/images/1`)
        .then((response) => response.json())
        .then((data) => renderImage(data))
        .catch((error) => console.error("Error fetching image data:", error));
    };
  
    // Function to render image and associated comments
    const renderImage = (imageData) => {
      cardTitle.textContent = imageData.title;
      cardImage.src = imageData.image;
      cardImage.alt = imageData.title;
      likeCount.textContent = `${imageData.likes} likes`;
  
      commentsList.innerHTML = "";
      imageData.comments.forEach((comment) => {
        const li = document.createElement("li");
        li.textContent = comment.content;
        commentsList.appendChild(li);
      });
    };
  
    // Event listener for like button click
    likeButton.addEventListener("click", () => {
      const currentLikes = parseInt(likeCount.textContent);
      likeCount.textContent = `${currentLikes + 1} likes`;
    });
  
    // Event listener for comment form submission
    commentForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const content = event.target.elements.comment.value;
      const li = document.createElement("li");
      li.textContent = content;
      commentsList.appendChild(li);
      event.target.reset();
    });
  
    // Initial fetch of image data
    fetchImageData();
  });
  