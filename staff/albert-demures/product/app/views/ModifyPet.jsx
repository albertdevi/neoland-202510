import { useState, useEffect } from 'react'

import { useParams } from 'react-router'

import { Header } from './components/commons/Header'
import { Title } from './components/commons/Title'
import { SubTitle } from './components/commons/SubTitle'
import { Form } from './components/commons/Form'
import { Field } from './components/commons/Field'
import { Anchor } from './components/commons/Anchor'
import { ButtonBlue } from './components/commons/ButtonBlue'
import { logic } from '../logic'


export function ModifyPet({ onGoBack, onError, onSuccess }) {
    console.log('modifyPet -> call')

    const [pet, setPet] = useState(null)

    const { petId } = useParams()


    useEffect(() => {
        setTimeout(() => {
            try {
                logic.getPet(petId)
                    .then(pet => setPet(pet))
                    .catch(error => onError(error))
            } catch (error) {
                onError(error)
            }
        }, 1000)
    }, [])

    const handleBackClick = event => {
        event.preventDefault()

        onGoBack(petId)
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
                .then(() => onSuccess('pet successfully modified'))
                .catch(error => onError(error))
        } catch (error) {
            onError(error)
        }
    }

    console.log('ModifyPet -> render')


    return <div className='mt-24'>
        <Header></Header>

              <div className="fixed top-4 right-4 z-50">
            <Anchor className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-gray-700 font-medium shadow-md   hover:bg-gray-50  hover:shadow-lg transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-300" onClick={handleBackClick}>&lt; Back</Anchor>
            </div>

        <SubTitle>Change your pet Properties</SubTitle>
        {pet ? <Form onSubmit={handleModifyPetSubmit}>
            <Field alias="name" type="text" defaultValue={pet.name}>name</Field>

            <Field alias="birthdate" type="date" defaultValue={pet.birthdate}>date</Field>

            <Field alias="weight" type="number" defaultValue={pet.weight} step="0.1">Weight (kg)</Field>

            <Field alias="image" type="url" defaultValue={pet.image}>image</Field>

            <ButtonBlue className="self-center mt-4" type="submit">Modify pet Properties</ButtonBlue>
        </Form> : <img className="w-10 h-10 object-cover" src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzB1ZGJ2amdmbHZzbHZxZXVoYzc0d3JwZXJ0NXg0dW81dTVjdjE4biZlcD12MV9naWZzX3NlYXJjaCZjdD1n/pVXyJy2k7WO1n49bGg/giphy.gif" />}

    </div>
}