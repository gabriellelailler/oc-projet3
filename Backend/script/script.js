const containerCategories = document.getElementById("categories");
const containerWorks = document.getElementById("gallery");



// Ajout du bouton "Tous"
// ⚠️ il faut mettre cette partie la dans la partie en dessous 
// --> je pense qu'il faut que tout le html soit complet pour que l.event listener fonctionne
const getCategoryTous = () => {
    containerCategories.innerHTML += `
    <div>
    <button id="Button">Tous</button>
    </div>
    `;

    let monBouton = document.getElementById("Button");
    monBouton.addEventListener("click", () => {
    console.log("Vous avez cliqué sur le bouton")
    });
}
getCategoryTous();

// Récupération des Categories via API/categories + réponse au format json
const getCategories = () => {
    fetch("http://localhost:5678/api/categories")
      .then(function (responseCategories) {
        return responseCategories.json();
      })
      .then(function (dataCategories) {
        console.log(dataCategories);
        for (productCategories in dataCategories)
        containerWorks.innerHTML += `
        <div>
        <button>${dataCategories[productCategories].name}</button>
        </div>
          `;
      });
  };
  
  getCategories();


// Récupération des Works via API/works + réponse au format json
const getWorks = () => {
  fetch("http://localhost:5678/api/works")
    .then(function (responseWorks) {
      return responseWorks.json();
    })
    .then(function (dataWorks) {
      console.log(dataWorks);
      for (productWorks in dataWorks)
      containerWorks.innerHTML += `
        <figure>
        <img src="${dataWorks[productWorks].imageUrl}" alt="${dataWorks[productWorks].title}">
        <figcaption>${dataWorks[productWorks].title}</figcaption>
        </figure>
        `;
    });
};

getWorks();