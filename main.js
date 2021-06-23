'use strict';

const $score = document.querySelector('.score'),
$start = document.querySelector('.start'),
$stop = document.querySelector('.stop'),
$gameArena = document.querySelector('.gameArena'),
$car = document.createElement('div');
// const maxWidth = 
// let lineWidth = maxWidth/12;
$car.classList.add('car');

const keys = {
	ArrowUp: false,
	ArrowDown: false,
	ArrowRight: false,
	ArrowLeft: false,
};

const setting = {
	start: false,
	score: 0,
	speed: 2,
	carspeed: 3,
	traffic: 3,
	lineLenght:100,
}

const getQuantityElements = (heightElement) => {
	return document.documentElement.clientHeight / heightElement +1;
}

console.log(getQuantityElements(50));
console.log(document.documentElement.clientHeight); // = 600+'px';
console.log(`${$gameArena.offsetWidth} - ширина арены`);
console.log(`${$gameArena.offsetHeight} - высота арены`);

const moveRoad = () => {
	let lines = document.querySelectorAll('.line');
	lines.forEach(function(line){
		line.y += setting.speed;
		line.style.top = `${line.y}px`;
		// console.log(line, line.y);
		if (line.y > document.documentElement.clientHeight) {
			line.y = -setting.lineLenght;
		}
	}) 
}

const  getRandom = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

const startGame = () => {
	console.log('startGame');
	console.log(`ширина дороги ${$gameArena.offsetWidth}`);
	if (!setting.start) {
		//рисуем разметку дороги
		for (let i=0;i < getQuantityElements(setting.lineLenght); i++) {
		const $line = document.createElement('div');
		$line.classList.add('line');
		$line.style.top = `${ (i * setting.lineLenght) }px`;
		$line.y = i * setting.lineLenght;
		$gameArena.appendChild($line);
	}
		//отрисуем врагов
		for(let i=0; i < getQuantityElements(setting.lineLenght * setting.traffic); i++) {
			const $enemy = document.createElement('div');
			$enemy.classList.add('enemy');
			$enemy.y = -setting.lineLenght * setting.traffic * (i + 1);
			$enemy.style.top = $enemy.y + 'px';
			$enemy.style.left = `${getRandom(0, $gameArena.offsetWidth - $car.offsetWidth)}px`;
			console.log($enemy.style.left);
			$gameArena.appendChild($enemy);
		}
		requestAnimationFrame(playGame);
		setting.start = true;

		$gameArena.appendChild($car);	
		setting.x = $car.offsetLeft;

		setting.y = $car.offsetTop;
	}
	
} 

const stopGame = () => {
	console.log('stopGame');
	if (setting.start) {
		setting.start = false;
		window.location.reload();
	}	
}

const startRun = (event) => {
	event.preventDefault();
	keys[event.key] = true;
	// switch (event.key) {
	// 	case:
	// }

} 
const stopRun = (event) => {
    keys[event.key] = false;
    // setting.start = false;
}

const moveEnemy = () => {
  let $enemy = document.querySelectorAll('.enemy');
  $enemy.forEach(function(item) {
    item.y += setting.speed + 1;
    item.style.top = item.y + 'px';
    if (item.y >= document.documentElement.clientHeight) {
    	item.y = - setting.lineLenght * setting.traffic;
    }
	})

}

const playGame = () => {
	if (setting.start) {
		moveRoad();
		console.log('playGame');
		moveEnemy();
		requestAnimationFrame(playGame);
		if (keys.ArrowLeft && setting.x > 0) {
			setting.x -= setting.carspeed;
		}
		if (keys.ArrowRight && setting.x < ($gameArena.offsetWidth - $car.offsetWidth) ) {
			setting.x += setting.carspeed;
		} 
		if (keys.ArrowUp && setting.y > 0) {
			setting.y -= setting.carspeed;
		}  
		if (keys.ArrowDown && setting.y < ($gameArena.offsetHeight - $car.offsetHeight) ) {
			setting.y += setting.carspeed;
		}
		$car.style.left = `${setting.x}px`;
		$car.style.top = `${setting.y}px`;
	} 
}


const goLeft = () => {

}

$start.addEventListener('click', startGame);
$stop.addEventListener('click', stopGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);
