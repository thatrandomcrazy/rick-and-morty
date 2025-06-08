/**
 * Episodes Page Script
 * Handles the display and interaction of the episodes list page
 */
import { getContent } from "./services/services.js";
document.addEventListener("DOMContentLoaded", loadEpisodes);
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
function updateUI(data) {
  // TODO: Implement the UI update
  // 1. Get the grid element
  // 2. Clear existing content
  // 3. For each episode in data.results:
  //    - Create a card element
  //    - Add episode name, air date, episode code, and character count
  //    - Make the card clickable (link to episode-detail.html)
  // 4. Update pagination UI
  throw new Error("updateUI not implemented");
}

/**
 * Loads episode data from the API
 */
function loadEpisodes() {
  // TODO: Implement episode loading
  getContent(url + state.page).then((data) => {
    console.log(data);
  })

  // 1. Show loading state
  // 2. Fetch episode data using the API module
  // 3. Update UI with the results
  // 4. Handle any errors
  // 5. Hide loading state
}

// TODO: Add event listeners
// 1. Previous page button click
// 2. Next page button click
// 3. Search input with debounce
// 4. Call loadEpisodes() on page load
