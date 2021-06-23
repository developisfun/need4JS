'use strict';

const $score = document.querySelector('.score'),
$start = document.querySelector('.start'),
$stop = document.querySelector('.stop'),
$gameArena = document.querySelector('.gameArena'),
$car = document.createElement('div');
const MAXENEMY = 6;
// const maxWidth = 
// let lineWidth = maxWidth/12;
$car.classList.add('car');

// const $music = document.createElement('embed');
// $music.src = './audio.mp3';

const $music = new Audio('./audio.mp3');

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
	carspeed: 4,
	traffic: 2.5,
	lineLenght:100,
}

const getQuantityElements = (heightElement) => {
	return document.documentElement.clientHeight / heightElement ;
}

// console.log(getQuantityElements(50));
// console.log(document.documentElement.clientHeight); // = 600+'px';
// console.log(`${$gameArena.offsetWidth} - ширина арены`);
// console.log(`${$gameArena.offsetHeight} - высота арены`);

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
	// document.body.append($music);
	$music.play();
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

			// console.log(`где строка ${$gameArena.offsetWidth} + ${$car.style.width}`);
			$enemy.style.left = `${getRandom(0, $gameArena.offsetWidth - $car.offsetWidth)}px`;
			$enemy.style.background = `transparent url('./image/enemy${getRandom(1,MAXENEMY)}.png')
				center /cover no-repeat`;
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
		// document.body.remove($music);
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
    // console.log(event.key);
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
		if (keys.a && setting.x > 0) {
			setting.x -= setting.carspeed;
		}
		if (keys.d && setting.x < ($gameArena.offsetWidth - $car.offsetWidth) ) {
			setting.x += setting.carspeed;
		} 
		if (keys.w && setting.y > 0) {
			setting.y -= setting.carspeed;
		}  
		if (keys.s && setting.y < ($gameArena.offsetHeight - $car.offsetHeight) ) {
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


// const fibo = (n) => n <= 2 ? 1 : fibo(n-1) + fibo(n-2);

// console.log(fibo(70));