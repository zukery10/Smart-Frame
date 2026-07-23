


async function getWeather() {
    const apiKey= 'cdf2a899eb4c9d0d1ef01fe08573ab30'
    const lon = '-6.706176996231079'
    const lat ='52.984789228100496'

    const apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=52.984789228100496&lon=-6.706176996231079&appid=cdf2a899eb4c9d0d1ef01fe08573ab30'
    const response = await fetch(apiUrl);
    const data = await response.json();
    city.innerHTML = `Hourly Weather for ${data.name}`;

    const temp = data.main.temp;
    


}





async function updateDateTime() {
            const now = new Date();
            const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = now.toLocaleDateString(undefined, dateOptions);
            document.getElementById('date').textContent = formattedDate;
            const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
            const formattedTime = now.toLocaleTimeString(undefined, timeOptions);
            document.getElementById('time').textContent = formattedTime;
        }
        updateDateTime();
        getWeather();
        setInterval(updateDateTime, 1000);
        setInterval(getWeather, 600000)