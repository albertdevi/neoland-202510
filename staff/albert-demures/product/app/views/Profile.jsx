import { useState } from 'react'

import { Header} from './components/commons/Header'
import { AnchorMenu } from './components/commons/AnchorMenu'
import { Anchor } from './components/commons/Anchor'
import { Title } from './components/commons/Title'
import { SubTitle } from './components/commons/SubTitle'
import { ChangeUserEmail } from './components/ChangeUserEmail'
import { ChangeUserPassword } from './components/ChangeUserPassword'
import { ChangeUserUsername } from './components/ChangeUserUsername'
import { ChangeUserName } from './components/ChangeUserName'
import { ChangeUserImage } from './components/ChangeUserImage'

export function Profile({ onGoToHome, onError, onSuccess, onClear }) {
    console.log('Profile -> call')

    const [view, setView] = useState(null)

      const handleBackClick = event => {
        event.preventDefault()
      
        onGoToHome()
    }


    const handleChangeEmailClick = event => {
        event.preventDefault()

        onClear()

        setView('change-email')
    }

    const handleChangePasswordClick = event => {
        event.preventDefault()

        onClear()

        setView('change-password')
    }


    const handleChangeUsernameClick = event => {
        event.preventDefault()
        onClear()

        setView('change-username')
    }


    const handleChangeNameClick = event => {
        event.preventDefault()
        onClear()

        setView('change-name')
    }

    
    const handleChangeImageClick = event => {
        event.preventDefault()
        onClear()

        setView('change-image')
    }

    console.log('Profile -> render')

    return <div className="flex flex-col items-center min-h-screen">

       <Header onGoToHome={onGoToHome} />
       
        <div className="fixed top-4 right-4 z-50">
            <Anchor className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-gray-700 font-medium shadow-md   hover:bg-gray-50  hover:shadow-lg transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-300" onClick={handleBackClick}>&lt; Back</Anchor>
            </div>

        <div className="flex justify-between gap-10 mt-20">
            <SubTitle>Profile</SubTitle>


        </div>
        <nav className='flex flex-col  items-center'>
            <ul className='flex gap-5 border-b border-gray-200 p-4 mt-4'>
                <li><AnchorMenu onClick={handleChangeEmailClick}>Change e-mail</AnchorMenu></li>
                <li><AnchorMenu onClick={handleChangePasswordClick}>Change password</AnchorMenu></li>
                <li><AnchorMenu onClick={handleChangeUsernameClick}>Change username</AnchorMenu></li>
            </ul>
            <ul className='flex gap-5 border-b border-gray-200 p-4 mt-2'>
                <li><AnchorMenu onClick={handleChangeNameClick}>Change name</AnchorMenu></li>
                <li><AnchorMenu onClick={handleChangeImageClick}>Change image</AnchorMenu></li>
            </ul>

        </nav>

        {view === 'change-email' && <ChangeUserEmail onError={onError} onSuccess={onSuccess} />}

        {view === 'change-password' && <ChangeUserPassword onError={onError} onSuccess={onSuccess}/>}

        {view === 'change-username' && <ChangeUserUsername onError={onError} onSuccess={onSuccess}/>}

        {view === 'change-name' && <ChangeUserName onError={onError} onSuccess={onSuccess}/>}

        {view === 'change-image' && <ChangeUserImage onError={onError} onSuccess={onSuccess}/>}
    </div >
}