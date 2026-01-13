const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(<App />)

const { useState, useRef } = React

function App() {
    console.log('App -> call')

    const [view, setView] = useState('landing')
    const [message, setMessage] = useState('')
    const [passwordType, setPasswordType] = useState('password')
    const [passwordRepeatType, setPasswordRepeatType] = useState('password')
    const [pets, setPets] = useState([])

    const loginFormRef = useRef()
    const registerFormRef = useRef()

    const handleLoginClick = event => {
        event.preventDefault()

        if (registerFormRef.current)
            registerFormRef.current.reset()

        setView('login')
        setMessage('')
        setPasswordType('password')
        setPasswordRepeatType('password')
    }

    const handleRegisterClick = event => {
        event.preventDefault()

        if (loginFormRef.current)
            loginFormRef.current.reset()

        setView('register')
        setMessage('')
        setPasswordType('password')
        setPasswordRepeatType('password')
    }

    const handleLoginSubmit = event => {
        event.preventDefault()

        const form = event.target

        const username = form.username.value
        const password = form.password.value

        try {
            logic.loginUser(username, password)

            form.reset()

            const pets = logic.getPets()

            const newPets = []

            for (const pet of pets) {
                newPets.push(pet)
            }

            setView('home')
            setMessage('')
            setPasswordType('password')
            setPasswordRepeatType('password')
            setPets(newPets)
        } catch (error) {
            setMessage(error.message)
        }
    }

    const handleRegisterSubmit = event => {
        event.preventDefault()

        const form = event.target

        const name = form.name.value
        const email = form.email.value
        const username = form.username.value
        const password = form.password.value
        const passwordRepeat = form.passwordRepeat.value

        try {
            logic.registerUser(name, email, username, password, passwordRepeat)

            form.reset()

            setView('login')
            setMessage('')
        } catch (error) {
            setMessage(error.message)
        }
    }

    const handleTogglePasswordClick = event => {
        event.preventDefault()

        setPasswordType(passwordType === 'password' ? 'text' : 'password')
    }


    const handleTogglePasswordRepeatClick = event => {
        event.preventDefault()

        setPasswordRepeatType(passwordRepeatType === 'password' ? 'text' : 'password')
    }

    const handleLogoutClick = event => {
        event.preventDefault()

        setMessage('')

        try {
            logic.logoutUser()

            setView('login')
        } catch (error) {
            setMessage('sorry, there was an error on logout, please try it later')
        }
    }

    const handleAddPetClick = event => {
        event.preventDefault()

        setView('add-pet')
    }

    const handleBackClick = event => {
        event.preventDefault()

        setView('home')
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

            const pets = logic.getPets()

            const newPets = []

            for (const pet of pets) {
                newPets.push(pet)
            }
            
            setMessage('')
            setView('home')
            setPets(newPets)
        } catch (error) {
            setMessage(error.message)
        }
    }

    console.log('App -> render')

    // landing
    if (view === 'landing')
        return <div className="flex flex-col gap-5 items-center justify-center min-h-screen">

            <h1 className="text-5xl font-extrabold text-blue-600 text-center mt-6 tracking-tight">MyPet</h1>

            <p className="text-3xl font-semibold text-blue-500 text-center mt-4 tracking-tight">Welcome!</p>

            <nav className="text-gray-700 text-lg leading-loose max-w-md mx-auto mt-4 text-center">
                <a className="cursor-pointer underline font-bold" onClick={handleLoginClick}>Login</a> or <a className="cursor-pointer underline font-bold" onClick={handleRegisterClick}>Register</a>
            </nav>
        </div>

    //login
    if (view === 'login')
        return <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-5xl font-extrabold text-blue-600 text-center mt-6 tracking-tight">MyPet</h1>

            <h2 className="text-3xl font-semibold text-blue-500 text-center mt-4 tracking-tight">Login</h2>

            <form className="flex flex-col gap-4 w-full max-w-sm mx-auto mt-6" onSubmit={handleLoginSubmit}>
                <label className="text-m text-gray-600 mt-2" htmlFor="username">Username</label>
                <input className="border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" id="username" name="username" autoComplete="username" type="text" />

                <label className="text-m text-gray-600 mt-2" htmlFor="password">Password</label>
                <input className={'border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition' + (passwordType === 'password' ? ' bg-white-100' : ' bg-yellow-100')} id="password" name="password" autoComplete="password" type={passwordType} />

                <button className="w-24 bg-gray-600 text-white font-semibold py-1 px-0 rounded-lg shadow hover:bg-gray-700 transition-colors duration-200 self-end" type="button" onClick={handleTogglePasswordClick} > {passwordType === 'password' ? 'Show' : 'Hide'}</button>

                <button className="bg-blue-600 text-white font-semibold py-2 px-16 rounded-lg shadow hover:bg-blue-700 transition-colors duration-200 self-center" >Login</button>
            </form>

            <a className="text-gray-700 text-lg leading-loose max-w-md mx-auto mt-4 text-center cursor-pointer underline font-bold" onClick={handleRegisterClick}>Register</a>

            <p className="text-red-600 text-sm mt-2 font-medium"> {message} </p>
        </div>

    // Register
    if (view === 'register')
        return <div className="flex flex-col items-center justify-center min-h-screen">

            <h1 className="text-5xl font-extrabold text-blue-600 text-center mt-6 tracking-tight">MyPet</h1>

            <h2 className="text-3xl font-semibold text-blue-500 text-center mt-4 tracking-tight">Register</h2>

            <form className="flex flex-col gap-4 w-full max-w-sm mx-auto mt-6" onSubmit={handleRegisterSubmit}>
                <label className="text-m text-gray-600 mt-2" htmlFor="name">Name</label>
                <input className="border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    id="name" name="name" autoComplete="name" type="text" />

                <label className="text-m text-gray-600 mt-2" htmlFor="email">Email</label>
                <input className="border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    id="email" name="email" autoComplete="email" type="email" />

                <label className="text-m text-gray-600 mt-2">Username</label>
                <input className="border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    id="username" name="username" autoComplete="username" type="text" />

                <label className="text-m text-gray-600 mt-2" htmlFor='password'>Password</label>
                <input className={'border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition' + (passwordType === 'password' ? ' bg-white-100' : ' bg-yellow-100')}
                    id="password" name="password" autoComplete="off" type={passwordType} />

                <button className="w-24 bg-gray-600 text-white font-semibold py-1 px-0 rounded-lg shadow hover:bg-gray-700 transition-colors duration-200 self-end" type="button" onClick={handleTogglePasswordClick}>{passwordType === 'password' ? 'show' : 'Hide'}</button>

                <label className="text-m text-gray-600 mt-2" htmlFor="passwordRepeat">Repeat Password</label>
                <input className={'border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition' + (passwordRepeatType === 'password' ? ' bg-white-100' : ' bg-yellow-100')}
                    id="passwordRepeat" name="passwordRepeat" autoComplete="off" type={passwordRepeatType} />

                <button className="w-24 bg-gray-600 text-white font-semibold py-1 px-0 rounded-lg shadow hover:bg-gray-700 transition-colors duration-200 self-end" type="button" onClick={handleTogglePasswordRepeatClick}>{passwordRepeatType === 'password' ? 'show' : 'Hide'}</button>

                <button className="bg-blue-600 text-white font-semibold py-2 px-16 rounded-lg shadow hover:bg-blue-700 transition-colors duration-200 self-center" type="submit">Register</button>
            </form>

            <a href="" className="text-gray-700 text-lg leading-loose max-w-md mx-auto mt-4 text-center cursor-pointer underline font-bold" onClick={handleLoginClick}>Login</a>

            <p className="text-red-600 text-sm mt-2 font-medium">{message}</p>

        </div>

    //home
    if (view === 'home') {
        const petItems = []

        for (const pet of pets) {
            const petItem = <li className="flex gap-8 my-4 items-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4">
                    <img src={pet.image} className="rounded-full w-20 h-20 object-cover border-2 border-blue-500" />
                    <p className="text-2xl font-semibold text-gray-400">{pet.name}</p>

                </div>
                <button className="w-10 h-10 bg-gray-400 text-white rounded-full flex items-center justify-center self-center ml-auto shadow-md hover:bg-gray-500 active:scale-95 transition-all duration-200 justify-self-end">🗑</button>
            </li>
            petItems.push(petItem)
        }

        return <div className="flex flex-col gap-5 items-center justify-center min-h-screen">

            <h1 className="text-5xl font-extrabold text-blue-600 text-center mt-6 tracking-tight">MyPet</h1>

            <h2 className="text-3xl font-semibold text-blue-500 text-center mt-4 tracking-tight">Welcome Home</h2>

            <div className="flex justify-between gap-8">
                <button className="bg-blue-600 text-white font-semibold py-2 px-16 rounded-lg shadow hover:bg-blue-700 transition-colors duration-200 self-center" onClick={handleAddPetClick} type="button">+ Pet</button>

                <button className="w-24 bg-gray-600 text-white font-semibold py-1 px-0 rounded-lg shadow hover:bg-gray-700 transition-colors duration-200 self-end" onClick={handleLogoutClick} type="button">Logout</button>
            </div>

            <ul className="flex flex-col gap-2 mt-2">
                {petItems}
            </ul>

        </div>
    }

    // add pet
    if (view === 'add-pet')
        return <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-5xl font-extrabold text-blue-600 text-center mt-6 tracking-tight">MyPet</h1>

            <div className="flex justify-between gap-10 mt-4">
                <h2 className="text-3xl font-semibold text-blue-500 text-center  tracking-tight">Add new pet</h2>

                <a className="cursor-pointer underline font-bold text-gray-700 text-lg" onClick={handleBackClick}>Back</a>
            </div>

            <form className="flex flex-col gap-4 w-full max-w-sm mx-auto mt-6" onSubmit = {handleAddPetSubmit}>
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

        </div>
}

//pet
/*
if (view === 'pet')
    return <div className="flex flex-col gap-5 items-center justify-center min-h-screen" >
        <h1 className="text-5xl font-extrabold text-blue-600 text-center mt-6 tracking-tight">MyPet</h1>

        <h2 className="text-3xl font-semibold text-blue-500 text-center mt-4 tracking-tight">Pet details</h2>
    </div>
    */