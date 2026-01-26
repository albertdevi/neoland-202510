const { assert } = console

// test add

// case add names

const names = new Collection()
names.add('Juan')
names.add('Sergio')
names.add('Laura')
names.add('Albert')
names.add('Sergio')
// console.log(names)
// Collection { 0: Juan, 1: Sergio, 2: Laura, 3: Albert, 4: Sergio, count: 5 }
console.assert(names.count === 5, 'names.count is 5')
console.assert(names[0] === 'Juan', 'names[0] is Juan')
console.assert(names[1] === 'Sergio', 'names[1] is Sergio')
console.assert(names[2] === 'Laura', 'names[2] is Laura')
console.assert(names[3] === 'Albert', 'names[3] is Albert')
console.assert(names[4] === 'Sergio', 'names[4] is Sergio')


// case add colors
const colors = new Collection()
colors.add('red')
colors.add('green')
colors.add('blue')
// console.log(colors)
// Collection { 0: red, 1: green, 2: blue, count: 3 }
console.assert(colors.count === 3, 'colors.count is 3')
console.assert(colors[0] === 'red', 'colors[0] is red')
console.assert(colors[1] === 'green', 'colors[1] is green')
console.assert(colors[2] === 'blue', 'colors[2] is blue')

// case add numbers
const nums = new Collection()
nums.add(3.141516) // PI
nums.add(666) // (..)
nums.add(2000)
// console.log(nums)
// Collection { 0: 3.141516, 1: 666, 2: 2000, count: 3 }
console.assert(nums.count === 3, 'nums.count is 3')
console.assert(nums[0] === 3.141516, 'nums[0] is 3.141516')
console.assert(nums[1] === 666, 'nums[1] is 666')
console.assert(nums[2] === 2000, 'nums[2] is 2000')

// TODO test remove

// case remove birds
const birds = new Collection()
birds[0] = 'Eagle'
birds[1] = 'Penguin'
birds[2] = 'Hawk'
birds[3] = 'Owl'
birds.count = 4
birds.remove('Penguin')

console.assert(birds.count === 4, 'birds.count is 4')
console.assert(birds[0] === 'Eagle', 'birds[0] is Eagle')
console.assert(birds[1] === undefined, 'birds[1] is undefined')
console.assert(birds[2] === 'Hawk', 'birds[2] is Hawk')
console.assert(birds[3] === 'Owl', 'birds[3] is Owl')

// case remove rodents

const roedents = new Collection()
roedents[0] = 'Rat'
roedents[1] = 'Capibara'
roedents[2] = 'Squirrel'
roedents[3] = 'Hamster'
roedents.count = 4
roedents.remove('Rat')

console.assert(roedents.count === 4, 'roedents.count is 4')
console.assert(roedents[0] === undefined, 'roedents[0] is undefined')
console.assert(roedents[1] === 'Capibara', 'roedents[1] is Capibara')
console.assert(roedents[2] === 'Squirrel', 'roedents[2] is Squirrel')
console.assert(roedents[3] === 'Hamster', 'roedents[3] is Hamster')

// TODO test removeFirst

// case removeFirst canids
const canids = new Collection()
canids[0] = 'Dog'
canids[1] = 'Fox'
canids[2] = 'Dog'
canids[3] = 'Coyote'
canids.count = 4

canids.removeFirst('Dog')

console.assert(canids.count === 4, 'canids.count is 4')
console.assert(canids[0] === undefined, 'canids[0] is undefined')
console.assert(canids[1] === 'Fox', 'canids[1] is Fox')
console.assert(canids[2] === 'Dog', 'canids[2] is Dog')
console.assert(canids[3] === 'Coyote', 'canids[3] is Coyote')

// TODO test update
// case update cetaceans
const cetaceans = new Collection()
cetaceans[0] = 'Dolphin'
cetaceans[1] = 'Orca'
cetaceans[2] = 'Whale'
cetaceans[3] = 'Beluga'
cetaceans.count = 4

cetaceans.update('Orca', 'Narwhal')

console.assert(cetaceans.count === 4, 'cetaceans.count is 4')
console.assert(cetaceans[0] === 'Dolphin', 'cetaceans[0] is Dolphin')
console.assert(cetaceans[1] === 'Narwhal', 'cetaceans[1] is Narwhal')
console.assert(cetaceans[2] === 'Whale', 'cetaceans[2] is Whale')
console.assert(cetaceans[3] === 'Beluga', 'cetaceans[3] is Beluga')

// TODO test updateFirst
// test updateFirst pachyderms

const pachyderms = new Collection()
pachyderms[0] = 'Elephant'
pachyderms[1] = 'Hippopotamus'
pachyderms[2] = 'Elephant'
pachyderms[3] = 'Tapir'
pachyderms.count = 4

pachyderms.updateFirst('Elephant', 'Boar')

console.assert(pachyderms.count === 4, 'pachyderms.count is 4')
console.assert(pachyderms[0] === 'Boar', 'pachyderms[0] is Boar')
console.assert(pachyderms[1] === 'Hippopotamus', 'pachyderms[1] is Hipopotamus')
console.assert(pachyderms[2] === 'Elephant', 'pachyderms[2] is Elephant')
console.assert(pachyderms[3] === 'Tapir', 'pachyderms[3] is Tapir')

// TODO test push

const insects = new Collection()
insects[0] = 'Bee'
insects[1] = 'Ant'
insects[2] = 'Butterfly'
insects[3] = 'Mosquito'
insects.count = 4

insects.push('Cricket')

console.assert(insects.count === 5, 'insects.count is 4')
console.assert(insects[0] === 'Bee', 'insects[0] is Bee')
console.assert(insects[1] === 'Ant', 'insects[1] is Ant')
console.assert(insects[2] === 'Butterfly', 'insects[2] is Butterfly')
console.assert(insects[3] === 'Mosquito', 'insects[3] is Mosquito')
console.assert(insects[4] === 'Cricket', 'insects[4] is Cricket')

// TODO test pop


//test amphibiabs
const amphibians = new Collection()
amphibians[0] = 'frog'
amphibians[1] = 'salamander'
amphibians[2] = 'axolotl'
amphibians[3] = 'toad'
amphibians.count = 4

amphibians.pop()

assert(amphibians.count === 3, 'amphibians.count is 3')
console.assert(amphibians[0] === 'frog', 'amphibians[0] is frog')
console.assert(amphibians[1] === 'salamander', 'amphibians[0] is salamander')
console.assert(amphibians[2] === 'axolotl', 'amphibians[0] is axolotl')
console.assert(amphibians[3] != 'toad', 'amphibians[0] is not a toad')


// TODO test shift
const snakes = new Collection()
snakes[0] = 'boa'
snakes[1] = 'anaconda'
snakes[2] = 'viper'
snakes[3] = 'phyton'
snakes.count = 4

snakes.shift()
assert(snakes.count === 3, 'snakes.count is 3')
assert(snakes[0] === 'anaconda', 'snakes[0] is anaconda')
assert(snakes[1] === 'viper', 'snakes[1] is viper')
assert(snakes[2] === 'phyton', 'snakes[2] is phyton')

// TODO test includes
const lizards = new Collection()
lizards[0] = 'iguana'
lizards[1] = 'gecko'
lizards[2] = 'chameloen'
lizards[3] = 'komodo'
lizards.count = 4

const zeroIguana = lizards.includes('iguana', 0)
const twoIguana = lizards.includes('iguana', 2)
const twoGorila = lizards.includes('gorila', 2)

assert(zeroIguana === true, 'iguana is in 0')
assert(twoIguana === false, 'iguana is not in 2')
assert(twoGorila === false, 'gorilla is not in 2')


// test forEach

// case print fruits
const fruits = new Collection()
fruits[0] = 'Apple'
fruits[1] = 'Banana'
fruits[2] = 'Orange'
fruits.count = 3

const box = []
fruits.forEach(function (fruit) {
    //console.log(fruit)
    box.push(fruit)
})
// console.log(box)
// [ Apple, Banana, Orange ]
console.assert(box.length === 3, 'box length is 3')
console.assert(box[0] === 'Apple', 'box[0] is Apple')
console.assert(box[1] === 'Banana', 'box[1] is Banana')
console.assert(box[2] === 'Orange', 'box[2] is Orange')

// case calculate total
const prices = new Collection()
prices[0] = 150
prices[1] = 30
prices[2] = 45
prices[3] = 25
prices.count = 4

let total = 0

prices.forEach(price => total += price * 1.21)
// console.log(total)
// 302.5
console.assert(total === 302.5, 'total is 302.5')


// case sum value + index + length
{
    const nums = new Collection()
    nums[0] = 10
    nums[1] = 20
    nums[2] = 30
    nums.count = 3

    let sum = 0

    nums.forEach((num, index, collection) => {
        sum += num + index + collection.count
    })

    assert(sum == 72, 'sum is 72')

}

// test map

//case names to uppercase

{
    const names = new Collection()
    names[0] = 'Rodolfo'
    names[1] = 'Serito'
    names[2] = 'Agus'
    names[3] = 'Albert'
    names[4] = 'Juanico'
    names.count = 5

    const namesInUppercase = names.map(name => name.toUpperCase())
    console.assert(namesInUppercase.count === 5, 'namesInUppercase.count is 5')
    console.assert(namesInUppercase[0] === 'RODOLFO', 'namesInUppercase[0] is RODOLFO')
    console.assert(namesInUppercase[1] === 'SERITO', 'namesInUppercase[1] is SERITO')
    console.assert(namesInUppercase[2] === 'AGUS', 'namesInUppercase[2] is AGUS')
    console.assert(namesInUppercase[3] === 'ALBERT', 'namesInUppercase[3] is ALBERT')
    console.assert(namesInUppercase[4] === 'JUANICO', 'namesInUppercase[4] is JUANICO')
}


//case arrays to objects
{
    const arrayVehicles = new Collection()
    arrayVehicles[0] = ['seat', 'ibiza', 2001]
    arrayVehicles[1] = ['ford', 'fiesta', 2005]
    arrayVehicles[2] = ['citroen', 'C3', 2010]
    arrayVehicles.count = 3

    const objectVehicles = arrayVehicles.map(arrayVehicle => {
        const objectVehicle = {}
        objectVehicle.brand = arrayVehicle[0]
        objectVehicle.model = arrayVehicle[1]
        objectVehicle.year = arrayVehicle[2]

        return objectVehicle
    })

    assert(objectVehicles.count === 3, 'objectVehicles.length is 3')
    const car0 = objectVehicles[0]
    assert(car0.constructor === Object, 'car0.constructor is Object')
    assert(Object.keys(car0).length === 3, 'car0 has 3 properties (keys)')
    assert(car0.brand === 'seat', 'car0.brand is seat')
    assert(car0.model === 'ibiza', 'car0.model is ibiza')
    assert(car0.year === 2001, 'car0.year is 2001')

    const car1 = objectVehicles[1]
    assert(car1.constructor === Object, 'car1.constructor is Object')
    assert(Object.keys(car1).length === 3, 'car1 has 3 properties (keys)')
    assert(car1.brand === 'ford', 'car1.brand is ford')
    assert(car1.model === 'fiesta', 'car1.model is fiesta')
    assert(car1.year === 2005, 'car1.year is 2001')

    const car2 = objectVehicles[2]
    assert(car2.constructor === Object, 'car2.constructor is Object')
    assert(Object.keys(car2).length === 3, 'car2 has 3 properties (keys)')
    assert(car2.brand === 'citroen', 'car2.brand is citroen')
    assert(car2.model === 'C3', 'car2.model is C3')
    assert(car2.year === 2010, 'car2.year is 2010')
}


// test nums (element, index, count)
{
    const nums = new Collection()
    nums[0] = 10
    nums[1] = 20
    nums[2] = 30
    nums.count = 3

    const result = nums.map((element, index, collection) => {
        return {
            element,
            index,
            collection
        }
    })

    assert(result[0].element === 10 && result[0].index === 0 && result[0].collection === nums, 'result[0] contains element 10, index 0, and collection nums')

    assert(result[1].element === 20 && result[1].index === 1 && result[1].collection === nums, 'result[1] contains element 20, index 1, and collection nums')

    assert(result[2].element === 30 && result[2].index === 2 && result[2].collection === nums, 'result[2] contains element 30, index 2, and collection nums')
}

//  test filter

//case bears
const bears = new Collection()
bears[0] = 'Panda'
bears[1] = 'Grizzly'
bears[2] = 'Polar'
bears[3] = 'Sun'
bears.count = 4

const fiveLetters = bears.filter(bears => bears.length === 5);
/*function (bear) {
return bear.length === 5
}*/
console.assert(fiveLetters.count === 2, 'fiveLetters.count is 2')
console.assert(fiveLetters[0] === 'Panda', 'fiveLetters[0] is Panda')
console.assert(fiveLetters[1] === 'Polar', 'fiveLetters[1] is Polar')

//Case colors with chracater o

const colors2 = new Collection()
colors2[0] = 'red'
colors2[1] = 'brown'
colors2[2] = 'blue'
colors2[3] = 'black'
colors2[4] = 'yellow'
colors2[5] = 'orange'
colors2.count = 6

const colors2WithO = colors2.filter(color => color.includes('o'))

assert(colors2WithO.count === 3, 'colors2WithO.count is 3')
assert(colors2WithO[0] === 'brown', 'colors2WithO[0] is brown')
assert(colors2WithO[1] === 'yellow', 'colors2WithO[1] is yellow')
assert(colors2WithO[2] === 'orange', 'colors2WithO[2] is orange')



// test clients
{
    const clients = new Collection()
    clients[0] = { name: 'Pepito', surname: 'Grillo', balance: 1000 }
    clients[1] = { name: 'Juan', surname: 'Garcia', balance: 600 }
    clients[2] = { name: 'Peter', surname: 'Pan', balance: 1010 }
    clients[3] = { name: 'Antonio', surname: 'Garcia', balance: 3000 }
    clients[4] = { name: 'Manuel', surname: 'Lopez', balance: 5000 }
    clients[5] = { name: 'Jorge', surname: 'Grillo', balance: 6000 }
    clients[6] = { name: 'Gerardo', surname: 'Martinez', balance: 10000 }
    clients[7] = { name: 'Juan', surname: 'Jimenez', balance: 9000 }
    clients[8] = { name: 'Jaime', surname: 'Garcia', balance: 7000 }
    clients.count = 9

    const garcias = clients.filter(client => client.surname === 'Garcia')

    assert(garcias.count === 3, 'garcias.count is 3')
    assert(garcias[0].name === 'Juan' && garcias[0].surname === 'Garcia' && garcias[0].balance === 600, '0 is Juan Garcia (600)')
    assert(garcias[1].name === 'Antonio' && garcias[1].surname === 'Garcia' && garcias[1].balance === 3000, '0 is Antonio Garcia (3000)')
    assert(garcias[2].name === 'Jaime' && garcias[2].surname === 'Garcia' && garcias[2].balance === 7000, '0 is Jaime Garcia (7000)')

}


//CASE fiters elements with cale + count <50, indez <=1
{
    const nums = new Collection()
    nums[0] = 10
    nums[1] = 20
    nums[2] = 30
    nums.count = 3

    const result = nums.filter((element, index, collection) => {
        return element + collection.count < 50 && index <= 1
    })

    assert(result.count === 2, 'result count is 2')
    assert(result[0] === 10, 'result at 0 is 10')
    assert(result[1] === 20, 'result at 1 is 20')
}

// test find
//case cephalopods
const cephalopods = new Collection()
cephalopods[0] = 'Octopus'
cephalopods[1] = 'Squid'
cephalopods[2] = 'Nautilus'
cephalopods[3] = 'Cuttlefish'
cephalopods.count = 4

const lessSixLetters = cephalopods.find(cephalopods => cephalopods.length < 6)


console.assert(lessSixLetters === 'Squid', 'lessSixLetters is Squid')
console.assert(lessSixLetters.length < 6, 'lessSixLetters length is minor than 6')

//CASE clients with surname Garcia

const clients2 = new Collection()
clients2[0] = { name: 'Pepito', surname: 'Grillo', balance: 1000 }
clients2[1] = { name: 'Juan', surname: 'Garcia', balance: 600 }
clients2[2] = { name: 'Peter', surname: 'Pan', balance: 1010 }
clients2[3] = { name: 'Antonio', surname: 'Garcia', balance: 3000 }
clients2[4] = { name: 'Manuel', surname: 'Lopez', balance: 5000 }
clients2[5] = { name: 'Jorge', surname: 'Grillo', balance: 6000 }
clients2[6] = { name: 'Gerardo', surname: 'Martinez', balance: 10000 }
clients2[7] = { name: 'Juan', surname: 'Jimenez', balance: 9000 }
clients2[8] = { name: 'Jaime', surname: 'Garcia', balance: 7000 }
clients2.count = 9

const clientJimenez = clients2.find(client => client.surname === 'Jimenez')

assert(clientJimenez.name === 'Juan' && clientJimenez.surname === 'Jimenez' && clientJimenez.balance === 9000, 'clientJimenez is Juan Jimenez (9000)')


// case dinosaurs

const dinosaurs = new Collection()
dinosaurs[0] = 'diplodocus'
dinosaurs[1] = 'apatosaurus'
dinosaurs[2] = 'triceratops'
dinosaurs[3] = 'allosaurus'
dinosaurs.count = 4

const foundDinosaur = dinosaurs.find((element, i, collection) => {
    return i > 0 && i < collection.count - 1
})

assert(foundDinosaur === 'apatosaurus', 'first middle dinosaur is apatosaurus')





// test findIndex

// case marupials
const marsupials = new Collection()
marsupials[0] = 'kangaroo'
marsupials[1] = 'koala'
marsupials[2] = 'wallaby'
marsupials[3] = 'wombat'
marsupials.count = 4

const lessThan6 = marsupials.findIndex(marsupial => marsupial.length < 6)
const moreThan12 = marsupials.findIndex(marsupial => marsupial.length > 10)

/*function (marsupials) {
return marsupials.length >6
}*/

assert(lessThan6 === 1, 'less than 6 letters is in index 1')
assert(moreThan12 === -1, 'there is no animal with more than 12 letters')

// test findLast

// case arachnids
const arachnids = new Collection()
arachnids[0] = 'spider'
arachnids[1] = 'scorpion'
arachnids[2] = 'tarantula'
arachnids[3] = 'tick'
arachnids.count = 4

const moreThanSeven = arachnids.findLast(arachnids => arachnids.length > 7)

console.assert(moreThanSeven === 'tarantula', 'moreThanSeven is tarantula')
console.assert(moreThanSeven != 'tick', 'moreThanSeven is not a tick')
console.assert(moreThanSeven != 'scorpion', 'moreThanSeven is not a scorpion')
console.assert(moreThanSeven != 'spider', 'moreThanSeven is not a spider')
console.assert(moreThanSeven.length > 7, 'moreThanSeven length is major than 4')

// test every

// case felids
const felids = new Collection()
felids[0] = 'jaguar'
felids[1] = 'tiger'
felids[2] = 'leopard'
felids[3] = 'lion'
felids.count = 4

const isLongerThan1 = felids.every(felids => felids.length > 1)
const allStartWithL = felids.every(felids => felids[0] === 'l')

console.assert(isLongerThan1 === true, 'all animals have more than 1 letter')
console.assert(allStartWithL === false, 'not all animals start with "l"')

// test reduce

// case numbers to multuiiply
const numbersToMulitply = new Collection()
numbersToMulitply[0] = 2
numbersToMulitply[1] = 5
numbersToMulitply[2] = 4
numbersToMulitply[3] = 3
numbersToMulitply.count = 4

const multuplyAll = numbersToMulitply.reduce((acumulator, currentValue) => acumulator * currentValue, 1)

console.assert(multuplyAll === 120, 'multiplyAll is 120')

//case reduce cart total
{
    const cart = new Collection()
    cart[0] = { brand: 'Asturiana', model: 'Premium 1.5l', price: 1.70 }
    cart[1] = { brand: 'Veritas', model: 'Copos finos avena 4kg', price: 4.50 }
    cart[2] = { brand: 'Veritas', model: 'Vinagre de manzana 1l', price: 2.70 }
    cart.count = 3

    const total = cart.reduce((accum, item) => accum + item.price, 0)

    assert(total === 8.90, 'total is 8,90')

}
// Case reduce cart explanation
{
    const cart = new Collection()
    cart[0] = { brand: 'Asturiana', model: 'Premium 1.5l', price: 1.70 }
    cart[1] = { brand: 'Veritas', model: 'Copos finos avena 4kg', price: 4.50 }
    cart[2] = { brand: 'Veritas', model: 'Vinagre de manzana 1l', price: 2.70 }
    cart.count = 3

    const explanation = cart.reduce((accum, item, index, collection) => {
        return accum + '\n'
            + (index === 0 ? '' : 'and ')
            + item.brand + ' '
            + item.model + ' with price '
            + item.price + '0€'
            + (index === collection.count - 1 ?
                '\n' + 'in total ' + collection.count + ' products'
                : ''
            )
    }, 'i will buy the following products')

    assert(explanation === `i will buy the following products
Asturiana Premium 1.5l with price 1.70€
and Veritas Copos finos avena 4kg with price 4.50€
and Veritas Vinagre de manzana 1l with price 2.70€
in total 3 products`, 'explanation has the initial text and all products description')


}




