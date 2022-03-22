const request = require('request')

const geocode = (address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibW9oaXQwMSIsImEiOiJja3ozc3FtZ3EwOW5iMnZtcGduNXN4NzY2In0.32e79wFVfGzimWlx6c3n9w'

    request({url: url, json:true},(error, response)=>{
        if(error){
            callback('Unable To connect to location services',undefined)
        }
        else if(response.body.features.length === 0){
            callback('Unable To find location. Try another search', undefined)
        }
        else{
            const Lat = response.body.features[0].center[1]
            const Lon = response.body.features[0].center[0]
            const Loc = response.body.features[0].place_name
            callback(undefined,{
                lattitude: Lat,
                longitude: Lon,
                location: Loc
            })
        }
    })
}

module.exports=geocode