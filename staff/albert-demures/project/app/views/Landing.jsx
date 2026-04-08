export function Landing({ onGoToLogin, onGoToRegister}) {

   const handleRegisterClick = event => {
        event.preventDefault()

        onGoToRegister()
    }

    const handleLoginClick = event =>{
        event.preventDefault()

        onGoToLogin()
    }

    return <div className="flex flex-col gap-10 items-center justify-center min-h-screen bg-gradient-to-b from-[#0A1F27] via-[#163f4f] to-[#24657D] sm:gap-8 md:gap-10 ">

        <h1 className='font-bold font-sans text-5xl text-[#58B7DA] text-center drop-shadow-lg'> Welcome to <br /> News2Web </h1>

        <img src='logo.svg' alt='News2Web logo' className='w-38 object-contain' />

        <p className=' text-[#D5EDF6]/70 text-center'>Create and manage your news easily</p>

        <div className='flex gap-8'>
            <button className='bg-[#FF7621] text-white font-semiblod py-2 px-8 rounded-lg  shadow-lg hover:bg-[#FF6200] transition-colors duration-200' onClick={handleLoginClick}> Login</button>

            <button className='bg-[#58B7DA] text-white font-semiblod py-2 px-8 rounded-lg shadow-lg hover:bg-[#169CCD] transition-colors duration-200' onClick={handleRegisterClick}>Register</button>

        </div>
    </div >
}

