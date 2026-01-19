const { useState, useEffect } = React

function PetList() {
    console.log('PetList -> call')

    const [message, setMessage] = useState('')
    const [pets, setPets] = useState([])
    const [petId, setPetId] = useState(null)

    useEffect(() => {
        console.log('PetList -> useEffect')

        try {
            const pets = logic.getPets()

            setPets(pets)
        } catch (error) {
            setMessage(error.message)
        }
    }, [])

    const handleDeletePetClick = event => {
        event.preventDefault()

        const button = event.target

        const petId = button.id

        setPetId(petId)
    }

    const handleCancelDeletePetClick = event => {
        event.preventDefault()

        setPetId(null)
    }

    const handleConfirmDeletePetClick = event => {
        event.preventDefault()

        try {
            logic.deletePet(petId)

            const pets = logic.getPets()

            setPetId(null)
            setPets(pets)
        } catch (error) {
            setMessage(error.message)
        }
    }

    console.log('PetList -> render')

    const petItems = []

    for (const pet of pets) {
        const petItem = <li className="flex gap-8 my-4 items-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4">
                <img src={pet.image} className="rounded-full w-20 h-20 object-cover border-2 border-blue-500" />
                <p className="text-2xl font-semibold text-gray-400">{pet.name}</p>

            </div>
            <button id={pet.id} className="w-10 h-10 bg-gray-400 text-white rounded-full flex items-center justify-center self-center ml-auto shadow-md hover:bg-gray-500 active:scale-95 transition-all duration-200 justify-self-end" onClick={handleDeletePetClick}>🗑</button>
        </li>
        petItems.push(petItem)
    }

    return <div>

        <ul className="flex flex-col gap-2 mt-2">
            {petItems}
        </ul>

        {petId && <div className="w-full h-full fixed top-0 left-0 bg-black/75 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition-shadow gap-5">
                <p className="text-3xl font-semibold text-blue-500 text-center mt-0 mb-5 tracking-tight">Delete Pet?</p>

                <div className="flex justify-center gap-2">
                    <button className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow hover:bg-blue-700 transition-colors duration-200 self-center" onClick={handleCancelDeletePetClick}>❌</button>
                    <button className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow hover:bg-blue-700 transition-colors duration-200 self-center" onClick={handleConfirmDeletePetClick}>✅</button>
                </div>
            </div>
        </div>}

        <p>{message}</p>

    </div>
}