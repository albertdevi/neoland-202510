const registerView = createView()
hideView(registerView)
setClass(registerView, 'flex flex-col items-center justify-center min-h-screen')

const registerTitle = createTitle()
setTextContent(registerTitle, "MyPet")
addChild(registerView, registerTitle)

const registerSubtitle = createTitle2()
setTextContent(registerSubtitle, 'Register')
addChild(registerView, registerSubtitle)

const registerForm = createForm()
setClass(registerForm, 'flex flex-col gap-4 w-full max-w-sm mx-auto mt-6')

const registerNameLabel = createLabel()
setTextContent(registerNameLabel, 'Name')
setFor(registerNameLabel, 'name')
setClass(registerNameLabel, 'text-m text-gray-600 mt-2')
addChild(registerForm, registerNameLabel)

const registerNameInput = createInput()
setId(registerNameInput, 'name')
setType(registerNameInput, 'text')
addChild(registerForm, registerNameInput)

const registerEmailLabel = createLabel()
setTextContent(registerEmailLabel, 'Email')
setFor(registerEmailLabel, 'email')
setClass(registerEmailLabel, 'text-m text-gray-600 mt-2')
addChild(registerForm, registerEmailLabel)

const registerEmailInput = createInput()
setId(registerEmailInput, 'email')
setType(registerEmailInput, 'email')
addChild(registerForm, registerEmailInput)

const registerUsernameLabel = createLabel()
setTextContent(registerUsernameLabel, 'Username')
setType(registerUsernameLabel, 'username')
setClass(registerUsernameLabel, 'text-m text-gray-600 mt-2')
addChild(registerForm, registerUsernameLabel)

const registerUsernameInput = createInput()
setId(registerUsernameInput, 'username')
setType(registerUsernameInput, 'text')
addChild(registerForm, registerUsernameInput);

const registerPasswordLabel = createLabel()
setTextContent(registerPasswordLabel, 'Password')
setType(registerPasswordLabel, 'password')
setClass(registerPasswordLabel, 'text-m text-gray-600 mt-2')
addChild(registerForm, registerPasswordLabel);

const registerPasswordInput = createInput()
setTextContent(registerPasswordInput, 'password')
setType(registerPasswordInput, 'password')
addChild(registerForm, registerPasswordInput);

const registerShowPasswordButton = createButtonShow()
setTextContent(registerShowPasswordButton, 'Show')
setType(registerShowPasswordButton, 'button')
addChild(registerForm, registerShowPasswordButton);

registerShowPasswordButton.addEventListener('click', function (event) {
  event.preventDefault();

  if (getType(registerPasswordInput) === 'password') {
    setType(registerPasswordInput, 'text')
    setTextContent(registerShowPasswordButton, 'Hide')
    setClass(registerPasswordInput,
      'border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-yellow-100')
  } else {
    setType(registerPasswordInput, 'password')
    setTextContent(registerShowPasswordButton, 'Show')
    setClass(registerPasswordInput,
      'border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition')
  }
});

const registerPasswordRepeatLabel = createLabel()
setTextContent(registerPasswordRepeatLabel, 'Repeat Password')
setFor(registerPasswordRepeatLabel, 'repeatPassword')
setClass(registerPasswordLabel, 'text-m text-gray-600 mt-2')
addChild(registerForm, registerPasswordRepeatLabel)

const registerPasswordRepeatInput = createInput()
setId(registerPasswordRepeatInput, 'repeatPassword')
setType(registerPasswordRepeatInput, 'password')
addChild(registerForm, registerPasswordRepeatInput)

const registerShowPasswordRepeatButton = createButtonShow();
setTextContent(registerShowPasswordRepeatButton, 'Show')
setType(registerShowPasswordRepeatButton, 'button')
addChild(registerForm, registerShowPasswordRepeatButton)

registerShowPasswordRepeatButton.addEventListener('click', function (event) {
  event.preventDefault();
  if (registerPasswordRepeatInput.type === 'password') {
    setType(registerPasswordRepeatInput, 'text')
    setTextContent(registerShowPasswordRepeatButton, 'Hide')
    setClass(registerPasswordRepeatInput,
      'border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-yellow-100')
  } else {
    setType(registerPasswordRepeatInput, 'password')
    setTextContent(registerShowPasswordRepeatButton, 'Show')
    setClass(registerPasswordRepeatInput.className =
      'border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition')
  }
});

const registerSubmitButton = createButton()
setTextContent(registerSubmitButton, 'Register')
setType(registerSubmitButton, 'submit')
addChild(registerForm, registerSubmitButton)
addChild(registerView, registerForm)

// Submit register

registerForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = getValue(registerNameInput)
  const email = getValue(registerEmailInput)
  const username = getValue(registerUsernameInput)
  const password = getValue(registerPasswordInput)
  const passwordRepeat = getValue(registerPasswordRepeatInput)

  try {
    logic.registerUser(name, email, username, password, passwordRepeat);

    reset(registerForm)
    setTextContent(registerFeedback, '')

    hideView(registerView)
    showView(loginView)
  } catch (error) {
    setTextContent(registerFeedback, error.message)
  }
});

const registerLoginLink = document.createElement("a");
setTextContent(registerLoginLink, 'Login')
registerLoginLink.href = "";
addChild(registerView, registerLoginLink)
setClass(registerLoginLink, 'text-gray-700 text-lg leading-loose max-w-md mx-auto mt-4 text-center underline')


registerLoginLink.addEventListener("click", function (event) {
  event.preventDefault();

  hideView(registerView)
  showView(loginView)
});

const registerFeedback = createParagraph()
addChild(registerView, registerFeedback)
setClass(registerFeedback, 'text-red-600 text-sm mt-2 font-medium')

addChild(document.body, registerView)