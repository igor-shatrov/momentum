const time = document.getElementById('time');
const greeting = document.getElementById('greeting');

function showTime() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let amPm = hours < 12 ? 'AM' : 'PM'



    hours = hours < 12 ? hours : hours - 12

    time.innerText = `${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)} ${amPm}`;
}

function addZero(number) {
    return number < 10 ? `0${number}` : number
}

function getRandomInt(min = 1, max = 21) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

setInterval(() => {
    showTime()
}, 1000);

function setBgGreet() {
    let now = new Date();
    let hours = now.getHours();

    if (hours < 6) {
        greeting.innerText = "Good Night";
        document.body.style.background = `URL('assets/images/night/${addZero(getRandomInt())}.jpg')`
    } else if (hours < 12) {
        greeting.innerText = "Good Morning";
        document.body.style.background = `URL('assets/images/morning/${addZero(getRandomInt())}.jpg')`
    } else if (hours < 18) {
        greeting.innerText = "Good Afternoon";
        document.body.style.background = `URL('assets/images/day/${addZero(getRandomInt())}.jpg')`
    } else {
        greeting.innerText = "Good Evening";
        document.body.style.background = `URL('assets/images/evening/${addZero(getRandomInt())}.jpg')`
    }
    setTimeout(setBgGreet(), 60000)
}

setBgGreet()