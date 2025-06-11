/**
 * Episode Detail Page Script
 * Handles the display of detailed information for a single episode
 */
import { getContent } from "./services/services.js";
import { ApiUrl } from "./utils/utils.js"
const url = `${ApiUrl.episodes}?page=`

document.addEventListener("DOMContentLoaded", loadEpisodeDetails)
/**
 * Loads and displays details for a specific episode
 * @param {string} id - The episode ID to load
 */
function getEpisodeIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

async function loadEpisodeDetails() {
  const id = getEpisodeIdFromUrl();
  if (!id) {
    displayError('No episode ID provided in URL.');
    return;
  }
  showLoading();
  try {
    // Fetch episode data
    const episodeUrl = `${url}1,2,3`;

    const episodes = await getContent(episodeUrl);

    // Extract character IDs from episode.characters URLs
    const episode = episodes.results.find(data=> {
      
      return data.id == id;})
      
    const characterIds = episode.characters.map(url => url.split('/').pop()).join(',');

    //look for the episode by id

    let characters = [];
    if (characterIds) {
      // Fetch all characters in one request
      const charUrl = `${ApiUrl.characters}/${characterIds}`;
      const charData = await getContent(charUrl);
      characters = Array.isArray(charData) ? charData : [charData];
    }
    updateUI(episode, characters);
  } catch (error) {
    displayError('Failed to load episode details.');
    console.warn('error:', error);
  } finally {
    hideLoading();
  }
}

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
    console.warn(message);
  }
}
/**
 * Updates the UI with episode and character data
 * @param {Object} episode - The episode data
 * @param {Array} characters - Array of character data
 */
function updateUI(episode, characters) {
  const container = document.getElementById('episode_detail_content');
  if (!container) return;
  container.innerHTML = '';
  // Episode header
  const header = document.createElement('div');
  header.className = 'episode-header';
  header.innerHTML = `
    <h2>${episode.name}</h2>
    <p><strong>Air Date:</strong> ${episode.air_date}</p>
    <p><strong>Episode:</strong> ${episode.episode}</p>
  `;
  container.appendChild(header);

  // Characters grid wrapper
  const wrapper = document.createElement('div');
  wrapper.className = 'wrapper';
  container.appendChild(wrapper);

  // Characters section
  if (characters.length === 0) {
    const emptyMsg = document.createElement('p');
    emptyMsg.textContent = 'No characters found for this episode.';
    wrapper.appendChild(emptyMsg);
  } else {
    characters.forEach(char => {
      const card = document.createElement('article');
      card.className = 'card';
      card.style.cursor = 'pointer';
      card.onclick = () => window.location.href = `character-detail?id=${char.id}`;
      card.innerHTML = `
        <img src="${char.image}" alt="${char.name}" class="character-img">
        <div class="characterCard">
          <h3>${char.name}</h3>
          <span>${char.status} - ${char.species}</span><br>
          <span>Origin: ${char.origin.name}</span>
        </div>
      `;
      wrapper.appendChild(card);
    });
  }
}

