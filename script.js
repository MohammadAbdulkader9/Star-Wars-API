let characterNames = []; // Store character names

//Function to fetch all character names and display them in the list
function getAllCharacters() {
    const apiUrl = 'https://www.swapi.tech/api/people';

    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            const characterList = document.getElementById("characterList");
            characterList.innerHTML = '';
            characterNames = data.results.map(character => character.name);
            characterNames.forEach(name => {
                const li = document.createElement("li");
                li.textContent = name;
                characterList.appendChild(li);
            });
        })
        .catch(err => console.log("Error fetching characters:", err));
}

// Function to fetch character data based on the input and display info
function getApi() {
    const inputName = document.getElementById("characterName").value.trim().toLowerCase();
    const characterName = characterNames.find(name => name.toLowerCase() === inputName);

    if (characterName) {
        const fullUri = `https://www.swapi.tech/api/people/?name=${characterName}`;
        fetch(fullUri)
            .then(res => res.json())
            .then(data => {
                if (data.result && data.result.length > 0) {
                    const character = data.result[0].properties;
                    const { height, mass, gender, hair_color, skin_color } = character;
                    const details = ` Name: ${characterName}\n Height: ${height} cm\n Mass: ${mass} kg\n Gender: ${gender}\n Hair Color: ${hair_color}\n Skin Color: ${skin_color}`;
                    document.getElementById("output").value = details;
                }
            })
            .catch(err => {
                console.error("Error fetching data:", err);
                document.getElementById("output").value = "Error fetching character data.";
            });
    } else {
        document.getElementById("output").value = `Character${inputName} not found.`;
    }
}

// listener added when "Get character info" button is clicked
document.getElementById("getCharacterBtn").addEventListener("click", getApi);

// list the characters name when loading the website
window.onload = getAllCharacters;
