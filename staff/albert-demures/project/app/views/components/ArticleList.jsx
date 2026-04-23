import { useState, useEffect } from 'react'

import { ArticleItem } from './ArticleItem'

import { useContext } from '../../context'

import { logic } from '../../logic'

import { logger } from '../../logger'

export function ArticleList({ onGoToArticleDetail, onGoToModifyArticle }) {
    logger.debug('ArticleList -> call')

    const { onError } = useContext()

    const [articles, setArticles] = useState([])
    const [articleId, setArticleId] = useState(null)

    useEffect(() => {
        logger.debug('ArticleList -> useEffect')

        try {
            logic.getArticles()
                .then(articles => {
                    const sortedArticles = [...articles].sort(
                        (a,b) => new Date(b.date) - new Date(a.date)
                    )
                    setArticles(sortedArticles)
                })
                .catch(error => onError(error))
        } catch (error) {
            onError(error)
        }
    }, [])

    const handleGoToArticleDetailClick = articleId => onGoToArticleDetail(articleId)

    const handleRemoveArticleClick = articleId => setArticleId(articleId)

    const handleCancelRemoveArticleClick = event => {
        event.preventDefault()

        setArticleId(null)
    }

    const handleConfirmRemoveArticleClick = event => {
        event.preventDefault()

        try {
            logic.removeArticle(articleId)
                .then(() => {
                    return logic.getArticles()
                })
                .then(articles => {
                    const sortedArticles = [...articles].sort(
                        (a, b) => new Date(b.date) - new Date(a.date)
                    )
                    setArticleId(null)
                    setArticles(sortedArticles)
                })
                .catch(error => onError(error))
        } catch (error) {
            onError(error)
        }
    }

    logger.debug('ArticleList -> render')

    return <div>
        <ul className="flex flex-col gap-8 mt-2 mb-8">
            {articles.map(article => <ArticleItem key={article.id} article={article} onGoToArticleDetail={onGoToArticleDetail} onGoToModifyArticle={onGoToModifyArticle} onRemoveArticleClick={handleRemoveArticleClick} />)}
        </ul>

        {articleId && <div className=" fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-[#D5EDF6] rounded-2xl px-4 py-6 shadow-2x">
                <p className='text-center text-3xl mb-6 font-bold text-[#1C637D]'>Are you sure to <br /> delete the article?</p>

                <div className="flex justify-center gap-4">
                    <button className="bg-[#1C637D] py-4 px-10 rounded-3xl" onClick={handleCancelRemoveArticleClick}>
                        <img src="/delete.svg" alt="delete icon" className="w-5 h-5" />
                    </button>
                    <button className="bg-[#FF7621] py-4 px-10 rounded-3xl" onClick={handleConfirmRemoveArticleClick}>
                        <img src="/check.svg" alt="check icon" className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>}
    </div>
}