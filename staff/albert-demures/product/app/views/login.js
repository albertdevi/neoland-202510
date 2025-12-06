const loginView = document.createElement("div");
loginView.style.display = "none";
loginView.className = "flex flex-col items-center justify-center min-h-screen"

const loginTitle = document.createElement("h1");
loginTitle.textContent = "MyPet";
loginTitle.className = "text-5xl font-extrabold text-blue-600 text-center mt-6 tracking-tight"
loginView.appendChild(loginTitle);

const loginSubtitle = document.createElement("h2");
loginSubtitle.textContent = "Login";
loginSubtitle.className = "text-3xl font-semibold text-blue-500 text-center mt-4 tracking-tight"
loginView.appendChild(loginSubtitle);

const loginForm = document.createElement("form");
loginForm.className = "flex flex-col gap-4 w-full max-w-sm mx-auto mt-6"

const loginUsernameLabel = document.createElement("label");
loginUsernameLabel.textContent = "Username";
loginUsernameLabel.htmlFor = 'username'
loginUsernameLabel.className = "text-m text-gray-600 mt-2"
loginForm.appendChild(loginUsernameLabel);
const loginUsernameInput = document.createElement("input");
loginUsernameInput.id = 'username'
loginUsernameInput.className =
  "border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition";
loginForm.appendChild(loginUsernameInput);


const loginPasswordLabel = document.createElement("label");
loginPasswordLabel.textContent = "Password";
loginPasswordLabel.htmlFor = 'password'
loginPasswordLabel.className = "text-m text-gray-600 mt-2"
loginForm.appendChild(loginPasswordLabel);
const loginPasswordInput = document.createElement("input");
loginPasswordInput.type = "password";
loginPasswordInput.id = 'password'
loginPasswordInput.className =
  "border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition";
loginForm.appendChild(loginPasswordInput);

const loginShowPasswordButton = document.createElement('button');
loginShowPasswordButton.textContent = 'Show';
loginShowPasswordButton.type = 'button';
loginShowPasswordButton.className = "w-24 bg-gray-600 text-white font-semibold py-1 px-0 rounded-lg shadow hover:bg-gray-700 transition-colors duration-200 self-end"
loginForm.appendChild(loginShowPasswordButton);

loginShowPasswordButton.addEventListener('click', function (event) {
  event.preventDefault();

  if (loginPasswordInput.type === 'password') {
    loginPasswordInput.type = 'text';
    loginShowPasswordButton.textContent = 'Hide';
    loginPasswordInput.className =
      "border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-yellow-100";
  } else {
    loginPasswordInput.type = 'password';
    loginShowPasswordButton.textContent = 'Show';
    loginPasswordInput.className =
      "border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ";
  }
});

const loginSubmitButton = document.createElement("button");
loginSubmitButton.textContent = "Login";
loginSubmitButton.className = "bg-blue-600 text-white font-semibold py-2 px-16 rounded-lg shadow hover:bg-blue-700 transition-colors duration-200 self-center"
loginForm.appendChild(loginSubmitButton);
loginView.appendChild(loginForm);

//Submit login
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const username = loginUsernameInput.value;
  const password = loginPasswordInput.value;

  try {
    logic.loginUser(username, password);

    loginForm.reset();
    loginFeedback.textContent = ''

    const pets = logic.getPets()

    for (let i = 0; i < pets.length; i++) {
      const pet = pets[i]

      const item = document.createElement('li')
      item.className = 'flex gap-8 my-4 items-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow'

      const image = document.createElement('img')
      image.src = pet.image
      image.className = 'rounded-full w-20 h-20 object-cover border-2 border-blue-500'
      item.appendChild(image)

      const name = document.createElement('p')
      name.textContent = pet.name
      name.className = 'text-2xl font-semibold text-gray-400'
      item.appendChild(name)

      homePetList.appendChild(item)
    }

    loginView.style.display = "none";
    homeView.style.display = "";
  } catch (error) {
    loginFeedback.textContent = error.message;
  }
});

const loginRegisterLink = document.createElement("a");
loginRegisterLink.textContent = "Register";
loginRegisterLink.href = "";
loginRegisterLink.className = "text-gray-700 text-lg leading-loose max-w-md mx-auto mt-4 text-center underline";
loginView.appendChild(loginRegisterLink);

loginRegisterLink.addEventListener("click", function (event) {
  event.preventDefault();

  loginView.style.display = "none";
  registerView.style.display = "";
});

const loginFeedback = document.createElement("p");
loginFeedback.className = "text-red-600 text-sm mt-2 font-medium";
loginView.appendChild(loginFeedback);

document.body.appendChild(loginView);
