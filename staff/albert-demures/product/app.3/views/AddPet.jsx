const { useState } = React

function AddPet({ onGoToHome }) {
    console.log('AddPet ->call')

    const [message, setMessage] = useState('')

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

            form.reset()

            onGoToHome()
        } catch (error) {
            setMessage(error.message)
        }
    }

    console.log('AddPet -> render')

    return < div className="flex flex-col items-center justify-center min-h-screen" >
        <Title></Title>

        <div className="flex justify-between gap-10 mt-4">
            <SubTitle>Add new pet</SubTitle>

            <a className="cursor-pointer underline font-bold text-gray-700 text-lg" onClick={handleBackClick}>Back</a>
        </div>

        <Form onSubmit={handleAddPetSubmit}>
            <Field alias="name" type="text">Name</Field>

            <Field alias="birthdate" type="date">Date of birth</Field>

            <Field alias="weight" type="number">Weight (kg)</Field>

            <Field alias="image" type="url">Image</Field>

            <ButtonBlue className="" type="submit">Add Pet</ButtonBlue>
        </Form>

        <p className="text-red-600 text-sm mt-2 font-medium">{message}</p>

    </div >
}