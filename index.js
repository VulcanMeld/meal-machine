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
          $(".js-results").append(`<p>Ingredient: ${mealObject[element]}<p>`)
          //numIngredients++
        }})

    
}


const displayMeal = (mealObject) => {
    checkNutritionFacts(mealObject)
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

const checkNutritionFacts = (mealObject) => {

    Object.keys(mealObject).forEach(element => {
        if(element.charAt(12) == "t" && mealObject[element] != "") {
            fetch(`https://api.nal.usda.gov/ndb/search?api_key=jsVv9MCAoWaFLFVS9La4o6wYJrrqnPnZogYHK0YY&format=json&q=${mealObject[element]}`)
            .then(response => response.json())
            .then(data => findFacts(data.list.item[0].ndbno))

        }
})
}


const findFacts = (ndbno) => {
    fetch(`https://api.nal.usda.gov/ndb/V2/reports?ndbno=${ndbno}&type=b&format=json&api_key=jsVv9MCAoWaFLFVS9La4o6wYJrrqnPnZogYHK0YY`)
    .then(response => response.json())
    .then(body => parseCalories(body.foods[0].food.nutrients[0]))
}


const parseCalories = (nutritionFacts) => {
    let servingSize = nutritionFacts.measures[0] //completefunction


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