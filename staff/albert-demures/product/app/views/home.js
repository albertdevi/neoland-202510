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

const homeTopPanel = document.createElement('div')
homeTopPanel.className = 'flex space-between gap-30'
homeView.appendChild(homeTopPanel)

const homeAddPetButton = document.createElement("button")
homeAddPetButton.textContent = "+ Pet"
homeAddPetButton.className = "bg-blue-600 text-white font-semibold py-2 px-6 rounded-xl shadow hover:bg-blue-700 transition-colors duration-200 self-center "
homeTopPanel.appendChild(homeAddPetButton)

homeAddPetButton.addEventListener('click', function (event) {
  event.preventDefault()

  homeView.style.display = 'none'
  addPetView.style.display = ''

})

const homeLogoutButton = document.createElement("a")
homeLogoutButton.textContent = "Logout"
homeLogoutButton.type = 'button'
homeLogoutButton.className = "text-gray-700 text-lg leading-loose max-w-md mx-auto mt-4 text-center underline";
homeTopPanel.appendChild(homeLogoutButton)


homeLogoutButton.addEventListener('click', function (event) {
  event.preventDefault();

  logic.logoutUser()

  for (let i = homePetList.children.length -1; i >= 0; i--){
    const child = homePetList.children[i]

    child.remove()
  }

  homeView.style.display = 'none';
  loginView.style.display = '';
});

const homePetList = document.createElement ('ul')
homeView.appendChild(homePetList)

document.body.appendChild(homeView);