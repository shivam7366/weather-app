const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const locationMassage = document.querySelector("#location");
const weatherMassage = document.querySelector("#weather");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  locationMassage.textContent = "Loading...";
  weatherMassage.textContent = "";
  const location = search.value;

  fetch(`/weather?address=` + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        return (locationMassage.textContent = data.error);
      } else {
        locationMassage.textContent = "Full address : " + data.location;
        weatherMassage.textContent = data.forecast;
        console.log(data.location, data.forecast);
      }
    });
  });
});
