import { useState, useEffect } from 'react'

import { HeaderHome } from './components/commons/HeaderHome'
import { SubTitle } from './components/commons/SubTitle'
import { ButtonBlue } from './components/commons/ButtonBlue'
import { ButtonGray } from './components/commons/ButtonGray'
import { Feedback } from './components/commons/Feedback'

import { PetList } from './components/PetList'

import { logic } from '../logic'


export function Home({ onGoToAddPet,  onUserLoggedOut, onGoToProfile, onGoToPetDetail }) {
    console.log('Home -> call')

    const [feedback, setFeedback] = useState(null)
    const [name, setName] = useState('user')
    const [image, setImage] = useState('https://cdn-icons-png.flaticon.com/512/9131/9131478.png')

    useEffect(() => {
        setTimeout(() => {
            try {
                logic.getLoggedInUser()
                    .then(user => {
                        setName(user.name)
                        setImage(user.image || image)
                    })
                    .catch(error => setFeedback({ message: error.message, level: 'error' }))
            } catch (error) {
                setFeedback({ message: error.message, level: 'error' })
            }
        }, 1000)
    }, [])



    const handleAddPetClick = event => {
        event.preventDefault()

        onGoToAddPet()
    }

    const handleLogoutClick = event => {
        event.preventDefault()

        try {
            logic.logoutUser()

            onUserLoggedOut()
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

    return  <div className="flex flex-col gap-5 items-center mt-24">

        <HeaderHome onGoToProfile={handleProfileClick} />

        <SubTitle>Welcome Home, {name}!</SubTitle>

        <div className="flex justify-between gap-8">

            <ButtonBlue className="" onClick={handleAddPetClick} type="button">+ Pet</ButtonBlue>

            <ButtonGray className="" onClick={handleLogoutClick} type="button">Logout</ButtonGray>
        </div>

        <PetList onGoToPetDetail={handleGoToPetDetail} />

        {feedback && <Feedback feedback={feedback} />}
    </div>
}