const addPetView = createView()
setClass(addPetView, 'flex flex-col items-center justify-center min-h-screen')
hideView(addPetView)

const addPetTitle = createTitle()
setTextContent(addPetTitle, 'MyPet')
addChild(addPetView, addPetTitle)

const addPetTopPanel = createPanel()
setClass(addPetTopPanel, 'flex justify-between gap-10')
addChild(addPetView, addPetTopPanel)

const addPetSubtitle = createTitle2()
setTextContent(addPetSubtitle, 'Add new pet')
addChild(addPetTopPanel, addPetSubtitle)

const addPetBackLink = createLink()
setTextContent(addPetBackLink, 'Back')
addChild(addPetTopPanel, addPetBackLink)

addPetBackLink.addEventListener('click', function (event) {
  event.preventDefault()

  hideView(addPetView)
  showView(homeView)

})

const addPetForm = createForm()
setClass(addPetForm, 'flex flex-col gap-4 w-full max-w-sm mx-auto mt-6')

const addPetNameLabel = createLabel()
setTextContent(addPetNameLabel, 'Name')
setFor(addPetNameLabel, 'name')
addChild(addPetForm, addPetNameLabel)

const addPetNameInput = createInput()
setId(addPetNameInput, 'name')
addPetNameInput.type = 'text'
addPetForm.appendChild(addPetNameInput)

const addPetBirthDateLabel = createLabel()
setTextContent(addPetBirthDateLabel, 'Date of Birth')
setFor(addPetBirthDateLabel, 'date')
addChild(addPetForm, addPetBirthDateLabel)

const addPetBirthdateInput = createInput()
setId(addPetBirthdateInput, 'date')
setType(addPetBirthdateInput, 'date')
addChild(addPetForm, addPetBirthdateInput)

const addPetWeightLabel = createLabel()
setTextContent(addPetWeightLabel, 'Weight (kg)')
setFor(addPetWeightLabel, 'weight')
addChild(addPetForm, addPetWeightLabel)

const addPetWeightInput = createInput()
setTextContent(addPetWeightInput, 'weight')
setType(addPetWeightInput, 'number')
setStep(addPetWeightInput, '0.01')
addChild(addPetForm, addPetWeightInput)

const addPetImageLabel = createLabel()
setTextContent(addPetImageLabel, 'Image')
setFor(addPetImageLabel, 'image')
addChild(addPetForm, addPetImageLabel)

const addPetImageInput = createInput()
setId(addPetImageInput, 'image')
setType(addPetImageInput, 'url')
addChild(addPetForm, addPetImageInput)

const addPetSubmitButton = createButton()
setTextContent(addPetSubmitButton, 'Add Pet')
setType(addPetSubmitButton, 'submit')
addChild(addPetForm, addPetSubmitButton)

addChild(addPetView, addPetForm)

addPetForm.addEventListener('submit', function (event) {
  event.preventDefault()

  const name = getValue(addPetNameInput)
  const birthdate = getValue(addPetBirthdateInput)
   const weight = parseFloat(getValue(addPetWeightInput))
  const image = getValue(addPetImageInput)

  try {
    logic.addPet(name, birthdate, weight, image)

    reset(addPetForm)
    setTextContent(addPetFeedback, '')

    clearHomePetList()

    renderHomePetList()

    hideView(addPetView)
    showView(homeView)
  } catch (error) {
    setTextContent(addPetFeedback, error.message)
  }
})

const addPetFeedback = createParagraph()
setClass(addPetFeedback, 'text-red-600 text-sm mt-2 font-medium')
addChild(addPetView, addPetFeedback)

addChild(document.body, addPetView)