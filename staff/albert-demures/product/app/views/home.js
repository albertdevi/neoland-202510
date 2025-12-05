const homeView = document.createElement("div");
homeView.className = "flex flex-col gap-5 items-center justify-center min-h-screen"
homeView.style.display = "none";

const homeTitle = document.createElement("h1");
homeTitle.textContent = "MyPet";
homeTitle.className = "text-5xl font-extrabold text-blue-600 text-center mt-6 tracking-tight"
homeView.appendChild(homeTitle);

const homeSubtitle = document.createElement('h2')
homeSubtitle.textContent = 'Welcome Home'
homeSubtitle.className = "text-3xl font-semibold text-blue-500 text-center mt-4 tracking-tight"
homeView.appendChild(homeSubtitle)

const homeAddPetButton = document.createElement("button")
homeAddPetButton.textContent = "+ Pet"
homeAddPetButton.className = "bg-blue-600 text-white font-semibold py-2 px-16 rounded-lg shadow hover:bg-blue-700 transition-colors duration-200 self-center"
homeView.appendChild(homeAddPetButton)

homeAddPetButton.addEventListener('click', function (event) {
  event.preventDefault()

  homeView.style.display = 'none'
  addPetView.style.display = ''

})

const logoutLink = document.createElement("button")
logoutLink.textContent = "Logout"
logoutLink.className = "text-gray-700 text-lg leading-loose max-w-md mx-auto mt-4 text-center";
homeView.appendChild(logoutLink)


logoutLink.addEventListener('click', function (event) {
  event.preventDefault();

  homeView.style.display = 'none';
  loginView.style.display = '';
});

document.body.appendChild(homeView);
