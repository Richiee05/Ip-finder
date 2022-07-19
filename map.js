const input = document.querySelector("#ip-input");
const form = document.querySelector(".form");
const position = document.querySelector(".location");
const address = document.querySelector(".ip-address");
let map;
const serviceProvider = document.querySelector(".isp");
const timezone = document.querySelector(".timezone");
const btn = document.querySelector(".button-submit");
const url =
  "https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_Ye7MXlR28eSKH25RoYofK4b2Q3ftH&ipAddress=";
const myip = "https://api.ipify.org?format=json";

//Events
window.addEventListener("load", async () => {
  try {
    const respone = await fetch(myip);
    const { ip } = await respone.json();
    fetchIpData(`${url}${ip}`);
  } catch (error) {
    console.log(error);
  }
});

btn.addEventListener("click", (e) => {
  map.remove();
  e.preventDefault();
  try {
    fetchIpData(`${url}${tirm(input.value)}`);
  } catch (error) {
    console.log(error);
  }
});

form.addEventListener("submit", (e) => {
  map.remove();
  e.preventDefault();
  try {
    fetchIpData(`${url}${tirm(input.value)}`);
  } catch (error) {
    console.log(error);
  }
});

//Functions
const renderMap = (lng, lat) => {
  map = L.map("map", {
    center: [lat, lng],
    zoom: 5,
  });
  // .setView([lng, lat], 13);
  L.tileLayer("https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
    license:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
    maxZoom: 25,
    enableHighAccuracy: true,
  }).addTo(map);

  L.marker([lat, lng]).addTo(map);
};

const fetchIpData = async (url) => {
  try {
    const respone = await fetch(url);
    const data = await respone.json();
    renderDetails(data);
    renderMap(data.location.lat, data.location.lng);
    document.querySelector("#map").style.position = "sticky";
  } catch (error) {
    console.log(error);
  }
};

const renderDetails = (data) => {
  const { ip, isp, location } = data;
  try {
    address.innerHTML = `${data.ip}`;
    position.innerHTML = `${location.city} ${location.region}, ${location.country}`;
    serviceProvider.innerHTML = ` ${data.isp}`;
    timezone.innerHTML = `UTC ${location.timezone}`;
  } catch (error) {
    console.log(error);
  }
};
