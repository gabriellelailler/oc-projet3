// VARIABLES ET CONSTANTES

// Galleries et filtres
const containerCategories = document.getElementById("categories");
const containerWorks = document.getElementById("gallery");
const containerWorksModal = document.getElementById("modal-gallery")

// Token d'identification
let authToken = sessionStorage.getItem("authToken");

// login / logout
const loginTab = document.getElementById('login-tab');
const logoutTab = document.getElementById('logout-tab');

// Accès à la modale
const editBar = document.getElementById("edit-bar");
const editButton1 = document.getElementById("edit-button-1");
const editButton2 = document.getElementById("edit-button-2");

// Navigation dans la modale
const modalXmark = document.getElementById("modal-xmark")
const modalAddWorkXmark = document.getElementById("modal-add-work-xmark")
const modal = document.getElementById("modal")
const modalAddWork = document.getElementById("modal-add-work")
const modalAddWorkArrowLeft = document.getElementById("modal-add-work-arrow-left")
const addWork = document.getElementById("add-work") // bouton pour ouvrir la 2e modale

// Variables et constantes du formulaire d'ajout de photos
const form = document.querySelector("form");

const addPictureInput = document.getElementById("add-picture");
const previewImage = document.getElementById("preview-image");
const iconImage = document.getElementById("icon-image");
const addPictureButton = document.getElementById("add-picture-button")
const addPictureError = document.getElementById("add-picture-error")

const formIncomplete = document.getElementById("form-incomplete");
const errorMessage = document.getElementById("add-work-error-message")
const validationMessage = document.getElementById("add-work-validation-message")

const greenButtonAddWork = document.getElementById("modal-add-work-submit");

// Bouton de suppression de toute la gallerie
const deleteAll = document.getElementById("delete-all");


// FONCTIONS

// Fonction d'affichage de la gallerie
const getWorksInitial = () => {
  containerWorksModal.innerHTML = "";
  fetch("http://localhost:5678/api/works")
    .then(function (responseWorks) {
      return responseWorks.json();
    })
    .then(function (dataWorks) {
      console.log(dataWorks);
      for (productWorks in dataWorks) {
          containerWorks.innerHTML += `
          <figure id="gallery-work-${dataWorks[productWorks].id}">
          <img src="${dataWorks[productWorks].imageUrl}" alt="${dataWorks[productWorks].title}">
          <figcaption>${dataWorks[productWorks].title}</figcaption>
          </figure>
          `;
        }
    });
};

// Fonction d'affichage des catégories et de la gallerie
const getCategories = () => {
    fetch("http://localhost:5678/api/categories")
    .then(function(responseCategories) {
        return responseCategories.json()
    })
    .then(function(dataCategories) {
        console.log(dataCategories);

        // Ajout du bouton "Tous"
        containerCategories.innerHTML += `
        <div>
        <button id="buttonCategories0" class="filter-button">Tous</button>
        </div>
        `;

        // Ajout des 3 autres boutons depuis la DB
        for (productCategories in dataCategories)
        containerCategories.innerHTML += `
        <div>
        <button id="buttonCategories${dataCategories[productCategories].id}" class="filter-button">${dataCategories[productCategories].name}</button>
        </div>
        `;

        getWorksInitial();
        getWorksModal();
        
        // Renvoi de l'id de la catégorie au clic
        function addButtonClickListeners() {

            // Définit la variable previousButton (afin de supprimer la classe de l'ancien bouton à chaque clic)
            let previousButton = null;

            // Parcourt les 4 id des button buttonCategories0, buttonCategories1, buttonCategories2 ou buttonCategories3
            for (let i = 0; i < 4; i++) {
              let button = document.getElementById("buttonCategories" + i);

              button.addEventListener("click", () => {

                // s'il y a un previousButton, retrait de la classe
                if (previousButton !== null) {
                    previousButton.classList.remove("clicked-button");
                    previousButton.classList.add("filter-button");
                }
                // previousButton se re-remplit avec le nouveau button (jusau'au clic suivant)
                previousButton=button;

                // ajout de la classe sur le bouton cliqué
                button.classList.add("clicked-button");
                previousButton.classList.remove("filter-button");

                // on vide la page à chaque clic, pour la remplir avec les éléments filtrés
                containerWorks.innerHTML = ``
                
                
                const getWorksFilter = () => {
                    fetch("http://localhost:5678/api/works")
                      .then(function (responseWorks) {
                        return responseWorks.json();
                      })
                      .then(function (dataWorks) {
                        for (productWorks in dataWorks)
                        if (i === 0) {
                            containerWorks.innerHTML += `
                            <figure id="gallery-work-${dataWorks[productWorks].id}">
                            <img src="${dataWorks[productWorks].imageUrl}" alt="${dataWorks[productWorks].title}">
                            <figcaption>${dataWorks[productWorks].title}</figcaption>
                            </figure>
                            `;
                        } 
                        else if (dataWorks[productWorks].categoryId === i) {
                        containerWorks.innerHTML += `
                          <figure id="gallery-work-${dataWorks[productWorks].id}">
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

// Execution de getCategories
getCategories();


// Apparition / Disparition de l'interface d'édition
window.addEventListener('DOMContentLoaded', function() {
  if (authToken) {
      console.log('Utilisateur connecté');
      loginTab.style.display = 'none'; // disparition de l'onglet login
      logoutTab.style.display = null; // apparition de l'onglet logout
      editBar.style.display = null; // apparition de l'edit-bar
      editButton2.style.display = null; // apparition du 2e bouton d'édition

  } else {
      console.log('Utilisateur non connecté');
      loginTab.style.display = null;
      logoutTab.style.display = 'none';
      editBar.style.display = 'none';
  }
});

// Deconnexion au clic sur "logout"
logoutTab.addEventListener("click", () => {
  sessionStorage.clear();
  window.location.href = "index.html"
});


// Ouverture de la modale
editButton1.addEventListener("click", () => {
  modal.style.display = null
  modal.removeAttribute('aria-hidden')
  modal.setAttribute('aria-modal', 'true')
  editButton1.removeEventListener("click", ()=> {})
});

editButton2.addEventListener("click", () => {
  modal.style.display = null
  modal.removeAttribute('aria-hidden')
  modal.setAttribute('aria-modal', 'true')
  editButton2.removeEventListener("click", ()=> {})
});

// Ouverture de la modale d'ajout de photo
addWork.addEventListener("click", () => {
  modalAddWork.style.display = null // apparition de la 2e modale
  modalAddWork.removeAttribute('aria-hidden')
  modalAddWork.setAttribute('aria-modal', 'true')
  
  modal.style.display = 'none' // retrait de la 1e modale
  modal.removeAttribute('aria-modal')
  modal.setAttribute('aria-hidden', 'true')

  addWork.removeEventListener("click", ()=> {})

});

// Fermeture des modales au clic sur la croix
modalXmark.addEventListener("click", () => {
  modal.style.display = 'none'
  modal.removeAttribute('aria-modal')
  modal.setAttribute('aria-hidden', 'true')
  modalXmark.removeEventListener("click", ()=> {})
});

modalAddWorkXmark.addEventListener("click", () => {
  modalAddWork.style.display = 'none'
  modalAddWork.removeAttribute('aria-modal')
  modalAddWork.setAttribute('aria-hidden', 'true')
  modalAddWorkXmark.removeEventListener("click", ()=> {})
});

// Fermeture des modales au clic en dehors
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

// Retour à la modale principale depuis la modale d'ajout de photos
modalAddWorkArrowLeft.addEventListener("click", () => {
  modalAddWork.style.display = 'none'
  modalAddWork.removeAttribute('aria-modal')
  modalAddWork.setAttribute('aria-hidden', 'true')
  modalAddWorkXmark.removeEventListener("click", ()=> {})
  modal.style.display = null
  modal.removeAttribute('aria-hidden')
  modal.setAttribute('aria-modal', 'true')
  modalAddWorkArrowLeft.removeEventListener("click", ()=> {})
});

// Fonction d'affichage des images dans la modale
const getWorksModal = async () => {
  containerWorksModal.innerHTML = "";
  try{
  fetch("http://localhost:5678/api/works")
    .then(function (responseWorks) {
      return responseWorks.json();
    })
    .then(function (dataWorks) {
      for (productWorks in dataWorks) {
          containerWorksModal.innerHTML += `
          <figure id="modal-work-${dataWorks[productWorks].id}">
            <div class="modal-figure-container">
              <img src="${dataWorks[productWorks].imageUrl}" alt="${dataWorks[productWorks].title}">
              <i class="fa-solid fa-trash-can" id="modal-trash-${dataWorks[productWorks].id}"></i>
              <i class="fa-solid fa-arrows-up-down-left-right"></i>
              <figcaption>éditer</figcaption>
            <div>
          </figure>
          `;
      }
    });
  } catch(error) {
    console.error(error)
  }
};

// Suppression d'une image depuis la modale

containerWorksModal.addEventListener("click", (event) => {

  //Si le click porte sur une ligne avec icone trash-can 
  if (event.target.classList.contains("fa-trash-can")) {
    const id = event.target.id.split("-")[2]; // event.target.id -> "modal-trash-2", event.target.id.split("-") -> ["modal" "trash" "2"], event.target.id.split("-")[2] -> 2
    let authToken = sessionStorage.getItem('authToken');
    if (!authToken) {
      console.error("Token d'authentification manquant !");
      return;
    }
    const urlDelete = `http://localhost:5678/api/works/${id}`
    fetch(urlDelete, {
      method: "DELETE",
      headers: {"Authorization": `Bearer ${authToken}`}, 
    })

    .then ((response) => {
      if (!response.ok) {
        console.error("Une erreur s'est produite lors de la suppression de l'image.");
      } else {
        console.log("L'image a été supprimée avec succès !");
        
        // Suppression de l'élément de la modale sans recharger la page
        const elementToRemove = event.target.closest("figure");
        containerWorksModal.removeChild(elementToRemove);
        
        // Suppression de l'élément de la page principale sans recharger la page
        const elementToRemoveFromGallery = document.getElementById(`gallery-work-${id}`);
        elementToRemoveFromGallery.remove();
     }
    })
    .catch((error) => {
      console.error(error);
    });
  }
});


// Preview de la photo lors de l'upload et vérification de la taille
// Vérification de l'image et title pour couleur bouton et message d'erreur

addPictureInput.addEventListener("input", checkFormValidity);
document.getElementById("title").addEventListener("input", checkFormValidity);

// Fonction de validation du formulaire
function checkFormValidity() {
  const title = document.getElementById("title").value.trim();
  const pictureInput = addPictureInput.files[0];

  const isValidImage = pictureInput && pictureInput.type.startsWith("image/");
  const isValidTitle = title.length > 0;
  let isValidFileSize = true;

  // Vérification de la taille du fichier et preview de l'image
  if (pictureInput) {
    const fileSizeInBytes = pictureInput.size;
    const maxSizeInBytes = 4 * 1024 * 1024; // 4 Mo en octets

    // image trop grande
    if (fileSizeInBytes > maxSizeInBytes) {
      addPictureError.innerHTML = "<p>La photo sélectionnée dépasse 4 Mo. Sélectionnez un fichier plus petit.</p>";
      // Réinitialisation de l'input file pour que l'utilisateur puisse sélectionner un nouveau fichier
      addPictureInput.value = "";
      // Réinitialisation de l'image prévisualisée
      previewImage.src = "";
      previewImage.style.display = "none";
      // Réinitialisation de l'affichage du bouton d'ajout de photo
      iconImage.style.display = null;
      addPictureButton.textContent = "+ Ajouter une photo";
      isValidFileSize = false;
      validationMessage.style.display = "none";
    
    // image de taille ok
    } else {
      addPictureError.innerHTML = "";
      // Création d'un objet FileReader (pour lire le fichier)
      const reader = new FileReader();
      // Définition de la fonction de gestion de l'événement onload
      // Fonction exécutée en réponse à l'évènement 'onload' du FileReader
      reader.onload = function (e) {
      // Mise à jour la source de l'image prévisualisée avec les données de l'image chargée
        previewImage.src = e.target.result;
        previewImage.style.display = null;

      // Mise à jour de l'affichage (retrait de l'icône etc.)
      iconImage.style.display = 'none';
      addPictureButton.innerHTML = `Changer de photo`;
      };
      // Lecture le contenu de l'image comme une URL de données
      reader.readAsDataURL(pictureInput);
      isValidFileSize = true;
      validationMessage.style.display = "none";
    }
  }

  // Màj du bouton & message d'erreur si image & titre
  const greenButtonAddWork = document.getElementById("modal-add-work-submit");
  if (isValidImage && isValidTitle  && isValidFileSize) {
    greenButtonAddWork.classList.remove("gray-button");
    greenButtonAddWork.classList.add("green-button");
    errorMessage.style.display = "none";
    validationMessage.style.display = "none";
  } else {
    greenButtonAddWork.classList.remove("green-button");
    greenButtonAddWork.classList.add("gray-button");
    errorMessage.style.display = "block";
    validationMessage.style.display = "none";
  }
}

// Réinitialisation bouton et message d'erreur au chargement initial
checkFormValidity();


// Validation du formulaire
form.addEventListener("submit", async (event) => {

  event.preventDefault();

  const title = document.getElementById("title").value; // Récupération du titre

  const selectElement = document.getElementById("category");
  const selectedIndex = selectElement.selectedIndex; // Récupération de l'index de l'option sélectionnée
  const selectedOptionId = selectElement.options[selectedIndex].id; // Récupération de l'attribut id de l'option sélectionnée
  const chiffre = selectedOptionId.split('-')[1]; // Extraction du chiffre le chiffre de l'attribut id
  const category = parseInt(chiffre, 10); // Conversion du chiffre en nombre (integer)

  const pictureInput = addPictureInput.files[0]; // Récupération de l'image

  if (!pictureInput) { // Vérification si l'image a bien été sélectionnée
    errorMessage.style.display = "block"; // affichage du message d'erreur
    return; // arrêt de la fonction car pas de fichier
  }

  if (!title || !chiffre) { //si pas de categorie ou pas titre
    errorMessage.style.display = "block";
    return; // arrêt de la fonction
  } else {
    errorMessage.style.display = "none"; // pas de message d'erreur

    // Création d'un objet FormData pour envoyer les données
    const formData = new FormData();
    formData.append("image", pictureInput);
    formData.append("title", title);
    formData.append("category", category);

    try{
      const response = await
      fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`
      },
      body: formData,
      });

      if (response.ok) {
        console.log("POST réussi");

        // récupération de la réponse de l'API en json -> avec une ligne de type "id": 346,
        const dataNewWork = await response.json();

        // ajout de la photo à la gallerie sans rechargement
        containerWorks.innerHTML += `
          <figure id="gallery-work-${dataNewWork.id}">
            <img src="${dataNewWork.imageUrl}" alt="${dataNewWork.title}">
            <figcaption>${dataNewWork.title}</figcaption>
          </figure>
        `;
        
        // ajout de la photo à la modale sans rechargement
        containerWorksModal.innerHTML += `
          <figure id="modal-work-${dataNewWork.id}">
            <div class="modal-figure-container">
              <img src="${dataNewWork.imageUrl}" alt="${dataNewWork.title}">
              <i class="fa-solid fa-trash-can" id="modal-trash-${dataNewWork.id}"></i>
              <i class="fa-solid fa-arrows-up-down-left-right"></i>
              <figcaption>éditer</figcaption>
            <div>
          </figure>
        `;

        // message de validation et couleur du bouton
        validationMessage.style.display = "block";
        greenButtonAddWork.classList.remove("green-button");
        greenButtonAddWork.classList.add("gray-button");

        // réinitialisation des champs
        document.getElementById("title").value = "";
        document.getElementById("category").value = "objets";
        document.getElementById("add-picture").value = "";

        // réinitialisation de l'image prévisualisée
        document.getElementById("preview-image").src = "";
        document.getElementById("preview-image").style.display = "none";
        document.getElementById("icon-image").style.display = null;
        document.getElementById("add-picture-button").textContent = "+ Ajouter une photo";

       }

      else {
        console.log("POST échoué");
      }
    }
  catch (error) {
    console.error("Erreur lors de la requête POST : ",error)
  }
}
})


// Suppression de toute la galerie

deleteAll.addEventListener("click", async () => {

  if (!authToken) {
    console.error("Token d'authentification manquant !");
    return;
  }

  const urlGetWorks = "http://localhost:5678/api/works";
  try {
    const responseWorks = await fetch(urlGetWorks);
    const dataWorks = await responseWorks.json();

    const urlDelete = "http://localhost:5678/api/works/";
    for (const work of dataWorks) {
      const id = work.id;
      const response = await fetch(urlDelete + id, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${authToken}` },
      });

      if (!response.ok) {
        console.error(`Une erreur s'est produite lors de la suppression de l'image avec l'ID ${id}.`);
      } else {
        console.log(`L'image avec l'ID ${id} a été supprimée avec succès !`);
      }
    }

    console.log("Tous les éléments de la galerie ont été supprimés avec succès !");
    
    // Suppression de tous les éléments de la gallery sans recharger la page
    containerWorks.innerHTML = "";
    containerWorksModal.innerHTML = "";

  } catch (error) {
    console.error(error);
  }
});


    

    

    