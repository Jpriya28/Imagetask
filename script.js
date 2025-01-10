const apiUrl = "https://jsonplaceholder.typicode.com/posts";


const searchInput = document.getElementById("searchInput");
const resultsContainer = document.getElementById("resultsContainer");


async function fetchPosts() {
  try {
    const response = await fetch(apiUrl);


    if (!response.ok) {
      throw new Error("Failed to fetch data from API");
    }

    const posts = await response.json();

  
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase();
      const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(query)
      );

  
      displayResults(filteredPosts);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}


function displayResults(posts) {
  resultsContainer.innerHTML = ""; 
  if (posts.length === 0) {
    resultsContainer.innerHTML = "<p>No matching posts found.</p>";
    return;
  }

  posts.forEach(post => {
    const resultItem = document.createElement("div");
    resultItem.classList.add("result-item");
    resultItem.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.body}</p>
    `;
    resultsContainer.appendChild(resultItem);
  });
}


fetchPosts();
