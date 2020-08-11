const key = 'bb84ab8d65cc50ad2aea793168c939c5';

//country data
const requestCity = (city) => {
    const baseURL = 'http://api.openweathermap.org/data/2.5/weather';
    const query = `?q=${city}&appid=${key}`;
    //make fetch call
    const fetchCall = fetch(baseURL + query).then(response => {
        return response.json()
    }).then(commit => {
        console.log(commit)
    }).catch((error) => {
        console.log(error)
    });
    return fetchCall;
}