# Rick and Morty Explorer - Student Project

## Project Overview

Create a web application that displays information about the Rick and Morty TV show using the [Rick and Morty API](https://rickandmortyapi.com/). The application will show characters, locations, and episodes from the show, with detailed views for each.

## Requirements

### Core Features

1. Display a list of characters with:

   - Character image
   - Name
   - Status
   - Species
   - Current location
   - Link to character details

2. Display a list of locations with:

   - Name
   - Type
   - Dimension
   - Number of residents
   - Link to location details

3. Display a list of episodes with:

   - Name
   - Episode code
   - Air date
   - Number of characters
   - Link to episode details

4. Implement detailed views with interconnected navigation:

   - Character Details:

     - Show full character information
     - Link to origin location (clickable)
     - Link to current location (clickable)
     - List all episodes the character appears in (clickable cards)
     - Each episode card shows name, episode code, and air date

   - Location Details:

     - Show location information (name, type, dimension)
     - Display grid of all residents (clickable character cards)
     - Each resident card shows image, name, species, and status
     - Empty state handling when location has no residents

   - Episode Details:
     - Show episode information (name, air date, episode code)
     - Display grid of all characters in the episode (clickable cards)
     - Each character card shows image, name, species, and status

### Bonus Features

- Implement pagination for list views (characters, locations, episodes)
- Add search functionality for characters
- Add loading states during data fetching
- Add error handling for failed API requests
- Make the UI responsive for different screen sizes

## Project Structure

```
/
├── index.html (redirects to characters page)
├── pages/
│   ├── characters.html
│   ├── locations.html
│   ├── episodes.html
│   ├── character-detail.html
│   ├── location-detail.html
│   └── episode-detail.html
├── scripts/
│   ├── modules/
│   │   ├── api.js (API interaction)
│   │   └── utils.js (helper functions)
│   ├── characters.js
│   ├── locations.js
│   ├── episodes.js
│   ├── character-detail.js
│   ├── location-detail.js
│   └── episode-detail.js
└── styles/
    └── main.css
```

## Getting Started

1. The starter code provides all necessary files with empty functions and helpful comments
2. HTML files are pre-structured with necessary elements and styling
3. CSS is already implemented for you
4. Your task is to implement the JavaScript functionality in each file

## API Usage

The Rick and Morty API endpoints you'll need:

- Characters: `https://rickandmortyapi.com/api/character`
- Locations: `https://rickandmortyapi.com/api/location`
- Episodes: `https://rickandmortyapi.com/api/episode`

For single items, append the ID:

- Single character: `https://rickandmortyapi.com/api/character/1`
- Single location: `https://rickandmortyapi.com/api/location/1`
- Single episode: `https://rickandmortyapi.com/api/episode/1`

## Implementation Steps

1. Implement the utility functions in `utils.js`
2. Implement the main list views (characters, locations, episodes)
3. Implement the detail views with their interconnections:
   - Character details → Episodes & Locations
   - Location details → Characters
   - Episode details → Characters
4. Add pagination (bonus)
5. Add search functionality (bonus)

## Tips

- Use the browser's developer tools to debug
- Check the API documentation for response formats
- Test your error handling with invalid URLs
- Keep your code modular and reusable
- Use ES6+ features like async/await, template literals, and destructuring
- Test navigation between different views (e.g., from character to episode to another character)
- Handle empty states appropriately (e.g., locations with no residents)
