const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(<App />)

const useState = React.useState

function App() {

    /*
        // landing
        return <div className="flex flex-col gap-5 items-center justify-center min-h-screen">
    
            <h1 className="text-5xl font-extrabold text-blue-600 text-center mt-6 tracking-tight">MyPet</h1>
    
            <p className="text-3xl font-semibold text-blue-500 text-center mt-4 tracking-tight">Welcome!</p>
    
            <nav className="text-gray-700 text-lg leading-loose max-w-md mx-auto mt-4 text-center">
                <a className="underline">Login</a> or <a className="underline">Register</a>
    
            </nav>
        </div>
    
    */

    //login
    return <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-5xl font-extrabold text-blue-600 text-center mt-6 tracking-tight">MyPet</h1>

        <h2 className="text-3xl font-semibold text-blue-500 text-center mt-4 tracking-tight">Login</h2>

        <form className="flex flex-col gap-4 w-full max-w-sm mx-auto mt-6">
            <label className="text-m text-gray-600 mt-2" for="username">Username</label>
            <input className="border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" id="username" type="text" />

            <label className="text-m text-gray-600 mt-2" for="password">Password</label>
            <input className="border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" id="password" type="password" />

            <button className="w-24 bg-gray-600 text-white font-semibold py-1 px-0 rounded-lg shadow hover:bg-gray-700 transition-colors duration-200 self-end" type="button">Show</button>

            <button className="bg-blue-600 text-white font-semibold py-2 px-16 rounded-lg shadow hover:bg-blue-700 transition-colors duration-200 self-center">Login</button>
        </form>

        <a className="text-gray-700 text-lg leading-loose max-w-md mx-auto mt-4 text-center underline">Register</a>

        <p className="text-red-600 text-sm mt-2 font-medium"></p>
    </div>




}


