//Посилання на АРІ
//?https://openweathermap.org/current
//?https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}


let state = [
    '1.png', '2.png', '3.png',
]
const objWeather = {
    title: document.getElementsByClassName('title')[0],
    info: document.getElementById('info'),
    input: document.getElementById('search'),
    btn: document.getElementById('btn'),
    temp: document.getElementById('temp'),
    content: document.getElementsByClassName('content')[0],
    weatherApi(q, town) {
        let key = 'd89d802fa6845197d1eedf7667e3dde9';

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${key}&lang=uk`
        fetch(url, { method: "GET" }).then(res => res.json())
            .then(res => this.create(res, town))

    },
    create(res, town) {
        try {
            console.log(res);
            let temps = Math.round((res.main.temp - 273.15) * 100) / 100;
            this.title.innerHTML = `
                <div class="city" id="city">${town}</div>
                <div class="time" id="time">${res.weather[0].description}</div>
            `
            this.temp.textContent = temps;
            this.content.innerHTML = `
                <div class="img"><img src="img/1.png" alt=""></div>
                    <div class="blok">
                        <section class="menu">
                            <img src="img/wind.png" alt="">
                            <p><span>${res.wind.speed} </span>km/h</p>
                        </section>
                        <section class="menu">
                            <img src="img/raindrop.png" alt="">
                            <p><span>${res.main.humidity}</span>%</p>
                        </section>
                        <section class="menu">
                            <img src="img/cloud.png" alt="">
                            <p><span>${res.wind.gust?res.wind.gust:res.wind.speed+2}</span>km/h</p>
                        </section>
                    </div>
            `
            let img = document.getElementsByClassName('img')[0]
            img.innerHTML = `<img src="https://openweathermap.org/img/wn/${res.weather[0].icon}.png" > `
            console.log(img)
        } catch (error) {
            alert('Місто не найдено')
        }
        
    },
    render() {
        this.btn.addEventListener('click', () =>
            this.weatherApi(this.input.value, this.input.value))
    }
}
objWeather.weatherApi('Львів', 'Львів');
objWeather.render()

//        "base": "stations",
//            "main": {
//        "temp": 282.77,
//           "feels_like": 280.21,
//          "temp_min": 282.77,
//           "temp_max": 282.77,
//                       "pressure": 1024,
//                           "humidity": 74,
//                               "sea_level": 1024,
//                                   "grnd_level": 987
//    },
//    "visibility": 10000,
//        "wind": {
//        "speed": 5.14,
//            "deg": 276,
//                "gust": 13.26
//    },
