console.log("Task 1");

function* generatePassword(length){
  let pass = "";
  // let reg = /[a-zA-Z!@#\$%\^&\*]/g;
  let reg = /[\w\d!@#\$%\^&\*]/g;
  for (let i = 0; i<length; i++){

    let letter = String.fromCharCode(Math.floor(Math.random() *150));
    console.log(letter);
    res = reg.test(letter);
    console.log(res);
    if (res) {
      pass += letter;
    }
    else i--;

  }

  yield pass;
}


let pass = generatePassword(16);
console.log(pass.next().value);
