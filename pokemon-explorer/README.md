# Pokémon Explorer #
Een webhapplicatie waarmee je 30 Pokémons kunt ontdekken via de API PokéAPI. Deze applicatie maakt dus gebruik van de PokéAPI (https://pokeapi.co), een publieke API waarvoor geen sleutel nodig is. 
Het is een single page webapplicatie waarmee de Pokemons kunt verkennen, filteren, zoeken en opslaan in je favorieten 

## Wat doet mijn site? 

1) Het haalt 30 Pokémons op via de API PokéAPI
2) Toont elk Pokémon als een visuele kaart met naam, afbeelding en types
3) Gebruikt async/await om data op te halen
4) DOM-manipulatie voor dynamisch aanmaken van kaarten
5) Detailweergave per Pokémon met type, gewicht, abilities en beschrijving.
6) Gekleurde type-badges (bv water --> blauw)
7) Mogelijkheid om Pokémon als favoriet te markeren met klikbare ster
8) Favorietenlijst zichtbaar via knop rechtsboven in de header
9) Favorieten worden opgeslagen in localStorage en blijven dus bewaard
10) Zoekbalk met suggesties met scrollToView (de pagina scrollt automatisch naar het detailgedeelte)
11) Filter op type, grootte en gewicht



## Gebruikte technologieën:

- HTML, CSS, JS
- PokéAPI (https://pokeapi.co)
- Vite
- GitHub

## Stappen installatie:

1) Repository clonen 
    git clone https://github.com/frs-bgh/pokemon-explorer.git 
2) Vite runnen 
    1. dependencies installeren 
        npm install 
    2. Start de dev server
        npm run dev 
3) Browser openen op http://localhost:5173 

## Screenshots
* Homepage 
![homepage](image.png)

* Zoekbalk
![Zoekbalk](image-1.png)

* Favorietenlijst
![Favorieten](image-2.png)

* Filtermenu
![Filtermenu](image-3.png)


## Gebruikte bronnen 
PokéAPI --> https://pokeapi.co/api/v2/pokemon?limit=30
ChatGPT (AI assistentie voor structuur en foutopsporing) --> https://chatgpt.com/share/682936bf-012c-8003-8cde-c3f4089e37df
MDN scrollIntoView --> https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
Prismic Blog: CSS Image Effects --> https://prismic.io/blog/css-image-effects
Add to favorites with JavaScript --> https://stackoverflow.com/questions/64830358/making-an-add-to-favorites-button-with-javascript 
JavaScript multiple rating SVG star click --> https://stackoverflow.com/questions/66139955/javascript-multiple-rating-svg-star-click 


## Auteur 
Het werd gemaakt door Fariss Boughaba voor het vak Web Advanced aan Erasmushogeschool Brussel