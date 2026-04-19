import { useState, useEffect } from 'react'

import { useParams } from 'react-router'

import { Title } from './components/commons/Title'
import { logger } from '../logger'
import { Header } from './components/commons/Header'
import { InputField } from './components/commons/InputField'
import { TextAreaField } from './components/commons/TextAreaField'
import { SelectField } from './components/commons/SelectField'
import { Form } from './components/commons/Form'
import { ButtonCTA } from './components/commons/ButtonCTA'
import { ButtonRound } from './components/commons/ButtonRound'
import { useContext } from '../context'


import { logic } from '../logic'

export function ModifyReel({ onGoToHome, onUserLoggedOut, onGoBack }) {

    const { onSuccess, onError } = useContext()

    const [reel, setreel] = useState(null)

    const { userId } = useParams()

    useEffect(() => {
        try {
            logic.getReel(userId)
                .then(reel => setreel(reel))
                .catch(error => onError(error))
        } catch (error) {
            onError(error)
        }
    }, [userId])

    const handleBackClick = event => {
        event.preventDefault()

        onGoToHome()
    }

    const handleModifyReelSubmit = event => {
        event.preventDefault()

        const form = event.target

        const textColor = form.textColor.value
        const backgroundColor = form.backgroundColor.value

        try {
            logic.modifyReel(userId, textColor, backgroundColor)
                .then(() => onSuccess('reel succesfully modified'))
                .catch(error => onError(error))
        } catch (error) {
            onError(error)
        }
    }

    logger.debug('ModifyReel -> render')

    if (!reel) return <p>Loading...</p>

    return <div className='flex flex-col justify-start py-2 px-4 items-center justify-center min-h-screen bg-gradient-to-b from-[#0A1F27] via-[#163f4f] to-[#24657D] sm:gap-4 md:gap-10'>
        <Header onUserLoggedOut={onUserLoggedOut}  >
            <ButtonRound className='bg-[#1C637D] flex items-center justify-center'>
                <img src="/back.svg" alt="Back icon" className="w-[80%] h-f[80%] object-cover" onClick={handleBackClick} />
            </ButtonRound>

        </Header>
        <Title className='mt-32'>Modify reel</Title>

        <Form onSubmit={handleModifyReelSubmit}>

            <InputField alias='textColor' type='text' defaultValue={reel.textColor}>TextColor</InputField>

            <InputField alias='backgroundColor' type='text' defaultValue={reel.backgroundColor}>BackgroundColor</InputField>

            <ButtonCTA className="" type="submit">Modify</ButtonCTA>

        </Form>


    </div>
}
