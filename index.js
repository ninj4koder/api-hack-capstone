const baseUrl = 'https://api.pexels.com/v1/';
const apiKey = '563492ad6f917000010000012b411f04bd584cafb559dd43e898bf4e';
let userInput = '';

//example query: https://api.pexels.com/v1/search?query=Nature

function createSearchUrl(queryString)  {
    return baseUrl + 'search?' + queryString;
}

function handlePexelPicture()   {
    $('form').submit(event => {
        event.preventDefault();
        userInput = $('#js-mood-picker').val();
        getPexelPicture(userInput);
        $('#js-mood-picker').val('')
      });
}

//need to add safeSearch function

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function displayResults(responseJson) {
    const randomImageIndex = getRandomInt(responseJson.photos.length - 1);
    console.log(responseJson);    
    console.log(responseJson.total_results);  
    $('#results').empty()       //if there are previous results, remove them
        .removeClass('hidden')
        .html(`<img src="${responseJson.photos[randomImageIndex].src.large}">`);
};
  
function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${key}=${params[key]}`)
    return queryItems.join('&');
}

function getPexelPicture(userSearch) {    
    const params = {
        query : userSearch,
        page: 1,
        per_page: 10        
    }
    const queryString = formatQueryParams(params);
    const url = createSearchUrl(queryString);  
    const options = {
        headers: new Headers({
        "Authorization": apiKey
        })
    };

    fetch(url, options)
        .then(response => response.json())
        .then(responseJson => displayResults(responseJson)); // add a case when it doesn't give any results
}

$(function() {
    handlePexelPicture();
});

