/**
 * Episode Detail Page Script
 * Handles the display of detailed information for a single episode
 */

/**
 * Loads and displays details for a specific episode
 * @param {string} id - The episode ID to load
 */
function loadEpisodeDetails(id) {
  // TODO: Implement episode detail loading
  // 1. Show loading state
  // 2. Fetch episode data using the API module
  // 3. Extract character IDs from episode.characters URLs
  // 4. Fetch all characters that appear in this episode
  // 5. Update UI with episode and character data
  // 6. Handle any errors
  // 7. Hide loading state
  throw new Error("loadEpisodeDetails not implemented");
}

/**
 * Updates the UI with episode and character data
 * @param {Object} episode - The episode data
 * @param {Array} characters - Array of character data
 */
function updateUI(episode, characters) {
  // TODO: Implement the UI update
  // 1. Get the detail container element
  // 2. Create episode header with basic info
  // 3. Create characters section
  // 4. For each character:
  //    - Create a card with image and basic info
  //    - Make the card link to the character detail page
  // 5. Handle empty states (no characters)
  throw new Error("updateUI not implemented");
}

// TODO: Initialize the page
// 1. Get episode ID from URL parameters
// 2. Validate the ID
// 3. Load episode details if ID is valid
// 4. Show error if ID is invalid or missing
