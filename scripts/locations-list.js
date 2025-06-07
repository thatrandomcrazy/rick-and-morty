/**
 * Locations Page Script
 * Handles the display and interaction of the locations list page
 */

// State management for the locations page
const state = {
  page: 1,
  data: null,
  search: "",
};

/**
 * Updates the UI with location data
 * @param {Object} data - The location data from the API
 * @param {Array} data.results - Array of location objects
 * @param {Object} data.info - Pagination information
 */
function updateUI(data) {
  let grid = document.querySelector(".locations-grid");
  if (!grid) {
    grid = document.createElement("div");
    grid.className = "locations-grid";
    document.body.appendChild(grid);
  }
  grid.innerHTML = "";

  // 1. Clear existing content and show locations
  if (!data.results || data.results.length === 0) {
    grid.innerHTML = "<p>No locations found.</p>";
    return;
  }

  data.results.forEach((location) => {
    const card = document.createElement("a");
    card.className = "location-card";
    card.href = `location-detail.html?id=${location.id}`;
    card.innerHTML = `
      <h3>${location.name}</h3>
      <p><strong>Type:</strong> ${location.type || "Unknown"}</p>
      <p><strong>Dimension:</strong> ${location.dimension || "Unknown"}</p>
      <p><strong>Residents:</strong> ${location.residents.length}</p>
    `;
    grid.appendChild(card);
  });

  // 2. Pagination controls
  let pagination = document.querySelector(".pagination");
  if (!pagination) {
    pagination = document.createElement("div");
    pagination.className = "pagination";
    document.body.appendChild(pagination);
  }
  pagination.innerHTML = `
    <button id="prev-page" ${state.page <= 1 ? "disabled" : ""}>Prev</button>
    <span>Page ${state.page} of ${data.info.pages}</span>
    <button id="next-page" ${
      state.page >= data.info.pages ? "disabled" : ""
    }>Next</button>
  `;

  document.getElementById("prev-page").onclick = () => {
    if (state.page > 1) {
      state.page--;
      loadLocations();
    }
  };
  document.getElementById("next-page").onclick = () => {
    if (state.page < data.info.pages) {
      state.page++;
      loadLocations();
    }
  };
}

/**
 * Shows a loading message
 */
function showLoading() {
  let loadingMessage = document.getElementById("loading-message");
  if (!loadingMessage) {
    loadingMessage = document.createElement("div");
    loadingMessage.id = "loading-message";
    loadingMessage.textContent = "Loading locations...";
    document.body.appendChild(loadingMessage);
  }
  loadingMessage.style.display = "block";
}

/**
 * Hides the loading message
 */
function hideLoading() {
  const loadingMessage = document.getElementById("loading-message");
  if (loadingMessage) {
    loadingMessage.style.display = "none";
  }
}

/**
 * Shows an error message
 */
function displayError(message) {
  let errorContainer = document.getElementById("error-message");
  if (!errorContainer) {
    errorContainer = document.createElement("div");
    errorContainer.id = "error-message";
    errorContainer.style.color = "red";
    errorContainer.style.margin = "1em 0";
    document.body.prepend(errorContainer);
  }
  errorContainer.textContent = message;
  errorContainer.style.display = "block";
}

/**
 * Loads location data from the API
 */
function loadLocations() {
  showLoading();
  hideError();

  let url = `https://rickandmortyapi.com/api/location?page=${state.page}`;
  if (state.search && state.search.trim() !== "") {
    url += `&name=${encodeURIComponent(state.search.trim())}`;
  }

  fetch(url)
    .then((response) => {
      if (!response.ok) throw Error("Failed to fetch locations");
      return response.json();
    })
    .then((data) => {
      state.data = data;
      updateUI(data);
    })
    .catch((error) => {
      displayError(error.message || "An error occurred");
    })
    .finally(() => {
      hideLoading();
    });
}

/**
 * Hides the error message
 */
function hideError() {
  const errorContainer = document.getElementById("error-message");
  if (errorContainer) {
    errorContainer.style.display = "none";
  }
}

// --- Search functionality with debounce ---
let debounceTimeout = null;
function handleSearchInput(e) {
  state.search = e.target.value;
  state.page = 1;
  if (debounceTimeout) clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    loadLocations();
  }, 400);
}

// --- Initialize the page ---
document.addEventListener("DOMContentLoaded", () => {
  // Create search input
  let searchDiv = document.querySelector(".search-bar");
  if (!searchDiv) {
    searchDiv = document.createElement("div");
    searchDiv.className = "search-bar";
    searchDiv.innerHTML = `
      <input type="text" id="search-input" placeholder="Search locations..." autocomplete="off" />
    `;
    document.body.prepend(searchDiv);
  }
  document
    .getElementById("search-input")
    .addEventListener("input", handleSearchInput);

  loadLocations();
});
