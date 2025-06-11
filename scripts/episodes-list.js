/**
 * Episodes Page Script
 * Handles the display and interaction of the episodes list page
 */
import { getContent } from "./services/services.js";
import { debounce } from "./utils/utils.js";
document.addEventListener("DOMContentLoaded", loadEpisodes);
const content = document.querySelector("#episodes_content");
let pagesCount;

// State management for the episodes page
const state = {
  page: 1,
  data: null,
  search: "",
};
const url = `https://rickandmortyapi.com/api/episode/?page=`
/**
 * Updates the UI with episode data
 * @param {Object} data - The episode data from the API
 * @param {Array} data.results - Array of episode objects
 * @param {Object} data.info - Pagination information
 
 */

function clearContent() {
  content.innerHTML = '';
}
function createEpisodeCard(episode) {
  const card = document.createElement("article");
  card.classList.add("card");

  const details = document.createElement("div");
  details.classList.add("characterCard");

  const name = document.createElement("h2");
  name.textContent = episode.name;
  name.tabIndex = 0;
  name.style.cursor = "pointer";
  name.addEventListener("click", () => {
    window.location.replace(`episode-detail?id=${episode.id}`);
  });

  const airDate = document.createElement("span");
  airDate.textContent = `Air Date: ${episode.air_date}`;

  const code = document.createElement("span");
  code.textContent = `Episode: ${episode.episode}`;

  const charCount = document.createElement("span");
  charCount.textContent = `Characters: ${episode.characters.length}`;

  details.append(name, airDate, code, charCount);
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
function updateUI(data) {
  clearContent();
  if (!data || !data.results) {
    content.textContent = "No episode data available.";
    return;
  }
  const wrapper = document.createElement("div");
  wrapper.classList.add("wrapper");
  data.results.forEach(episode => {
    wrapper.appendChild(createEpisodeCard(episode));
  });
  content.appendChild(wrapper);
  content.appendChild(renderPagination(data.info.pages, state.page));
  ShowPageNextPrev();
}

/**
 * Loads episode data from the API
 */
async function loadEpisodes() {
  const loader = document.querySelector("#loading_episodes");
  loader.style.display = "block";
  content.style.display = "none";
  const URL = url + state.page;
  try {
    const res = await getContent(URL);
    state.data = res;
    loader.style.display = "none";
    content.style.display = "block";
    updateUI(state.data);
  } catch (error) {
    loader.style.display = "none";
    content.style.display = "block";
    content.textContent = "Failed to load episode data.";
    console.warn("error: ", error);
  }
}

// 3. Update UI with the results
// 4. Handle any errors
// 5. Hide loading state

// TODO: Add event listeners
// 1. Previous page button click
// 2. Next page button click
// 3. Search input with debounce
// 4. Call loadEpisodes() on page load

// SOLID-compliant search with pagination
class EpisodeSearch {
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
const searchBar = document.getElementById("search_bar_input_eps");
const episodeSearch = new EpisodeSearch(getContent, url);
let searchMode = false;

function changePage(page) {
  state.page = page;
  if (searchMode) {
    state.data.results = episodeSearch.getPage(state.page);
    updateUI(state.data);
  } else {
    loadEpisodes();
  }
}

const handleSearch = async () => {
  const value = searchBar.value.trim();
  if (value) {
    searchMode = true;
    await episodeSearch.searchByName(value);
    state.page = 1;
    state.data = {
      results: episodeSearch.getPage(state.page),
      info: { pages: episodeSearch.getTotalPages() }
    };
    updateUI(state.data);
  } else {
    searchMode = false;
    state.page = 1;
    await loadEpisodes();
  }
};

searchBar.addEventListener("input", debounce(handleSearch, 300));

const searchBarBtn = document.getElementById("search_bar_btn_eps");
if (searchBarBtn) {
  searchBarBtn.addEventListener("click", (event) => {
    event.preventDefault();
    handleSearch();
  });
}
