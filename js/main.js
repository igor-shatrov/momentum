const time = document.getElementById('time');
const greeting = document.getElementById('greeting');
const name = document.getElementById('name');
const focus = document.getElementById('focus')
const date = document.getElementById('date')
const monthes = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря']
const daysOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']

function showTime() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let dayOfWeek = now.getDay();
    let day = now.getDate();
    let mounth = now.getMonth();


    date.innerText = `${daysOfWeek[dayOfWeek]}, ${addZero(day)} ${monthes[mounth]}`;

    time.innerText = `${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`;
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
        greeting.innerText = "Доброй ночи";
        document.body.style.background = `URL('assets/images/night/${addZero(getRandomInt())}.jpg')`
        c
    } else if (hours < 12) {
        greeting.innerText = "Доброго утра";
        document.body.style.background = `URL('assets/images/morning/${addZero(getRandomInt())}.jpg')`
    } else if (hours < 18) {
        greeting.innerText = "Доброго дня";
        document.body.style.background = `URL('assets/images/day/${addZero(getRandomInt())}.jpg')`
        document.body.style.color = 'white'
    } else {
        greeting.innerText = "Хорошего Вечера";
        document.body.style.background = `URL('assets/images/evening/${addZero(getRandomInt())}.jpg')`
        document.body.style.color = 'white'
    }
}

setBgGreet()

function setInStorage(e) {
    localStorage.setItem(e.target.id, e.target.innerText)
}

name.addEventListener('input', setInStorage)
focus.addEventListener('input', setInStorage)
name.addEventListener('keypress', pressEnter)
focus.addEventListener('keypress', pressEnter)
name.addEventListener('focus', clearOnFocus)
focus.addEventListener('focus', clearOnFocus)


function clearOnFocus(e){
localStorage.setItem('last text',e.target.innerText)
e.target.innerText=' '
e.target.focus()
}

function pressEnter(e) {
    if (e.keyCode === 13) {
        e.target.blur()
    } else {
        return true
    }
}

function getIntroStorage(target) {
    if (localStorage.getItem(target.id) !== null) {
        target.innerText = localStorage.getItem(target.id)
    } else {
        target.innerText = `[Введите ${target.id}]`
    }

}

getIntroStorage(name)
getIntroStorage(focus)