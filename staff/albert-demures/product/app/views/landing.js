const landingView = document.createElement("div");
landingView.className = ''
landingView.style.display = "none";

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
landingLoginLink.className = 'underline'
landingAccess.appendChild(landingLoginLink);
const landingOrText = document.createTextNode(" or ");
landingAccess.appendChild(landingOrText);
const landingRegisterLink = document.createElement("a");
landingRegisterLink.textContent = "Register";
landingRegisterLink.href = "";
landingRegisterLink.className = 'underline'
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