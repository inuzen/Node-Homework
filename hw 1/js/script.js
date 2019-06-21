console.log("Task 1");


function pause(func, timeout) {
  return function() {
    console.log(`Функция выполниться с задержкой в ${timeout} секунды!`);
    setTimeout(() => {
      return func()
    }, timeout * 1000);
  }
}

function func() {
  console.log("Функция выполнилась!");
}

let paused = pause(func, 2);
paused();

//--------------------
console.log("Task 2");
function return_object(func, ...args){
  return function(){
    let arr = func();
    let res = {};
    for(let i =0; i<arr.length;i++){
      res[args[i]] = arr[i];
    }
    return res;
  }
}

function func() {
  return [1, 2]
}

let func_decorated = return_object(func, 'one', 'two');
let r = func_decorated();
console.log(r.one); // 1
console.log(r.two); //2

function func2() {
  return ['Python', 'is', 'programming language']
}
 r = return_object(func2, 'a', 'b', 'c')();
console.log(r.c) // 'programming language'
