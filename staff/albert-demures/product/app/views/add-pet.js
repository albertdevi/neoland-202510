const addPetView = document.createElement("div");
addPetView.className = "flex flex-col items-center justify-center min-h-screen";
addPetView.style.display = "";

const addPetTitle = document.createElement("h1");
addPetTitle.textContent = "MyPet";
addPetTitle.className = "text-5xl font-extrabold text-blue-600 text-center mt-6 tracking-tight"
addPetView.appendChild(addPetTitle);

const addPetTopPanel = document.createElement('div');
addPetTopPanel.className = "flex space-between gap-10 ";
addPetView.appendChild(addPetTopPanel);

const addPetSubtitle = document.createElement('h2');
addPetSubtitle.textContent = 'Add new pet';
addPetSubtitle.className = "text-3xl font-semibold text-blue-500 text-center mt-4 tracking-tight";
addPetTopPanel.appendChild(addPetSubtitle);

const addPetBackLink = document.createElement("a");
addPetBackLink.textContent = "Back";
addPetBackLink.href = "";
addPetBackLink.className = "text-gray-700 text-lg leading-loose max-w-md mx-auto mt-4 text-center underline ";
addPetTopPanel.appendChild(addPetBackLink);

addPetBackLink.addEventListener('click', function(event){
event.preventDefault()

addPetView.style.display = 'none'
homeView.style.display = ''

})

const addPetForm = document.createElement ('form')
addPetForm.className = "flex flex-col gap-4 w-full max-w-sm mx-auto mt-6"

const addPetNameLabel = document.createElement('label')
addPetNameLabel.textContent = 'Name'
addPetNameLabel.htmlFor = 'name'
addPetNameLabel.className = "text-m text-gray-600 mt-2"
addPetForm.appendChild(addPetNameLabel)
const addPetNameInput = document.createElement('input')
addPetNameInput.id = 'name'
addPetNameInput.type = 'text'
addPetNameInput.className = "border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition";
addPetForm.appendChild(addPetNameInput)

const addPetBirthDateLabel = document.createElement('label')
addPetBirthDateLabel.textContent = 'Date of Birth'
addPetBirthDateLabel.htmlFor ='date'
addPetBirthDateLabel.className = "text-m text-gray-600 mt-2"
addPetForm.appendChild(addPetBirthDateLabel)
const addPetBirthdateInput = document.createElement('input')
addPetBirthdateInput.textContent = 'Date of Birth'
addPetBirthdateInput.id = 'date'
addPetBirthdateInput.type = 'date'
addPetBirthdateInput.className = "border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
addPetForm.appendChild(addPetBirthdateInput)

const addPetWeightLabel = document.createElement('label')
addPetWeightLabel.textContent = 'Weight (kg)'
addPetWeightLabel.htmlFor = 'weight'
addPetWeightLabel.className = "text-m text-gray-600 mt-2"
addPetForm.appendChild(addPetWeightLabel)
const addPetWeightInput = document.createElement('input')
addPetWeightInput.id = 'weight'
addPetWeightInput.type = 'number'
addPetWeightInput.step = '0.01'
addPetWeightInput.className = "border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
addPetForm.appendChild(addPetWeightInput)

const addPetImageLabel = document.createElement('label')
addPetImageLabel.htmlfor = 'image'
addPetImageLabel.textContent = 'Image'
addPetImageLabel.className = "text-m text-gray-600 mt-2"
addPetForm.appendChild(addPetImageLabel)
const addPetImageInput = document.createElement('input')
addPetImageInput.id = 'image'
addPetImageInput.type = 'url'
addPetImageInput.className = "border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
addPetForm.appendChild(addPetImageInput)

const addPetSubmitButton = document.createElement('button')
addPetSubmitButton.textContent = 'Add Pet'
addPetSubmitButton.type = 'submit'
addPetSubmitButton.className = "bg-blue-600 text-white font-semibold py-2 px-16 rounded-lg shadow hover:bg-blue-700 transition-colors duration-200 self-center"
addPetForm.appendChild(addPetSubmitButton)

addPetView.appendChild(addPetForm)

addPetForm.addEventListener('submit', function(event){
event.preventDefault()

const name = addPetNameInput.value
const birthdate = addPetBirthdateInput.value
const weight = parseFloat(addPetWeightInput.value)
const image = addPetImageInput.value

try{
  logic.addPet(name, birthdate, weight, image)

  addPetForm.reset()
  addPetFeedback.textContent = ''

  addPetView.style.display = 'none'
  homeView.style.display = ''

} catch(error){
  addPetFeedback.textContent = error.message
}

})

const addPetFeedback = document.createElement('p')
addPetFeedback.className = "text-red-600 text-sm mt-2 font-medium";
addPetView.appendChild(addPetFeedback)

document.body.appendChild(addPetView);