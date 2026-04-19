import { useState, useEffect } from 'react'

import { logger } from '../logger'

import { ReelItem } from './components/ReelItem'

import { useContext } from '../context'

import { useParams } from 'react-router'

import { logic } from '../logic'

export function Reel({ onGoToReelDetail }) {
    logger.debug('Reels -> call')

    const { userId } = useParams()

    const { onError } = useContext()

    const [reel, setReel] = useState(null)

    const [articles, setArticles] = useState([])


    useEffect(() => {
        logic.getReel(userId)
            .then(setReel)
            .catch(onError)
    }, [userId])

    useEffect(() => {
        logger.debug('ArticleList -> useEffect')

        try {
            logic.getReelArticles(userId)
                .then(articles => {
                    const sortedArticles = [...articles].sort(
                        (a, b) => new Date(b.date) - new Date(a.date)
                    )
                    setArticles(sortedArticles)
                })
                .catch(error => onError(error))
        } catch (error) {
            onError(error)
        }
    }, [])

    const handleGoToReelDetail = (userId, articleId) => onGoToReelDetail(userId, articleId)

    logger.debug('ArticleList -> render')

    return <div className='"min-h-screen text-neutral-900 max-w-2xl mx-auto px-4 py-6'>

        <ul className="flex flex-col space-y-6">
            {articles.map(article => <ReelItem key={article.id} article={article} onGoToReelDetail={handleGoToReelDetail} reel={reel} />)}
        </ul>

    </div>
}