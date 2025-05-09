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

  detailSection.innerHTML = `
    <h2>${detailData.name}</h2>
    <img src="${detailData.sprites.front_default}" alt="${detailData.name}" />
    <p><strong>Type:</strong> ${detailData.types.map(t => t.type.name).join(" / ")}</p>
    <p><strong>Height:</strong> ${detailData.height / 10} m</p>
    <p><strong>Weight:</strong> ${detailData.weight / 10} kg</p>
    <p><strong>Abilities:</strong> ${detailData.abilities.map(a => a.ability.name).join(", ")}</p>
    <p><strong>Beschrijving:</strong> ${flavor ? flavor.flavor_text.replace(/\f|\n/g, ' ') : "Geen beschrijving beschikbaar."}</p>
  `;
};

getPokemonList();
