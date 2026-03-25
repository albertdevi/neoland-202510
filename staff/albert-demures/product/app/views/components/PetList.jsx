import { useState, useEffect } from 'react'

import { PetItem } from './PetItem'

import { useContext } from '../../context'

import { logic } from '../../logic'

export function PetList({ onGoToPetDetail}) {
    console.log('PetList -> call')

    const { onError } = useContext()

    const [pets, setPets] = useState([])
    const [petId, setPetId] = useState(null)

    useEffect(() => {
        console.log('PetList -> useEffect')

        try {
            logic.getPets()
                .then(pets => {
                    setPets(pets)
                })
                .catch(error => onError(error))
        } catch (error) {
            onError(error)
        }
    }, [])

    const handleRemovePetClick = petId => setPetId(petId)

    const handleCancelRemovePetClick = event => {
        event.preventDefault()

        setPetId(null)
    }

    const handleConfirmRemovePetClick = event => {
        event.preventDefault()

        try {
            logic.removePet(petId)
                .then(() => {
                    return logic.getPets()
                })
                .then(pets => {
                    setPetId(null)
                    setPets(pets)
                })
                .catch(error => setFeedback({ message: error.message, level: 'error' }))
        } catch (error) {
            onError(error)
        }
    }



    console.log('PetList -> render')

    return <div>
        <ul className='flex flex-col gap-2 mt-2'>
            {pets.map(pet => <PetItem key={pet.id} pet={pet} onGoToPetDetail={onGoToPetDetail} onRemovePetClick={handleCancelRemovePetClick} />)}
            </ul>

        {petId && <div className="w-full h-full fixed top-0 left-0 bg-black/75 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition-shadow gap-5">
                <p className="text-3xl font-semibold text-blue-500 text-center mt-0 mb-5 tracking-tight">Delete Pet?</p>

                <div className="flex justify-center gap-2">
                    <button className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow hover:bg-blue-700 transition-colors duration-200 self-center" onClick={handleCancelRemovePetClick}>❌</button>

                    <button className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow hover:bg-blue-700 transition-colors duration-200 self-center" onClick={handleConfirmRemovePetClick}>✅</button>
                </div>
            </div>
        </div>}
    </div>
}