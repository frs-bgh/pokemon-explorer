'use strict';

const container = document.getElementById("pokemon-container");
const detailSection = document.getElementById("pokemon-detail");

const getPokemonList = async () => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=30");
  const data = await res.json();
  const pokemonArray = data.results;

  pokemonArray.forEach(async (pokemon) => {
    const pokeData = await fetch(pokemon.url).then((res) => res.json());

    const card = document.createElement("div");
    card.classList.add("pokemon-card");
    card.dataset.id = pokeData.id;

//#region De kaarten die al in de localStorage zitten al geel zetten wanneer je de pagina opent 
    var savedFavorites = localStorage.getItem("favorites");
if (savedFavorites) {
  savedFavorites = JSON.parse(savedFavorites);
  if (savedFavorites.list.some(fav => fav.name === pokeData.name)){
    // ster direct in geel zetten
    setTimeout(() => {
      const favBtn = card.querySelector(".fav-btn");
      if (favBtn) favBtn.classList.add("active");
    }, 0); // ,0 zodat we zeker zijn dat de ster echt in het element zit 
  }
}
//#endregion

    card.innerHTML = `
  <img src="${pokeData.sprites.front_default}" alt="${pokeData.name}" />
  <h3>${pokeData.name}</h3>
  <svg class="fav-btn" data-id="${pokeData.id}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="grey" width="24" height="24">
    <path d="M12 .587l3.668 7.431L24 9.748l-6 5.843L19.335 24 12 19.897 4.665 24 6 15.591 0 9.748l8.332-1.73z"/>
  </svg>
`;


//#region favoriet knop 

var favBtn = card.querySelector(".fav-btn");

favBtn.addEventListener("click", function(e) {
  e.stopPropagation();

  var pokemonName = pokeData.name;

  var favorites = localStorage.getItem("favorites");
  if (!favorites) {
    favorites = { list: [] };
  } else {
    favorites = JSON.parse(favorites);
  }

  var index = favorites.list.findIndex(function (item) {
    return item.name === pokemonName;
  });
  
  if (index === -1) {
    favorites.list.push({
      name: pokemonName,
      sprite: pokeData.sprites.front_default
    });
    favBtn.classList.add("active");
  } else {
    favorites.list.splice(index, 1);
    favBtn.classList.remove("active");
  }
  

  localStorage.setItem("favorites", JSON.stringify(favorites));
});

//#endregion


    card.addEventListener("click", () => {
      showPokemonDetails(pokeData.id);
    });

    container.appendChild(card);
  });

  
};

const showPokemonDetails = async (id) => {
  const detailRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const detailData = await detailRes.json();

  const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
  const speciesData = await speciesRes.json();

  const flavor = speciesData.flavor_text_entries.find(
    (entry) => entry.language.name === "en"
  );

  // Voor de types, gekleurde badges
  // Gen1 pokémonshebben maar max. 2 types
  let typeBadges = "";

  if (detailData.types.length === 1) {
  typeBadges += `<span class="type-badge ${detailData.types[0].type.name}">${detailData.types[0].type.name}</span>`;
  }

  if (detailData.types.length === 2) {
  typeBadges += `<span class="type-badge ${detailData.types[0].type.name}">${detailData.types[0].type.name}</span> `;
  typeBadges += `<span class="type-badge ${detailData.types[1].type.name}">${detailData.types[1].type.name}</span>`;
  }



  //Helemaal beneden aan de site, soort van tabel
  //detailSection.innerHTML ==> Vervang alles in de #pokemon-detail sectie door deze nieuwe HTML
  detailSection.innerHTML = `
    <h2>${detailData.name}</h2>
    <img src="${detailData.sprites.front_default}" alt="${detailData.name}" />
    <p><strong>Type:</strong> ${typeBadges}</p>
    <p><strong>Height:</strong> ${detailData.height / 10} m</p>
    <p><strong>Weight:</strong> ${detailData.weight / 10} kg</p>
    <p><strong>Abilities:</strong> ${detailData.abilities.map(a => a.ability.name).join(", ")}</p>
    <p><strong>Beschrijving:</strong> ${flavor ? flavor.flavor_text.replace(/\f|\n/g, ' ') : "Geen beschrijving beschikbaar."}</p>
  `;

  


  detailSection.scrollIntoView({ behavior: "smooth" });
};

getPokemonList();


document.getElementById("toggle-fav-list").addEventListener("click", function () {
  var popup = document.getElementById("favorieten-popup");
  popup.classList.toggle("hidden");

  // lijst wordt upgedated telkens wanneer het geopend wordt
  var favorites = localStorage.getItem("favorites");
  var lijst = document.getElementById("favorieten-items");
  lijst.innerHTML = "";

  if (!favorites) {
    lijst.innerHTML = "<li>Geen favorieten</li>";
    return;
  }

  favorites = JSON.parse(favorites);
  if (favorites.list.length === 0) {
    lijst.innerHTML = "<li>Geen favorieten</li>";
  } else {
    favorites.list.forEach(function (pokemon) {
      var li = document.createElement("li");
      li.style.display = "flex";
      li.style.alignItems = "center";
      li.style.gap = "10px";
    
      var img = document.createElement("img");
      img.src = pokemon.sprite;
      img.alt = pokemon.name;
      img.style.width = "32px";
      img.style.height = "32px";
    
      var span = document.createElement("span");
      span.textContent = pokemon.name;
    
      li.appendChild(img);
      li.appendChild(span);
      lijst.appendChild(li);
    });
  }

});


//#region zoekbalk
const zoekinput = document.getElementById("zoekinput");
const zoeksuggesties = document.getElementById("zoeksuggesties");

zoekinput.addEventListener("input", function () {
  const waarde = zoekinput.value.toLowerCase();
  zoeksuggesties.innerHTML = "";

  if (!waarde) return;

  document.querySelectorAll(".pokemon-card").forEach(card => {
    const naam = card.querySelector("h3").textContent.toLowerCase();
    const types = Array.from(card.querySelectorAll(".type-badge")).map(b => b.textContent.toLowerCase());

    if (naam.startsWith(waarde) || types.some(type => type.startsWith(waarde))) {
      const li = document.createElement("li");
      li.textContent = naam;

      li.addEventListener("click", () => {
        const id = card.dataset.id;
        showPokemonDetails(id); // details laden & scrollen
        zoekinput.value = "";
        zoeksuggesties.innerHTML = "";
      });

      zoeksuggesties.appendChild(li);
    }
  });
});
//#endregion
