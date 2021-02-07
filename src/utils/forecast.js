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
            })
        }
    })
}

module.exports = forecast