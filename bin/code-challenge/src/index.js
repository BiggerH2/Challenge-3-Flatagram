// Function to fetch image data from the server
async function fetchImageData() {
    try {
        const response = await fetch('http://localhost:3000/images/1');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching image data:', error);
    }
}

// Function to update the image card with fetched data
async function updateImageCard() {
    const imageData = await fetchImageData();
    const cardTitle = document.getElementById('card-title');
    const cardImage = document.getElementById('card-image');
    const likeCount = document.getElementById('like-count');
    const commentsList = document.getElementById('comments-list');

    // Update title, image source, and like count
    cardTitle.textContent = imageData.title;
    cardImage.src = imageData.image;
    likeCount.textContent = `${imageData.likes} likes`;

    // Update comments list
    commentsList.innerHTML = '';
    imageData.comments.forEach(comment => {
        const li = document.createElement('li');
        li.textContent = comment.content;
        commentsList.appendChild(li);
    });
}

// Event listener for like button
const likeButton = document.getElementById('like-button');
likeButton.addEventListener('click', async () => {
    const likeCount = document.getElementById('like-count');
    const currentLikes = parseInt(likeCount.textContent);
    likeCount.textContent = `${currentLikes + 1} likes`;
});

// Event listener for comment form submission
const commentForm = document.getElementById('comment-form');
commentForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const commentInput = document.getElementById('comment');
    const newComment = commentInput.value;

    // Call the function to add comment to the UI
    addCommentToUI(newComment);    // Clear comment input field after submission
    commentInput.value = '';
});

// Function to add a new comment to the comments list in UI
function addCommentToUI(comment) {
    const commentsList = document.getElementById('comments-list');
    const li = document.createElement('li');
    li.textContent = comment;
    commentsList.appendChild(li);
}

// Initial function call to update image card on page load
updateImageCard();
