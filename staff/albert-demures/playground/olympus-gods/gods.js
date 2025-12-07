const godsView = document.createElement('div');
godsView.className = 'flex flex-col items-center justify-center gap-12 min-h-screen ';
godsView.style.backgroundImage = "url('background/greekBackground.jpg')";
godsView.style.backgroundRepeat = "repeat";   
godsView.style.backgroundSize = "350px 350px";       
godsView.style.backgroundPosition = "top left"; 

const godsTitle = document.createElement('h1');
godsTitle.textContent = 'Adivina todos los dioses';
godsTitle.className = 'text-6xl font-extrabold text-gray-900 mb-10 mt-10';
godsView.appendChild(godsTitle);

for (let i = 0; i < gods.length; i++) {
    const divGod = document.createElement('div');
    divGod.className = 'bg-gradient-to-b from-gray-800 to-black text-white px-15 py-8 rounded-2xl w-120 text-center flex flex-col items-center gap-6 shadow-2xl relative transform transition-transform duration-500'; 

    // Efecto hover menos pronunciado
    divGod.addEventListener('mouseenter', () => {
        divGod.style.transform = 'scale(1.03)'; 
    });
    divGod.addEventListener('mouseleave', () => {
        divGod.style.transform = 'scale(1)'; 
    });

    const image = document.createElement('img');
    image.src = gods[i].imgHades;
    image.className = 'object-cover rounded-full border-4 border-yellow-400 transition-transform duration-500 hover:scale-110 hover:shadow-[0_0_10px_3px_rgba(255,215,0,0.5)]';
    divGod.appendChild(image);

    const godName = document.createElement('h2');
    godName.textContent = gods[i].name;
    godName.className = 'font-extrabold text-4xl text-yellow-300';
    divGod.appendChild(godName);

    const quote = document.createElement('p');
    quote.textContent = gods[i].sex + ' del';
    quote.className = 'text-gray-300 italic text-lg text-center';
    divGod.appendChild(quote);

    const dropdownButton = document.createElement('button');
    dropdownButton.textContent = 'Selecciona su dominio ↓';
    dropdownButton.className = 'bg-yellow-500 text-black px-6 py-3 rounded-full font-bold hover:bg-yellow-400 transition-colors duration-300 focus:outline-none';
    divGod.appendChild(dropdownButton);

    const dropdownMenu = document.createElement('div');
    dropdownMenu.className = 'absolute mt-2 w-80 bg-gray-900 text-white rounded-lg shadow-lg hidden flex-col z-20';
    divGod.appendChild(dropdownMenu);

    gods.forEach(god => {
        const item = document.createElement('div');
        item.textContent = god.dominio;
        item.className = 'px-4 py-2 hover:bg-yellow-500 hover:text-black cursor-pointer transition-colors duration-200';
        item.addEventListener('click', () => {
            dropdownButton.textContent = god.dominio;
            dropdownMenu.classList.add('hidden');
        });
        dropdownMenu.appendChild(item);
    });

    // Abrir dropdown al hacer click
    dropdownButton.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownMenu.classList.toggle('hidden');
    });

    // Cerrar dropdown si el ratón sale del divGod
    divGod.addEventListener('mouseleave', () => {
        dropdownMenu.classList.add('hidden');
    });

    godsView.appendChild(divGod);
}

const submitButton = document.createElement('button');
submitButton.textContent = '¡Ya estoy!';
submitButton.type = 'submit';
submitButton.className = 'bg-yellow-500 text-black px-8 py-3 rounded-full font-bold mt-10 hover:bg-yellow-400 transition-colors duration-300';
godsView.appendChild(submitButton);

document.body.appendChild(godsView);