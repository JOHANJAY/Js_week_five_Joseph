const renderLocation = document.getElementById('location')
const renderDate = document.getElementById('date')
const renderAltitude = document.getElementById('altitude')

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
         getCityName(latitude, longitude);
        const timestamp = position.timestamp;
        const date = new Date(timestamp).toLocaleString();
        console.log(`Date:`, date);
        renderDate.textContent = `Date: ${date}`
        if (position.coords.altitude === null) {
          console.log("Altitude: Can  not get current altitude");
          renderAltitude.textContent = "Altitude: Can  not get current altitude"
        } else {
          console.log(`Altitude:`, position.coords.altitude);
          renderAltitude.textContent = `Altitude: ${position.coords.altitude}`
        }
      },
      (error) => {
        console.error(`Error getting location:`, error.message);
      }
    );
  } else {
    console.error(`Geolocation is not supported on this browser.`);
  }
}

const getCityName = async (latitude, longitude) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=f95d9ba240c597333909070d5b3407fd
`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    renderLocation.textContent = `Location: ${data.name}, ${data.sys.country}`
  } catch (error) {}
};
