const recipeApp = {};

recipeApp.apiKey = "9f0deac75fc6469b92e2902b6660fd37";
recipeApp.url = "https://api.spoonacular.com/food/search";

recipeApp.getCusine = (cousine) => {
  const url = new URL(recipeApp.url);
  url.search = new URLSearchParams({
    apiKey: recipeApp.apiKey,
    number: 40,
    query: cousine,
  });

  fetch(url)
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error(res.statusText)
      }
    })
    .then((jsonRes) => {
      recipeApp.displayData(jsonRes);
    })
    .catch((err) => {
      if (err.message === "404") {
        warning.textContent = `An error has occurred, please try later`
      } else {
        warning.textContent = `we did not find any data`
      }
    });
};

recipeApp.displayData = (jsonResData) => {
  const ulElement = document.querySelector(".recipesList");
  ulElement.innerHTML = "";

  jsonResData.searchResults[0].results.forEach((mancare) => {
    const newListItem = document.createElement("li");

    const shortParagraph = `${mancare.content}`.substring(0, 200);

    newListItem.innerHTML = `
          <div class="recipeContainer">
            <div class="imgContainer">
              <img src=${mancare.image} alt="This is a plate phot of ${mancare.name} recipe">
            </div>
            <div class="textContainer">
              <h2>${mancare.name}</h2>
              <p>${shortParagraph}... </p>
              <a href="${mancare.link}" target="blank" rel="noopener">Read more</a>
            </div>
          </div>
            `;

    ulElement.appendChild(newListItem);
  });
};

recipeApp.optionSelected = () => {
  const formElement = document.querySelector("form");
  formElement.addEventListener("submit", (event) => {
    event.preventDefault();

    const userSelection = document.querySelector("select").value;
    const warning = document.querySelector("label");

    if (userSelection === "null") {
      warning.textContent = `You did not select your favourite cousine, please make a selection`;
      warning.style.color = `rgb(113, 7, 7)`;
    } else {
      recipeApp.getCusine(userSelection);
      warning.textContent = `Well done`;
      warning.style.color = `#283618`;
    }
  });
};

recipeApp.innit = () => {
  recipeApp.optionSelected();
};

recipeApp.innit();
