import { useState, useEffect } from 'react'

import { Routes, Route, useNavigate, Navigate } from 'react-router'

import { Landing } from './views/Landing'
import { Login } from './views/Login'
import { Register } from './views/Register'
import { Home } from './views/Home'
import { AddArticle } from './views/AddArticle'
import { Feedback } from './views/components/commons/Feedback'
import { Context } from './context'
import { ArticleDetail } from './views/ArticleDetail'

import { AuthError, ValidationError, ExistenceError, DuplicityError, CredentialError } from 'com'
import { logic } from './logic'

import { logger } from './logger'

export function App() {
    logger.debug('App -> call')

    const [feedback, setFeedback] = useState(null)
    let loggedIn = false

    const navigate = useNavigate()

    try {
        loggedIn = logic.isUserLoggedIn()
    } catch (error) {
        setFeedback({ message: error.message, level: 'error' })
    }

    const clearFeedbackAndNavigate = path => {
        setFeedback(null)
        navigate(path)
    }

    const handleGoToLogin = () => clearFeedbackAndNavigate('/login')

    const handleGoToRegister = () => clearFeedbackAndNavigate('/register')

    const handleGoToAddArticle = () => clearFeedbackAndNavigate('/add-article')

    const handleGoToHome = () => clearFeedbackAndNavigate('/')

    const handleGoToArticleDetail = articleId => clearFeedbackAndNavigate(`/articles/${articleId}/detail`)

    const handleError = error => {
        if (error instanceof AuthError) {
            try {
                logic.logoutUser()

                logger.error(error)
                setFeedback({ message: 'wrong session. please, login again', level: 'error' })
                navigate('/login')
            } catch (error) {
                logger.fatal(error)
                setFeedback({ message: 'sorry, there was an error on logout, please, try it later', level: 'error' })
            }
        } else if (error instanceof ValidationError) {
            logger.warn(error)
            setFeedback({ message: error.message, level: 'warn' })
        } else if (error instanceof ExistenceError || error instanceof CredentialError || error instanceof DuplicityError) {
            logger.error(error)
            setFeedback({ message: error.message, level: 'danger' })
        } else {
            logger.fatal(error)
            setFeedback({ message: 'sorry, something failed. try again later', level: 'error' })
        }
    }

    const handleSuccess = message => setFeedback({ message, level: 'success' })

    const handleClear = () => setFeedback(null)

    logger.debug('App -> render')

    const contextValue = {
        onSuccess: handleSuccess,
        onError: handleError,
        onClear: handleClear
    }

    return <Context.Provider value={contextValue}>
        {feedback && <Feedback feedback={feedback} />}
        <Routes>

            <Route path="/" element={!loggedIn ?
                <Landing onGoToLogin={handleGoToLogin} onGoToRegister={handleGoToRegister} />
                :
                <Home onGoToAddArticle={handleGoToAddArticle} onUserLoggedOut={handleGoToLogin} onGoToArticleDetail={handleGoToArticleDetail} />
            } />

            <Route path="/login" element={!loggedIn ? <Login onUserLoggedIn={handleGoToHome} onGoToRegister={handleGoToRegister} /> : <Navigate to="/" />} />

            <Route path="/register" element={!loggedIn ? <Register onGoToLogin={handleGoToLogin} /> : <Navigate to="/" />} />

            <Route path="/add-article" element={loggedIn ? <AddArticle onGoToHome={handleGoToHome} /> : <Navigate to="/" />} />

            <Route path="/articles/:articleId/detail" element={loggedIn ? < ArticleDetail onGoToHome={handleGoToHome} onUserLoggedOut={handleGoToLogin} /> : <Navigate to="/login" />} />

        </Routes>
    </Context.Provider>
}