console.log('client side javascript is loading')

fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })
})


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    // deploy
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = data.error
        }else{
            messageOne.textContent = location
            messageTwo.textContent = 'Localtime: ' + data.localtime + ' in ' + location + ' (' + data.latitude + ', ' + data.longitude + ').'
             + ' The observation_time is ' + data.observation_time + '.' 
             + ' The temperature is ' + data.temperature + ','
             + ' the weather_descriptions are ' + data.weather_descriptions + ',' 
            + ' the wind_speed is ' + data.wind_speed + ' and' 
            + ' the precipation is ' + data.precipation + '.' 
        }
    })
})

})