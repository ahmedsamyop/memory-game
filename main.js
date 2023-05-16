let blocks = document.querySelectorAll('.memory-game-blocks .game-block');
let wrong = document.querySelectorAll('.info-container span')[1];
document.querySelector('.control-buttons span').addEventListener('click', () => {
  // Get Value In Prompt Your Name
  let prom = prompt('Your Name');

  if (prom == '' || prom == null) {
    prom = 'User';
  } else {
    prom = prom;
  }
  // Add Value Prompt
  document.querySelector('.info-container span').textContent = prom;
  // Remove Splash Screen
  document.querySelector('.control-buttons').remove();
});

// Random blocks
let randomArray = randomIndex(Array.from(blocks));
blocks.forEach((block, index) => {
  // add style order = random value
  block.style.order = randomArray[index];
});
// Click Block event
blocks.forEach((block) => {
  block.addEventListener('click', () => {
    // func
    flipBlock(block);
  })
});

function flipBlock(block) {
  // add Class is-Flipped
  block.classList.add('is-flipped');
  // Array all Blocks
  let newArr = Array.from(document.querySelectorAll('.memory-game-blocks .game-block'));
  // filter all blocks hava class is-flipped
  let allFlippedBlocks = newArr.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

  // add class no-clicking when allFlippedBlocks.length = 2 
  if (allFlippedBlocks.length === 2) {
    document.querySelector('.memory-game-blocks').classList.add('no-clicking');
    // remove Class no-clicking 
    setTimeout(() => {
      document.querySelector('.memory-game-blocks').classList.remove('no-clicking');
    }, 1000);
  }
  // func Check
  check(allFlippedBlocks);
  // func done
  done();
}

document.querySelector('.succed span').addEventListener('click', () => {
  window.location.reload();
})

// -------------------------------- Function --------------------------------

// Func =>>> return 1-[Random] Array value //  2-[new Array] value between  0 - array.length
function randomIndex(array = []) {
  let set = new Set();
  while (!(set.size === array.length)) {
    array.forEach((ele) => {
      //random value in array
      ele = Math.floor(Math.random() * array.length);
      // add random value to [Set]
      set.add(ele);
    });
  };
  // Clear Array
  while (!(array.length === 0)) {
    array.pop();
  };
  // add Set value to Array
  set.forEach(val => {
    array.push(val);
  });

  return array;
};
// Func Check
function check(array) {
  // check between 2 blocks
  array.reduce((ele, cur) => {
    if (ele.dataset.technology === cur.dataset.technology) {
      //remove Class is-Flipped
      ele.classList.remove('is-flipped');
      cur.classList.remove('is-flipped');
      // add Class has-match
      ele.classList.add('has-match');
      cur.classList.add('has-match');
    }
    else {
      //remove Class is-Flipped & wrong +1
      setTimeout(() => {
        ele.classList.remove('is-flipped');
        cur.classList.remove('is-flipped');
        wrong.innerHTML = parseInt(wrong.innerHTML) + 1
      }, 1000);
    }

  });
}
// Func done
function done() {
  // Array all Blocks
  let arrBlocks = Array.from(document.querySelectorAll('.memory-game-blocks .game-block'));
  // filter all blocks hava class has-match
  let done = arrBlocks.filter(flippedBlock => flippedBlock.classList.contains('has-match'));
  // when all blocks have class has-match => class succed add style display = block
  if (done.length === arrBlocks.length) {
    setTimeout(() => {
      document.querySelector('.succed').style.display = 'block';
    }, 1000);

  }
}