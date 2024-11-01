const apiKey = "c9162d5b8c9045c48977cc13710496c7"

const container = document.querySelector(".container");
const optionsContainer = document.querySelector(".options-container");


const country = "us";
const option = ["General", "Entertainment", "Health", "Science", "Sport", "Technology"];
let requestURL;

const generateUI =(articles) => {
    for (let item of articles){
        let card = document.createElement("div");
        card.classList.add("news-card");
        card.innerHTML = `<div 
        class="news-image-container">
        <img scr="${item.urlToImage}
        "alt=""/>
        </div>
        <div class="news-content">
            <div class="news-title">
                ${item.title}
            </div>
            <div class="news-description">
            ${item.description || item.content || ""}
            </div>
            <a href="${item.url}" target="_blank"
            class="view-button">Read More</a>
        </div>`;   

        container.appendChild(card);
    }
};

const getNews = async () => {
    container.innerHTML = "";
    let response = await fetch(requestURL);
    if(!response.ok){
        alert("Data unavailable at the moment. Please try again later");
        return false
    }
    let data = await response.json();
    generateUI(data.articles);
}

const selectCategory = (e, category) => {
    let options = document.querySelectorAll(".option");
    options.forEach((element) => {
        element.classList.remove("active")
    });
    requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&categoty=general&apiKey=${apiKey}`;
    e.target.classList.add(".active");
    getNews();
}

const createOptions = () => {
    for(let i of option){
        optionsContainer.innerHTML += `<button class="option ${i == "general" ? "active" : ""}"
        onclick="selectCategory(event, '${i}')">${i}</button>`;
    }
}
const init = () => {
    optionsContainer.innerHTML = "";
    getNews();
    createOptions();
};

window.onload = () => {
    requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&categoty=general&apiKey=${apiKey}`;
    init();
};