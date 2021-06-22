const $score = document.querySelector('.score'),
$start = document.querySelector('.start'),
$gameArena = document.querySelector('.gameArena'),
$car = document.createElement('div');

$car.classList.add('car');

console.log($start);

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
	// $start.classList.add('hide');
	requestAnimationFrame(playGame);
	setting.start = true;
	$gameArena.appendChild($car);
} 

function startRun(event) {
	event.preventDefault();
	keys[event.key] = true;
	// console.log(keys[event.key]);
	// requestAnimationFrame(playGame);
} 
function stopRun(event) {
	keys[event.key] = false;
	// setting.start = false;
} 

function playGame() {

	console.log('playGame');
	if (setting.start) {
		requestAnimationFrame(playGame);
	} 
}


$start.addEventListener('click', startGame);

document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);
