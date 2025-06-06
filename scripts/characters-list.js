import { getContent } from "./services/services.js"
/**
 * Characters Page Script
 * Handles the display and interaction of the characters list page
 */
document.addEventListener("DOMContentLoaded", loadCharacters);
const url = `https://rickandmortyapi.com/api/character/?page=`
const content = document.querySelector("#characters_list_content");
let pagesCount;
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
  const container = document.createElement("div");
  wrapper.classList.add("wrapper");
  content.appendChild(container);
  container.appendChild(wrapper);

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
      name.style.cursor = "pointer";
      name.textContent = obj.name;
      name.id = `${obj.id}.name`;
      name.addEventListener("click", () => {
        window.location.replace(`character-detail.html?id=${obj.id}`);
      })
      nameStatus.appendChild(name);
      // status
      const status = document.createElement("span");
      status.textContent = `${obj.status} - ${obj.species}`;
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
    // 4. Update pagination UI
    //create pages next
    const paginations = document.createElement("div");
    paginations.classList.add("pagination");
    container.appendChild(paginations);
    

    const paginationPrev = document.createElement("button");
    paginationPrev.innerText = "Prev";
    paginationPrev.id = "prev";
    paginationPrev.onclick = () => {
      container.remove();
      state.page--;
      loadCharacters(url + state.page);
    }
    paginations.appendChild(paginationPrev)
    


    //creating the 5 first buttons of 1 2 3 4 ...
    pagesCount = state.data.info.pages;
    let i = state.page >= 3 ? state.page - 2 : 1;
    
    let limit = state.page<=pagesCount-3 ? state.page+3: pagesCount;
    for ( i; i <= limit; i++) {
      const pagi = document.createElement("button");
      
      pagi.id= i+".pagi"
      pagi.innerText = `${i}`;
      
      pagi.onclick = () => {
        state.page = parseInt(pagi.innerText);
        container.remove();
        loadCharacters();
        pagi.style.background="red";
      }
      paginations.appendChild(pagi);
    }
    const paginationNext = document.createElement("button");

    paginationNext.innerText = "Next";
    paginationNext.id = "next";
    paginationNext.onclick = () => {
      container.remove();
      state.page++;
      loadCharacters();
    }
    paginations.appendChild(paginationNext);
  } else {
    console.warn("No character data available to update the UI.");
  }

}
const ShowPageNextPrev = () => {
  const next = document.getElementById("next");
  const prev = document.getElementById("prev");

  if (state.page == pagesCount) {
    next.style.display = "none";
  } else {
    next.style.display = "block";

  }
  if (state.page == 1) {

    prev.style.display = "none";
  } else {
    prev.style.display = "block";
  }
}
/**
 * Loads character data from the API
 */
async function loadCharacters() {
  // TODO: Implement character loading
  // 1. Show loading state
  const loader = document.querySelector(".loading");
  loader.style.display = "block";
  content.style.display = "none";
  // 2. Fetch character data using the API module
  const URL = url + state.page;
  const data = getContent(URL);
  data.then(res => {
    state.data = res;
    loader.style.display = "none";
    content.style.display = "block";

    updateUI();
    ShowPageNextPrev();
  }).catch(error => console.warn("error: ", error));

}

// TODO: Add event listeners
// 3. Search input with debounce
// 4. Call loadCharacters() on page load
