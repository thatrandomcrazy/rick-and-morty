/**
 * Character Detail Page Script
 * Handles the display of detailed information for a single character
 */
/**
 * Loads and displays details for a specific character
 * @param {string} id - The character ID to load
 */
document.addEventListener("DOMContentLoaded", () => {
  loadCharacterDetails();
});
function loadCharacterDetails(id) {
  // TODO: Implement character detail loading
  // 1. Show loading state
  function showLoading() {
    const loadingMessage = document.getElementById("loading-message");
    if (loadingMessage) {
      loadingMessage.style.display = "block";
    }
  }
  showLoading();

  // 2. Fetch character data using the API module

  fetch(`https://rickandmortyapi.com/api/character/${id}`)
    .then((Response) => {
      if (!Response.ok) throw Error("response was not ok");
      return Response.json();
    })
    .then((Data) => {})
    .catch((error) => {
      console.error("fetch error: ", error);
    })
    .finally(() => {
      HideLoading();
    });
}

// 7. Hide loading state
function HideLoading() {
  const loadingMessage = document.getElementById("loading-message");
  if (loadingMessage) {
    loadingMessage.style.display = "none";
  }
}
// 3. Extract episode IDs from character.episode URLs
// 4. Fetch all episodes this character appears in
// 5. Update UI with character and episode data
// 6. Handle any errors
// throw new Error("loadCharacterDetails not implemented");

/**
 * Updates the UI with character and episode data
 * @param {Object} character - The character data
 * @param {Array} episodes - Array of episode data
 */
function updateUI(character, episodes) {
  // TODO: Implement the UI update
  // 1. Get the detail container element
  // 2. Create character header with image and basic info
  // 3. Add links to origin and current location
  // 4. Create episodes section with all episodes the character appears in
  // 5. Handle empty states and errors
  throw new Error("updateUI not implemented");
}

// TODO: Initialize the page
// 1. Get character ID from URL parameters
// 2. Validate the ID
// 3. Load character details if ID is valid
// 4. Show error if ID is invalid or missing
