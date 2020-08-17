let url = 'https://gateway.marvel.com:443/v1/public/characters?name=spider-man&apikey=3338f4249d18ec22b5adfdf280af3dca';

function displayResults(responseJson) {
    console.log(responseJson);
};

function foofoo() {
    fetch(url)
        .then(response => {
        if (response.ok) {
            $('#js-error-message').empty(); //removes any text if there was any from the previous unsuccesfull search)

            return response.json();
        }
        throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
        $('#results-list').empty();
        });
}

$(foofoo);

