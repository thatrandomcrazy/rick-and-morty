/**
 * Location Detail Page Script
 * Handles the display of detailed information for a single location
 */

/**
 * Loads and displays details for a specific location
 * @param {string} id - The location ID to load
 */
function loadLocationDetails(id) {
  // TODO: Implement location detail loading
  // 1. Show loading state
  // 2. Fetch location data using the API module
  // 3. Extract resident IDs from location.residents URLs
  // 4. Fetch all residents of this location
  // 5. Update UI with location and resident data
  // 6. Handle any errors
  // 7. Hide loading state
  throw new Error("loadLocationDetails not implemented");
}

/**
 * Updates the UI with location and resident data
 * @param {Object} location - The location data
 * @param {Array} residents - Array of resident data
 */
function updateUI(location, residents) {
  // TODO: Implement the UI update
  // 1. Get the detail container element
  // 2. Create location header with basic info
  // 3. Create residents section
  // 4. For each resident:
  //    - Create a card with image and basic info
  //    - Make the card link to the character detail page
  // 5. Handle empty states (no residents)
  throw new Error("updateUI not implemented");
}

// TODO: Initialize the page
// 1. Get location ID from URL parameters
// 2. Validate the ID
// 3. Load location details if ID is valid
// 4. Show error if ID is invalid or missing
