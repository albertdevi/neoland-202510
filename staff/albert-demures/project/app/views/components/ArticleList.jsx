import { useState, useEffect } from 'react'

import { ArticleItem } from './ArticleItem'

import { useContext } from '../../context'

import { logic } from '../../logic'

import { logger } from '../../logger'

export function ArticleList({ onGoToArticleDetail, onGoToModifyArticle }) {
    logger.debug('ArticleList -> call')

    const { onError } = useContext

    const [articles, setArticles] = useState([])
    const [articleId, setArticleId] = useState(null)

    useEffect(() => {
        logger.debug('ArticleList -> useEffect')

        try {
            logic.getArticles()
                .then(articles => {
                    setArticles(articles)
                })
                .catch(error => onError(error))
        } catch (error) {
            onError(error)
        }
    }, [])

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
                    setArticleId(null)
                    setArticles(articles)
                })
                .catch(error => onError(error))
        } catch (error) {
            onError
        }
    }

    logger.debug('ArticleList -> render')

    return <div>
        <ul className="flex flex-col gap-8 mt-2 mb-8">
            {articles.map(article => <ArticleItem key={article.id} article={article} onGoToArticleDetail={onGoToArticleDetail} onGoToModifyArticle={onGoToModifyArticle} onRemoveArticleClick={handleRemoveArticleClick} />)}
        </ul>

        {articleId && <div className=" w-full h-full fixed top-0 left-0 bg-black/75 flex justify-center items-center">
            <div className="bg-[#D5EDF6] rounded-xl px-6 py-9">
                <p className='text-center text-3xl mb-8 font-bold text-[#1C637D]'>Are you sure to <br /> delete the article?</p>

                <div className="flex justify-center gap-4">
                    <button className="bg-[#1C637D] py-4 px-12 rounded-3xl" onClick={handleCancelRemoveArticleClick}>
                        <img src="/delete.svg" alt="delete icon" className="w-6 h-6" />
                    </button>
                    <button className="bg-[#FF7621] py-4 px-12 rounded-3xl" onClick={handleConfirmRemoveArticleClick}>
                        <img src="/check.svg" alt="check icon" className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>}
    </div>
}