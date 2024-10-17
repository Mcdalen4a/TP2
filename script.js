const resultDiv = document.getElementById('result');
const searchInput = document.getElementById('searchInput');
const detailsDiv = document.getElementById('characterDetails');

let allCharacters = [];

async function fetchCharacters() {
    const response = await fetch('simspons.json'); // Archivo JSON con personajes
    allCharacters = await response.json();
    displayData(allCharacters);
}

function displayData(characters) {
    resultDiv.innerHTML = '';

    characters.forEach(character => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${character.image}" alt="${character.name}">
            <h4>${character.name}</h4>
            <button class="view-more-btn">Ver más</button> <!-- Botón "Ver más" -->
        `;
        
        // Evento para mostrar los detalles del personaje al hacer clic en "Ver más"
        card.querySelector('.view-more-btn').addEventListener('click', () => {
            showCharacterDetails(character);
        });

        resultDiv.appendChild(card);
    });
}

function showCharacterDetails(character) {
    detailsDiv.innerHTML = `
        <div class="details-section">
            <h2>${character.name}</h2>
            <img src="${character.image}" alt="${character.name}">
            <p><strong>Ocupación:</strong> ${character.occupation || 'No disponible'}</p>
            <p><strong>Edad:</strong> ${character.age || 'No disponible'}</p>
            <button class="exit-btn">Salir</button> <!-- Botón "Salir" -->
        </div>
    `;
    
    detailsDiv.style.display = 'block'; // Muestra la sección de detalles

    // Añadir evento al botón "Salir"
    detailsDiv.querySelector('.exit-btn').addEventListener('click', () => {
        hideCharacterDetails();
    });
}

function hideCharacterDetails() {
    detailsDiv.style.display = 'none'; // Oculta la sección de detalles
}

// Filtrar los personajes según la búsqueda
searchInput.addEventListener('input', function() {
    const query = searchInput.value.toLowerCase();
    const filteredCharacters = allCharacters.filter(character => {
        return character.name.toLowerCase().includes(query);
    });
    displayData(filteredCharacters);
});

fetchCharacters();
