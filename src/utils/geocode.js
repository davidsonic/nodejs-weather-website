const request = require('request')

const geocode = (address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiZGF2aWRzb25pYyIsImEiOiJja2t1NjR3M3cwbnVvMnZtcGVjYjl2ZDJtIn0.g-IUXbAWL4ke2T1ux8OYqw&limit=1'
    request({url, json: true}, (error, {body})=>{ //shorthand syntax, defacturing of response
        if(error){
            callback('Unable to connect to location services', undefined)
        }else if(body.features.length===0){
            callback('Unable to find location. ', undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode