/**
 * Characters Page Script
 * Handles the display and interaction of the characters list page
 */
document.addEventListener("DOMContentLoaded", loadCharacters);

// State management for the characters page
const state = {
  page: 1,
  data: null,
  search: "",
};

/**
 * Updates the UI with character data
 * @param {Object} data - The character data from the API
 * @param {Array} data.results - Array of character objects
 * @param {Object} data.info - Pagination information
 */
function updateUI() {
  console.log(state.data.results[0]);
  state.data.results.forEach(obj => {
    const character = JSON.stringify(obj);
    content.textContent += `${(character)}`;
    
  });
  // TODO: Implement the UI update
  // 1. Get the grid element
  // 2. Clear existing content
  // 3. For each character in data.results:
  //    - Create a card element
  //    - Add character image, name, status, species, location
  //    - Make the card clickable (link to character-detail.html)
  // 4. Update pagination UI

}

const loader = document.querySelector(".loading");
const content = document.querySelector(".content");
loader.style.display = "block";
content.style.display = "none";
/**
 * Loads character data from the API
 */
async function loadCharacters() {
  // TODO: Implement character loading
  // 1. Show loading state

  // 2. Fetch character data using the API module
  const url = `https://rickandmortyapi.com/api/character/?page=${state.page}`
  const data = getContent(url);
  data.then(res => {
     state.data = res;
     loader.style.display = "none"
     content.style.display = "block"
     updateUI();
  }).catch(error => console.warn("error: ", error));
  // 3. Update UI with the results
  // 4. Handle any errors
  // 5. Hide loading state
}
const getContent = async (url) => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      return response.json();
    }
    else {
      throw response.json();
    }
  }
  catch (error) {
    console.warn(error);
  }
}

// TODO: Add event listeners
// 1. Previous page button click
// 2. Next page button click
// 3. Search input with debounce
// 4. Call loadCharacters() on page load
