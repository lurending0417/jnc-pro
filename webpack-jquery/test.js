// export default class Lodash {
//     debounce(fn) {
//         let timer = null;
//         console.log('this111', this)
//         return function () {
//             clearTimeout(timer)
//             console.log('this2222', this)
//             timer = setTimeout(() => {
//                 console.log('this3333', this)
//                 console.log('arguments', arguments)
//                 fn.apply(this, arguments)
//             }, 500)
//         }
//     }
//     say() {
//         console.log('防抖')
//     }
//     throttle(fn) {
//         let canRun = true;
//         return function () {
//             if (!canRun) return
//             canRun = false;
//             setTimeout( () => {
//                 fn.apply(this, arguments)
//                 canRun = true
//             }, 1000)
//         }
//     }
//     sayHi(e) {
//         console.log(e.target.innerWidth, e.target.innerHeight);
//     }
// }

// // es5
// function Animal(name, type) {
//     console.log('ani', arguments)
//     this.name = name;
//     this.type = type;
// }
// Animal.act = function() {
//     console.log("I'm acting")
// };
// Animal.prototype.eat = function() {
//     console.log("I'm eating")
// }
//
// function Dog(name, type, color) {
//     console.log('arguments', arguments)
//     Animal.apply(this, arguments)
// }
//
// let dog = new Dog('didi', 'bR', 'green');
// console.log(dog.name);

function item(){
    return new Promise(resolve => {
            resolve('aaaa')
        }
    )
}

item().then(value=> {
    console.log(value);
})

