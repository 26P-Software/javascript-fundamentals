const characterList = document.getElementById('character-list');
const searchInput = document.getElementById('search');
let allCharacters = [];

// 1. Fetch Characters from the Rick and Morty API
const url = "https://rickandmortyapi.com/api/character";

fetch(url)
    .then(response => response.json())
    .then(data => {
        allCharacters = data.results;
        
        // This displays all loaded characters initially
        displayCharacters(allCharacters);
        console.log(data);
    })
    .catch(err => console.error("Failed to fetch characters", err));

// 2. Function to display character cards in the DOM
function displayCharacters(characters) {
    // Clear previous items
    characterList.innerHTML = "";

    // Loop through characters to create cards
    characters.forEach(character => {
        const card = document.createElement("div");
        card.classList.add("card");
        
        // Dynamic HTML template tailored for character data
        card.innerHTML = `
            <img src="${character.image}" alt="${character.name}" style="width:100%; border-radius: 8px 8px 0 0;">
            <div style="padding: 10px;">
                <h3>${character.name}</h3>
                <p><strong>Status:</strong> ${character.status}</p>
                <p><strong>Species:</strong> ${character.species}</p>
            </div>
        `;
        characterList.appendChild(card);
    });
}

// 3. Filter Characters by search input
searchInput.addEventListener("input", e => {
    const searchTerm = e.target.value.toLowerCase();

    const filtered = allCharacters.filter(character => 
        character.name.toLowerCase().includes(searchTerm)
    );
    displayCharacters(filtered);
});