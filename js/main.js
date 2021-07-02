const time = document.getElementById('time');
const greeting = document.getElementById('greeting');
const name = document.getElementById('name');
const focus = document.getElementById('focus')
const date = document.getElementById('date')
const monthes = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря']
const daysOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']
const background = setBGList()
let bgClick = 0

function showTime() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let dayOfWeek = now.getDay();
    let day = now.getDate();
    let mounth = now.getMonth();


    if (seconds === 0 && minutes === 0) {
        setBgGreet()
    }

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

    document.body.style.background = background[hours]
    if (hours < 6) {
        greeting.innerText = "Доброй ночи";
        document.body.style.color = 'white'
    } else if (hours < 12) {
        greeting.innerText = "Доброго утра";
    } else if (hours < 18) {
        greeting.innerText = "Доброго дня";
        document.body.style.color = 'white'
    } else {
        greeting.innerText = "Хорошего Вечера";
        document.body.style.color = 'white'
    }
}

function setBGList() {

    let arrBG = {}
    for (let index = 0; index < 24; index++) {
        if (index < 6) {
            arrBG[index] = `URL('assets/images/night/${addZero(getRandomInt())}.jpg')`
        } else if (index < 12) {
            arrBG[index] = `URL('assets/images/morning/${addZero(getRandomInt())}.jpg')`
        } else if (index < 18) {
            arrBG[index] = `URL('assets/images/day/${addZero(getRandomInt())}.jpg')`
        } else {
            arrBG[index] = `URL('assets/images/evening/${addZero(getRandomInt())}.jpg')`
        }
    }
    return arrBG

}


setBgGreet()


function setInStorage(e) {
    localStorage.setItem(e.target.id, e.target.innerText)
}

name.addEventListener('input', setInStorage)
focus.addEventListener('input', setInStorage)
name.addEventListener('keypress', pressEnter)
focus.addEventListener('keypress', pressEnter)
name.addEventListener('click', clearOnFocus)
focus.addEventListener('click', clearOnFocus)
name.addEventListener('blur', onBlurElement)
focus.addEventListener('blur', onBlurElement)


function clearOnFocus(e) {
    localStorage.setItem(`last-text-${e.target.id}`, e.target.innerText)
    e.target.innerText = ''
    e.target.focus()
}

function onBlurElement(e) {
    if (e.target.innerText.trim() == '') {
        e.target.innerText = localStorage.getItem(`last-text-${e.target.id}`)
        localStorage.setItem(e.target.id, localStorage.getItem(`last-text-${e.target.id}`))
    }
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







const temperature = document.querySelector('.temperature');
const humidity = document.querySelector('.humidity');
const speed = document.querySelector('.speed');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city')

async function getWeather() {
    if (city.textContent === '') return

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.cod === '404') {
        alert('error: City not found')
        return
    }
    localStorage.setItem('city-weather', city.textContent)
    
    temperature.textContent = `Температура: ${data.main.temp}°C`;
    weatherDescription.textContent = data.weather[0].description;
    humidity.textContent = `Влажность: ${data.main.humidity}%`;
    speed.textContent = `Скорость ветра: ${data.wind.speed}м/с`
}

function setCityWeather() {
    if (localStorage.getItem('city-weather')) {
        city.textContent = localStorage.getItem('city-weather')
    } else {
        localStorage.setItem('city-weather', 'Гродно')
        city.textContent = localStorage.getItem('city-weather')
    }
}
setCityWeather()
getWeather()
city.addEventListener('blur', getWeather)
city.addEventListener('keypress', pressEnter)

function setCookie(cname, cvalue) {
    var d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function nextBackground() {
    document.getElementById('next-background').disabled = true
    let date = new Date()
    let hours = date.getHours()
    bgClick++
    let sum = hours + bgClick
    if (sum > 24) { sum -= 24 }
    if (bgClick === 24) { bgClick = 0 }
    let newBG = background[sum]
    document.body.style.backgroundImage = newBG
    setTimeout(function () { document.getElementById('next-background').disabled = false }, 2000)
}



document.getElementById('next-background').onclick = () => { nextBackground() }