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

export function AddArticle({ onGoToHome, onUserLoggedOut, onGoToAddArticle }) {

    const { onError } = useContext()

    const handleBackClick = event => {
        event.preventDefault()

        onGoToHome()
    }

    const handleAddArticleSubmit = event => {
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
            logic.addArticle(title, subtitle, date, paragraph0, image0, paragraph1, image1, paragraph2, image2, paragraph3, image3, visibility)
                .then(() => {
                    form.reset()
                })
                .catch(error => onError(error))
        } catch (error) {
            onError(error)
        }
    }

    logger.debug('AddArticle -> render')

    return <div className='flex flex-col justify-start py-2 px-4 items-center justify-center min-h-screen bg-gradient-to-b from-[#0A1F27] via-[#163f4f] to-[#24657D] sm:gap-4 md:gap-10'>
        <Header onUserLoggedOut={onUserLoggedOut} onGoToAddArticle={onGoToAddArticle} >
            <ButtonRound className='bg-[#1C637D] flex items-center justify-center'>
                <img src="/back.svg" alt="Back icon" className="w-[80%] h-f[80%] object-cover" onClick={handleBackClick} />
            </ButtonRound>

        </Header>
        <Title className='mt-38'>Add an article</Title>

        <Form onSubmit={handleAddArticleSubmit}>

            <InputField alias='title' type='text'>Title</InputField>

            <InputField alias='subtitle' type='text'>Subtitle</InputField>

            <InputField alias='date' type='date'>Date</InputField>

            <TextAreaField alias='paragraph0' type='text'>Paragraph</TextAreaField>

            <InputField alias='image0' type='text'>Image</InputField>

            <TextAreaField alias='paragraph1' type='text'>Paragraph</TextAreaField>

            <InputField alias='image1' type='text'>Image</InputField>

            <TextAreaField alias='paragraph2' type='text'>Paragraph</TextAreaField>

            <InputField alias='image2' type='text'>Image</InputField>

            <TextAreaField alias='paragraph3' type='text'>Paragraph</TextAreaField>

            <InputField alias='image3' type='text'>Image</InputField>

            <SelectField alias='visibility' label="Visibility">
                <option value='public'>Public</option>
                <option value='draft'>Draft</option>
            </SelectField>

            <ButtonCTA className="" type="submit">Create</ButtonCTA>

        </Form>

    </div>
}
