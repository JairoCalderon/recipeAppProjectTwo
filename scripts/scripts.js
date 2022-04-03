const recipeApp = {};

recipeApp.apiKey = "9f0deac75fc6469b92e2902b6660fd37";
recipeApp.url = "https://api.spoonacular.com/food/search";

recipeApp.getCusine = () => {
  const formElement = document.querySelector("form");
  formElement.addEventListener("submit", (event) => {
    event.preventDefault();

    const userSelection = document.querySelector("select").value;
    // userSelection = "";

    const url = new URL(recipeApp.url);
    url.search = new URLSearchParams({
      apiKey: recipeApp.apiKey,
      number: 40,
      query: userSelection,
      // cuisine: "italian"
    });

    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((jsonRes) => {
        console.log(jsonRes);
        recipeApp.displayData(jsonRes);
      });
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
              <img src=${mancare.image} alt=${mancare.name}>
            </div>
            <div class="textContainer">
              <h3>${mancare.name}</h3>
              <p>${shortParagraph}... 
                  <a href="${mancare.link}" target="blank" rel="noopener">Read more</a>
              </p>
            </div>
          </div>
            `;

    ulElement.appendChild(newListItem);
  });
};

recipeApp.innit = () => {
  recipeApp.getCusine();
};

recipeApp.innit();
