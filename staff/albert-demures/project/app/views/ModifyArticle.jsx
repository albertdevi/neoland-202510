import { useState, useEffect } from 'react'

import { useParams } from 'react-router'

import { Title } from './components/commons/Title'
import { logger } from '../logger'
import { Header } from './components/commons/Header'
import { InputField } from './components/commons/InputField'
import { TextAreaField } from './components/commons/TextAreaField'
import { SelectField } from './components/commons/SelectField'
import { Form } from './components/commons/Form'
import { ButtonCTA } from './components/commons/ButtonCTA'
import { ButtonRound } from './components/commons/ButtonRound'
import { useContext } from '../context'


import { logic } from '../logic'

export function ModifyArticle({ onGoToHome, onUserLoggedOut, onGoBack }) {

    const { onSuccess, onError } = useContext()

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

    const handleModifyArticleSubmit = event => {
        event.preventDefault()

        const form = event.target

        const title = form.title.value
        const subtitle = form.subtitle.value
        const date = form.date.value
        const paragraph0 = form.paragraph0.value
        const image0 = form.image0.value
        const paragraph1 = form.paragraph1.value
        const image1 = form.image1.value
        const paragraph2 = form.paragraph2.value
        const image2 = form.image2.value
        const paragraph3 = form.paragraph3.value
        const image3 = form.image3.value
        const visibility = form.visibility.value

        try {
            logic.modifyArticle(articleId, title, subtitle, date, paragraph0, image0, paragraph1, image1, paragraph2, image2, paragraph3, image3, visibility)
                .then(() => onSuccess('article succesfully modified'))
                .catch(error => onError(error))
        } catch (error) {
            onError(error)
        }
    }

    logger.debug('ModifyArticle -> render')

    if (!article) return <p>Loading...</p>

    const zuluDate = new Date(article.date)
    const isoString = zuluDate.toISOString().split('T')[0]


    return <div className='flex flex-col py-2 px-4 items-center justify-center min-h-screen bg-gradient-to-b from-[#0A1F27] via-[#163f4f] to-[#24657D] sm:gap-4 md:gap-10'>
        <Header onUserLoggedOut={onUserLoggedOut}  >
            <ButtonRound className='bg-[#1C637D] flex items-center justify-center'>
                <img src="/back.svg" alt="Back icon" className="w-[80%] h-f[80%] object-cover" onClick={handleBackClick} />
            </ButtonRound>

        </Header>
        <Title className='mt-32'>Modify article</Title>

        <Form onSubmit={handleModifyArticleSubmit}>

            <InputField alias='title' type='text' defaultValue={article.title}>Title</InputField>

            <InputField alias='subtitle' type='text' defaultValue={article.subtitle}>Subtitle</InputField>

            <InputField key={isoString} alias='date' type='date' defaultValue={isoString}>Date</InputField>

            <TextAreaField alias='paragraph0' type='text' defaultValue={article.paragraph0}>Paragraph</TextAreaField>

            <InputField alias='image0' type='text' defaultValue={article.image0}>Image</InputField>

            <TextAreaField alias='paragraph1' type='text' defaultValue={article.paragraph1}>Paragraph</TextAreaField>

            <InputField alias='image1' type='text' defaultValue={article.image1}>Image</InputField>

            <TextAreaField alias='paragraph2' type='text' defaultValue={article.paragraph2}>Paragraph</TextAreaField>

            <InputField alias='image2' type='text' defaultValue={article.image2}>Image</InputField>

            <TextAreaField alias='paragraph3' type='text' defaultValue={article.paragraph3}>Paragraph</TextAreaField>

            <InputField alias='image3' type='text' defaultValue={article.image3}>Image</InputField>

            <SelectField alias='visibility' label="Visibility">
                <option value='public'>Public</option>
                <option value='draft'>Draft</option>
            </SelectField>

            <ButtonCTA className="" type="submit">Modify</ButtonCTA>

        </Form>


    </div>
}
