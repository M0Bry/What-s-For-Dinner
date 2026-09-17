var currentMeal = null;

var lastIndex = -1;

function getRandomMeal() {
  if (meals.length <= 1) {
    return meals[0];
  }

  var randomIndex;

  do {
    randomIndex = Math.floor(Math.random() * meals.length);
  } while (randomIndex === lastIndex);

  lastIndex = randomIndex;

  return meals[randomIndex];
}

function findMealByName(name) {
  for (var i = 0; i < meals.length; i++) {
    if (meals[i].name === name) {
      return meals[i];
    }
  }

  return null;
}

function displayMeal(meal) {
  currentMeal = meal;

  document.getElementById("Recipe_name").textContent = meal.name;
  document.getElementById("Recipe_description").textContent = meal.description;
  document.getElementById("Recipe_image").src = meal.image;
  document.getElementById("Recipe_image").alt = meal.name;
  document.getElementById("Rating_average").textContent = meal.ratingsAverage;
  document.getElementById("Rating_quantity").textContent =
    "(" + meal.ratingsQuantity + " reviews)";
  document.getElementById("Prep_time_display").textContent = meal.prepTime;
  document.getElementById("Cook_time_display").textContent = meal.cookTime;
  document.getElementById("Servings_display").textContent = meal.servings;
  document.getElementById("Difficulty_badge").textContent = meal.difficulty;
  document.getElementById("Category_badge").textContent = meal.category;

  var ingredientsHtml = "";

  for (var i = 0; i < meal.ingredients.length; i++) {
    ingredientsHtml +=
      '<li class="Ingredient_item">' +
      '<span class="Ingredient_number">' + (i + 1) + "</span>" +
      '<span class="Ingredient_text">' + meal.ingredients[i] + "</span>" +
      "</li>";
  }

  document.getElementById("Ingredients_list").innerHTML = ingredientsHtml;

  var instructionsHtml = "";

  for (var i = 0; i < meal.instructions.length; i++) {
    instructionsHtml +=
      '<div class="Step_item">' +
      '<div class="Step_number">' + (i + 1) + "</div>" +
      '<p class="Step_text">' + meal.instructions[i] + "</p>" +
      "</div>";
  }

  document.getElementById("Instructions_list").innerHTML = instructionsHtml;

  document.getElementById("Calories_value").textContent =
    meal.nutrition.calories;
  document.getElementById("Protein_value").textContent = meal.nutrition.protein;
  document.getElementById("Carbs_value").textContent = meal.nutrition.carbs;
  document.getElementById("Fat_value").textContent = meal.nutrition.fat;
  document.getElementById("Fiber_value").textContent = meal.nutrition.fiber;
  document.getElementById("Sodium_value").textContent = meal.nutrition.sodium;

  var tipsHtml = "";

  for (var i = 0; i < meal.tips.length; i++) {
    tipsHtml +=
      '<div class="Tip_item">' +
      '<i class="fa-solid fa-circle-check"></i>' +
      "<p>" + meal.tips[i] + "</p>" +
      "</div>";
  }

  document.getElementById("Tips_list").innerHTML = tipsHtml;

  var warning = document.getElementById("Time_warning");

  if (meal.totalTime > 45) {
    warning.classList.remove("Hidden");
  } else {
    warning.classList.add("Hidden");
  }

  document.getElementById("Recipe_display_section").classList.remove("Hidden");
}

var tabButtons = document.querySelectorAll(".Tab_button");

var tabContents = document.querySelectorAll(".Tab_content");

tabButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    var tabName = this.getAttribute("data-tab");

    tabButtons.forEach(function (otherButton) {
      otherButton.classList.remove("Active");
    });

    this.classList.add("Active");

    tabContents.forEach(function (content) {
      content.classList.add("Hidden");
    });

    document.getElementById(tabName + "_tab").classList.remove("Hidden");
  });
});

document.getElementById("Share_btn").addEventListener("click", function () {
  prompt(
    "Copy this text to share the recipe:",
    currentMeal.name + " - " + currentMeal.description
  );
});

document.getElementById("Try_another_btn").addEventListener("click", function () {
  displayMeal(getRandomMeal());
});

displayMeal(getRandomMeal());
