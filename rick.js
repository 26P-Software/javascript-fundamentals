const characterList = document.getElementById('character-list');
const searchInput = document.getElementById('search');
let allLocations = [];
// fetch Locations from the api
const url = "https://rickandmortyapi.com/api/location";
fetch(url)
.then(response => response.json())
.then(data => {
    allLocations = data.results;

    const aliveLocations = allLocations.filter(char => char.status === "Alive");
    displayLocations(allLocations);
    console.log(data);
})
.catch(err => console.error("Failed to fetch", err));

function displayLocations(locations) {
    characterList.innerHTML = "";

    // map function  to create the cards
    locations.map(location => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
        <h3>${location.name}</h3>
        <p>${location.type}</p>
        <p>${location.dimension}</p>
        `;
        characterList.appendChild(card)
    });
}

//Filter Locations by search
searchInput.addEventListener("input", e => {
    const searchTerm = e.target.value.toLowerCase();

    const filtered = allLocations.filter(char => 
        char.name.toLowerCase().includes(searchTerm)
    );
    displayLocations(filtered);
});