import { useState } from 'react'

import { Title } from './components/commons/Title'
import { SubTitle } from './components/commons/SubTitle'
import { ButtonBlue } from './components/commons/ButtonBlue'
import { ButtonGray } from './components/commons/ButtonGray'
import { PetList } from './components/PetList'

import { logic } from '../logic'


export function Home({ onGoToAddPet, onGoToLogin, onGoToProfile }) {
    console.log('Home -> call')

    const [message, setMessage] = useState('')
    const [pets, setPets] = useState([])

    const handleAddPetClick = event => {
        event.preventDefault()

        onGoToAddPet()
    }

    const handleLogoutClick = event => {
        event.preventDefault()

        try {
            logic.logoutUser()

            setMessage('')
            setPets([])

            onGoToLogin()
        } catch (error) {
            setMessage('sorry, there was an error on logout, please, try it later')
        }
    }

    const handleProfileClick = event => {
        event.preventDefault()

        onGoToProfile()
    }

    console.log('Home -> render')

    return <div className="flex flex-col gap-5 items-center justify-center min-h-screen">

        <Title></Title>

        <SubTitle>Welcome Home, {logic.getLoggedInUserName()}</SubTitle>

        <div className="flex justify-between gap-8">

            <ButtonBlue className="" onClick={handleAddPetClick} type="button">+ Pet</ButtonBlue>

            <ButtonBlue className="" onClick={handleProfileClick} type="button">Profile</ButtonBlue>

            <ButtonGray className="" onClick={handleLogoutClick} type="button">Logout</ButtonGray>
        </div>

        <PetList />

        <p>{message}</p>
    </div>
}