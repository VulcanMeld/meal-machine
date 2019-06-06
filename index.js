"use strict";

const randomMealUrl = "https://www.themealdb.com/api/json/v1/1/random.php";

const getMeal = () => {
  fetch(randomMealUrl)
    .then(response => response.json())
    .then(data => displayMeal(data.meals[0]));
};

const appendIngredientValues = mealObject => {
  // Next function finds the ingredient properties in the meal object and appends their values to the DOM
  Object.keys(mealObject).forEach(element => {
    if (element.charAt(12) == "t" && mealObject[element] != "") {
      $(".js-ingredients-div").append(
        `<p class = 'js-ingredient'>Ingredient: ${mealObject[element]}<p>`
      );
    }
  });
};

const appendIngredients = mealObject => {
  $(".js-results").append(`<div class = "js-ingredients-div"></div>`);
  appendIngredientValues(mealObject);
};

const displayMeal = mealObject => {
  searchYoutube(mealObject.strMeal);
  $(".js-results").empty();
  $(".js-results").append(`<h1>${
    mealObject.strMeal
  }</h1><div class="image-container">
    <div role="image" class="image">
      <div class="side"><img src= "${mealObject.strMealThumb}"</p></div>
      <div class="side back">${mealObject.strMeal}</div>
    </div>
  </div>
  <p class="js-instructions">${mealObject.strInstructions}</p>`);
  appendIngredients(mealObject);
};

const extractYoutubeVideoLink = searchResponse => {
  let id = searchResponse.items[0].id.videoId;
  let videoUrl = "https://www.youtube.com/embed/" + id;
  displayYoutube(videoUrl);
};

const searchYoutube = mealName => {
  fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${mealName}&videoEmbeddable=true&type=video&key=AIzaSyABb4Ts1QrPfooLWSGOPNRhUzScyyE1GJg`
  )
    .then(response => response.json())
    .then(data => extractYoutubeVideoLink(data));
};

const displayYoutube = videoUrl => {
  $(".js-youtube").css("display", "inline-block");
  $("iframe").attr("src", videoUrl);
};

const userGetsMeal = () => {
  $(".js-meal-search").on("submit", function(event) {
    event.preventDefault();
    $(".js-instructions-button").css("display", "inline-block");
    $(".js-ingredients-button").css("display", "inline-block");
    getMeal();
  });
};

const instructionsButtonHandler = () => {
  let instructionsShown = false;

  $(".js-instructions-button").on("click", function(event) {
    if (instructionsShown == false) {
      $(".js-instructions").css("display", "block");
      $(".js-instructions").attr("aria-expanded", "true");
      $(".js-instructions-button").val("Hide Instructions");
      instructionsShown = true;
    } else if (instructionsShown == true) {
      $(".js-instructions").css("display", "none");
      $(".js-instructions").attr("aria-expanded", "false");
      $(".js-instructions-button").val("Show Instructions");
      instructionsShown = false;
    }
  });
};

const ingredientsButtonHandler = () => {
  let ingredientsShown = false;

  $(".js-ingredients-button").on("click", function(event) {
    if (ingredientsShown == false) {
      $(".js-ingredient").css("display", "inline-block");
      $(".js-ingredients-div").attr("aria-expanded", "true");
      $(".js-ingredients-button").val("Hide Ingredients");
      ingredientsShown = true;
    } else if (ingredientsShown == true) {
      $(".js-ingredient").css("display", "none");
      $(".js-ingredients-div").attr("aria-expanded", "false");
      $(".js-ingredients-button").val("Show Ingredients");
      ingredientsShown = false;
    }
  });
};

const buttonHandlers = () => {
  instructionsButtonHandler();
  ingredientsButtonHandler();
};

const watchForm = () => {
  userGetsMeal();
  buttonHandlers();
};

const runApp = () => {
  watchForm();
};

$(runApp);
