const $score = document.querySelector('.score'),
$start = document.querySelector('.start'),
$stop = document.querySelector('.stop'),
$gameArena = document.querySelector('.gameArena'),
$car = document.createElement('div');

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
	speed: 3,
}

function startGame() {
	console.log('startGame');
	if (!setting.start) {
		requestAnimationFrame(playGame);
		setting.start = true;
		$gameArena.appendChild($car);	
	}
} 

function stopGame() {
	console.log('stopGame');
	if (setting.start) {
		setting.start = false;
	}	
}

function startRun(event) {
	event.preventDefault();
	keys[event.key] = true;

} 
function stopRun(event) {
	keys[event.key] = false;
	// setting.start = false;
} 

function playGame() {

	
	if (setting.start) {
		console.log('playGame');
		requestAnimationFrame(playGame);
	} 
}


$start.addEventListener('click', startGame);
$stop.addEventListener('click', stopGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);
