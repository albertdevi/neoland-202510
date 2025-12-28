const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)

const useState = React.useState

function App() {
    console.log('App -> call')




    const issuesState = useState([
        { subject: 'Entregar gráficos', body: 'Entregar todos los gráficos también en PNG', id: 'issue-1055', status: '🟢 Open', date: new Date(), author: 'Brandon Sanderson' }
    ])
    const issues = issuesState[0]
    const setIssues = issuesState[1]

    const errorState = useState(null)
    const error = errorState[0]
    const setError = errorState[1]



    const handleMessageSubmit = (event) => {
        event.preventDefault()
        // Lógica para crear issue

        const form = event.target

        const subject = form.subject.value
        const body = form.body.value

        try {
            logic.createIssue(subject, body)

            form.reset()
            setError(null)

            const issues = logic.getAllIssues()

            const newIssues = []

            for (let i = 0; i < issues.length; i++) {
                const issue = issues[i]

                newIssues.push(issue)
            }

            setIssues(newIssues)
        } catch (error) {
            console.error(error)
            setError(error.message)
        }

    }

    console.log('App -> render')

    const listItems = []

    for (let i = 0; i < issues.length; i++) {
        const issue = issues[i]

        const issueSubject = issue.subject
        const issueBody = issue.body
        const issueId = issue.id
        const issueStatus = issue.status
        const issueAuthor = issue.author
        const issueDate = issue.date
        const issueYear = issueDate.getFullYear()
        const issueMonth = issueDate.getMonth() + 1
        const issueDay = issueDate.getDate()


        const listItem = <li className="flex flex-col border border-gray-200 shadow-lg mx-4 my-2 rounded-2xl" >
            <div className="flex items-center px-3 py-3 bg-gradient-to-r from-blue-700 to-blue-600 rounded-t-2xl  gap-5 rounded-t-xl text-white border-b-5 border-b-blue-300">
                <h2 className="text-l font-bold">{issueSubject}</h2>

                <button className=" flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 border border-blue-700 rounded-full text-xs font-semibold shadow-sm ml-auto">
                    {issueStatus}
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



        </li>

        listItems.push(listItem)
    }



    return <div className="flex flex-col gap-2 p-2 bg-gray-50">
        <h1 className="flex flex-col text-center gap-2 p-2 text-4xl text-gray-800 font-extrabold">Issue Tracker 📋</h1>

        <ul className="p-2">
            {listItems}
        </ul>

        <form className="flex flex-col gap-3 mx-2 mt-2 border border-gray-200 shadow-lg p-6 rounded-2xl bg-white"
            onSubmit={handleMessageSubmit}>
            <h2 className="text-xl font-bold text-gray-700 mb-2">Create a new Issue</h2>

            <label className="text-sm font-medium text-gray-600"
                htmlFor="subject">Subject</label>
            <input className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" id="subject" placeholder="Issue subject" />

            <label className="text-sm font-medium text-gray-600"
                htmlFor="body">Body</label>
            <input className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text" id="body" placeholder="Describe the issue" />

            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-5" type="submit">Create Issue</button>

            {error && (
                <p className="text-red-600 text-sm font-medium mt-2">
                    ⚠ {error}
                </p>
            )}

        </form>
    </div>
}