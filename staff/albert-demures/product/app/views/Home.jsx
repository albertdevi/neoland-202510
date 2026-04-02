import { useState, useEffect } from 'react'

import { HeaderHome } from './components/commons/HeaderHome'
import { SubTitle } from './components/commons/SubTitle'
import { ButtonBlue } from './components/commons/ButtonBlue'
import { ButtonGray } from './components/commons/ButtonGray'
import { PetList } from './components/PetList'

import { useContext } from '../context'

import { logic } from '../logic' 
import { logger } from '../logger'

export function Home({ onGoToAddPet, onUserLoggedOut, onGoToProfile, onGoToPetDetail, }) {
    logger.debug('Home -> call')

     const { onSuccess, onError } = useContext()

    const [name, setName] = useState('user')
    const [image, setImage] = useState('https://cdn-icons-png.flaticon.com/512/9131/9131478.png')

    useEffect(() => {
        logger.debug('Home -> useEffect')

        try {
            logic.getLoggedInUser()
                .then(user => {
                    setName(user.name)
                    setImage(user.image || image)
                })
                .catch(error => onError(error))
        } catch (error) {
            onError(error)
        }
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

        onGoToProfile()
    }

    const handleGoToPetDetail = petId => onGoToPetDetail(petId)

    logger.debug('Home -> render')

    return <div className="flex flex-col gap-5 items-center mt-20">
        <HeaderHome onGoToProfile={handleProfileClick} />

        <SubTitle>Welcome Home, {name}!</SubTitle>

        <div className="flex justify-between gap-8">
            <ButtonBlue className="" onClick={handleAddPetClick} type="button">+ Pet</ButtonBlue>

            <ButtonGray className="" onClick={handleLogoutClick} type="button">Logout</ButtonGray>
        </div>

        <PetList onGoToPetDetail={handleGoToPetDetail} />
    </div>
}