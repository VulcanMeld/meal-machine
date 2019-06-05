'use strict'

const randomMealUrl = "https://www.themealdb.com/api/json/v1/1/random.php"


const getMeal = () => {
    fetch(randomMealUrl)
    .then(response => response.json())
    .then(data => displayMeal(data.meals[0]))

}

const appendIngredients = (mealObject) => {
    //let numIngredients = 0
    //let currentIngredientIndex = 1
    Object.keys(mealObject).forEach(element => {
        if(element.charAt(12) == "t" && mealObject[element] != "") {
          $(".js-results").append(`<p class = 'js-ingredient'>Ingredient: ${mealObject[element]}<p>`)
          //numIngredients++
        }})

    
}


const displayMeal = (mealObject) => {
    searchYoutube(mealObject.strMeal)
    $(".js-results").empty()
    $(".js-results").append(`<h1>${mealObject.strMeal}</h1><div class="image-container">
    <div class="image">
      <div class="side"><img src= "${mealObject.strMealThumb}"</p></div>
      <div class="side back">${mealObject.strMeal}</div>
    </div>
  </div>`)
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