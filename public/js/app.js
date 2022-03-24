console.log('Client side js')
// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })

// fetch('http://localhost:3000/weather?address=boston').then((response)=>{
//     response.json().then((data)=>{
//         if(data.error){
//             console.log(data.error)
//         }
//         else{
//             console.log(data.location)
//             console.log(data.forecast)

//         }
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageone = document.getElementById('message_one')
const messagetwo = document.getElementById('message_two')
const messagethree = document.getElementById('message_three')
const messagefour = document.getElementById('message_four')

messageone.textContent=''
messagetwo.textContent=''
messagethree.textContent=''
messagefour.textContent=''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    messageone.textContent='Loading...'
    messagetwo.textContent=''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageone.textContent=data.error
            }
            else {
                messageone.textContent=data.location
                // console.log(data.location)
                messagetwo.textContent='It is currently'+data.forecast.temperature+'degrees out'
                messagethree.textContent='It feels like'+data.forecast.feelslike+ 'degrees out'
                messagefour.textContent='Humidity'+data.forecast.humidity

                // console.log(data.forecast)

            }
        })
    })

    console.log("testing")
})