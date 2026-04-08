import { useState, useEffect } from 'react'

import { Title } from './components/commons/Title'
import { logger } from '../logger'
import { Header } from './components/commons/Header'

import { useContext } from '../context'

import { logic } from '../logic'

export function Home({ onUserLoggedOut}) { 

const { onSuccess, onError } = useContext()

const [name, setName] = useState('user')

useEffect(() => {
    logger.debug('Home -> call')

    try{
        logic.getLoggedInUser()
        .then(user => {
            setName(user.name)
        })
    } catch (error) {
        onError(error)
    }
}, [])

return <div className=" flex flex-col gap-10 py-10 items-center justify-center min-h-screen bg-gradient-to-b from-[#0A1F27] via-[#163f4f] to-[#24657D] sm:gap-8 md:gap-10 ">
    <Header onUserLoggedOut={onUserLoggedOut} ></Header>
    <Title>Welcome home, {name}!</Title>

     </div>
}
