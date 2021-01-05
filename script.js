
let elementsInfoBox = document.querySelectorAll(".info-box h3");
let popup = document.querySelector(".popup");
let span = document.querySelectorAll(".info-box span");

let fetchURL = fetch("https://geo.ipify.org/api/v1?apiKey=at_qh2nqvrS48Xe2ZblYWcvYMSxRgARX");

let lat, lng;

var map;

let input = document.querySelector(".input");
let btn = document.querySelector(".btn");

let fnIP = (url)=> {
    loading(false);
    url.then(response =>{
        return response.json();
    }).then(data => {
        elementsInfoBox[0].textContent = data.ip;
        elementsInfoBox[1].textContent = data.location.city + ", " + data.location.country;
        if (data.location.postalCode != "") {
            elementsInfoBox[1].textContent += " " + data.location.postalCode;
        }
        elementsInfoBox[2].textContent = "UTC " + data.location.timezone;
        elementsInfoBox[3].textContent = data.isp;
        lat = data.location.lat;
        lng = data.location.lng;
        
    }).then(() =>{
        loadMap(lat, lng);
        loading(true);
    }).catch(err =>{
        console.log("error " + err);
        popup.style.visibility = "visible";
        popup.style.animation = "fadeIn 0.5s ease-out";
    });
}

fnIP(fetchURL);

btn.addEventListener("click", ()=>{
    let inputValue = input.value;

    if (inputValue.charAt(0) >= 0 && inputValue.charAt(0) <= 9) {
        fetchURL = fetch(`https://geo.ipify.org/api/v1?apiKey=at_qh2nqvrS48Xe2ZblYWcvYMSxRgARX&ipAddress=${inputValue}`);
        fnIP(fetchURL);
    }
    else{
        fetchURL = fetch(`https://geo.ipify.org/api/v1?apiKey=at_qh2nqvrS48Xe2ZblYWcvYMSxRgARX&domain=${inputValue}`);
        fnIP(fetchURL);
    }
    
})

function loadMap(lat, lng){
    if (map != undefined) {
        map.remove();
    }
    map = L.map('map',{ zoomControl: false }).setView([lat, lng], 14);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZWR1YXJkbzIwMjAyMDE5IiwiYSI6ImNramhvZWd2MTRuN2cycnNib2w2cTB2cHgifQ.XC4Y30mUQ_w7tKhybaZDDg', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiZWR1YXJkbzIwMjAyMDE5IiwiYSI6ImNramhvZWd2MTRuN2cycnNib2w2cTB2cHgifQ.XC4Y30mUQ_w7tKhybaZDDg'
    }).addTo(map);

    var iconLocation = L.icon({
        iconUrl: 'images\\icon-location.svg',
    
        iconSize:     [30, 38],
        iconAnchor:   [0, 20]
    });

    L.marker([lat, lng], {icon: iconLocation}).addTo(map);
}

function loading(status){
    let infoBox = document.querySelectorAll(".info-box h5");
    let loadingIcon = document.querySelector(".loading-icon");
    if (status === true) {
        for (let i = 0; i < infoBox.length; i++) {
            infoBox[i].style.visibility = "visible";
            elementsInfoBox[i].style.visibility = "visible";
            loadingIcon.style.visibility = "hidden";
        }
        for (let i = 0; i < span.length; i++) {
            span[i].style.visibility = "visible";
        }
    }
    else{
        for (let i = 0; i < infoBox.length; i++) {
            infoBox[i].style.visibility = "hidden";
            elementsInfoBox[i].style.visibility = "hidden";
            loadingIcon.style.visibility = "visible";
        }
        for (let i = 0; i < span.length; i++) {
            span[i].style.visibility = "hidden";
        }
    }
}

input.addEventListener("click", () =>{
    popup.style.visibility = "hidden";
    popup.style.animation = "fadeOut 1s ease-out";
});
