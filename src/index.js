// let allImages = [];
// let incomingImages = [];
// let allComments = [];

fetch("http://localhost:3000/images")
  .then((res) => res.json())
  .then((images) => {
    console.log("Inside GET Fetch: ", images);

    // incomingImages.push(images);// adding one item to the array
    // console.log("INCOMING Images: ", incomingImages);

    // allImages = images; // replace the array
    // console.log("All Images: ", allImages);

    renderCardImage(images);

    renderCreatePost(images);
  });  

fetch("http://localhost:3000/comments")
.then((res) => res.json())
.then((commentData) => {
  console.log("inside comment fetch:", commentData);

  renderComment(commentData);

  renderForm(commentData);

  // allComments = commentData;
  // console.log("ALL COMMENTS: ", allComments);
});

const containerEl = document.querySelector(".image-container");
console.log("containerEl: ", containerEl);

function renderCreatePost(data) {
  console.log("Length: ", data, data.length);

  const postFormEl = document.querySelector(".post-form");
  console.log("PostFormEl: ", postFormEl);

  postFormEl.addEventListener("submit", (event) => {
    event.preventDefault();

    console.log("PostFormEl CLICKED!");
    const titleInput = postFormEl.title;
    const imageInput = postFormEl.image;
    console.log("VALUE: ", titleInput.value, imageInput.value);

    const newPostToPost = {
      id: data.length + 1,
      image: imageInput.value,
      likes: 1,
      title: titleInput.value,
    };
    console.log("newPostToPost: ", newPostToPost);

    const url = `http://localhost:3000/images`;

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPostToPost),
    };

    fetch(url, fetchOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log("Success: ", data);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  });
}

function renderCardImage(imageData) {
  console.log("renderCardImage: ", imageData);

  for (let i = 0; i < imageData.length; i++) {
    const data = imageData[i];
    console.log("inside loop  imageData: ", data);

    const articleEl = document.createElement("article");
    articleEl.className = "image-card";
    containerEl.append(articleEl);
    console.log("articleEl: ", articleEl);

    const headingEl = document.createElement("h2");
    headingEl.className = "title";
    headingEl.innerText = data.title;
    articleEl.append(headingEl);

    const imageEl = document.createElement("img");
    imageEl.src = data.image;
    imageEl.className = "image";
    articleEl.append(imageEl);

    const divEl = document.createElement("div");
    divEl.className = "likes-section";
    articleEl.append(divEl);

    const spanEl = document.createElement("span");
    spanEl.className = "likes";
    spanEl.innerText = data.likes;
    divEl.append(spanEl);

    const buttonEl = document.createElement("button");
    buttonEl.className = "like-button";
    buttonEl.innerText = "♥";

    buttonEl.addEventListener("click", () => {
      console.log("clicked!: ", data.id, data.likes);

      const likesToUpdate = {
        likes: data.likes + 1,
      };
      const fetchOptions = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(likesToUpdate),
      };

      fetch(`http://localhost:3000/images/${data.id}`, fetchOptions)
        .then((res) => res.json())
        .then((updatedLikes) => {
          console.log("Inside PATCH Fetch: ", updatedLikes);
        });
    });
    divEl.append(buttonEl);
  }
}

function renderComment(comment) {
  console.log("inside renderComment: ", comment);
  const listEl = document.createElement("ul");
  listEl.className = "comments";
  containerEl.append(listEl);

  comment.forEach((item) => {
    const listItemEl = document.createElement("li");
    listItemEl.innerText = item.content;
    listEl.append(listItemEl);

    const buttonEl = document.createElement("button");
    buttonEl.type = "delete";
    buttonEl.innerText = "DELETE";
    // console.log("Inside forEach:", item.id)

    buttonEl.addEventListener("click", (e) => {
      e.preventDefault();
      // console.log("DELETE CLICKED!");
      deleteComment(item.id);
    });

    listItemEl.append(buttonEl);
  });
}

function deleteComment(id) {
  const fetchOptions = {
    method: "DELETE",
  };
  fetch(`http://localhost:3000/comments/${id}`, fetchOptions)
    .then((res) => res.json())
    .then((commentData) => {
      commentData.filter((data) => data.id !== id);
      // console.log("COMMENT DATA:", commentData);
    });
}

function renderForm(data) {
  console.log("Inside renderForm: ", data, data.length);

  const commentFormEl = document.querySelector(".second-form");
  console.log("CommentFormEl: ", commentFormEl);
  containerEl.append(commentFormEl);

  const input = commentFormEl.comment;
  console.log("INPUT: ", input.value);

  commentFormEl.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Submit!");

    const commentToPost = {
      id: data.length + 1,
      content: input.value,
      imageId: 1,
    };

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentToPost),
    };

    const url = `http://localhost:3000/comments`;

    fetch(url, fetchOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log("Success: ", data);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  });
}



  // const commentFormEl = document.createElement("form");
  // const commentFormEl = document.createElement("form");
  // commentFormEl.className = "comment-form";

  // console.log("CommentFormEl: ", commentFormEl);

  // const inputEl = document.createElement("input");
  // inputEl.className = "comment-input";
  // inputEl.type = "text";
  // inputEl.name = "comment";
  // inputEl.placeholder = "Add a comment...";
  // commentFormEl.append(inputEl);

  // const btnEl = document.createElement("button");
  // btnEl.className = "comment-button";
  // btnEl.type = "submit";
  // btnEl.innerText = "Post";
  // commentFormEl.append(btnEl);

// const commentToPost = {
//   id: data.length + 1,
//   content: input.value,
//   imageId: 1,
// };

// data.push(commentToPost)

// renderComment(data)
// const fetchOptions = {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(commentToPost),
// };

// fetch(`http://localhost:3000/comments`, fetchOptions)
//   .then((res) => res.json())
//   .then((newComment) => {
//     console.log("Inside Post Fetch: ", newComment);
//   });
