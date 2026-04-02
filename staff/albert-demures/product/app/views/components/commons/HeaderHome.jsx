import { useState, useEffect } from 'react'

import { Title } from './Title'

import { logic } from '../../../logic'

export function HeaderHome({ onGoToProfile }) {

    const [name, setName] = useState('user')
    const [image, setImage] = useState('https://cdn-icons-png.flaticon.com/512/9131/9131478.png')
    const [feedback, setFeedback] = useState(null)

    const handleProfileClick = event => {
       
        onGoToProfile()
    }

    useEffect(() => {
        setTimeout(() => {
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
        }, 1000)
    }, [])

    return <header className="fixed top-0 z-50 bg-white w-full border-b border-gray-100 shadow-sm flex items-center justify-between py-3 px-6 ">
        <Title></Title>

        <button className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-black drop-shadow-sm transition-colors duration-150 hover:bg-blue-400" onClick={handleProfileClick} type="button">
            <img
                src={image}
                alt='Profile'
                className='h-12 w-12 rounded-full object-cover'
            />
        </button>
    </header>
}