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
registerNameLabel.htmlFor = 'name'
registerForm.appendChild(registerNameLabel);
registerNameLabel.className = "text-m text-gray-600 mt-2"
const registerNameInput = document.createElement("input");
registerNameInput.id = 'name'
registerNameInput.type = 'text'
registerForm.appendChild(registerNameInput);
registerNameInput.className =
  "border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition";

const registerEmailLabel = document.createElement("label");
registerEmailLabel.textContent = "Email";
registerEmailLabel.htmlFor = 'email'
registerForm.appendChild(registerEmailLabel);
registerEmailLabel.className = "text-m text-gray-600 mt-2"
const registerEmailInput = document.createElement("input");
registerEmailInput.id = 'email'
registerEmailInput.type = 'email'
registerForm.appendChild(registerEmailInput);
registerEmailInput.className =
  "border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition";

const registerUsernameLabel = document.createElement("label");
registerUsernameLabel.textContent = "Username";
registerUsernameLabel.htmlFor = 'username'
registerForm.appendChild(registerUsernameLabel);
registerUsernameLabel.className = "text-m text-gray-600 mt-2"
const registerUsernameInput = document.createElement("input");
registerUsernameInput.id = 'username'
registerUsernameInput.type = 'text'
registerForm.appendChild(registerUsernameInput);
registerUsernameInput.className =
  "border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition";

const registerPasswordLabel = document.createElement("label");
registerPasswordLabel.textContent = "Password";
registerPasswordLabel.htmlFor = 'password';
registerForm.appendChild(registerPasswordLabel);
registerPasswordLabel.className = "text-m text-gray-600 mt-2"
const registerPasswordInput = document.createElement("input");
registerPasswordInput.type = "password";
registerPasswordInput.id = 'password'
registerForm.appendChild(registerPasswordInput);
registerPasswordInput.className =
  "border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition";

const registerShowPasswordButton = document.createElement('button');
registerShowPasswordButton.textContent = 'Show';
registerShowPasswordButton.type = 'button';
registerShowPasswordButton.className = "w-24 bg-gray-600 text-white font-semibold py-1 px-0 rounded-lg shadow hover:bg-gray-700 transition-colors duration-200 self-end"
registerForm.appendChild(registerShowPasswordButton);

registerShowPasswordButton.addEventListener('click', function (event) {
  event.preventDefault();

  if (registerPasswordInput.type === 'password') {
    registerPasswordInput.type = 'text';
    registerShowPasswordButton.textContent = 'Hide';
    registerPasswordInput.className =
      "border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-yellow-100";
  } else {
    registerPasswordInput.type = 'password';
    registerShowPasswordButton.textContent = 'Show';
    registerPasswordInput.className =
      "border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition";
  }
});

const registerPasswordRepeatLabel = document.createElement("label");
registerPasswordRepeatLabel.textContent = "Repeat Password";
registerPasswordRepeatLabel.htmlFor = 'repeatPassword'
registerForm.appendChild(registerPasswordRepeatLabel);
registerPasswordRepeatLabel.className = "text-m text-gray-600 mt-2"
const registerPasswordRepeatInput = document.createElement("input");
registerPasswordRepeatInput.type = "password";
registerPasswordRepeatInput.id = 'repeatPassword'
registerForm.appendChild(registerPasswordRepeatInput);
registerPasswordRepeatInput.className =
  "border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition";

const registerShowPasswordRepeatButton = document.createElement('button');
registerShowPasswordRepeatButton.textContent = 'Show';
registerShowPasswordRepeatButton.type = 'button';
registerShowPasswordRepeatButton.className = "w-24 bg-gray-600 text-white font-semibold py-1 px-0 rounded-lg shadow hover:bg-gray-700 transition-colors duration-200 self-end"
registerForm.appendChild(registerShowPasswordRepeatButton);

registerShowPasswordRepeatButton.addEventListener('click', function (event) {
  event.preventDefault();
  if (registerPasswordRepeatInput.type === 'password') {
    registerPasswordRepeatInput.type = 'text';
    registerShowPasswordRepeatButton.textContent = 'Hide';
    registerPasswordRepeatInput.className =
      "border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-yellow-100";
  } else {
    registerPasswordRepeatInput.type = 'password';
    registerShowPasswordRepeatButton.textContent = 'Show';
    registerPasswordRepeatInput.className =
      "border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition";
  }
});

const registerSubmitButton = document.createElement("button");
registerSubmitButton.textContent = "Register";
registerSubmitButton.type = 'submit'
registerForm.appendChild(registerSubmitButton);
registerSubmitButton.className = "bg-blue-600 text-white font-semibold py-2 px-16 rounded-lg shadow hover:bg-blue-700 transition-colors duration-200 self-center"
registerView.appendChild(registerForm);

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
registerLoginLink.className = "text-gray-700 text-lg leading-loose max-w-md mx-auto mt-4 text-center underline";


registerLoginLink.addEventListener("click", function (event) {
  event.preventDefault();

  registerView.style.display = "none";
  loginView.style.display = "";
});

const registerFeedback = document.createElement("p");
registerView.appendChild(registerFeedback);
registerFeedback.className = "text-red-600 text-sm mt-2 font-medium";

document.body.appendChild(registerView);