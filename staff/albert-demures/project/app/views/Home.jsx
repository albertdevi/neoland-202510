import { useState, useEffect } from 'react'

import { ButtonRound } from './components/commons/ButtonRound'
import { Title } from './components/commons/Title'
import { logger } from '../logger'
import { Header } from './components/commons/Header'

import { ArticleList } from './components/ArticleList'
import { useContext } from '../context'

import { logic } from '../logic'

export function Home({ onUserLoggedOut, onGoToAddArticle, onGoToArticleDetail, onGoToModifyArticle, onGoToModifyReel }) {

    const { onSuccess, onError } = useContext()

    const [name, setName] = useState('user')
    const [user, setUser] = useState(null)

    const [showReelModal, setShowReelModal] = useState(false)

    const copyData = () => {
        const text = `<iframe width="600" height="800" frameborder="0" src="http://localhost:5173/reels/${user.id}"></iframe>`
        navigator.clipboard.writeText(ctype);
    }

    useEffect(() => {
        logger.debug('Home -> call')


        try {
            logic.getLoggedInUser()
                .then(user => {
                    setUser(user)
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

    const handleGoToModifyArticle = articleId => onGoToModifyArticle(articleId)

    const handleGoToModifyReel = userId => onGoToModifyReel(user.id)

    logger.debug('Home -> render')

    return <div className="flex flex-col justify-start py-2 px-4 items-center justify-center min-h-screen bg-gradient-to-b from-[#0A1F27] via-[#163f4f] to-[#24657D] sm:gap-4 md:gap-10 ">
        <Header onUserLoggedOut={onUserLoggedOut}>
            <ButtonRound className='bg-[#FF7621] flex items-center justify-center' >
                <img src="/plus.svg" alt="plus icon" className="w-[80%] h-[80%] object-cover" onClick={handleAddArticleClick} />
            </ButtonRound>

            <ButtonRound className='bg-[#1C637D] flex items-center justify-center'>
                <img src="/glass.svg" alt="Glass icon" className="w-[80%] h-f[80%] object-cover" />
            </ButtonRound>


            <ButtonRound className='bg-[#1C637D] flex items-center justify-center'>
                <img src="/film-reel.svg" alt="Film-reel icon" className="w-[100%] h-f[100%] object-cover" onClick={() => setShowReelModal(true)} />
            </ButtonRound>

            <ButtonRound className='bg-[#1C637D] flex items-center justify-center'>
                <img src="/palette.svg" alt="Palette icon" className="w-[100%] h-f[100%] object-cover" onClick={handleGoToModifyReel} />
            </ButtonRound>

        </Header>
        <Title className='mt-32 mb-5'>Articles</Title>

        <ArticleList onGoToArticleDetail={handleGoToArticleDetail} onGoToModifyArticle={handleGoToModifyArticle}></ArticleList>


        {showReelModal && (<div className=" fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-[#D5EDF6] rounded-2xl px-4 py-6 shadow-2x">
                <p className='text-center text-xl mb-6 font-bold text-[#1C637D]'>Insert reel</p>

                <pre className="bg-gray-900 text-green-300 w-80 p-4 rounded-lg whitespace-pre-wrap break-words mb-5">
                    <code>
                        {`<iframe width="600" height="800" frameborder="0" src="http://localhost:5173/reels/${user.id}"></iframe>`}
                    </code>
                </pre>

                <div className="flex justify-center gap-4">
                    <button className="bg-[#1C637D] py-3 px-8 rounded-3xl" onclick="copyData()">
                        Copy
                    </button>

                    <button className="bg-[#1C637D] py-3 px-8 rounded-3xl" onClick={() => setShowReelModal(false)}>
                        Return
                    </button>

                </div>
            </div>
        </div>
        )
        }
    </div >
}
