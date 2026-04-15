import { useState, useEffect } from 'react'

import { useParams } from 'react-router'

import { ButtonRound } from './components/commons/ButtonRound'
import { Title } from './components/commons/Title'
import { logger } from '../logger'
import { Header } from './components/commons/Header'


import { useContext } from '../context'

import { logic } from '../logic'

export function ReelDetail() {
    logger.debug('ArticleDetail -> call')

    const { onError } = useContext()

    const [article, setArticle] = useState(null)

    const {userId, articleId} = useParams()

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

        onGoToReel(userId)
    }

    logger.debug('ArticleDetail -> render')

    return <div className=" flex flex-col justify-start py-2 px-4 items-center justify-center min-h-screen bg-gradient-to-b from-[#0A1F27] via-[#163f4f] to-[#24657D] sm:gap-4 md:gap-10 ">
      
        {article ? (() => {
            const zuluDate = new Date(article.date)
            const locaDateString = zuluDate.toLocaleDateString()

            return <div className="w-full flex flex-col gap-4 text-[#D5EDF6] mt-5">

                <h1>Reelsssss</h1>

                <img
                    src={article.image0}
                    className="w-full object-cover rounded-2xl shadow-lg"
                />

                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold leading-tight">
                        {article.title}
                    </h1>

                    <h2 className="text-sm text-[#A9C7D3]">
                        {article.subtitle}
                        <span className="mx-1">•</span>
                        <span className="text-[#5F7D88] italic">
                            {locaDateString}
                        </span>
                    </h2>
                </div>

                <div className=" flex flex-col gap-2">
                    <div className="h-px w-full bg-[#2F6F86]" />
                    <div className="h-px w-full bg-[#2F6F86]" />
                </div>

                <p className="text-base leading-relaxed text-[#D5EDF6]/90">
                    {article.paragraph0}
                </p>

                <img
                    src={article.image1}
                    className="w-full h-60 object-cover rounded-xl"
                />

                <p className="text-base leading-relaxed text-[#D5EDF6]/90">
                    {article.paragraph1}
                </p>

                <img
                    src={article.image2}
                    className="w-full h-60 object-cover rounded-xl"
                />

                <p className="text-base leading-relaxed text-[#D5EDF6]/90">
                    {article.paragraph2}
                </p>

                <img
                    src={article.image3}
                    className="w-full h-60 object-cover rounded-xl"
                />

                <p className="text-base leading-relaxed text-[#D5EDF6]/90">
                    {article.paragraph2}
                </p>

            </div>

        })() : null}
    </div>

}
