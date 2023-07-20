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

              // affiche de base tous les works
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
        getWorksInitial();
        

        // fonction renvoyant l'id de la catégorie au moment du clic sur le bouton
        function addButtonClickListeners() {

            // définit la variable previousButton afin de supprimer la classe de l'ancien bouton à chaque clic
            let previousButton = null;

            // parcourt les 4 id des button buttonCategories0, buttonCategories1, buttonCategories2 ou buttonCategories3
            for (let i = 0; i < 4; i++) {
              let button = document.getElementById("buttonCategories" + i);

              // ci-dessous toutes les fonctions déclenchées par le clic sur le button
              button.addEventListener("click", () => {

                // s'il y a un previousButton, retrait de la classe
                if (previousButton !== null) {
                    previousButton.classList.remove("clicked-button");
                }
                // previousButton se re-remplit avec le nouveau button (jusau'au clic suivant)
                previousButton=button;

                button.classList.add("clicked-button");

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


const loginTab = document.getElementById('login-tab');
const logoutTab = document.getElementById('logout-tab');
const editBar = document.getElementById('edit-bar');

// vérification que l'utilisateur est bien connecté
window.addEventListener('DOMContentLoaded', function() {
  const authToken = sessionStorage.getItem('authToken');
  if (authToken) {
      // L'utilisateur est connecté
      console.log('Utilisateur connecté');
      // disparition de l'onglet login
      loginTab.style.display = 'none';
      // apparition de l'onglet logout
      logoutTab.style.display = null;
      // apparition de l'edit-bar
      editBar.style.display = null;

  } else {
      // L'utilisateur n'est pas connecté
      console.log('Utilisateur non connecté');
      // apparition de l'onglet login
      loginTab.style.display = null;
      // disparition de l'onglet logout
      logoutTab.style.display = 'none';
      // disparition de l'edit-bar
      editBar.style.display = 'none';
  }
});

// lors du click sur l'onglet logout, deconnexion
logoutTab.addEventListener("click", () => {
  clearSessionStorage();
});


// fonction à appeler lors de la déconnexion
function clearSessionStorage() {
  sessionStorage.clear();
  window.location.href = "index.html"
}

function openModal() {
  const modal = document.getElementById("modal-1");
  modal.showModal();
}

// apparition de l'edit-bar


// ouverture de la modale
const editButton = document.getElementById("edit-button")
const modalXmark = document.getElementById("modal-xmark")

editButton.addEventListener("click", () => {
  const modal = document.getElementById("modal")
  modal.style.display = null
  modal.removeAttribute('aria-hidden')
  modal.setAttribute('aria-modal', 'true')
  editButton.removeEventListener("click", ()=> {})
})

modalXmark.addEventListener("click", () => {
  const modal = document.getElementById("modal")
  modal.style.display = 'none'
  modal.removeAttribute('aria-modal')
  modal.setAttribute('aria-hidden', 'true')
  modalXmark.removeEventListener("click", ()=> {})
})