import { useState } from 'react'

import { AnchorMenu } from './components/commons/AnchorMenu'
import { Anchor } from './components/commons/Anchor'
import { Title } from './components/commons/Title'
import { SubTitle } from './components/commons/SubTitle'
import { ChangeUserEmail } from './components/ChangeUserEmail'
import { ChangeUserPassword } from './components/ChangeUserPassword'
import { ChangeUserUsername } from './components/ChangeUserUsername'
import { ChangeUserName } from './components/ChangeUserName'
import { ChangeUserImage } from './components/ChangeUserImage'

export function Profile({ onGoToHome }) {
    console.log('Profile -> call')

    const [view, setView] = useState(null)

    const handleBackCLick = event => {
        event.preventDefault()

        onGoToHome()
    }

    const handleChangeEmailClick = event => {
        event.preventDefault()

        setView('change-email')
    }

    const handleChangePasswordClick = event => {
        event.preventDefault()

        setView('change-password')
    }


    const handleChangeUsernameClick = event => {
        event.preventDefault()

        setView('change-username')
    }


    const handleChangeNameClick = event => {
        event.preventDefault()

        setView('change-name')
    }

    
    const handleChangeImageClick = event => {
        event.preventDefault()

        setView('change-image')
    }


    console.log('Profile -> render')

    return <div className="flex flex-col items-center justify-center min-h-screen">

        <div className="fixed top-4 right-4 z-50">
            <Anchor className="flex items-center gap-1 rounded-full bg-white px-4 py-2 text-sm font-medium shadow hover:bg-gray-50 transition" onClick={handleBackCLick}>&lt; Back</Anchor>
        </div>
        <Title></Title>

        <div className="flex justify-between gap-10 mt-4">
            <SubTitle>Profile</SubTitle>


        </div>
        <nav className='flex flex-col  items-center'>
            <ul className='flex gap-5 border-b border-gray-200 p-4 mt-2'>
                <li><AnchorMenu onClick={handleChangeEmailClick}>Change e-mail</AnchorMenu></li>
                <li><AnchorMenu onClick={handleChangePasswordClick}>Change password</AnchorMenu></li>
                <li><AnchorMenu onClick={handleChangeUsernameClick}>Change username</AnchorMenu></li>
            </ul>
            <ul className='flex gap-5 border-b border-gray-200 p-4 mt-2'>
                <li><AnchorMenu onClick={handleChangeNameClick}>Change name</AnchorMenu></li>
                <li><AnchorMenu onClick={handleChangeImageClick}>Change image</AnchorMenu></li>
            </ul>

        </nav>

        {view === 'change-email' && <ChangeUserEmail />}

        {view === 'change-password' && <ChangeUserPassword />}

        {view === 'change-username' && <ChangeUserUsername />}

        {view === 'change-name' && <ChangeUserName />}

        {view === 'change-image' && <ChangeUserImage />}
    </div >
}