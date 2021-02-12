/* Global Variables */
const apiKey = '7ca65651e2a42a6f4f0a5e0df313627d'
let dataObject = {}
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear();

document.getElementById('generate').addEventListener('click', performAction);

// the action performed in case of pressing generate button
function performAction(e) {
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    const selectedUnit = document.getElementById("units").value;

    document.getElementById('date').innerText = '';
    document.getElementById('temp').innerText = '';
    document.getElementById('content').innerText = '';
    if ( zipCode ) {
        getAPIWeatherData(zipCode, apiKey, feelings, selectedUnit)
        .then(data => {
            if(data) {
                if ( feelings ) {
                    data.content = feelings
                } else {
                    data.content = ''
                }
                data.date = newDate
                if ( selectedUnit == 'imperial' ){
                    data.main.type = 'F'
                }else {
                    data.main.type = 'C'
                }
                postWeatherData('/addData', data)
                getWeatherData('/allData')
            }
        })
    } else {
        alert('Please Provide ZIP Code')
    }
}

// get Weather data from the API of openweathermap.org
const getAPIWeatherData = async (zip, key, content, unit) => {
    const baseURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${key}&units=${unit}`
    const res = await fetch(baseURL)
    try {
        const data = await res.json();
        if (data.message) {
            alert(data.message)
        } else {
            dataObject = data
            return data;
        }
    } catch (error) {
        console.log("error", error);
    }
}
// post Weather data to the server
const postWeatherData = async (url = '', data = {}) => {

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};
// get Weather data from the server
const getWeatherData = async (url = '') => {

    const response = await fetch(url, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    try {
        const newData = await response.json();
        document.getElementById('date').innerText = "date : " + newData.date;
        document.getElementById('temp').innerText = "temp : " + newData.temp + ' °' + newData.type;
        if (newData.content.length > 0) {
            document.getElementById('content').innerText = "content : " + newData.content;
        } else {
            document.getElementById('content').innerText = "content : none ";
        }
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}