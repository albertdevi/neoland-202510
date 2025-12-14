const petView = createView()
setClass(petView, 'flex flex-col gap-5 items-center justify-center min-h-screen')
hideView(petView)

const petTitle = createTitle()
setTextContent(petTitle, 'MyPet')
addChild(petView, petTitle)

const petSubtitle = createTitle2()
setTextContent(petSubtitle, 'Pet details')
addChild(petView, petSubtitle)

addChild(document.body, petView)