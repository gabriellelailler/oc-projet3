const containerCategories = document.getElementById("categories");
const containerWorks = document.getElementById("gallery");
const i = 0;

const getCategories = () => {
    fetch("http://localhost:5678/api/categories")
    .then(function(responseCategories) {
        return responseCategories.json()
    })
    .then(function(dataCategories) {
        console.log(dataCategories);

        // ajout du bouton "Tous"
        containerCategories.innerHTML += `
        <div>
        <button id="buttonCategories0">Tous</button>
        </div>
        `;

        // ajout des 3 autres boutons depuis la db api/categories
        for (productCategories in dataCategories)
        containerCategories.innerHTML += `
        <div>
        <button id="buttonCategories${dataCategories[productCategories].id}">${dataCategories[productCategories].name}</button>
        </div>
          `;

        
        // affichage de tous les Works depuis la db api/categories

        const getWorksInitial = () => {
            fetch("http://localhost:5678/api/works")

                // renvoie tous les Works depuis la db api/categories
              .then(function (responseWorks) {
                return responseWorks.json();
              })

              // cette fonction affiche les Works selon la valeur de i (selon le clic ci-dessus)
              .then(function (dataWorks) {
                for (productWorks in dataWorks)
                    containerWorks.innerHTML += `
                    <figure>
                    <img src="${dataWorks[productWorks].imageUrl}" alt="${dataWorks[productWorks].title}">
                    <figcaption>${dataWorks[productWorks].title}</figcaption>
                    </figure>
                    `;
              });
          };
        getWorksInitial();
        

        // fonction renvoyant l'id de la catégorie au moment du clic sur le bouton
        function addButtonClickListeners() {
            for (let i = 0; i < 4; i++) {

              // ici on définit "button" en allant récupérer l'id buttonCategories0, buttonCategories1, buttonCategories2 ou buttonCategories3
              let button = document.getElementById("buttonCategories" + i);

              // ci-dessous toutes les fonctions déclenchées par le clic sur le button
              button.addEventListener("click", () => {

                // on vide la page à chaque clic
                containerWorks.innerHTML = ``
                
                const getWorksFilter = () => {
                    fetch("http://localhost:5678/api/works")

                        // renvoie tous les Works depuis la db api/categories
                      .then(function (responseWorks) {
                        return responseWorks.json();
                      })

                      // cette fonction affiche les Works selon la valeur de i (selon le clic ci-dessus)
                      .then(function (dataWorks) {
                        for (productWorks in dataWorks)
                        if (i === 0) {
                            containerWorks.innerHTML += `
                            <figure>
                            <img src="${dataWorks[productWorks].imageUrl}" alt="${dataWorks[productWorks].title}">
                            <figcaption>${dataWorks[productWorks].title}</figcaption>
                            </figure>
                            `;
                          } 
                        else if (dataWorks[productWorks].categoryId === i) {
                        containerWorks.innerHTML += `
                          <figure>
                          <img src="${dataWorks[productWorks].imageUrl}" alt="${dataWorks[productWorks].title}">
                          <figcaption>${dataWorks[productWorks].title}</figcaption>
                          </figure>
                          `;
                        }
                      });
                  };
                getWorksFilter();
 
              });
            }
          }
          
          addButtonClickListeners();
        
    })

}

getCategories();


// manque la modif du CSS