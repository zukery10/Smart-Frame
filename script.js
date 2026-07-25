


async function getWeather() {
    const apiKey= 'cdf2a899eb4c9d0d1ef01fe08573ab30'
    const lon = '-6.706176996231079'
    const lat ='52.984789228100496'

    const apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=52.984789228100496&lon=-6.706176996231079&appid=cdf2a899eb4c9d0d1ef01fe08573ab30'
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    const todayStr = new Date().toISOString().split("T")[0]; // "2026-07-25"

    // Split entries into "today" vs "future days"
    const todayEntries = [];
    const futureDays = {}; // { "2026-07-26": [entries...], ... }

    for (const entry of data.list) {
        const entryDate = entry.dt_txt.split(" ")[0];
        if (entryDate === todayStr) {
            todayEntries.push(entry);
        } else {
            if (!futureDays[entryDate]) futureDays[entryDate] = [];
            futureDays[entryDate].push(entry);
        }
    }

    // ---- Render today's hourly forecast ----
    let hourlyHtml = "";
    for (const entry of todayEntries) {
        const celsius = Math.round(entry.main.temp - 273.15);
        const time = entry.dt_txt.split(" ")[1].slice(0, 5);
        const description = entry.weather[0].description;
        let color_variable = ""
        if(celsius < 10){
            color_variable = aqua
        } else if(celsius >= 10 && celsius <= 16){
            color_variable = "orange"
        } else if(celsius > 16){
            color_variable = "crimson"
        }

        hourlyHtml += `
            <div class="has-text-centered" id="today-card">
                <p>${time}</p>
                <p id="degreesHTML" style="--temp-color: ${color_variable};">${celsius}°</p>
                <p>${description}</p>
                <hr>
            </div>

    `;
      
    }
    document.getElementById("hourly").innerHTML = hourlyHtml;
    

    // ---- Render one summary card per future day ----
    let dailyHtml = "";
    for (const [dateStr, entries] of Object.entries(futureDays)) {
        const temps = entries.map(e => e.main.temp - 273.15);
        const hi = Math.round(Math.max(...temps));
        const lo = Math.round(Math.min(...temps));
        const desc = entries[Math.floor(entries.length / 2)].weather[0].description;
        const dayName = new Date(dateStr).toLocaleDateString(undefined, { weekday: "short" });
        
        let lo_color_variable = ""
        if(lo < 10){
            lo_color_variable = aqua
        } else if(lo >= 10 && lo <= 16){
            lo_color_variable = "orange"
        } else if(lo > 16){
            lo_color_variable = "crimson"
        }

        let hi_color_variable = ""
        if(hi < 10){
            hi_color_variable = aqua
        } else if(hi <= 10 && hi >= 16){
            hi_color_variable = "orange"
        } else if(hi > 16){
            hi_color_variable = "crimson"
        }


        dailyHtml += `
        <div class="has-text-centered">
            <p>${dayName}</p>
            <p>
                <p id="degreesHTML" style="--temp-color:${lo_color_variable};">${lo}°</p>
                <p id="degreesHTML" style="--temp-color:${hi_color_variable};">${hi}°</p>
            </p>
            <p>${desc}</p>
        </div>
        `;
    }
    document.getElementById("daily").innerHTML = dailyHtml;


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