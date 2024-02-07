let searchForm = document.getElementById("search-form");
let searchBox = document.getElementById("search-box");
let searchResult = document.getElementById("search-result");
let showMoreButton = document.getElementById("show-more-btn");

let accessKey = "U0BChlFr80HLU4RPigtFiNV0D95nD0eEbSKK_eMADw4";
let keyword = "";
let page = 1;

async function searchImages() {
  keyword = searchBox.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

  const response = await fetch(url);
  const data = await response.json();

  if (page === 1) {
    searchResult.innerHTML = "";
  }

  const results = data.results;
  results.map((item) => {
    const image = document.createElement("img");
    image.src = item.urls.small;
    const imageLink = document.createElement("a");
    imageLink.href = item.links.html;
    imageLink.target = "_blank";

    imageLink.appendChild(image);
    searchResult.appendChild(imageLink);
  });
  showMoreButton.style.display = "block";
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

showMoreButton.addEventListener("click", () => {
  page++;
  searchImages();
});
