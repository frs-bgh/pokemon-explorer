'use strict';

const pokemonList = document.getElementById('pokemon-list');

async function fetchPokemonList() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
  const data = await response.json();
  const pokemons = data.results;

  for (const pokemon of pokemons) {
    const detailResponse = await fetch(pokemon.url);
    const detail = await detailResponse.json();

    const li = document.createElement('li');
    li.classList.add('pokemon-card');
    li.innerHTML = `
      <h3>${detail.name}</h3>
      <img src="${detail.sprites.front_default}" alt="${detail.name}" />
    `;
    pokemonList.appendChild(li);
  }
}

fetchPokemonList();
