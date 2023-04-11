const queryString = window.location.search
const urlParam = new URLSearchParams(queryString)
const guestName = urlParam.get('to')

var guestList = [
    'hamzah',
    'difa'
]
guestList.forEach(element => {
    if(element == guestName) {
        document.getElementById('wdp-name').innerText = guestName
    }
})

