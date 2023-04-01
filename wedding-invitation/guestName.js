const queryString = window.location.search
const urlParam = new URLSearchParams(queryString)
const guestName = urlParam.get('to')
document.getElementById('wdp-name').innerText = guestName
console.log(guestName)
console.log(document.getElementById('wdp-name'))