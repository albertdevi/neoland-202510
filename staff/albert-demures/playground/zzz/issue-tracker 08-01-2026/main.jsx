const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)

const useState = React.useState

function App() {
    console.log('App -> call')

    //creo un useSatate inicial, le he puesto propiedades para iniciar con uno ya creado
    const issuesState = useState([
        { subject: 'Entregar gráficos', body: 'Entregar todos los gráficos también en PNG', id: 'Issue-1055', status: 'Open', date: new Date(), author: 'Albert Demures' }
    ])
    const issues = issuesState[0]
    const setIssues = issuesState[1]

    //crear estados para los errores
    const errorState = useState(null)
    const error = errorState[0]
    const setError = errorState[1]

    //Costante array que define el estilo del header según el estado.
    const headerStyles = {
        Open: 'flex items-center px-3 py-3 bg-gradient-to-r from-green-700 to-green-600 rounded-t-2xl gap-5 rounded-t-xl text-white border-b-4 border-b-green-300',
        OnHold: 'flex items-center px-3 py-3 bg-gradient-to-r from-red-700 to-red-600 rounded-t-2xl gap-5 rounded-t-xl text-white border-b-4 border-b-red-300',
        InProgress: 'flex items-center px-3 py-3 bg-gradient-to-r from-yellow-700 to-yellow-600 rounded-t-2xl gap-5 rounded-t-xl text-white border-b-4 border-b-yellow-300',
        Done: 'flex items-center px-3 py-3 bg-gradient-to-r from-blue-700 to-blue-600 rounded-t-2xl gap-5 rounded-t-xl text-white border-b-4 border-b-blue-300'
    }

    //Constante array que define el estilo de los botones del header según el estado.
    const buttonStyles = {
        Open: 'flex items-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-3 border border-green-700 rounded-full text-xs font-semibold shadow-sm ml-auto',
        OnHold: 'flex items-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 border border-red-700 rounded-full text-xs font-semibold shadow-sm ml-auto',
        InProgress: 'flex items-center bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-3 border border-yellow-700 rounded-full text-xs font-semibold shadow-sm ml-auto',
        Done: 'flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 border border-blue-700 rounded-full text-xs font-semibold shadow-sm ml-auto'
    }

    //Constante que define 
    const statusIcons = {
        Open: '🟢',
        OnHold: '🔴',
        InProgress: '🟡',
        Done: '🔵'
    }

    // cosntante para los estados, para ir cambiando
    const statuses = ['Open', 'InProgress', 'OnHold', 'Done']

    //Constante para ir cambiando el estado
    const countState = useState(1)
    let count = countState[0]
    const setCount = countState[1]

    const handleMessageSubmit = (event) => {
        event.preventDefault()
        // Lógica para crear issue
        //Cojo los valors del target, que en este caso es el formulario
        const form = event.target

        const subject = form.subject.value
        const body = form.body.value

        // 
        try {
            logic.createIssue(subject, body)
            // limpio el formulario y si hay un mensaje de error, se borra
            form.reset()
            setError(null)

            const issues = logic.getAllIssues()

            const newIssues = []

            for (const issue of issues)
                newIssues.push(issue)

            setIssues(newIssues)
            // Si hay algún error, se lanza para que pueda ser pintado
        } catch (error) {
            console.error(error)
            setError(error.message)
        }
    }

    console.log('App -> render')
    //Creo un array para ir guardando los list items
    const listItems = []

    //Vuelvo a imprimir todos los issues que haya, el antiguo y el nuevo
    for (const issue of issues) {
        // Aquí creo constantes para tener todos los valors resumidos
        const issueSubject = issue.subject
        const issueBody = issue.body
        const issueId = issue.id
        const issueStatus = issue.status
        const issueAuthor = issue.author
        const issueDate = issue.date
        const issueYear = issueDate.getFullYear()
        const issueMonth = issueDate.getMonth() + 1
        const issueDay = issueDate.getDate()

        listItems.push(<li className="flex flex-col border border-gray-200 shadow-lg mx-4 my-5 rounded-2xl" >

            <div className={headerStyles[issueStatus]}>

                <h2 className="text-l font-bold">{issueSubject}</h2>

                <button id="statusButton" className={buttonStyles[issueStatus]}
                    onClick={() => {
                        console.log('click')
                        // Al hacer click, avanza el estado del issue de forma cíclica y fuerza el re-render
                        logic.setIssueStatus(issueId, statuses[count])

                        //Creo una constante con todas las issues nuevas
                        const issues = logic.getAllIssues()
                        // Creo un nuevo array, con las issues actualizadas.
                        setIssues([...issues])
                        // Preparo el count para el siguiente estado. El % hace que cuando pase el statuses.lenght, en este caso si es = a 4, vuelvo al principio
                        setCount((count + 1) % statuses.length)
                    }}
                >
                    {issueStatus} {statusIcons[issueStatus]}
                </button>
            </div>

            <div className="px-5 py-4 flex flex-col gap-2">
                <h3 className="text-sm font-medium text-gray-500" >{issueId}</h3>
                <p className="text-sm text-gray-800 text-gray-600" >{issueBody}</p>
            </div>

            <div className="flex px-5 py-3 bg-gray-100 text-gray-500 rounded-b-xl gap-2">
                <p className="text-sm italic" >{issueAuthor}</p>
                <p className="text-sm  ml-auto" >{issueDay}/{issueMonth}/{issueYear}</p>
            </div>
        </li>)
    }


    const filterOpen = (event) => {
        event.preventDefault()
        const allIssues = logic.getAllIssues()
        const newIssues = []

        for (const issue of allIssues) {
            if (issue.status === 'Open') {
                newIssues.push(issue)
            }
        }

        setIssues(newIssues)
    }

    const filterInProgress = (event) => {
        event.preventDefault()
        const allIssues = logic.getAllIssues()
        const newIssues = []

        for (const issue of allIssues) {
            if (issue.status === 'InProgress') {
                newIssues.push(issue)
            }
        }

        setIssues(newIssues)
    }

    const filterOnHold = (event) => {
        event.preventDefault()
        const allIssues = logic.getAllIssues()
        const newIssues = []

        for (const issue of allIssues) {
            if (issue.status === 'OnHold') {
                newIssues.push(issue)
            }
        }

        setIssues(newIssues)
    }

    const filterDone = (event) => {
        event.preventDefault()
        const allIssues = logic.getAllIssues()
        const newIssues = []

        for (const issue of allIssues) {
            if (issue.status === 'Done') {
                newIssues.push(issue)
            }
        }

        setIssues(newIssues)
    }

    const filterAll = (event) => {
        event.preventDefault()
        const allIssues = logic.getAllIssues()
        const newIssues = []

        for (const issue of allIssues) {
            newIssues.push(issue) // aquí metemos **todos**
        }

        setIssues(newIssues)
    }


    // Estructura principal de la aplicación
    return <div className="flex flex-wrap justify-center gap-3 p-2 -mb-3">
        <h1 className="flex flex-col text-center gap-2 p-2 text-4xl text-gray-800 font-extrabold">Issue Tracker 📋</h1>

        <nav className="flex flex-wrap justify-center gap-2 p-2 -mb-3">
            <button
                className="px-3 py-1 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold text-xs shadow transition-colors"
                onClick={filterOpen}
            >
                Open
            </button>

            <button
                className="px-3 py-1 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white font-semibold text-xs shadow transition-colors"
                onClick={filterInProgress}
            >
                In Progress
            </button>

            <button
                className="px-3 py-1 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold text-xs shadow transition-colors"
                onClick={filterOnHold}
            >
                On Hold
            </button>

            <button
                className="px-3 py-1 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold text-xs shadow transition-colors"
                onClick={filterDone}
            >
                Done
            </button>

            <button
                className="px-3 py-1 rounded-xl bg-gray-500 hover:bg-gray-600 text-white font-semibold text-xs shadow transition-colors"
                onClick={filterAll}
            >
                All
            </button>
        </nav>


        <ul className="p-2">
            {listItems}
        </ul>

        <div className="flex flex-col gap-3 mx-2 border border-gray-200 shadow-lg p-6 rounded-2xl bg-white">

            <h2 className="text-xl font-bold text-gray-700 mb-2">Create a new Issue</h2>

            <form className="flex flex-col gap-3 mx-2 border border-gray-200 shadow-lg p-6 rounded-2xl bg-white"
                onSubmit={handleMessageSubmit}>
                <label className="text-sm font-medium text-gray-600"
                    htmlFor="subject">Subject</label>
                <input className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" id="subject" placeholder="Issue subject" />

                <label className="text-sm font-medium text-gray-600"
                    htmlFor="body">Body</label>
                <input className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text" id="body" placeholder="Describe the issue" />

                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-5" type="submit">Create Issue</button>
            </form>

            {error && (
                <p className="text-red-600 text-sm font-medium mt-2">
                    ⚠ {error}
                </p>
            )}

        </div>
    </div>
}


//todo: destructurar los uses states y mirar como cambia los estados