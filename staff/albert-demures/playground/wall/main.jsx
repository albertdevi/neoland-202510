const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)

const useState = React.useState

function App() {
    console.log('App -> call')
    const messagesState = useState(['Hello, World (Iroh, 2025-12-1)'])
    const messages = messagesState[0]
    const setMessages = messagesState[1]

    const handleMessageSubmit = event => {

        event.preventDefault()

        /*
        const message = document.getElementById('message').value
        const name = document.getElementById('name').value
        const date = Date()

        setMessages ([message + ' (' + name + ', '  + date + ')'])
     */

        const form = event.target

        const message = form.message.value
        const name = form.name.value
        const date = new Date()
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()


        // const newMessage = message + ' (' + name + ', ' + date.toLocaleDateString() + ')'
        const newMessage = message + ' (' + name + ', ' + year + '-' + month + '-' + day + ')'

        const newMessages = []

        for (let i = 0; i < messages.length; i++) {
            const message = messages[i]

            newMessages.push(message)
        }

        newMessages.push(newMessage)

        setMessages(newMessages)

        form.reset()
    }

    console.log('App -> render')

    const listItems = []

    for (let i = 0; i < messages.length; i++) {
        const message = messages[i]

        const listItem = <li>
            <p>{message}</p>
        </li>

        listItems.push(listItem)
    }

    return <div className="flex flex-col gap-2 p-2">
        <h1 className="text-3xl">Wall</h1>

        <ul className="p-2">
                {listItems}
        </ul>

        <form className="flex flex-col gap-2 border p-2" onSubmit={handleMessageSubmit}>
            <h2>Leave your message on the wall!</h2>

            <label htmlFor="message">Message</label>
            <input className="border" type="text" id="message"
                placeholder="message" />

            <label htmlFor="name">Name</label>
            <input className="border" type="text" id="name"
                placeholder="name" />

            <button className="border bg-black text-white" type="submit">Send</button>
        </form>
    </div>
}