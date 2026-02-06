let millis = 2000
console.log('ask coffee', new Date().toISOString(), millis)
setTimeout(() => {
    console.log('start writing memory 2', new Date().toISOString())

    const before = Date.now()
    
    while(Date.now() - before < 5000) {
        //console.log('loop', new Date().toISOString())
    }
    
    console.log('drink coffee', new Date().toISOString())

    millis = 1500
    console.log('ask fotocopies', new Date().toISOString(), millis)
    setTimeout(() => {
        console.log('archive fotocopies', new Date().toISOString())

        console.log('start writing memory 3', new Date().toISOString())

        const before = Date.now()
        
        while(Date.now() - before < 5000) {
            //console.log('loop', new Date().toISOString())
        }

        millis = 4000
        console.log('ask report', new Date().toISOString(), millis)
        setTimeout(() => console.log('read report', new Date().toISOString()), millis)

        console.log('ended writing memory 3', new Date().toISOString())
    }, millis)

    console.log('ended writing memory 2', new Date().toISOString())
}, millis)

console.log('start writing memory', new Date().toISOString())

const before = Date.now()

while(Date.now() - before < 5000) {
    //console.log('loop', new Date().toISOString())
}

console.log('ended writing memory', new Date().toISOString())

/*
ask coffe t-0
start writing memory t-0

ended wrtiing memory t-5

ended wrtign memory 2 t-5

drink coffe t-10

ask fotocopied t-10

archive fotocopies t-11.5

start writing memory 3 t-11.5

ask report t-16.5

enden wrting memory 3 -t16.5

reaf repot t-20.5




*/