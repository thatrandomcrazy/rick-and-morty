import { getContent } from "./services/services.js"
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
  // TODO: Implement the UI update
  // 1. Get the grid element
  const wrapper = document.createElement("div");
  wrapper.classList.add("wrapper");
  content.appendChild(wrapper);

  // 2. Clear existing content
  
  // 3. For each character in data.results:
  //    - Create a card element
  //    - Add character image, name, status, species, location
  //    - Make the card clickable (link to character-detail.html)
  if (state.data && state.data.results) {

    const results = state.data.results;

    results.forEach(obj => {
      const card = document.createElement("article");
      const characterCard = document.createElement("div");
      characterCard.classList.add("characterCard");
      card.classList.add("card");
      
      // img
      const imgUrl = `${obj.image}`;
      const img = document.createElement("img");
      img.id = `${obj.id}.img`;
      img.src = imgUrl;
      card.appendChild(img);
      //name and status  
      const nameStatus = document.createElement("div");
      nameStatus.classList.add("section");
      // name
      const name = document.createElement("h2");
      name.style.cursor= "pointer";
      name.textContent = obj.name;
      name.id = `${obj.id}.name`;
      name.addEventListener("click",()=>{
        window.location.replace(`character-detail.html/?id=${obj.id}`);
      })
      nameStatus.appendChild(name);
      // status
      const status = document.createElement("span");
      status.textContent =`${obj.status} - ${obj.species}`;
      status.id = `${obj.id}.status`;
      nameStatus.appendChild(status);

      characterCard.appendChild(nameStatus);
      
      // location
      const location = document.createElement("span");
      location.textContent = obj.origin.name;
      location.id = `${obj.id}.location`;
      characterCard.appendChild(location);
      
      
      
      card.appendChild(characterCard)
      wrapper.appendChild(card);
    });
  } else {
    console.warn("No character data available to update the UI.");
  }
  // 4. Update pagination UI
  //create pages next



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

// TODO: Add event listeners
// 1. Previous page button click
// 2. Next page button click
// 3. Search input with debounce
// 4. Call loadCharacters() on page load
