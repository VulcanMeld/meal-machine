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
    $(".js-results").empty()
    $(".js-results").append(`<p><img src= "${mealObject.strMealThumb}"</p><h1>${mealObject.strMeal}</h1>
    <p>${mealObject.strInstructions}</p>`)
    appendIngredients(mealObject)







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