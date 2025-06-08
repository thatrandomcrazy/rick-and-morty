import { getContent } from "./services/services.js"
import { debounce, ApiUrl } from "./utils/utils.js";
/**
 * Characters Page Script
 * Handles the display and interaction of the characters list page
 */
document.addEventListener("DOMContentLoaded", loadCharacters);
const url = `${ApiUrl.characters}?page=`
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
function clearContent() {
  content.innerHTML = '';
}

function createCharacterCard(character) {
  const card = document.createElement("article");
  card.classList.add("card");

  const img = document.createElement("img");
  img.src = character.image;
  img.alt = `${character.name} image`;
  card.appendChild(img);

  const details = document.createElement("div");
  details.classList.add("characterCard");

  const name = document.createElement("h2");
  name.textContent = character.name;
  name.tabIndex = 0;
  name.style.cursor = "pointer";
  name.addEventListener("click", () => {
    window.location.replace(`character-detail.html?id=${character.id}`);
  });

  const status = document.createElement("span");
  status.textContent = `${character.status} - ${character.species}`;

  const location = document.createElement("span");
  location.textContent = character.origin.name;

  details.append(name, status, location);
  card.appendChild(details);

  return card;
}

 function renderPagination(pagesCount, currentPage) {
  const pagination = document.createElement("div");
  pagination.classList.add("pagination");

  // Previous button
  const prevBtn = document.createElement("button");
  prevBtn.textContent = "Prev";
  prevBtn.id = "prevPage";
  prevBtn.disabled = currentPage === 1;
  prevBtn.onclick = () => changePage(currentPage - 1);
  pagination.appendChild(prevBtn);

  // Page buttons
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(pagesCount, currentPage + 2);
  for (let i = start; i <= end; i++) {
    const pageBtn = document.createElement("button");
    pageBtn.textContent = i;
    if (i === currentPage) pageBtn.classList.add("active");
    pageBtn.onclick = () => changePage(i);
    pagination.appendChild(pageBtn);
  }

  // Next button
  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Next";
  nextBtn.id = "nextPage";
  nextBtn.disabled = currentPage === pagesCount;
  nextBtn.onclick = () => changePage(currentPage + 1);
  pagination.appendChild(nextBtn);

  return pagination;
}

function ShowPageNextPrev() {
  const next = document.getElementById("nextPage");
  const prev = document.getElementById("prevPage");
  if (next && prev) {

    if (state.page == pagesCount) {
      next.classList.add("hidden");
    } else {
      next.classList.add("present");

    }
    if (state.page == 1) {

      prev.classList.add("hidden");
    } else {
      prev.classList.add("present");
    }
  }
}

function updateUI() {
  clearContent();
  if (!state.data || !state.data.results) {
    content.textContent = "No character data available.";
    return;
  }

  const wrapper = document.createElement("div");
  wrapper.classList.add("wrapper");
  state.data.results.forEach(character => {
    wrapper.appendChild(createCharacterCard(character));
  });
  content.appendChild(wrapper);

  content.appendChild(renderPagination(state.data.info.pages, state.page));
  ShowPageNextPrev();
}

function changePage(page) {
  state.page = page;
  if (searchMode) {
    state.data.results = characterSearch.getPage(state.page);
    updateUI();
  } else {
    loadCharacters();
  }
}

async function loadCharacters() {
  const loader = document.querySelector(".loading");
  loader.style.display = "block";
  content.style.display = "none";
  const URL = url + state.page;
  try {
    const res = await getContent(URL);
    state.data = res;
    loader.style.display = "none";
    content.style.display = "block";
    updateUI();
  } catch (error) {
    loader.style.display = "none";
    content.style.display = "block";
    content.textContent = "Failed to load character data.";
    console.warn("error: ", error);
  }
}

// SOLID-compliant search with pagination
class CharacterSearch {
  constructor(getContent, url) {
    this.getContent = getContent;
    this.url = url;
    this.results = [];
    this.pagesCount = 0;
  }

  async searchByName(name) {
    // Fetch all pages in parallel and filter by name
    const firstPage = await this.getContent(this.url + 1);
    this.pagesCount = firstPage.info.pages;
    let promises = [Promise.resolve(firstPage.results.filter(c => c.name.toLowerCase().includes(name.toLowerCase())))];
    
    for (let i = 2; i <= this.pagesCount; i++) {
      promises.push(
        this.getContent(this.url + i).then(data =>
          data.results.filter(c => c.name.toLowerCase().includes(name.toLowerCase()))
        )
      );
    }
    const resultsArray = await Promise.all(promises);
    this.results = resultsArray.flat();
    return this.results;
  }

  getPage(page, perPage = 20) {
    // Return a slice of results for the current page
    const start = (page - 1) * perPage;
    return this.results.slice(start, start + perPage);
  }

  getTotalPages(perPage = 20) {
    return Math.ceil(this.results.length / perPage);
  }
}

// Usage in your UI logic
const searchBar = document.getElementById("search_bar_input");
const characterSearch = new CharacterSearch(getContent, url);
let searchMode = false;




const handleSearch = async () => {
  const value = searchBar.value.trim();
  if (value) {
    searchMode = true;
    await characterSearch.searchByName(value);
    state.page = 1;
    state.data = {
      results: characterSearch.getPage(state.page),
      info: { pages: characterSearch.getTotalPages() }
    };
    updateUI();
  } else {
    searchMode = false;
    state.page = 1;
    await loadCharacters();
  }
};

searchBar.addEventListener("input", debounce(handleSearch, 300));

const searchBarBtn = document.getElementById("search_bar_btn");
searchBarBtn.addEventListener("click", (event) => {
  event.preventDefault();
  handleSearch();
});