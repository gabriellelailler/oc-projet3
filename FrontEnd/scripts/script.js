const containerCategories = document.getElementById("categories");
const containerWorks = document.getElementById("gallery");
const i = 0;

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

// affichage des catégories
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
const editBar = document.getElementById("edit-bar");
const editButton2 = document.getElementById("edit-button-2");

// vérification que l'utilisateur est bien connecté
window.addEventListener('DOMContentLoaded', function() {
  let authToken = sessionStorage.getItem('authToken');
  if (authToken) {
      // L'utilisateur est connecté
      console.log('Utilisateur connecté');
      // disparition de l'onglet login
      loginTab.style.display = 'none';
      // apparition de l'onglet logout
      logoutTab.style.display = null;
      // apparition de l'edit-bar
      editBar.style.display = null;
      // apparition du 2e bouton d'édition
      editButton2.style.display = null;

  } else {
      // L'utilisateur n'est pas connecté
      console.log('Utilisateur non connecté');
      // apparition de l'onglet login
      loginTab.style.display = null;
      // disparition de l'onglet logout
      logoutTab.style.display = 'none';
      // disparition de l'edit-bar
      editSection.style.display = 'none';
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
  const modal = document.getElementById("modal");
  modal.showModal();
}


// ouverture de la modale
const editButton1 = document.getElementById("edit-button-1")
const modalXmark = document.getElementById("modal-xmark")
const modalAddWorkXmark = document.getElementById("modal-add-work-xmark")
const modal = document.getElementById("modal")
const modalAddWork = document.getElementById("modal-add-work")
const modalAddWorkArrowLeft = document.getElementById("modal-add-work-arrow-left")

editButton1.addEventListener("click", () => {
  modal.style.display = null
  modal.removeAttribute('aria-hidden')
  modal.setAttribute('aria-modal', 'true')
  editButton1.removeEventListener("click", ()=> {})
})

editButton2.addEventListener("click", () => {
  modal.style.display = null
  modal.removeAttribute('aria-hidden')
  modal.setAttribute('aria-modal', 'true')
  editButton2.removeEventListener("click", ()=> {})
})

// Ouverture de la modale d'ajout de photo
const addWork = document.getElementById("add-work")

addWork.addEventListener("click", () => {
  modalAddWork.style.display = null
  modalAddWork.removeAttribute('aria-hidden')
  modalAddWork.setAttribute('aria-modal', 'true')
  
  modal.style.display = 'none'
  modal.removeAttribute('aria-modal')
  modal.setAttribute('aria-hidden', 'true')

  addWork.removeEventListener("click", ()=> {})

})

// fermeture de la modale principale quand on clique sur la croix
modalXmark.addEventListener("click", () => {
  modal.style.display = 'none'
  modal.removeAttribute('aria-modal')
  modal.setAttribute('aria-hidden', 'true')
  modalXmark.removeEventListener("click", ()=> {})
})

// fermeture de la modale d'ajout de photos quand on clique sur la croix
modalAddWorkXmark.addEventListener("click", () => {
  modalAddWork.style.display = 'none'
  modalAddWork.removeAttribute('aria-modal')
  modalAddWork.setAttribute('aria-hidden', 'true')
  modalAddWorkXmark.removeEventListener("click", ()=> {})
})


// fermeture des modales quand on clique en dehors
window.addEventListener("click", (event) => {
  if (event.target === modal | event.target === modalAddWork) {
  modal.style.display = 'none'
  modal.removeAttribute('aria-modal')
  modal.setAttribute('aria-hidden', 'true')
  modalXmark.removeEventListener("click", ()=> {})
  modalAddWork.style.display = 'none'
  modalAddWork.removeAttribute('aria-modal')
  modalAddWork.setAttribute('aria-hidden', 'true')
  modalAddWorkXmark.removeEventListener("click", ()=> {})
  }
});

// retour à la modale principale depuis la modale d'ajout de photos
modalAddWorkArrowLeft.addEventListener("click", () => {
  modalAddWork.style.display = 'none'
  modalAddWork.removeAttribute('aria-modal')
  modalAddWork.setAttribute('aria-hidden', 'true')
  modalAddWorkXmark.removeEventListener("click", ()=> {})
  modal.style.display = null
  modal.removeAttribute('aria-hidden')
  modal.setAttribute('aria-modal', 'true')
  modalAddWorkArrowLeft.removeEventListener("click", ()=> {})
})

// affichage des images dans la modale
const containerWorksModal = document.getElementById("modal-gallery")

const getWorksModal = () => {
  fetch("http://localhost:5678/api/works")

      // renvoie tous les Works depuis la db api/categories
    .then(function (responseWorks) {
      return responseWorks.json();
    })

    // affiche de base tous les works
    .then(function (dataWorks) {
      console.log(dataWorks);
      for (productWorks in dataWorks)
          containerWorksModal.innerHTML += `
          <figure>
            <div class="modal-figure-container">
              <img src="${dataWorks[productWorks].imageUrl}" alt="${dataWorks[productWorks].title}">
              <i class="fa-solid fa-trash-can" id="modal-trash-${dataWorks[productWorks].id}"></i>
              <figcaption>éditer</figcaption>
            <div>
          </figure>
          `;
    });
  };

getWorksModal();


// suppression d'une image depuis la modale

// écoute des click sur la modal
containerWorksModal.addEventListener("click", (event) => {

  //si le click porte sur une ligne avec icone trash-can 
  if (event.target.classList.contains("fa-trash-can")) {
    // récupération de l'id de l'image
    // event.target -> <i class="fa-solid fa-trash-can" id="modal-trash-2"></i>
    // event.target.id -> "modal-trash-2"
    // event.target.id.split("-") splite "modal-trash-2" en tableau -> ["modal" "trash" "2"]
    // event.target.id.split("-")[2] renvoie le 3e élément du tableau -> 2
    const id = event.target.id.split("-")[2];
    console.log("Vous avez cliqué sur l'image d'ID :", id);

    // récupération du token dans le sessionStorage 
    let authToken = sessionStorage.getItem('authToken');
    if (!authToken) {
      console.error("Token d'authentification manquant !");
      return;
    }

    const url = `http://localhost:5678/api/works/${id}`

    fetch(url, {
      method: "DELETE",
      // ajout du token dans le headers
      headers: {"Authorization": `Bearer ${authToken}`}, 
    })

    .then ((response) => {
      if (!response.ok) {
        console.error("Une erreur s'est produite lors de la suppression de l'image.");
      } else {
      console.log("L'image a été supprimée avec succès !");
      
      // On vide la liste actuelle d'images de la modale
      containerWorksModal.innerHTML = "";
      // On récupère les images à partir de l'API et on les affiche sur la modale
      getWorksModal(); 

      // De même avec la page principale
      containerWorks.innerHTML = "";
      getWorksInitial(); 
    } 
    })
    .catch((error) => {
      console.error(error);
    });
  }
});

// preview de la photo lors de l'upload et vérification de la taille
const addPictureInput = document.getElementById("add-picture");
const previewImage = document.getElementById("preview-image");
const iconImage = document.getElementById("icon-image");
const addPictureButton = document.getElementById("add-picture-button")
const addPictureError = document.getElementById("add-picture-error")

// change 
addPictureInput.addEventListener("change", handleFileSelect);

function handleFileSelect(event) {

  // Récupération du fichier sélectionné par l'utilisateur
  const file = event.target.files[0];

  // Vérification que l'utilisateur a sélectionné un fichier
  if (file) {

    // Vérification de la taille du fichier
    const fileSizeInBytes = file.size;
    const maxSizeInBytes = 4 * 1024 * 1024; // 4 Mo en octets
    if (fileSizeInBytes > maxSizeInBytes) {
      // Affichage du message d'erreur
      addPictureError.innerHTML = "";
      addPictureError.innerHTML += `<p>La photo sélectionnée dépasse 4 Mo. Veuillez sélectionner un fichier plus petit.</p>`;
    }
    //si l'image ne dépasse pas les 4mo
    else {
      addPictureError.innerHTML = ``;

    // Création d'un objet FileReader (pour lire le fichier)
    const reader = new FileReader();

    // Définition la fonction de gestion de l'événement onload 
    // Fonction exécutée en réponse à l'évènement 'onload' du FileReader
    reader.onload = function (e) {
      // Mise à jour la source de l'image prévisualisée avec les données de l'image chargée
      previewImage.src = e.target.result;
      previewImage.style.display = null;

      // Mise à jour de l'affichage (retrait de l'icône etc.)
      iconImage.style.display = 'none';
      addPictureButton.innerHTML = "";
      addPictureButton.innerHTML += `Changer de photo
      `;
    };
    }

    // Lire le contenu de l'image comme une URL de données
    reader.readAsDataURL(file);
  }
}