const pokemonNome = document.querySelector('.pokemon_nome');
const pokemonImagem = document.querySelector('.pokemon_imagem');
const pokemonTipo = document.querySelector('.pokemon_tipo');

const form = document.querySelector('.form');
const input = document.querySelector('.pesquisa');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}

const renderPokemon = async (pokemon) => {

  pokemonNome.innerHTML = 'Carregando...';

  const data = await fetchPokemon(pokemon);
  const dataTypes = data['types'];
  const dataFirstType = dataTypes[0];

  if (data) {
    pokemonImagem.style.display = 'block';
    pokemonNome.innerHTML = data.id + ' - ' + data.name;
    pokemonImagem.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    pokemonTipo.innerHTML = dataFirstType['type']['name'];
    input.value = '';
    searchPokemon = data.id;
  } else {
    pokemonImagem.style.display = 'none';
    pokemonNome.innerHTML = 'Desconhecido =(';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);