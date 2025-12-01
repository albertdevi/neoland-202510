// landing view

const landingView = document.createElement("div");
landingView.className = ''

const landingTitle = document.createElement("h1");
landingTitle.textContent = "MyVet";
landingTitle.className = "text-5xl font-extrabold text-blue-600 text-center mt-6 tracking-tight"
landingView.appendChild(landingTitle);

const landingWelcome = document.createElement("h2");
landingWelcome.textContent = "Welcome!";
landingView.appendChild(landingWelcome);
landingWelcome.className = "text-3xl font-semibold text-blue-500 text-center mt-4 tracking-tight"

const landingAccess = document.createElement("p");
const landingLoginLink = document.createElement("a");
landingLoginLink.textContent = "Login";
landingLoginLink.href = "";
landingAccess.appendChild(landingLoginLink);
const landingOrText = document.createTextNode(" or ");
landingAccess.appendChild(landingOrText);
const landingRegisterLink = document.createElement("a");
landingRegisterLink.textContent = "Register";
landingRegisterLink.href = "";
landingAccess.appendChild(landingRegisterLink);
landingView.appendChild(landingAccess);
landingAccess.className = "text-gray-700 text-lg leading-loose max-w-md mx-auto mt-4 text-center"

landingLoginLink.addEventListener("click", function (event) {
  event.preventDefault();

  landingView.style.display = "none";
  loginView.style.display = "";
});

landingRegisterLink.addEventListener("click", function (event) {
  event.preventDefault();

  landingView.style.display = "none";
  registerView.style.display = "";
});

document.body.appendChild(landingView);

// register Form

const registerView = document.createElement("div");
registerView.style.display = "none";
registerView.className = "flex flex-col items-center justify-center min-h-screen"

const registerTitle = document.createElement("h1");
registerTitle.textContent = "MyPet";
registerView.appendChild(registerTitle);
registerTitle.className = "text-5xl font-extrabold text-blue-600 text-center mt-6 tracking-tight"

const registerSubtitle = document.createElement("h2");
registerSubtitle.textContent = "Register";
registerView.appendChild(registerSubtitle);
registerSubtitle.className = "text-3xl font-semibold text-blue-500 text-center mt-4 tracking-tight"

const registerForm = document.createElement("form");
registerForm.className = "flex flex-col gap-4 w-full max-w-sm mx-auto mt-6"

const registerNameLabel = document.createElement("label");
registerNameLabel.textContent = "Name";
registerForm.appendChild(registerNameLabel);
registerNameLabel.className = "text-m text-gray-600 mt-2"
const registerNameInput = document.createElement("input");
registerForm.appendChild(registerNameInput);
registerNameInput.className =
  "border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition";

const registerEmailLabel = document.createElement("label");
registerEmailLabel.textContent = "Email";
registerForm.appendChild(registerEmailLabel);
registerEmailLabel.className = "text-m text-gray-600 mt-2"
const registerEmailInput = document.createElement("input");
registerForm.appendChild(registerEmailInput);
registerEmailInput.className =
  "border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition";

const registerUsernameLabel = document.createElement("label");
registerUsernameLabel.textContent = "Username";
registerForm.appendChild(registerUsernameLabel);
registerUsernameLabel.className = "text-m text-gray-600 mt-2"
const registerUsernameInput = document.createElement("input");
registerForm.appendChild(registerUsernameInput);
registerUsernameInput.className =
  "border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition";

const registerPasswordLabel = document.createElement("label");
registerPasswordLabel.textContent = "Password";
registerForm.appendChild(registerPasswordLabel);
registerPasswordLabel.className = "text-m text-gray-600 mt-2"
const registerPasswordInput = document.createElement("input");
registerPasswordInput.type = "password";
registerForm.appendChild(registerPasswordInput);
registerPasswordInput.className =
  "border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition";

const registerPasswordRepeatLabel = document.createElement("label");
registerPasswordRepeatLabel.textContent = "Repeat Password";
registerForm.appendChild(registerPasswordRepeatLabel);
registerPasswordRepeatLabel.className = "text-m text-gray-600 mt-2"
const registerPasswordRepeatInput = document.createElement("input");
registerPasswordRepeatInput.type = "password";
registerForm.appendChild(registerPasswordRepeatInput);
registerPasswordRepeatInput.className =
  "border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition";

const registerSubmitButton = document.createElement("button");
registerSubmitButton.textContent = "Register";
registerForm.appendChild(registerSubmitButton);
registerSubmitButton.className =  "bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition-colors duration-200"
registerView.appendChild(registerForm);

registerForm.className = "flex flex-col gap-4 w-full max-w-sm mx-auto mt-6"
// Submit register

registerForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = registerNameInput.value;
  const email = registerEmailInput.value;
  const username = registerUsernameInput.value;
  const password = registerPasswordInput.value;
  const passwordRepeat = registerPasswordRepeatInput.value;

  try {
    logic.registerUser(name, email, username, password, passwordRepeat);

    registerForm.reset();
    registerFeedback.textContent = "";

    registerView.style.display = "none";
    loginView.style.display = "";
  } catch (error) {
    registerFeedback.textContent = error.message;
  }
});

const registerLoginLink = document.createElement("a");
registerLoginLink.textContent = "Login";
registerLoginLink.href = "";
registerView.appendChild(registerLoginLink);
registerLoginLink.className =  "text-gray-700 text-lg leading-loose max-w-md mx-auto mt-4 text-center";


registerLoginLink.addEventListener("click", function (event) {
  event.preventDefault();

  registerView.style.display = "none";
  loginView.style.display = "";
});

const registerFeedback = document.createElement("p");
registerView.appendChild(registerFeedback);
registerFeedback.className =   "text-red-600 text-sm mt-2 font-medium";

document.body.appendChild(registerView);

// login Form

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
loginUsernameLabel.className = "text-m text-gray-600 mt-2"
loginForm.appendChild(loginUsernameLabel);
const loginUsernameInput = document.createElement("input");
loginUsernameInput.className =
  "border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition";
loginForm.appendChild(loginUsernameInput);


const loginPasswordLabel = document.createElement("label");
loginPasswordLabel.textContent = "Password";
loginPasswordLabel.className = "text-m text-gray-600 mt-2"
loginForm.appendChild(loginPasswordLabel);
const loginPasswordInput = document.createElement("input");
loginPasswordInput.type = "password";
loginPasswordInput.className =
  "border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition";
loginForm.appendChild(loginPasswordInput);


const loginSubmitButton = document.createElement("button");
loginSubmitButton.textContent = "Login";
loginSubmitButton.className =  "bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition-colors duration-200"
loginForm.appendChild(loginSubmitButton);

loginView.appendChild(loginForm);

const loginRegisterLink = document.createElement("a");
loginRegisterLink.textContent = "Register";
loginRegisterLink.href = "";
loginRegisterLink.className =  "text-gray-700 text-lg leading-loose max-w-md mx-auto mt-4 text-center";
loginView.appendChild(loginRegisterLink);

loginRegisterLink.addEventListener("click", function (event) {
  event.preventDefault();

  loginView.style.display = "none";
  registerView.style.display = "";
});

const loginFeedback = document.createElement("p");
loginFeedback.className =   "text-red-600 text-sm mt-2 font-medium";
loginView.appendChild(loginFeedback);

//Submit login
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const username = loginUsernameInput.value;
  const password = loginPasswordInput.value;

  try {
    logic.loginUser(username, password);

    loginForm.reset();

    loginFeedback.textContent = "";

    loginView.style.display = "none";

    homeView.style.display = "";
  } catch (error) {
    loginFeedback.textContent = error.message;
  }
});

document.body.appendChild(loginView);


//home
const homeView = document.createElement("div");
homeView.className = "flex flex-col items-center justify-center min-h-screen"
homeView.style.display = "none";

const homeTitle = document.createElement("h1");
homeTitle.textContent = "MyPet welcome view";
homeTitle.className = "text-5xl font-extrabold text-blue-600 text-center mt-6 tracking-tight"
homeView.appendChild(homeTitle);

const homeSubtitle = document.createElement('h2')
homeSubtitle.textContent = 'Welcome Home'
homeSubtitle.className = "text-3xl font-semibold text-blue-500 text-center mt-4 tracking-tight"
homeView.appendChild(homeSubtitle)

const logoutLink= document.createElement ("button")
logoutLink.textContent = "Logout"
logoutLink.href = ""
logoutLink.className =  "text-gray-700 text-lg leading-loose max-w-md mx-auto mt-4 text-center";
homeView.appendChild(logoutLink)


logoutLink.addEventListener ('click', function (event) {
  event.preventDefault();

  homeView.style.display = 'none';
    loginView.style.display = '';
});

document.body.appendChild(homeView);
