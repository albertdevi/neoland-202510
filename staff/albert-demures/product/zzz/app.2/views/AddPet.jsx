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
        <h1 className="text-5xl font-extrabold text-blue-600 text-center mt-6 tracking-tight">MyPet</h1>

        <div className="flex justify-between gap-10 mt-4">
            <h2 className="text-3xl font-semibold text-blue-500 text-center  tracking-tight">Add new pet</h2>

            <a className="cursor-pointer underline font-bold text-gray-700 text-lg" onClick={handleBackClick}>Back</a>
        </div>

        <form className="flex flex-col gap-4 w-full max-w-sm mx-auto mt-6" onSubmit={handleAddPetSubmit}>
            <label className="text-m text-gray-600 mt-2" htmlFor="name">Name</label>
            <input className="border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                id="name" name="name" autoComplete="off" type="text" />

            <label className="text-m text-gray-600 mt-2" htmlFor="date">Date of Birth</label>
            <input className="border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                id="birthdate" name="birthdate" autoComplete="off" type="date" />

            <label className="text-m text-gray-600 mt-2" htmlFor="weight">Weight (kg)</label>
            <input className="border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                type="number" name="weight" autoComplete="off" step="0.01" />

            <label className="text-m text-gray-600 mt-2" htmlFor="image">Image</label>
            <input className="border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                id="image" name="image" autoComplete="off" type="url" />

            <button className="bg-blue-600 text-white font-semibold py-2 px-16 rounded-lg shadow hover:bg-blue-700 transition-colors duration-200 self-center" type="submit">Add Pet</button>
        </form>

        <p className="text-red-600 text-sm mt-2 font-medium">{message}</p>

    </div >
}