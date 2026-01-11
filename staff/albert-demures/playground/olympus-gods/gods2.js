// --------------------
// Contenedor principal (primeros 7 dioses)
// --------------------
const godsView = document.createElement('div');
godsView.className = `
  h-screen
  overflow-y-scroll
  snap-y snap-mandatory
  scroll-smooth
  flex flex-col
  items-center
`;
godsView.style.backgroundImage = "url('background/greekBackground.jpg')";
godsView.style.backgroundRepeat = "repeat";
godsView.style.backgroundSize = "350px 350px";
godsView.style.backgroundPosition = "top left";

// --------------------
// Sección del título
// --------------------
const titleSection = document.createElement('div');
titleSection.className = `
  snap-start
  min-h-screen
  w-full
  flex flex-col
  items-center
  justify-center
`;
const godsTitle = document.createElement('h1');
godsTitle.textContent = 'Adivina todos los dioses del Olimpo 🏛️';
godsTitle.className = 'text-8xl font-extrabold text-gray-900 text-center';
titleSection.appendChild(godsTitle);
godsView.appendChild(titleSection);

// --------------------
// Función para crear secciones de dioses
// --------------------
function createGodSections(container, godsSubset) {
    godsSubset.forEach((god, index) => {
        const divGod = document.createElement('div');
        divGod.className = 'snap-start min-h-screen w-full flex items-center justify-center relative card-container';

        const godCard = document.createElement('div');
        godCard.className = `
          relative
          bg-gradient-to-b from-gray-800 to-black
          text-white
          px-12 py-8
          rounded-3xl
          w-[28rem]
          text-center
          flex flex-col
          items-center
          gap-4
          shadow-2xl
          transition-transform duration-500
        `;

        // Imagen
        const image = document.createElement('img');
        image.src = god.imgHades;
        image.className = 'w-64 h-64 object-cover rounded-full border-8 border-yellow-400 shadow-2xl transition-transform duration-500 hover:scale-105';
        godCard.appendChild(image);

        // Nombre
        const godName = document.createElement('h2');
        godName.textContent = god.name;
        godName.className = 'font-extrabold text-4xl text-yellow-300';
        godCard.appendChild(godName);

        // Descripción
        const quote = document.createElement('p');
        quote.textContent = god.sex + ' del';
        quote.className = 'text-gray-300 italic text-lg text-center';
        godCard.appendChild(quote);

        // Dropdown
        const dropdownButton = document.createElement('button');
        dropdownButton.textContent = 'Selecciona su dominio ↓';
        dropdownButton.className = 'dropdown-button bg-yellow-500 text-black px-6 py-3 rounded-full font-bold hover:bg-yellow-400 transition-colors duration-300 focus:outline-none mt-2';
        godCard.appendChild(dropdownButton);

        const dropdownMenu = document.createElement('div');
        dropdownMenu.className = 'dropdown-menu absolute left-1/2 transform -translate-x-1/2 mt-2 w-80 bg-gray-900 text-white rounded-lg shadow-lg hidden flex-col z-20';
        godCard.appendChild(dropdownMenu);

        // Opciones mezcladas
        const shuffledGods = godsSubset.slice();
        for (let j = shuffledGods.length - 1; j > 0; j--) {
            const k = Math.floor(Math.random() * (j + 1));
            [shuffledGods[j], shuffledGods[k]] = [shuffledGods[k], shuffledGods[j]];
        }

        shuffledGods.forEach(optGod => {
            const item = document.createElement('div');
            item.textContent = optGod.dominio;
            item.className = 'px-4 py-2 hover:bg-yellow-500 hover:text-black cursor-pointer transition-colors duration-200';
            item.addEventListener('click', () => {
                dropdownButton.textContent = optGod.dominio;
                dropdownMenu.classList.add('hidden');
            });
            dropdownMenu.appendChild(item);
        });

        dropdownButton.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownMenu.classList.toggle('hidden');
        });
        divGod.addEventListener('mouseleave', () => {
            dropdownMenu.classList.add('hidden');
        });

        // Mensaje de validación
        const resultMessage = document.createElement('div');
        resultMessage.className = 'result-message text-lg font-bold mt-2';
        godCard.appendChild(resultMessage);

        // Scroll hint
        const scrollHint = document.createElement('div');
        scrollHint.textContent = '↓ Desliza para invocar al siguiente dios';
        scrollHint.className = 'text-gray-400 mt-2 animate-bounce text-lg';
        godCard.appendChild(scrollHint);

        divGod.appendChild(godCard);
        container.appendChild(divGod);
    });
}

// --------------------
// Crear secciones para los primeros 7 dioses
// --------------------
createGodSections(godsView, gods.slice(0, 7));

// --------------------
// Sección final del submit (primeros 7)
// --------------------
const submitSection = document.createElement('div');
submitSection.className = 'snap-start min-h-screen w-full flex flex-col items-center justify-center gap-4';

const errorCounter = document.createElement('div');
errorCounter.textContent = ''; 
errorCounter.className = 'text-2xl font-bold text-red-500';
submitSection.appendChild(errorCounter);

const submitButton = document.createElement('button');
submitButton.textContent = '¡Ya estoy!';
submitButton.type = 'submit';
submitButton.className = 'bg-yellow-500 text-black px-8 py-3 rounded-full font-bold hover:bg-yellow-400 transition-colors duration-300';
submitSection.appendChild(submitButton);

// Botón Next oculto
const nextButton = document.createElement('button');
nextButton.textContent = 'Next';
nextButton.className = 'bg-green-500 text-white px-8 py-3 rounded-full font-bold hover:bg-green-400 transition-colors duration-300 mt-4 hidden';
submitSection.appendChild(nextButton);

godsView.appendChild(submitSection);
document.body.appendChild(godsView);

// --------------------
// Contenedor godsView2 (últimos 7 dioses)
// --------------------
const godsView2 = document.createElement('div');
godsView2.className = `
  h-screen
  overflow-y-scroll
  snap-y snap-mandatory
  scroll-smooth
  flex flex-col
  items-center
`;
godsView2.style.backgroundImage = "url('background/greekBackground.jpg')";
godsView2.style.backgroundRepeat = "repeat";
godsView2.style.backgroundSize = "350px 350px";
godsView2.style.backgroundPosition = "top left";
godsView2.style.display = 'none'; // inicialmente oculto

// Crear secciones para los últimos 7 dioses
createGodSections(godsView2, gods.slice(-7));

// Botón final submit godsView2
const submitSection2 = document.createElement('div');
submitSection2.className = 'snap-start min-h-screen w-full flex flex-col items-center justify-center gap-4';

const errorCounter2 = document.createElement('div');
errorCounter2.textContent = ''; 
errorCounter2.className = 'text-2xl font-bold text-red-500';
submitSection2.appendChild(errorCounter2);

const submitButton2 = document.createElement('button');
submitButton2.textContent = '¡Ya estoy!';
submitButton2.type = 'submit';
submitButton2.className = 'bg-yellow-500 text-black px-8 py-3 rounded-full font-bold hover:bg-yellow-400 transition-colors duration-300';
submitSection2.appendChild(submitButton2);

godsView2.appendChild(submitSection2);
document.body.appendChild(godsView2);

// --------------------
// Lógica de validación (primeros 7 dioses)
// --------------------
submitButton.addEventListener('click', () => {
    let errores = 0;
    const cardDivs = godsView.querySelectorAll('.card-container');

    cardDivs.forEach((divGod, index) => {
        const god = gods[index];
        const dropdown = divGod.querySelector('.dropdown-button');
        const message = divGod.querySelector('.result-message');

        if (dropdown.textContent === god.dominio) {
            message.textContent = '✅ Correcto!';
            message.classList.remove('text-red-500');
            message.classList.add('text-green-500');
        } else {
            message.textContent = '❌ Incorrecto!';
            message.classList.remove('text-green-500');
            message.classList.add('text-red-500');
            errores++;
        }
    });

    if (errores === 0) {
        errorCounter.textContent = '🎉 ¡Todos correctos!';
        errorCounter.classList.remove('text-red-500');
        errorCounter.classList.add('text-green-500');
        nextButton.classList.remove('hidden');
    } else {
        errorCounter.textContent = `Número de errores: ${errores}`;
        errorCounter.classList.remove('text-green-500');
        errorCounter.classList.add('text-red-500');
        nextButton.classList.add('hidden');
    }
});

// --------------------
// Botón Next: mostrar godsView2
// --------------------
nextButton.addEventListener('click', () => {
    godsView.style.display = 'none';
    godsView2.style.display = 'flex';
});

// --------------------
// Lógica de validación (últimos 7 dioses)
// --------------------
submitButton2.addEventListener('click', () => {
    let errores = 0;
    const cardDivs = godsView2.querySelectorAll('.card-container');

    cardDivs.forEach((divGod, index) => {
        const god = gods.slice(-7)[index]; // últimos 7
        const dropdown = divGod.querySelector('.dropdown-button');
        const message = divGod.querySelector('.result-message');

        if (dropdown.textContent === god.dominio) {
            message.textContent = '✅ Correcto!';
            message.classList.remove('text-red-500');
            message.classList.add('text-green-500');
        } else {
            message.textContent = '❌ Incorrecto!';
            message.classList.remove('text-green-500');
            message.classList.add('text-red-500');
            errores++;
        }
    });

    if (errores === 0) {
        errorCounter2.textContent = '🎉 ¡Todos correctos!';
        errorCounter2.classList.remove('text-red-500');
        errorCounter2.classList.add('text-green-500');
    } else {
        errorCounter2.textContent = `Número de errores: ${errores}`;
        errorCounter2.classList.remove('text-green-500');
        errorCounter2.classList.add('text-red-500');
    }
});