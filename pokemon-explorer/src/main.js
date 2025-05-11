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

    card.innerHTML = `
      <img src="${pokeData.sprites.front_default}" alt="${pokeData.name}" />
      <h3>${pokeData.name}</h3>
    `;

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
