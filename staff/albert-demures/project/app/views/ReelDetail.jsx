import { useState, useEffect } from 'react'

import { useParams } from 'react-router'

import { ButtonRound } from './components/commons/ButtonRound'
import { Title } from './components/commons/Title'
import { logger } from '../logger'
import { Header } from './components/commons/Header'


import { useContext } from '../context'

import { logic } from '../logic'

export function ReelDetail({ onGoToReel}) {
    logger.debug('ArticleDetail -> call')

    const { onError } = useContext()

    const [article, setArticle] = useState(null)

    const { userId, articleId } = useParams()

    const [reel, setReel] = useState(null)

    useEffect(() => {
        try {
            logic.getReelArticle(userId, articleId)
                .then(article => setArticle(article))
                .catch(error => onError(error))
        } catch (error) {
            onError(error)
        }
    }, [])

    useEffect(() => {
        try {
            logic.getReel(userId)
                .then(reel => setReel(reel))
                .catch(error => onError(error))
        } catch (error) {
            onError(error)
        }
    }, [])

    const handleGoToReel = event => {
        event.preventDefault()

        onGoToReel(userId)
    }

    const textColor = reel?.textColor || '#000000'
    const backgroundColor = reel?.backgroundColor || '#afafaf'

    logger.debug('ArticleDetail -> render')

    return <div className=" flex flex-col justify-start py-2 px-4 items-center justify-center min-h-screen sm:gap-6 md:gap-10 ">

        {article ? (() => {
            const zuluDate = new Date(article.date)
            const locaDateString = zuluDate.toLocaleDateString()

            return <div className=" min-h-screen max-w-2xl mx-auto px-4 py-6 space-y-4"
                style={{
                    color: textColor,
                }}
            >

                <ButtonRound className=' hover:bg-neutral-800 transition' style={{ backgroundColor }}>
                    <img src="/back.svg" alt="Back icon" className="w-5 h-5 object-cover invert" onClick={handleGoToReel} />
                </ButtonRound>

                <img
                    src={article.image0}
                    className="w-full object-cover rounded-2xl shadow-lg"
                />

                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold leading-tight tracking-tight">
                        {article.title}
                    </h1>

                    <h2 className="text-sm leading-snug">

                        {article.subtitle && (
                            <>
                                {article.subtitle}
                                <span className="mx-1">•</span>
                            </>
                        )}
                        { }
                        <span className=" italic">
                            {locaDateString}
                        </span>
                    </h2>
                </div>

                <div className=" flex flex-col">
                    <div className="h-px w-full bg-neutral-200 my-2" />
                    <div className="h-px w-full bg-neutral-200 my-2" />
                </div>

                <p className="text-sm leading-7 ">
                    {article.paragraph0}
                </p>

                {article.image1 && (
                    <img
                        src={article.image1}
                        className="w-full aspect-[16/9] object-cover rounded-2xl shadow-md my-4"
                    />
                )}

                <p className="text-sm leading-7 ">
                    {article.paragraph1}
                </p>

                {article.image2 && (
                    <img
                        src={article.image2}
                        className="w-full aspect-[16/9] object-cover rounded-2xl shadow-md my-4"
                    />
                )}

                <p className="text-sm leading-7 ">
                    {article.paragraph2}
                </p>

                {article.image3 && (
                    <img
                        src={article.image3}
                        className="w-full aspect-[16/9] object-cover rounded-2xl shadow-md my-4"
                    />
                )}

                <p className="text-sm leading-7 ">
                    {article.paragraph2}
                </p>

            </div>

        })() : <p>Loading</p>}
    </div>
}