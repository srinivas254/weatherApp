let tempfield = document.querySelector('.temp');
let locationfield = document.querySelector('.time_location p');
let timefield = document.querySelector('.time_location span');
let textfield = document.querySelector('.condition p');
let image = document.querySelector('.condition img');
let searchfield = document.querySelector('.searcharea')
let form = document.querySelector('form');
const error = document.querySelector('#error-message');


const fetchResults = async (Location)=>{
    let url = `https://api.weatherapi.com/v1/current.json?key=32b36fa90e0d41a2862102402240212&q=${Location}&aqi=no`;

    try{
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        error.style.display = "none";

        if(data.error){
            error.innerText = data.error.message;
            error.style.display = "block";
            return;
        }

        const temp = data.current.temp_c;
        const place = data.location.name;
        const timedate = data.location.localtime;
        const icon  = data.current.condition.icon;
        const text = data.current.condition.text;

        if (temp !== undefined && place && timedate && icon && text) {
            update(temp, place, timedate, icon, text);
        } else {
            error.innerText = data.error.message;
            error.style.display = "block";
        }
    } catch (err) {
        console.error("An error occurred:", err);
        error.innerText = data.error.message;
        error.style.display = "block";
    }
}

const searchfunction = (e)=>{
    e.preventDefault();
    Location =  searchfield.value
    fetchResults(Location);
}

const update = (temp, place, timedate, icon, text)=>{
    let arr = timedate.split(" ");
    const date = new Date(arr[0]);
    let day = date.getDay();
    let days;
    switch(day){
        case 0: days = "Sunday";
                break;
        case 1: days = "Monday";
                break;
        case 2: days = "Tueday";
                break;
        case 3: days = "Wednesday";
                break;
        case 4: days = "Thursday";
                break;
        case 5: days = "Friday";
                break;
        case 6: days = "Saturday";
                break;
        default: days = "NULL";
    }

    let tem = arr[1];
    arr[1] = days;
    arr.push(tem);
    let newtime = arr.join(" ");

    tempfield.innerHTML = `${temp}<sup style="font-size:2rem">&deg;C</sup>`;
    locationfield.innerText = place;
    timefield.innerText = newtime;
    textfield.innerText = text;
    image.src = icon;
}

form.addEventListener('submit',searchfunction);



