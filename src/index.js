fetch("http://localhost:3000/images")
.then((res) => res.json())
.then((images) => {
  console.log("Inside GET Fetch: ", images);

  renderCardImage(images)
});

const containerEl = document.querySelector(".image-container")
console.log("conrainerEl: ", containerEl)

function renderCardImage (datas) {

for (let i = 0; i < datas.length; i++){
const data = datas[i]
// console.log("inside data: ", data)

const articleEl = document.createElement("article")
articleEl.className = "image-card"
containerEl.append(articleEl)
console.log("articleEl: ", articleEl)

const headingEl = document.createElement("h2")
headingEl.className = "title"
headingEl.innerText = data.title
articleEl.append(headingEl)

const imageEl = document.createElement("img")
imageEl.src = data.image
imageEl.className = "image"
articleEl.append(imageEl)

const divEl = document.createElement("div")
divEl.className = "likes-section"
articleEl.append(divEl)

const spanEl = document.createElement("span")
spanEl.className = "likes"
spanEl.innerText = data.likes
divEl.append(spanEl)

const buttonEl = document.createElement("button")
buttonEl.className = "like-button"
buttonEl.innerText = "♥"

buttonEl.addEventListener("click", () => {
console.log("clicked!: ", data.id, data.likes)

const likesToUpdate = {

  likes: data.likes + 1
}
const fetchOptions = {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(likesToUpdate)
}

fetch(`http://localhost:3000/images/${data.id}`, fetchOptions)
  .then((res) => res.json())
  .then((updatedLikes) => {
    console.log("Inside PATCH Fetch: ", updatedLikes);
  })
});
divEl.append(buttonEl)

// const like = fetch('http://localhost:3000/data.like/1', {
//   method: 'DELETE'
// })
// console.log(like)



// likesButton.addEventListener("click", () => {
//   console.log("clicked! ", image.id, image.likes)

  // You need access to the "id" and the current "likes" of an image/post

  // Write our fetch request in here...
// })

const listEl = document.createElement("ul")
listEl.className = "comments"
articleEl.append(listEl)

data.comments.forEach((item) => {
  const listItemEl = document.createElement("li")
  listItemEl.innerText = item.content
  listEl.append(listItemEl)
});

const formEl = document.createElement("form")
formEl.className = "comment-form", "image-card"
containerEl.append(formEl)

const commentFormEl = document.createElement("form")
commentFormEl.className = "comment-form"
articleEl.append(commentFormEl)

const inputEl = document.createElement("input")
inputEl.className = "comment-input"
inputEl.type = "text"
inputEl.name = "comment"
inputEl.placeholder = "Add a comment..."
commentFormEl.append(inputEl)

const btnEl = document.createElement("button")
btnEl.className = "comment-button"
btnEl.type = "submit"
btnEl.innerText = "Post"
btnEl.addEventListener("click", () => {;
console.log("Inside btnEl: ", btnEl)
});
commentFormEl.append(btnEl)
}
}