const request = require('postman-request')

const geocode = (address, callback) => {
  const url =
    "https://nominatim.openstreetmap.org/search?q=" +
    encodeURIComponent(address) +
    "&format=jsonv2";

  request(
    {
      url,
      json: true,
      headers: {
        "User-Agent": "my-weather-app (g.amithvignesh@gmail.com)", // REQUIRED
      },
    },
    (error, { body } = {}) => {
      if (error) {
        callback("Unable to connect to location services!", undefined);
      } else if (!body || body.length === 0) {
        callback("Unable to find location. Try another search.", undefined);
      } else {
        callback(undefined, {
          latitude: body[0].lat,
          longitude: body[0].lon,
          location: body[0].display_name,
        });
      }
    }
  );
};

module.exports = geocode
