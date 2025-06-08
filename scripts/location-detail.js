/**
 * Location Detail Page Script
 * Handles the display of detailed information for a single location
 */

/**
 * Loads and displays details for a specific location
 * @param {string} id - The location ID to load
 */
function loadLocationDetails(id) {
  showLoading();

  fetch(`https://rickandmortyapi.com/api/location/${id}`)
    .then((response) => {
      if (!response.ok) throw Error("Network response was not ok");
      return response.json();
    })
    .then((location) => {
      // 3. Extract resident IDs from location.residents URLs
      const residentIds = location.residents.map((url) => url.split("/").pop());

      if (residentIds.length === 0) {
        updateUI(location, []);
        return;
      }

      // 4. Fetch all residents of this location
      return fetch(
        `https://rickandmortyapi.com/api/character/${residentIds.join(",")}`
      )
        .then((res) => {
          if (!res.ok) throw Error("Failed to fetch residents");
          return res.json();
        })
        .then((residentsData) => {
          // residentsData יכול להיות אובייקט בודד או מערך
          const residents = Array.isArray(residentsData)
            ? residentsData
            : [residentsData];
          updateUI(location, residents);
        });
    })
    .catch((error) => {
      displayError(error.message || "An error occurred");
    })
    .finally(() => {
      hideLoading();
    });
}

/**
 * Updates the UI with location and resident data
 * @param {Object} location - The location data
 * @param {Array} residents - Array of resident data
 */
function updateUI(location, residents) {
  let contentDiv = document.querySelector(".content");
  if (!contentDiv) {
    // אם אין, ניצור אותו
    contentDiv = document.createElement("div");
    contentDiv.className = "content";
    document.body.appendChild(contentDiv);
  }
  // Always ensure content is visible
  contentDiv.style.display = "block";

  // 2. Create location header with basic info
  contentDiv.innerHTML = `
    <h2>${location.name}</h2>
    <p><strong>Type:</strong> ${location.type || "Unknown"}</p>
    <p><strong>Dimension:</strong> ${location.dimension || "Unknown"}</p>
    <p><strong>Number of Residents:</strong> ${residents.length}</p>
    <h3>Residents:</h3>
    <div class="residents-grid">
      ${
        residents.length === 0
          ? "<p>No residents found for this location.</p>"
          : residents
              .map(
                (resident) => `
          <a class="resident-card" href="character-detail.html?id=${resident.id}">
            <img src="${resident.image}" alt="${resident.name}" />
            <div class="resident-info">
              <h4>${resident.name}</h4>
              <p>${resident.species} - ${resident.status}</p>
            </div>
          </a>
        `
              )
              .join("")
      }
    </div>
  `;
}

function showLoading() {
  let loadingMessage = document.getElementById("loading-message");
  if (!loadingMessage) {
    loadingMessage = document.createElement("div");
    loadingMessage.id = "loading-message";
    loadingMessage.textContent = "Loading location details...";
    document.body.appendChild(loadingMessage);
  }
  loadingMessage.style.display = "block";
}

function hideLoading() {
  const loadingMessage = document.getElementById("loading-message");
  if (loadingMessage) {
    loadingMessage.style.display = "none";
  }
}

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

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  // 1. Get location ID from URL parameters
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  // 2. Validate the ID
  if (!id || isNaN(id)) {
    displayError("Invalid location ID.");
    return;
  }
  // 3. Load location details if ID is valid
  loadLocationDetails(id);
});