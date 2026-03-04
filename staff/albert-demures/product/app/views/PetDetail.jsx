import { useState, useEffect } from 'react'

import { useParams} from 'react-router'

import { Header} from './components/commons/Header'
import { Anchor } from './components/commons/Anchor'
import { Title } from './components/commons/Title'
import { SubTitle } from './components/commons/SubTitle'

import { logic } from '../logic'

export function PetDetail({ onGoToHome, onGoToModifyPet, onError }) {
    console.log('Pet Detail -> call')

    const [pet, setPet] = useState(null)

    const { petId } = useParams()

    useEffect(() => {
        try {
            logic.getPet(petId)
                .then(pet => setPet(pet))
                .catch(error => onError(error))
        } catch (error) {
            onError(error)
        }
    }, [])

    const handleBackClick = event => {
        event.preventDefault()

        onGoToHome()
    }

    const handleGoToModifyPet = () => onGoToModifyPet(petId)
    
    
    console.log('Pet detail -> render')

    return <div className="flex flex-col gap-8 items-center mt-30 justify-center ">
        <Header onGoToHome={onGoToHome} />

              <div className="fixed top-4 right-4 z-50">
            <Anchor className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-gray-700 font-medium shadow-md   hover:bg-gray-50  hover:shadow-lg transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-300" onClick={handleBackClick}>&lt; Back</Anchor>
            </div>

        {pet && <div className="relative flex flex-col mx-5 items-center gap-4 shadow hover:shadow-lg transition-shadow px-24 py-10 rounded-lg bg-radial bg-radial bg-gradient-to-r from-gray-25 to-gray-100 ">

            <button className="absolute top-4 right-4 h-12 w-12  rounded-full bg-gray-200 text-black drop-shadow-sm transition-colors duration-150 hover:bg-gray-400" onClick={handleGoToModifyPet}> ✏</button>

            <img src={pet.image} className="rounded-full w-40 h-40 sm:w-60 sm:h-60 object-cover border-4 border-blue-500" />

            <SubTitle>{pet.name}</SubTitle>

            <p><span className="font-bold">Weight: </span>{pet.weight} kgs</p>

            <p><span className="font-bold">Birtdate: </span>{pet.birthdate}</p>
        </div>}
    </div>
}