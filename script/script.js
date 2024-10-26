const apiKey = "af9427b158db4c92b336098ff97bf902"
const blogContainer = document.getElementById(
    'block-container');

async function fetchrandomNews(){
    try{
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`
        const response = await fetch(apiUrl)
        const data = await response.json()
        return data.articles;
    }catch(error){
        console.error("Error fetching random news", error)
        return [];
    } 
}

function displayBlogs(articles){
    blogContainer.innerHTML = "";
    articles.forEach((article) => {
        const blogCard = document.createElement("div")
        blogCard.classList.add("blog-cards")
        const img = document.createElement("img")
        img.src = article.urlToImage
        img.alt = article.title
        const title = document.createElement("h2")
        const truncatedTitle = article.title.length > 30 ?
        article.title.slice(0, 30) + "...." : article.title;
        title.textContent = truncatedTitle;
        const description = document.createElement("p");
        const truncateddes = article.description.length > 120 ?
        article.description.slice(0, 120) + "...." : article.description;
        description.textContent = truncateddes;


        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogContainer.appendChild(blogCard);

    });
}


(async () =>{
    try{
        const articles = await fetchrandomNews();
        displayBlogs(articles);
    }catch(error){
        console.error("Error fetching random news", error)
    }

})();