let url = 'https://raw.githubusercontent.com/JuanPedroB/JSON/main/EjercicioTiempo.json';

const contenedorPrincipal = document.getElementById("contenedor");


async function obtenerJSON(url){
  const respuesta = await fetch(url);
  const json = await respuesta.json();
  return json;
}

obtenerJSON(url)
	.then(json => {


		for (const tiempo of json.Tiempo) {
			
			const contenedorParteIzquierda = document.createElement('div');
			contenedorParteIzquierda.classList.add("parteIzquierda");

			const imgDiaActual = document.createElement('img');
			imgDiaActual.classList.add("imagenActual");
			imgDiaActual.src = tiempo.Dia[0].estado.icono;
			contenedorParteIzquierda.appendChild(imgDiaActual);

			const temperaturaDiaActual = document.createElement('h1');
			temperaturaDiaActual.classList.add("temperaturaActual");
			temperaturaDiaActual.innerText = tiempo.Dia[0].temperatura;
			contenedorParteIzquierda.appendChild(temperaturaDiaActual);

			const estadoDiaActual = document.createElement('h2');
			estadoDiaActual.classList.add("estadoActual");
			estadoDiaActual.innerText = tiempo.Dia[0].estado.nombre;
			contenedorParteIzquierda.appendChild(estadoDiaActual);

			const diaActual = document.createElement('h2');
			diaActual.classList.add("fechaActual");
			diaActual.innerText ="Hoy, "+ tiempo.Dia[0].dia+" de abril";
			contenedorParteIzquierda.appendChild(diaActual);

			const ciudad = document.createElement('h2');
			ciudad.classList.add("ciudad");
			ciudad.innerText = tiempo.NombreCiudad;
			contenedorParteIzquierda.appendChild(ciudad);

			contenedorPrincipal.appendChild(contenedorParteIzquierda);
 		

			const contenedorParteDerecha = document.createElement('div');
 			contenedorParteDerecha.classList.add("parteDerecha");

 			 

 				const pronosticoDias = document.createElement('div');
 				pronosticoDias.classList.add("pronosticoDias");

 				for (var i = 0; i < tiempo.Dia.length; i++){

 				const currentDia = tiempo.Dia[i];

 				const dias = document.createElement('div');
 				dias.classList.add("dias");

 				const fechaDias = document.createElement('h1');
 				fechaDias.classList.add("fechaDias");
 				fechaDias.innerText ="Día "+ currentDia.dia +" de abril";
 				dias.appendChild(fechaDias);

 				const imagenDias = document.createElement('img');
 				imagenDias.classList.add("imagenDias");
 				imagenDias.src = currentDia.estado.icono;
 				dias.appendChild(imagenDias);

 				const temperaturaViento = document.createElement('div')
 				temperaturaViento.classList.add("tempViento");

 				const temperaturasDias = document.createElement('h2');
 				temperaturasDias.classList.add("tempDias");
 				temperaturasDias.innerText = currentDia.temperatura;
 				temperaturaViento.appendChild(temperaturasDias);

 				const vientoDias = document.createElement('h2');
 				vientoDias.classList.add("vientoDias");
 				vientoDias.innerText = currentDia.viento;
 				temperaturaViento.appendChild(vientoDias);

 				dias.appendChild(temperaturaViento);

 				pronosticoDias.appendChild(dias);

 			}
 			contenedorParteDerecha.appendChild(pronosticoDias);
 		

 			const datosDia = document.createElement('div');
 			datosDia.classList.add("datosDia");

 			const estadoDias = document.createElement('div');
 			estadoDias.classList.add("estado");

 			const estadoDias2 = document.createElement('div');
 			estadoDias2.classList.add("estado");

 			const humedadDia = document.createElement('h1');
 			humedadDia.classList.add("humedadDiaActual");
 			humedadDia.innerText = "Humedad \n"+tiempo.Dia[0].humedad;
 			estadoDias.appendChild(humedadDia);

 			const vientoDia = document.createElement('h1');
 			vientoDia.classList.add("vientoDiaActual");
 			vientoDia.innerText = "Viento \n"+tiempo.Dia[0].viento;
 			estadoDias2.appendChild(vientoDia);

 			datosDia.appendChild(estadoDias);
 			datosDia.appendChild(estadoDias2);

 			contenedorParteDerecha.appendChild(datosDia);
 			

 		contenedorPrincipal.appendChild(contenedorParteDerecha);

 	}

		
	});