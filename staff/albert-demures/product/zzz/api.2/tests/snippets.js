//register user

!true && fetch('http://localhost:8080/users', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: '{"name":"An Drew", "email":"an@drew.com","username":"andrew","password":"123123123","passwordRepeat":"123123123"}'
})

    .then(res => {
        debugger
        const { status } = res

        if (status === 201)
            return

        return res.json()
            .then(body => {
                debugger
                const { error, message } = body

                console.error(error, message)
            })
    })
    .then(() => console.log('the end'))

//authenticate user

!true && fetch('http://localhost:8080/users/auth', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: '{"username":"andrew","password":"123123123"}'
})

    .then(res => {
        debugger
        const { status } = res

        if (status === 200)
            return res.json()
                .then(userId => {
                    debugger
                    console.log(userId)
                })

        return res.json()
            .then(body => {
                debugger
                const { error, message } = body

                console.error(error, message)
            })
    })
    .then(() => console.log('the end'))

//change user-email

!true && fetch('http://localhost:8080/users/email', {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic user-0'
    },
    body: '{"email":"an@drew.com","newEmail":"eloi@palacios.com","newEmailRepeat":"eloi@palacios.com"}'
})

    .then(res => {
        debugger
        const { status } = res

        if (status === 204)
            return

        return res.json()
            .then(body => {
                debugger
                const { error, message } = body

                console.error(error, message)
            })
    })
    .then(() => console.log('the end'))

//change user-password

!true && fetch('http://localhost:8080/users/password', {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic user-0'
    },
    body: '{"password":"123123123","newPassword":"123123123v2","newPasswordRepeat":"123123123v2"}'
})

    .then(res => {
        debugger
        const { status } = res

        if (status === 204)
            return

        return res.json()
            .then(body => {
                debugger
                const { error, message } = body

                console.error(error, message)
            })
    })
    .then(() => console.log('the end'))

//change user-username

!true && fetch('http://localhost:8080/users/username', {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic user-0'
    },
    body: '{"username":"andrew","newUsername":"andrew2","newUsernameRepeat":"andrew2"}'
})

    .then(res => {
        debugger
        const { status } = res

        if (status === 204)
            return

        return res.json()
            .then(body => {
                debugger
                const { error, message } = body

                console.error(error, message)
            })
    })
    .then(() => console.log('the end'))

// add-pet

!true && fetch('http://localhost:8080/pets', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic user-0'
    },
    body: '{"name":"Dragon","birthdate":"2022-02-22","weight":2,"image":"https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZmRibXNwNmJmYzd2N3hhOG42dXZjNHR6eTEzMzhhamN0Yzl5ZWUxaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/48NyDgBRvGYmpdfNww/giphy.gif"}'
})

    .then(res => {
        debugger
        const { status } = res

        if (status === 201)
            return

        return res.json()
            .then(body => {
                debugger
                const { error, message } = body

                console.error(error, message)
            })
    })
    .then(() => console.log('the end'))


//delete pet

true && fetch('http://localhost:8080/pets/pet-0', {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
    },
})

    .then(res => {
        debugger
        const { status } = res

        if (status === 204)
            return
        return res.json()
            .then(body => {
                debugger
                const { error, message } = body

                console.error(error, message)
            })
    })
    .then(() => console.log('the end'))
