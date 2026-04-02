import { Header } from './components/commons/Header'
import { SubTitle } from './components/commons/SubTitle'
import { Anchor } from './components/commons/Anchor'
import { Form } from './components/commons/Form'
import { Field } from './components/commons/Field'
import { ButtonBlue } from './components/commons/ButtonBlue'

import { useContext } from '../context'

import { logic } from '../logic' 
import { logger } from '../logger'

export function AddPet({ onGoToHome}) {
    logger.debug('AddPet ->call')

     const { onSuccess, onError } = useContext()

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
                .catch(error => onError(error))
        } catch (error) {
            onError(error)
        }
    }

    logger.debug('AddPet -> render')

    return <div className="flex flex-col items-center min-h-screen mt-20">
        <Header onGoToHome={onGoToHome} />
        
        <div className="fixed top-4 right-4 z-50">
            <Anchor className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-gray-700 font-medium shadow-md   hover:bg-gray-50  hover:shadow-lg transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-300" onClick={handleBackClick}>&lt; Back</Anchor>
        </div>

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
    </div >
}