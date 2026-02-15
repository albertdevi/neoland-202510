import { useState, useEffect } from 'react'

import { Anchor } from './components/commons/Anchor'
import { Title } from './components/commons/Title'
import { SubTitle } from './components/commons/SubTitle'


import { logic } from '../logic'

export function PetDetail({ onGoToHome, petId }) {
    console.log('Profile -> call')

    const [feedback, setFeedback] = useState(null) // { message, level }
    const [pet, setPet] = useState(null)

    useEffect(() => {
        try {
            logic.getPet(petId)
                .then(pet => setPet(pet))
                .catch(error => setFeedback({ message: error.message, level: 'error' }))
        } catch (error) {
            setFeedback({ message: error.message, level: 'error' })
        }
    }, [])



    const handleBackClick = event => {
        event.preventDefault()

        onGoToHome()
    }


    console.log('Profile -> render')

    return <div className="flex flex-col gap-8 items-center justify-center min-h-screen">

        <div className="fixed top-4 right-4 z-50">
            <Anchor className="flex items-center gap-1 rounded-full bg-white px-4 py-2 text-sm font-medium shadow hover:bg-gray-50 transition" onClick={handleBackClick}>&lt; Back</Anchor>
        </div>

        <Title></Title>

        {pet && <div className="flex flex-col items-center gap-4 shadow hover:shadow-lg transition-shadow px-30 py-10 rounded-lg bg-radial bg-radial bg-gradient-to-r from-gray-25 to-gray-100 ">
            <img src={pet.image} className="rounded-full w-60 h-60 object-cover border-4 border-blue-500" />

            <SubTitle>{pet.name}</SubTitle>

            <p><span className = "font-bold">Weight: </span>{pet.weight} kgs</p>

            <p><span className = "font-bold">Birtdate: </span>{pet.birthdate}</p>
        </div>}

        {feedback && <Feedback feedback={feedback} />}
    </div>
}