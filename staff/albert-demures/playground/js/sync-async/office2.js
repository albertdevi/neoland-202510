let millis = 2000
console.log('ask coffee', new Date().toISOString(), millis)
setTimeout(() => {
    console.log('drink coffee', new Date().toISOString())

    millis = 1500
    console.log('ask fotocopies', new Date().toISOString(), millis)
    setTimeout(() => {
        console.log('archive fotocopies', new Date().toISOString())

        millis = 4000
        console.log('ask report', new Date().toISOString(), millis)
        setTimeout(() => console.log('read report', new Date().toISOString()), millis)
    }, millis)

}, millis)

console.log('start writing memory', new Date().toISOString())

const before = Date.now()

while(Date.now() - before < 5000) {
    //console.log('loop', new Date().toISOString())
}

console.log('ended writing memory', new Date().toISOString())

/*
t0
│ ask coffee
│ start writing memory
│
│ BLOQUEO while (5s)
│
t0+5s
│ ended writing memory
│ drink coffee
│ ask fotocopies
│
t0+6.5s
│ archive fotocopies
│ ask report
│
t0+10.5s
│ read repor
*/