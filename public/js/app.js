console.log('Client side javascript file is loaded!');


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    console.log(location);

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
        if (data.error) {
           messageOne.textContent = data.error;
        } else {
            console.log(data.forecast);
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast.description + '. It is currently ' + data.forecast.temperature + ' degrees out. But It feels like ' + data.forecast.feelslike + ' degrees out. ';
        }
    });
    });
});