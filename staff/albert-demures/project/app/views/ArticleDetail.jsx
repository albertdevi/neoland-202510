import { useState, useEffect } from 'react'

import { useParams } from 'react-router'

import { ButtonRound } from './components/commons/ButtonRound'
import { Title } from './components/commons/Title'
import { logger } from '../logger'
import { Header } from './components/commons/Header'


import { useContext } from '../context'

import { logic } from '../logic'

export function ArticleDetail({ onGoToHome, onUserLoggedOut, onGoToModifyArticle }) {
    logger.debug('ArticleDetail -> call')

    const { onError } = useContext()

    const [article, setArticle] = useState(null)

    const { articleId } = useParams()

    useEffect(() => {
        try {
            logic.getArticle(articleId)
                .then(article => setArticle(article))
                .catch(error => onError(error))
        } catch (error) {
            onError(error)
        }
    }, [])

    const handleBackClick = event => {
        event.preventDefault()

        onGoToHome()
    }

    const handleGoToModifyArticle = () => onGoToModifyArticle(articleId)

    logger.debug('ArticleDetail -> render')

    return <div className=" flex flex-col justify-start py-2 px-4 items-center justify-center min-h-screen bg-gradient-to-b from-[#0A1F27] via-[#163f4f] to-[#24657D] sm:gap-4 md:gap-10 ">
        <Header onUserLoggedOut={onUserLoggedOut}>

            <ButtonRound className='bg-[#1C637D] flex items-center justify-center'>
                <img src="/back.svg" alt="Back icon" className="w-[80%] h-f[80%] object-cover" onClick={handleBackClick} />
            </ButtonRound>
        </Header>


        {article ? (() => {
            const zuluDate = new Date(article.date)
            const locaDateString = zuluDate.toLocaleDateString()

            return <div className="w-full flex flex-col gap-4 text-[#D5EDF6] mt-33">

                <img
                    src={article.image0}
                    className="w-full object-cover rounded-2xl shadow-lg"
                />

                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold leading-tight">
                        {article.title}
                    </h1>

                    <h2 className="text-sm text-[#A9C7D3]">

                        {article.subtitle && (
                            <>
                                {article.subtitle}
                                <span className="mx-1">•</span>
                            </>
                        )}
{}
                        <span className="text-[#5F7D88] italic">
                            {locaDateString}
                        </span>
                    </h2>
                </div>

                <ButtonRound className="bg-[#1C637D]" onClick={handleGoToModifyArticle}>
                    <img src="/edit.svg" alt="edit icon" className="w-4 h-4" />
                </ButtonRound>

                <div className=" flex flex-col gap-2">
                    <div className="h-px w-full bg-[#2F6F86]" />
                    <div className="h-px w-full bg-[#2F6F86]" />
                </div>

                <p className="text-base leading-relaxed text-[#D5EDF6]/90">
                    {article.paragraph0}
                </p>

                {article.image1 && (
                    <img
                        src={article.image1}
                        className="w-full h-60 object-cover rounded-xl"
                    />
                )}

                <p className="text-base leading-relaxed text-[#D5EDF6]/90">
                    {article.paragraph1}
                </p>

                {article.image2 && (
                    <img
                        src={article.image2}
                        className="w-full h-60 object-cover rounded-xl"
                    />
                )}

                <p className="text-base leading-relaxed text-[#D5EDF6]/90">
                    {article.paragraph2}
                </p>

                {article.image3 && (
                    <img
                        src={article.image3}
                        className="w-full h-60 object-cover rounded-xl"
                    />
                )}

                <p className="text-base leading-relaxed text-[#D5EDF6]/90">
                    {article.paragraph2}
                </p>

            </div>

        })() : null}
    </div>

}