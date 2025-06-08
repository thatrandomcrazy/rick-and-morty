/**
 * Character Detail Page Script
 * Handles the display of detailed information for a single character
 */

// TODO: Initialize the page
// 1. Get character ID from URL parameters
// 2. Validate the ID
// 3. Load character details if ID is valid
// 4. Show error if ID is invalid or missing

document.addEventListener("DOMContentLoaded", loadCharacterDetails);

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
function loadCharacterDetails() {
  showLoading();
  // שלב 1: שליפת id מה-URL
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  console.log(id);
  
  if (!id || isNaN(id)) {
    console.log("is NaN");
    displayError("Invalidsss character ID.");

    return;
  }
  fetch(`https://rickandmortyapi.com/api/character/${id}`)
    .then((response) => {
      if (!response.ok) throw Error("Network response was not ok");
      return response.json();
    })
    .then((character) => {

      console.log(character);
      updateUI(character, []);
      
      // שלב 3: חילוץ מזהי הפרקים
      const episodeIds = character.episode.map((url) => url.split("/").pop());


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
  console.log({character})
  const contentDiv = document.querySelector("#character_detail_content");
  if (!contentDiv) return;
const urlLocationId = character.location?.url.split('/').pop()
  const originLink = character.origin?.url
    ? `<a href="location-detail.html?id=${urlLocationId}" target="_blank">${character.origin.name}</a>`
    : character.origin?.name || "Unknown";

  const locationLink = character.location?.url.split('/').pop()
    ? `<a href="location-detail.html?id=${urlLocationId}" target="_blank">${character.location.name}</a>`
    : character.location?.name || "Unknown";

  let episodesHtml = "";
  if (!episodes || episodes.length === 0) {
    episodesHtml = "<li>No episodes found.</li>";
  } else {
    episodesHtml = episodes
      .map((ep) => `<li><span class='episode-title'>${ep.name}</span> <span class='episode-code'>(${ep.episode})</span></li>`)
      .join("");
  }

  contentDiv.innerHTML = `
    <div class="wrapper character-detail-wrapper">
      <article class="card character-detail-card">
        <img src="${character.image}" alt="${character.name}" class="character-detail-img" />
        <div class="characterCard character-detail-info">
          <h2>${character.name}</h2>
          <span><strong>Status:</strong> ${character.status}</span>
          <span><strong>Species:</strong> ${character.species}</span>
          <span><strong>Gender:</strong> ${character.gender}</span>
          <span><strong>Origin:</strong> ${originLink}</span>
          <span><strong>Location:</strong> ${locationLink}</span>
        </div>
      </article>
    </div>
    <div class="episodes-section">
      <h3>Episodes</h3>
      <ul class="episodes-list">
        ${episodesHtml}
      </ul>
    </div>
  `;
}
