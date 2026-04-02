import { Title } from './components/commons/Title'
import { SubTitle } from './components/commons/SubTitle'

import { logger } from '../logger'

export function Landing({ onGoToLogin, onGoToRegister }) {
    logger.debug('Landing -> call')

    const handleLoginClick = event => {
        event.preventDefault()

        onGoToLogin()
    }

    const handleRegisterClick = event => {
        event.preventDefault()

        onGoToRegister()
    }

    logger.debug('Landing -> render')

    return <div className="flex flex-col gap-5 items-center justify-center min-h-screen">
        <Title></Title>

        <SubTitle>Welcome!</SubTitle>

        <nav className="text-gray-700 text-lg leading-loose max-w-md mx-auto mt-4 text-center">
            <a className="cursor-pointer underline font-bold" onClick={handleLoginClick}>Login</a> or <a className="cursor-pointer underline font-bold" onClick={handleRegisterClick}>Register</a>
        </nav>
    </div>
}