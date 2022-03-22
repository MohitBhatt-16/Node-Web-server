const request = require('request')

const forecast=(lattitude,longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=9aa5702cf057af54deb5af6aa765c677&query='+ lattitude + ',' + longitude +'&units=m'
    request({url:url,json:true},(error, response)=>{
        if(error){
            callback('Unable To connect to location services',undefined)
        }
        else if(response.body.error){
            callback('Unable To find location. Try another search', undefined)
        }
        else{
            const temp=response.body.current.temperature
            const feelliketemp=response.body.current.feelslike
            callback(undefined,{
                temperature: temp,
                feelslike: feelliketemp
            })
        }

    })
}

module.exports=forecast