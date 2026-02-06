const log = message => console.log('%c' + new Date().toISOString() + ' %c' + message, 'color: greenyellow', 'color: tomato')

log('START')

Promise.resolve('Castellvi')
    .then(value => value + ' Martorell')
    .then(value => { throw value + ' Abrera'})
     .then(value => value + ' Shangai')
.catch(value => {
    if (value === 'Castellvi Martorell Abrera'){
    throw value + ' Olesa'
        }
        return value;
})

    .then(() => log (' Viena'))
    .catch( value => log(value))

log('END')