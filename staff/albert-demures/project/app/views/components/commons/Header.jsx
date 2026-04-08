import { useState, useEffect } from 'react'

import { Title } from './Title'
import { Anchor } from './Anchor'

import { ButtonRound } from './ButtonRound'

import { logic } from '../../../logic'

export function Header({ onGoToProfile, onUserLoggedOut }) {

    const [name, setName] = useState('user')

    const [image, setImage] = useState('https://cdn-icons-png.flaticon.com/512/4226/4226035.png')
    const [feedback, setFeedback] = useState(null)

    const handleProfileClick = event => {
        onGoToProfile()
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

    useEffect(() => {
        try {
            logic.getLoggedInUser()
                .then(user => {
                    setName(user.name)
                    setImage(user.image || image)
                })
                .catch(error => setFeedback({ message: error.message, level: 'error' }))
        } catch (error) {
            setFeedback({ message: error.message, level: 'error' })
        }
    })

    return <header className='fixed top-0 z-50 w-[95%] my-4 mx-3'>
        <div className="  bg-[#D5EDF6] w-full shadow-sm flex flex-col gap-3 py-2 px-3 rounded-xl ">

            <h2 className='text-[#1C637D] font-bold text-lg text-lg'>Is there any new to share? <br></br> <span className="font-extrabold">{name}</span></h2>
        </div>

        <div
            className="w-30 h-30 rounded-full border-8 border-[#0B2A35] absolute top-5 right-2 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('https://cdn-icons-png.flaticon.com/512/9131/9131529.png')" }}
        >
        </div>

        <nav className=' flex gap-3 mt-3'>
            <ButtonRound className='bg-[#FF7621] flex items-center justify-center' >
                <img src="/plus.svg" alt="plus icon" className="w-[80%] h-[80%] object-cover" />
            </ButtonRound>

            <ButtonRound className='bg-[#1C637D] flex items-center justify-center'>
                <img src="/glass.svg" alt="Glass icon" className="w-[80%] h-f[80%] object-cover" />
            </ButtonRound>

            <button className='bg-[#1C637D] text-white rounded-xl font-semibold text-sm px-1 py-2 w-20' onClick={handleLogoutClick}>Logout</button>
        </nav>

    </header>

}