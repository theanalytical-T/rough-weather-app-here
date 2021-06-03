window.addEventListener('load', () => {
    let long;
    let lat;
    let tempDescription = document.querySelector('.temp-description');
    let tempDegree = document.querySelector('.temp-degree');
    let locationTimezone = document.querySelector('.location-timezone');

    const tempSection = document.querySelector('.temperature');
    const tempSpan = document.querySelector('.temperature span');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            //Chosen api is not working, may have to choose another one
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.tomorrow.io/v4/timelines?location=${lat},${long}&fields=temperature&timesteps=1h&units=metric&apikey=2jB7Sg4y1Hslx3753DSqvTwLl1O0DvF6`;
            fetch(api)
                .then(data => {
                    return data.json();
                })
                .then(data => {
                    const { temperature, summary, icon } = data.currently;

                    // Set DOM elements from API
                    tempDegree.textContent = temperature;
                    tempDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;

                    //Formula for Celsius
                    const celsius = (temperature - 32) * (5 / 9);

                    //Set Icon
                    setIcons(icon, document.querySelector('.icon'));

                    // Change temperature to Celsius/Fahrenheit
                    tempSection.addEventListener('click', () => {
                        if (tempSpan.textContent === 'F') {
                            tempSpan.textContent = 'C';
                            tempDegree.textContent = Math.floor(celsius);
                        } else {
                            tempSpan.textContent = 'F';
                            tempDegree.textContent = temperature;
                        }
                    })
                })
        })
    }

    function setIcons(icon, iconID) {
        const skycons = new skycons({ color: 'white' });
        const currentIcon = icon.replace(/-/g, '_').toUpperCase();
        skycons.play();
        return skycons.set(iconID, skycons[currentIcon]);
    }
})