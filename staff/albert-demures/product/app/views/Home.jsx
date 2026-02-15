import { useState, useEffect } from 'react'

import { Title } from './components/commons/Title'
import { SubTitle } from './components/commons/SubTitle'
import { ButtonBlue } from './components/commons/ButtonBlue'
import { ButtonGray } from './components/commons/ButtonGray'
import { Feedback } from './components/commons/Feedback'

import { PetList } from './components/PetList'

import { logic } from '../logic'


export function Home({ onGoToAddPet, onGoToLogin, onGoToProfile, onGoToPetDetail }) {
    console.log('Home -> call')

    const [feedback, setFeedback] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(() => {
        logic.getLoggedInUser()
            .then(user => setUser(user))
            .catch(error => setFeedback({ message: error.message, level: 'error' }))
    }, [])



    const handleAddPetClick = event => {
        event.preventDefault()

        onGoToAddPet()
    }

    const handleLogoutClick = event => {
        event.preventDefault()

        try {
            logic.logoutUser()

            setFeedback(null)

            onGoToLogin()
        } catch (error) {
            setFeedback({ message: 'sorry, there was an error on logout, please, try it later', level: 'error' })
        }
    }
    const handleProfileClick = event => {
        event.preventDefault()

        onGoToProfile()
    }

    const handleGoToPetDetail = petId => onGoToPetDetail(petId)

    console.log('Home -> render')

    return <div className="flex flex-col gap-5 items-center justify-center min-h-screen">

        <div className="fixed top-4 right-6 z-50">
            <button className="inline-flex h-18 w-18 items-center justify-center rounded-full bg-gray-100 text-black drop-shadow-sm transition-colors duration-150 hover:bg-gray-400" onClick={handleProfileClick} type="button">
                <img
                    src={user?.image ? user.image : "https://cdn-icons-png.flaticon.com/512/9131/9131478.png"}
                    alt='Profile'
                    className='h-16 w-16 rounded-full object-cover'
                />
            </button>
        </div>

        <Title></Title>

        <SubTitle>Welcome Home, {user?.username}</SubTitle>

        <div className="flex justify-between gap-8">

            <ButtonBlue className="" onClick={handleAddPetClick} type="button">+ Pet</ButtonBlue>

            <ButtonGray className="" onClick={handleLogoutClick} type="button">Logout</ButtonGray>
        </div>

        <PetList onGoToPetDetail={handleGoToPetDetail} />

        {feedback && <Feedback feedback={feedback} />}
    </div>
}