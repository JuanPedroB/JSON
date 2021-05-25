let urlFiltrarNombre = ' https://pokeapi.co/api/v2/pokemon/';

const formulario = document.getElementById("formularioBusqueda");
const buscador = document.getElementById("buscador");


async function obtenerJSON(url){
  const respuesta = await fetch(url);
  const json = await respuesta.json();
  return json;
}

function recargarAPI(pokemon){

	const parteIzq = document.getElementById("parteIzquierda");
	const parteDer = document.getElementById("parteDerecha");
	parteIzq.innerHTML = "";
	parteDer.innerHTML = "";
	
	const nombrePokemon = pokemon.species.name.toUpperCase();

	parteIzq.innerHTML = `
		<img id="imagenPokemon" src=${pokemon.sprites.front_default}></img>
		<h2 id="nombrePokemon">${nombrePokemon}</h2>
	`;

		pokemon.types.forEach((tipo) => {
			const tipoPokemon = document.createElement("h2");
			tipoPokemon.innerText = tipo.type.name;
			tipoPokemon.setAttribute('id', 'tipoPokemon');
			parteIzq.appendChild(tipoPokemon);
		});

		const aparicionEnJuegos = document.createElement('div');
		aparicionEnJuegos.classList.add("aparicionPokemon");

		for (var i = 0; i < 6; i++) {
			const juego = pokemon.game_indices[i];
			const juegoAparicion = document.createElement("h3");
			juegoAparicion.innerText = juego.version.name;
			juegoAparicion.classList.add("juego");
			aparicionEnJuegos.appendChild(juegoAparicion);
			parteIzq.appendChild(aparicionEnJuegos);
		}

		const spritesPokemon = document.createElement('div');
		spritesPokemon.classList.add("sprites");
		
		spritesPokemon.innerHTML = `
			<img src=${pokemon.sprites.back_default}></img>
			<img src=${pokemon.sprites.front_default}></img>
			<img src=${pokemon.sprites.back_shiny}></img>
			<img src=${pokemon.sprites.front_shiny}></img>
		`;

		parteDer.appendChild(spritesPokemon);


		const estadisticasPokemon = document.createElement('div');
		estadisticasPokemon.classList.add("estadisticas");

		for (var i = 0; i <= 2; i++) {
			const datosStats= document.createElement('div');
			datosStats.classList.add("datosStats");

			if(i == 0){
				const palabra = "Movimientos:".toUpperCase();
				datosStats.innerHTML = `
					<h2 class="tituloStats">${palabra}</h2>
				`;
				for (var j = 0; j <= 3 && j < pokemon.moves.length; j++) {
					const movimientos = pokemon.moves[j];
					const movimientoDiferente = document.createElement('h2');
					movimientoDiferente.innerText = movimientos.move.name;
					movimientoDiferente.classList.add("movimiento");
					datosStats.appendChild(movimientoDiferente);
				}
				estadisticasPokemon.appendChild(datosStats);

			}

			if (i == 1) {
				const palabra = "Capacidades:".toUpperCase();
				datosStats.innerHTML = `
					<h2 class="tituloStats">${palabra}</h2>
				`
				for (var j = 0; j < 2; j++) {
					const capacidad = document.createElement('div');
					capacidad.classList.add("capacidad");
					const capacidadDiferente = pokemon.abilities[j];

					capacidad.innerHTML = `
						<h2>${capacidadDiferente.ability.name}</h2>
					`;
					datosStats.appendChild(capacidad);

				}
				estadisticasPokemon.appendChild(datosStats);
			}

			if(i == 2){
				const palabra = "Estadisticas base:".toUpperCase();
				datosStats.innerHTML = `
					<h2 class="tituloStats">${palabra}</h2>
				`;
				for (var j = 0; j < 6; j++) {
					const stat = document.createElement('h3');
					stat.classList.add("statBase");
					const statDiferente = pokemon.stats[j];
					stat.innerHTML = `
						<h3 class="statBase">${statDiferente.stat.name} : ${statDiferente.base_stat}</h3>
					`;
					datosStats.appendChild(stat);
				}
				estadisticasPokemon.appendChild(datosStats);
			}
			parteDer.appendChild(estadisticasPokemon);
		}
}

function filtrarPorNombre(palabra){

	obtenerJSON(urlFiltrarNombre + palabra).then(json => {
		console.log(json);
		recargarAPI(json);
	});
}

formulario.addEventListener("submit", (event) => {
	event.preventDefault();
	const palabra = buscador.value;
	if(palabra){
		filtrarPorNombre(palabra);
		palabra.value = "";
	}
});
