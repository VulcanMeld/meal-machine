'use strict'

const randomMealUrl = "https://www.themealdb.com/api/json/v1/1/random.php"

const getMeal = () => {
    fetch(randomMealUrl)
    .then(response => response.json())
    .then(ResponseJson => console.log(ResponseJson.meals[0]))

}



const watchForm = () => {
    $("form").on("submit", function (event) {
        event.preventDefault()
        getMeal()

    })
}






const runApp = () => {
    watchForm()

}


$(runApp)