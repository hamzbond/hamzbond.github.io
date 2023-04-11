const queryString = window.location.search
const urlParam = new URLSearchParams(queryString)
const guestName = urlParam.get('to')

var guestList = [
    'hamzah',
    'difa',
    'Achmad Hamzah'
]
guestList.forEach(element => {
    if(element.toLowerCase() == guestName.toLowerCase()) {
        document.getElementById('wdp-name').innerText = guestName
    }
})

