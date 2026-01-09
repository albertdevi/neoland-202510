// dom (general purpose)

function createElement(tagName) {
    return document.createElement(tagName)
}

function changeDisplay(element, value) {
    element.style.display = value
}

function setTextContent(element, text) {
    element.textContent = text
}

function addChild(element, childElement) {
    element.appendChild(childElement)
}

function removeChild(element, childElement) {
    element.removeChild(childElement)
}

function setClass(element, clazz) {
    element.className = clazz
}

function addClass(element, value) {
    element.classList.add(value)
}

function removeClass(element, value) {
    element.classList.remove(value)
}

function createTextNode(text) {
    return document.createTextNode(text)
}

function setFor(element, value) {
    element.htmlFor = value
}

function setId(element, value) {
    element.id = value
}

function setType(element, value) {
    element.type = value
}

function getType(element) {
    return element.type
}

function getValue(element) {
    return element.value
}

function reset(element) {
    element.reset()
}

function setSource(element, value) {
    element.src = value
}

function setStep(element, value) {
    element.step = value
}

function setHref(element, value) {
    element.href = value
}
// interface (application specific)

function createView() {
    return createElement('div')
}

function hideView(view) {
    changeDisplay(view, 'none')
}

function showView(view) {
    changeDisplay(view, '')
}

function createTitle() {
    const title = createElement('h1')
    setClass(title, 'text-5xl font-extrabold text-blue-600 text-center mt-6 tracking-tight')

    return title
}

function createTitle2() {
    const title2 = createElement('h2')
    setClass(title2, 'text-3xl font-semibold text-blue-500 text-center mt-4 tracking-tight')

    return title2
}

function createParagraph() {
    return createElement('p')
}

function createNavigation() {
    return createElement('nav')
}

function createLink() {
    const link = createElement('a')
    setClass(link, 'cursor-pointer underline font-bold text-gray-700 text-lg leading-loose max-w-md mx-auto mt-4 text-center  ')

    return link
}

function createForm() {
    return createElement('form')
}

function createLabel() {
    const label = createElement('label')
    setClass(label, 'text-m text-gray-600 mt-2' )

    return label

}

function createInput() {
    const input = createElement('input')
    setClass(input, 'border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition')

    return input
}

function createButton() {
    const button = createElement('button')
    setClass(button, 'bg-blue-600 text-white font-semibold py-2 px-16 rounded-lg shadow hover:bg-blue-700 transition-colors duration-200 self-center')

    return button
}

function createButtonShow() {
    const buttonShow = createElement('button')
    setClass(buttonShow, 'w-24 bg-gray-600 text-white font-semibold py-1 px-0 rounded-lg shadow hover:bg-gray-700 transition-colors duration-200 self-end')

    return buttonShow
}


function createButtonRounded() {
    const buttonShow = createElement('button')
    setClass(buttonShow, 'w-10 h-10 bg-gray-400 text-white rounded-full flex items-center justify-center self-center ml-auto shadow-md hover:bg-gray-500 active:scale-95 transition-all duration-200')

    return buttonShow
}

function createPanel() {
    return createElement('div')
}

function createUnorderedList() {
    return createElement('ul')
}

function createListItem() {
    return createElement('li')
}

function createImage() {
    return createElement('img')
}