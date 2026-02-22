import { useState } from 'react'

import { Header } from './components/commons/Header'
import { SubTitle } from './components/commons/SubTitle'
import { Anchor } from './components/commons/Anchor'
import { Form } from './components/commons/Form'
import { Field } from './components/commons/Field'
import { ButtonBlue } from './components/commons/ButtonBlue'
import { logic } from '../logic'
import { Feedback } from './components/commons/Feedback'

export function AddPet({ onGoToHome }) {
    console.log('AddPet ->call')

    const [feedback, setFeedback] = useState(null)

    const handleBackClick = event => {
        event.preventDefault()

        onGoToHome()
    }

    const handleAddPetSubmit = event => {
        event.preventDefault()

        const form = event.target

        const name = form.name.value
        const birthdate = form.birthdate.value
        const weight = Number(form.weight.value)
        const image = form.image.value

        try {
            logic.addPet(name, birthdate, weight, image)
                .then(() => {

                    form.reset()

                    onGoToHome()
                })
                .catch(error => setFeedback({ message: error.message, level: 'error' }))
        } catch (error) {
            setFeedback({ message: error.message, level: 'error' })
        }
    }

    console.log('AddPet -> render')

    return < div className="flex flex-col items-center mt-20 min-h-screen" >

        <Header onGoToHome={onGoToHome} />

        <div className="flex justify-between gap-10 mt-4">
            <SubTitle>Add new pet</SubTitle>
        </div>

        <Form onSubmit={handleAddPetSubmit}>
            <Field alias="name" type="text">Name</Field>

            <Field alias="birthdate" type="date">Date of birth</Field>

            <Field alias="weight" type="number">Weight (kg)</Field>

            <Field alias="image" type="url">Image</Field>

            <ButtonBlue className="" type="submit">Add Pet</ButtonBlue>
        </Form>

         {feedback && <Feedback feedback={feedback} />}

    </div >
}