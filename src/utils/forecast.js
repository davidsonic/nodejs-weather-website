const request = require('request')

const forecast = (latitude, longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=5b96726c3692632f99fb116173519b30&query=' + longitude + ','+ latitude + '&units=f'
    request({url, json: true}, (error, {body})=>{ //property from url, defacturing of response
        if(error){
            callback('Unable to connect to forecast service', undefined)
        }
        else if(!body.current){
            callback('Unable to fetch data', undefined)
        }else{
            callback(undefined, {
                temperature: body.current.temperature, 
                weather_descriptions: body.current.weather_descriptions,
                wind_speed: body.current.wind_speed, 
                latitude: body.location.lat,
                longitude: body.location.lon,
                precipation: body.current.precip,
                observation_time: body.current.observation_time,
                humidity: body.current.humidity,
                localtime: body.location.localtime,
            })
        }
    })
}

module.exports = forecast