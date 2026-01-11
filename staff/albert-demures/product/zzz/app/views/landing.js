const landingView = createView()
landingView.className = "flex flex-col gap-5 items-center justify-center min-h-screen"
//landingView.style.display = "none"

const landingTitle = createTitle()
setTextContent(landingTitle, 'MyPet')
addChild(landingView, landingTitle)

const landingWelcome = createParagraph()
setTextContent(landingWelcome, 'Welcome!')
landingWelcome.className = "text-3xl font-semibold text-blue-500 text-center mt-4 tracking-tight"
addChild(landingView, landingWelcome)

const landingNavigation = createNavigation()
setClass(landingNavigation, 'text-gray-700 text-lg leading-loose max-w-md mx-auto mt-4 text-center')

const landingLoginLink = createLink()
setTextContent(landingLoginLink, 'Login')
setClass(landingLoginLink, 'underline')
addChild(landingNavigation, landingLoginLink)

const landingOrText = createTextNode(' or ')
addChild(landingNavigation, landingOrText)

const landingRegisterLink = createLink()
setTextContent(landingRegisterLink, 'Register')
setClass(landingRegisterLink, 'underline')
addChild(landingNavigation, landingRegisterLink)

addChild(landingView, landingNavigation)

landingLoginLink.addEventListener("click", function (event) {
  event.preventDefault();

  hideView(landingView)
  showView(loginView)
})

landingRegisterLink.addEventListener("click", function (event) {
  event.preventDefault();

  hideView(landingView)
  showView(registerView)
})

addChild(document.body, landingView)