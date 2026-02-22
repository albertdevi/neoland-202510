import { useState, useEffect } from 'react'

import {Header} from './components/commons/Header'
import { Title } from './components/commons/Title'
import { SubTitle } from './components/commons/SubTitle'
import { Form } from './components/commons/Form'
import { Field } from './components/commons/Field'
import { Anchor } from './components/commons/Anchor'
import { ButtonBlue } from './components/commons/ButtonBlue'
import { Feedback } from './components/commons/Feedback'
import { logic } from '../logic'


export function ModifyPet({ petId, onGoBack, onGoToHome }) {
    console.log('modifyPet -> call')

    const [feedback, setFeedback] = useState(null)

    const [pet, setPet] = useState(null)


    useEffect(() =>{
        try{
            logic.getPet(petId)
            .then(pet=> setPet(pet))
            .catch(error => setFeedback({ message: error.message, level:'error'}))
        } catch (error){
            setFeedback({message: error.message, level: 'error'})
        }
    },[])

  const handleBackClick = event => {
        event.preventDefault()

        onGoToHome()
    }


    const handleModifyPetSubmit = event => {
        event.preventDefault()

        const form = event.target

        const name = form.name.value
         const birthdate = form.birthdate.value
        const weight = Number(form.weight.value)
        const image = form.image.value

        try {
            logic.modifyPet(petId, name, birthdate, weight, image)
                .then(() => setFeedback({ message: 'Pet successfully modified', level: 'success' }))
                .catch(error => 
                    setFeedback({ message: error.message, level: 'error' }))
        } catch (error) {
            setFeedback({ message: error.message, level: 'error' })
        }
    }

    console.log('ModifyPet -> render')


    return <div className='mt-24'>
        <Header onGoToHome={onGoToHome} />

        <SubTitle>Change your pet Properties</SubTitle>
        {pet? <Form onSubmit={handleModifyPetSubmit}>
            <Field alias="name" type="text" defaultValue = {pet.name}>name</Field>

            <Field alias="birthdate" type="date" defaultValue = {pet.birthdate}>date</Field>

            <Field alias="weight" type="number" defaultValue={pet.weight} step="0.1">Weight (kg)</Field>

            <Field alias="image" type="url" defaultValue={pet.image}>image</Field>

            <ButtonBlue className="self-center mt-4" type="submit">Modify pet Properties</ButtonBlue>
        </Form>: <img className="w-10 h-10 object-cover" src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzB1ZGJ2amdmbHZzbHZxZXVoYzc0d3JwZXJ0NXg0dW81dTVjdjE4biZlcD12MV9naWZzX3NlYXJjaCZjdD1n/pVXyJy2k7WO1n49bGg/giphy.gif" />}

        {feedback && <Feedback feedback={feedback} />}
 
    </div>
}