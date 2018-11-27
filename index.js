const seven_wonders = ["Great Pyramid of Giza", "Hanging Gardens of Babylon", "Colossus of Rhodes", "Pharos of Alexandria", "Statue of Zeus at Olympia", "Temple of Artemis", "Mausoleum at Halicarnassus"]
const key = ''
const reportStatus = (message) => {
  $('#status-message').html(message);
};

const loadWonders = () => {
  reportStatus('Loading seven wonders...');

  // Prep work
  const sevenWonders = $('#pet-list');
  sevenWonders.empty();

  // Actually load the pets

  seven_wonders.forEach ( wonder => {
    let URL = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + wonder + '&key=' + key
    // all lines with a . come in one line
    axios.get(URL)
      .then((response) => {
        //reportStatus(`Successfully loaded ${response.data.results[0].length} pets`);
        let location = response.data.results[0].geometry.location
        console.log(location)
          sevenWonders.append(`<li>Place:${wonder}, lat = ${location.lat}, lng: ${location.lng} </li>`);
      })
      .catch((error) => {
        reportStatus(`Encountered an error while loading wonders: ${error.message}`);
        console.log(error);
      });
  });
};

$(document).ready(() => {
  $('#load').click(loadWonders);
});
