const { useState } = React

function AddPet({ onGoToHome}) {
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

        <form className="flex flex-col gap-4 w-full max-w-sm mx-auto mt-6" onSubmit={handleAddPetSubmit}>
            <label className="text-m text-gray-600 mt-2" htmlFor="name">Name</label>
            <InputText
                id="name" name="name" autoComplete="off" type="text" />

            <label className="text-m text-gray-600 mt-2" htmlFor="date">Date of Birth</label>
            <InputText
                id="birthdate" name="birthdate" autoComplete="off" type="date" />

            <label className="text-m text-gray-600 mt-2" htmlFor="weight">Weight (kg)</label>
            <InputText
                type="number" name="weight" autoComplete="off" step="0.01" />

            <label className="text-m text-gray-600 mt-2" htmlFor="image">Image</label>
            <InputText
                id="image" name="image" autoComplete="off" type="url" />

            <ButtonBlue className="" type="submit">Add Pet</ButtonBlue>
        </form>

        <p className="text-red-600 text-sm mt-2 font-medium">{message}</p>

    </div >
}