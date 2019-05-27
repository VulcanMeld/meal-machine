'use strict'

const randomMealUrl = "https://www.themealdb.com/api/json/v1/1/random.php"


const getMeal = () => {
    fetch(randomMealUrl)
    .then(response => response.json())
    .then(data => displayMeal(data.meals[0]))

}

const appendIngredients = (mealObject) => {
    Object.keys(mealObject).forEach(element => {
        if(element.charAt(12) == "t" && mealObject[element] != "") {
          $(".js-results").append(`<p>Ingredient: ${mealObject[element]}<p>`)
        }})

    
}

const displayMeal = (mealObject) => {
    searchYoutube(mealObject.strMeal)
    $(".js-results").empty()
    $(".js-results").append(`<p><img src= "${mealObject.strMealThumb}"</p><h1>${mealObject.strMeal}</h1>
    <p>${mealObject.strInstructions}</p>`)
    appendIngredients(mealObject)







}

const extractYoutubeVideoLink = (searchResponse) => {
    let id = searchResponse.items[0].id.videoId
    let videoUrl = "https://www.youtube.com/embed/" + id
    displayYoutube(videoUrl)
}

const searchYoutube = (mealName) => {
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${mealName}&videoEmbeddable=true&type=video&key=AIzaSyABb4Ts1QrPfooLWSGOPNRhUzScyyE1GJg`)
    .then(response => response.json())
    .then(data => extractYoutubeVideoLink(data))
}

const displayYoutube = (videoUrl) => {
    $(".js-youtube").css("display", "block")
    $("iframe").attr("src", videoUrl)

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