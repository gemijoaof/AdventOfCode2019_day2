const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString();
const arrayinput = input.split(',').map(str => Number(str));

const runIntcode = (arrayProgram, noun, verb) => {
  let array = [...arrayProgram];
  array[1] = noun;
  array[2] = verb;

  for (let index = 0; index < array.length; index += 4) {
    let pos3 = array[index + 3];

    switch (array[index]) {
      case 1:
        array[pos3] = array[array[index + 1]] + array[array[index + 2]];
        break;
      case 2:
        array[pos3] = array[array[index + 1]] * array[array[index + 2]];
        break;
      case 99:
        return array[0];
      default:
        break;
    }
  }
  return array[0];
};

const findNounVerb = () => {
  for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
      let newarray = [...arrayinput];
      if (runIntcode(newarray, noun, verb) === 19690720) {
        return 100 * noun + verb;
      }
    }
  }
};

const part1 = () => {
  let array = [...arrayinput];
  //1202 program alarm
  return runIntcode(array, 12, 2);
};

console.time('Time');
console.log(part1());
console.timeEnd('Time');
console.log(' ');
console.time('Time2');
console.log(findNounVerb());
console.timeEnd('Time2');
