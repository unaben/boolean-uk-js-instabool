// write your code here

let images = []

fetch("http://localhost:3000/images")
  .then((res) => res.json())
  .then((images) => {
    console.log("Inside GET Fetch: ", images);
for (let i = 0; i < images.length; i++) {
    const imageData = images[i]
    console.log("Inside ImageData: ", imageData)
}
    renderCardImage(images)
  });
  console.log("images: ", images)
const containerEl = document.querySelector(".image-container")

function renderCardImage (datas) {

  for (let i = 0; i < datas.length; i++){
const data = datas[i]
console.log("inside data: ", data)

const articleEl = document.createElement("article")
articleEl.className = "image-card"
containerEl.append(articleEl)
console.log("articleEl: ", articleEl)

const titleEl = document.createElement("h2")
titleEl.className = "title"
titleEl.innerText = data.title
articleEl.append(titleEl)

const imageEl = document.createElement("img")
imageEl.src = data.image
imageEl.className = "image"
articleEl.append(imageEl)

const frameEl = document.createElement("div")
frameEl.className = "likes-section"
articleEl.append(frameEl)

const spanEl = document.createElement("span")
spanEl.className = "likes"
spanEl.innerText = data.likes
frameEl.append(spanEl)

const buttonEl = document.createElement("button")
buttonEl.className = "like-button"
buttonEl.innerText = "♥"
frameEl.append(buttonEl)

const ulEl = document.createElement("ul")
ulEl.className = "comments"
articleEl.append(ulEl)

const listEl = document.createElement("li")

data.comments.forEach((item) => {
    const listEl = document.createElement("li")
    listEl.innerText = item.content
    ulEl.append(listEl)
});
}
}

 