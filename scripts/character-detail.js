/**
 * Character Detail Page Script
 * Handles the display of detailed information for a single character
 */

// TODO: Initialize the page
// 1. Get character ID from URL parameters
// 2. Validate the ID
// 3. Load character details if ID is valid
// 4. Show error if ID is invalid or missing

document.addEventListener("DOMContentLoaded", () => {
  // שלב 1: שליפת id מה-URL
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (!id || isNaN(id)) {
    displayError("Invalid character ID.");
    return;
  }
  loadCharacterDetails(id);
});

function showLoading() {
  const loadingMessage = document.getElementById("loading-message");
  if (loadingMessage) {
    loadingMessage.style.display = "block";
  }
}

function hideLoading() {
  const loadingMessage = document.getElementById("loading-message");
  if (loadingMessage) {
    loadingMessage.style.display = "none";
  }
}

function displayError(message) {
  const errorContainer = document.getElementById("error-message");
  if (errorContainer) {
    errorContainer.textContent = message;
    errorContainer.style.display = "block";
  } else {
    alert(message);
  }
}

// שלב 2-4: שליפת דמות ופרקים ועדכון UI
function loadCharacterDetails(id) {
  showLoading();

  fetch(`https://rickandmortyapi.com/api/character/${id}`)
    .then((response) => {
      if (!response.ok) throw Error("Network response was not ok");
      return response.json();
    })
    .then((character) => {
      // שלב 3: חילוץ מזהי הפרקים
      const episodeIds = character.episode.map((url) => url.split("/").pop());

      if (episodeIds.length === 0) {
        updateUI(character, []);
        return;
      }

      // שלב 4: בקשה מרוכזת לכל הפרקים
      return fetch(
        `https://rickandmortyapi.com/api/episode/${episodeIds.join(",")}`
      )
        .then((epResponse) => {
          if (!epResponse.ok) throw Error("Failed to fetch episodes");
          return epResponse.json();
        })
        .then((episodesData) => {
          // אם יש רק פרק אחד, ה-API מחזיר אובייקט ולא מערך
          const episodes = Array.isArray(episodesData)
            ? episodesData
            : [episodesData];
          updateUI(character, episodes);
        });
    })
    .catch((error) => {
      displayError(error.message || "An error occurred");
    })
    .finally(() => {
      hideLoading();
    });
}

function updateUI(character, episodes) {
  const contentDiv = document.querySelector(".content");
  if (!contentDiv) return;

  const originLink = character.origin?.url
    ? `<a href="${character.origin.url}" target="_blank">${character.origin.name}</a>`
    : character.origin?.name || "Unknown";

  const locationLink = character.location?.url
    ? `<a href="${character.location.url}" target="_blank">${character.location.name}</a>`
    : character.location?.name || "Unknown";

  let episodesHtml = "";
  if (!episodes || episodes.length === 0) {
    episodesHtml = "<li>No episodes found.</li>";
  } else {
    episodesHtml = episodes
      .map((ep) => `<li>${ep.name} (${ep.episode})</li>`)
      .join("");
  }

  contentDiv.innerHTML = `
    <h2>${character.name}</h2>
    <img src="${character.image}" alt="${character.name}" />
    <p>Status: ${character.status}</p>
    <p>Species: ${character.species}</p>
    <p>Gender: ${character.gender}</p>
    <p>Origin: ${originLink}</p>
    <p>Location: ${locationLink}</p>
    <h3>Episodes:</h3>
    <ul>
      ${episodesHtml}
    </ul>
  `;
}
