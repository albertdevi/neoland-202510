import { useState, useEffect } from 'react'

import { ButtonRound } from './components/commons/ButtonRound'
import { Title } from './components/commons/Title'
import { logger } from '../logger'
import { Header } from './components/commons/Header'

import { ArticleList } from './components/ArticleList'
import { useContext } from '../context'

import { logic } from '../logic'

export function Home({ onUserLoggedOut, onGoToAddArticle, onGoToArticleDetail }) {

    const { onSuccess, onError } = useContext()

    const [name, setName] = useState('user')

    useEffect(() => {
        logger.debug('Home -> call')

        try {
            logic.getLoggedInUser()
                .then(user => {
                    setName(user.name)
                })
        } catch (error) {
            onError(error)
        }
    }, [])

        const handleAddArticleClick = event => {
        event.preventDefault()

        onGoToAddArticle()
    }

    const handleGoToArticleDetail = articleId => onGoToArticleDetail(articleId)

    logger.debug('Home -> render')

    return <div className=" flex flex-col justify-start py-2 px-4 items-center justify-center min-h-screen bg-gradient-to-b from-[#0A1F27] via-[#163f4f] to-[#24657D] sm:gap-4 md:gap-10 ">
        <Header onUserLoggedOut={onUserLoggedOut}>
            <ButtonRound className='bg-[#FF7621] flex items-center justify-center' >
                <img src="/plus.svg" alt="plus icon" className="w-[80%] h-[80%] object-cover" onClick={handleAddArticleClick} />
            </ButtonRound>
                      <ButtonRound className='bg-[#1C637D] flex items-center justify-center'>
                <img src="/glass.svg" alt="Glass icon" className="w-[80%] h-f[80%] object-cover" />
            </ButtonRound>
        </Header>
        <Title className='mt-30 mb-5'>Articles</Title>

        <ArticleList onGoToArticleDetail={handleGoToArticleDetail}></ArticleList>

    </div>
}
