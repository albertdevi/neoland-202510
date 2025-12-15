const loginView = createView()
hideView(loginView)
setClass(loginView, 'flex flex-col items-center justify-center min-h-screen')

const loginTitle = createTitle()
setTextContent(loginTitle, "MyPet")
addChild(loginView, loginTitle)

const loginSubtitle = createTitle2()
setTextContent(loginSubtitle, 'Login')
addChild(loginView, loginSubtitle)

const loginForm = createForm()
setClass(loginForm, 'flex flex-col gap-4 w-full max-w-sm mx-auto mt-6')

const loginUsernameLabel = createLabel()
setTextContent(loginUsernameLabel, 'Username')
setFor(loginUsernameLabel, 'username')
addChild(loginForm, loginUsernameLabel)

const loginUsernameInput = createInput()
setId(loginUsernameInput, 'username')
setType(loginUsernameInput, 'text')
addChild(loginForm, loginUsernameInput)

const loginPasswordLabel = createLabel()
setTextContent(loginPasswordLabel, 'Password')
setFor(loginPasswordLabel, 'password')
addChild(loginForm, loginPasswordLabel)

const loginPasswordInput = createInput()
setId(loginPasswordInput, 'password')
setType(loginPasswordInput, 'password')
addChild(loginForm, loginPasswordInput)

const loginShowPasswordButton = createButtonShow()
setTextContent(loginShowPasswordButton, 'Show')
setType(loginShowPasswordButton, 'button')
addChild(loginForm, loginShowPasswordButton)

loginShowPasswordButton.addEventListener('click', function (event) {
  event.preventDefault();

  if (getType(loginPasswordInput) === 'password') {
    setType(loginPasswordInput, 'text')
    setTextContent(loginShowPasswordButton, 'Hide')
    setClass(loginPasswordInput,
      'border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-yellow-100')
  } else {
    setType(loginPasswordInput, 'password')
    setTextContent(loginShowPasswordButton.textContent, 'Show')
    setClass(loginPasswordInput,
      'border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition')
  }
});

const loginSubmitButton = createButton()
setTextContent(loginSubmitButton, 'Login')
addChild(loginForm, loginSubmitButton)

addChild(loginView, loginForm)

//Submit login
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const username = getValue(loginUsernameInput)
  const password = getValue(loginPasswordInput)

  try {
    logic.loginUser(username, password);

    reset(loginForm)
    setTextContent(loginFeedback, '')

    renderHomePetList()

    hideView(loginView)
    showView(homeView)
  } catch (error) {
    setTextContent(loginFeedback, error.message)
  }
});

const loginRegisterLink = createLink()
setTextContent(loginRegisterLink, "Register")
setClass(loginRegisterLink, 'text-gray-700 text-lg leading-loose max-w-md mx-auto mt-4 text-center underline')
addChild(loginView, loginRegisterLink)

loginRegisterLink.addEventListener("click", function (event) {
  event.preventDefault();

  hideView(loginView)
  showView(registerView)
})

const loginFeedback = createParagraph()
setClass(loginFeedback, 'text-red-600 text-sm mt-2 font-medium')
addChild(loginView, loginFeedback)

addChild(document.body, loginView)
