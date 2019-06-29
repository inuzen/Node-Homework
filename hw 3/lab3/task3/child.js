const brain = require('brain.js/dist/index').default;
const mathProblems = require('./mathData.json');

const LSTM = brain.recurrent.LSTM;
const net = new LSTM();

console.log('Neural network training has begun');

net.train(mathProblems, {log:true, errorThresh: 0.03});
console.log("NN ready");


process.on('message', (obj) => {
  const input = obj.expression;
  const output= net.run(input);

  console.log('Child: '+input+output);
  obj.result= input+output;
  process.send(obj);
});

process.send('ready');
