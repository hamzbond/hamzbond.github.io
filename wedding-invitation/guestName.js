const queryString = window.location.search
const urlParam = new URLSearchParams(queryString)
const guestName = urlParam.get('to')

var guestList = [
    'M. Difa\' Sulthon Diani',
    'Alfajri Tsaqifurrosyd',
    'Arif Kurniawan',
    'Roy Noviantho',
    'Putri Noviyani',
    'Icha Inggris Lestari',
    'Ravika Oktaviani',
    'Rhony Septian',
    'Kurniawan Yudha Putrama',
    'Kern Alexandra Nuroho',
    'Joseph Clifton Nuroho',
    'Nurosoft Members',
    'Shasa Sabrina',
    'M. Abdillah Wahab',
    'Abdulloh Baihaki',
    'Ibadur Rochman',
    'Fahmia Ayu Lestari',
    'Ika Zulkafika Mahmudah',
    'Uswatun Chasanah',
    'Rizka Amalia Putri',
    'Maghfiroh Puji Lestari',
    'Ulifatur Rosyidah',
    'Ayu Evita Syahrul Fauziyah',
    'M. Agung Ilham',
    'Nurul Izzah',
    'Bintang Robiatul Adawiyah',
    'Rosa Melyna Mazlin'
]
guestList.forEach(element => {
    if(element.toLowerCase() == guestName.toLowerCase()) {
        document.getElementById('wdp-name').innerText = guestName
    }
})

