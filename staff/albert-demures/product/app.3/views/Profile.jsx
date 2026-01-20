const { useSTate } = React

function Profile({ onGoToHome }) {
    console.log('Profile -> call')

    const [view, setView] = useState(null)

    const handleBackCLick = event => {
        event.preventDefault()

        onGoToHome()
    }

    const handleChangeEmailClick = event => {
        event.preventDefault()

        setView('change-email')
    }

      const handleChangePasswordClick = event => {
        event.preventDefault()

        setView('change-password')
    }

    console.log('Profile -> render')

    return <div className="flex flex-col items-center justify-center min-h-screen">
        <Title></Title>

        <div className="flex justify-between gap-10 mt-4">
        <SubTitle>Profile</SubTitle>

    <Anchor onClick={handleBackCLick}>&lt; Back</Anchor>
</div>

<ul>
    <li><Anchor onClick= {handleChangeEmailClick}>Change e-mail</Anchor></li>
    <li><Anchor onClick= {handleChangePasswordClick}>Change password</Anchor></li>
</ul>

    {view === 'change-email' && <ChangeUserEmail />}
   

    {view === 'change-password' && <ChangeUserPassword />}
    </div>
}