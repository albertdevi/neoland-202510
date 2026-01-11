const homeView = createView()
setClass(homeView, 'flex flex-col gap-5 items-center justify-center min-h-screen')
hideView(homeView)

const homeTitle = createTitle()
setTextContent(homeTitle, 'MyPet')
addChild(homeView, homeTitle)

const homeSubtitle = createTitle2()
setTextContent(homeSubtitle, 'Welcome Home')
addChild(homeView, homeSubtitle)

const homeTopPanel = createPanel()
setClass(homeTopPanel, 'flex justify-between gap-8')
addChild(homeView, homeTopPanel)

const homeAddPetButton = createButton()
setTextContent(homeAddPetButton, '+ Pet')
homeTopPanel.appendChild(homeAddPetButton)

homeAddPetButton.addEventListener('click', function (event) {
  event.preventDefault()

  hideView(homeView)
  showView(addPetView)
})

const homeLogoutButton = createButtonShow()
setTextContent(homeLogoutButton, 'Logout')
setType(homeLogoutButton, 'button')
addChild(homeTopPanel, homeLogoutButton)


homeLogoutButton.addEventListener('click', function (event) {
  event.preventDefault();

  logic.logoutUser()

  clearHomePetList()
  setTextContent(homeFeedback, '')

  hideView(homeView)
  showView(loginView)
})

const homePetList = createUnorderedList()
addChild(homeView, homePetList)
setClass(homePetList, 'flex flex-col gap-2 mt-2')


addChild(document.body, homeView)

let selectedPetId = null

const homeDeletePanel = createPanel()
hideView(homeDeletePanel)
setClass(homeDeletePanel, 'w-full h-full fixed top-0 left-0 bg-black/75 flex justify-center items-center')
addChild(homeView, homeDeletePanel)

const homeDeleteConfirmPanel = createPanel()
setClass(homeDeleteConfirmPanel, 'bg-white p-8 rounded-lg shadow hover:shadow-lg transition-shadow gap-5')

const homeDeletePanelParagraph = createTitle2()
removeClass(homeDeletePanelParagraph, 'mt-4')
addClass(homeDeletePanelParagraph, 'mt-0')
setTextContent(homeDeletePanelParagraph, 'Delete Pet?')

addChild(homeDeleteConfirmPanel, homeDeletePanelParagraph)

const homeDeleteButtonsPanel = createPanel()
setClass(homeDeleteButtonsPanel, 'flex justify-center gap-5 mt-5')

const homeDeleteCancelButton = createButton()
setTextContent(homeDeleteCancelButton, '❌')
removeClass(homeDeleteCancelButton, 'px-16')
addClass(homeDeleteCancelButton, 'px-6')
addChild(homeDeleteButtonsPanel, homeDeleteCancelButton)

homeDeleteCancelButton.addEventListener('click', function (event) {
  event.preventDefault()

  hideView(homeDeletePanel)

})

const homeDeleteConfirmButton = createButton()
setTextContent(homeDeleteConfirmButton, '✔')
removeClass(homeDeleteConfirmButton, 'px-16')
addClass(homeDeleteConfirmButton, 'px-6')
addChild(homeDeleteButtonsPanel, homeDeleteConfirmButton)

homeDeleteConfirmButton.addEventListener('click', function (event) {
  event.preventDefault()
  try {
    logic.deletePet(selectedPetId)

    clearHomePetList()
    renderHomePetList()

    hideView(homeDeletePanel)
  } catch (error) {
    setTextContent(homeFeedback, error.message)

    hideView(homeDeletePanel)
  }
})

addChild(homeDeleteConfirmPanel, homeDeleteButtonsPanel)

addChild(homeDeletePanel, homeDeleteConfirmPanel)

const homeFeedback = createParagraph()
addChild(homeView, homeFeedback)

//reusable functions

function renderHomePetList() {
  const pets = logic.getPets()

  for (let i = 0; i < pets.length; i++) {
    const pet = pets[i]

    const petItem = createListItem()
    setClass(petItem, 'flex gap-8 my-4 items-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow')


    petItem.addEventListener('click', function (event) {
      event.preventDefault()
      hideView(homeView)
      showView(petView)
    })

    const panel = createPanel()
    setClass(panel, 'flex items-center gap-4')

    const image = createImage()
    setSource(image, pet.image)
    setClass(image, 'rounded-full w-20 h-20 object-cover border-2 border-blue-500')
    addChild(panel, image)

    const name = createParagraph()
    setTextContent(name, pet.name)
    setClass(name, 'text-2xl font-semibold text-gray-400')
    addChild(panel, name)

    addChild(petItem, panel)

    const deleteButton = createButtonRounded()
    setTextContent(deleteButton, '🗑')
    addClass(deleteButton, 'justify-self-end')
    addChild(petItem, deleteButton)

    deleteButton.addEventListener('click', function (event) {
      event.preventDefault()

      selectedPetId = pet.id

      showView(homeDeletePanel)
    })

    addChild(homePetList, petItem)
  }

}

function clearHomePetList() {
  for (let i = homePetList.children.length - 1; i >= 0; i--) {
    const child = homePetList.children[i]

    removeChild(homePetList, child)
  }
}

logic.loginUser('newt', '123123123');
renderHomePetList();

