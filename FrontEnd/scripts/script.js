const containerCategories = document.getElementById("categories");
const containerWorks = document.getElementById("gallery");
let i = 0;

// affichage de tous les Works depuis la db api/categories

const getWorksInitial = () => {
  containerWorksModal.innerHTML = "";
  fetch("http://localhost:5678/api/works")

      // renvoie tous les Works depuis la db api/categories
    .then(function (responseWorks) {
      return responseWorks.json();
    })

    // affiche de base tous les works
    .then(function (dataWorks) {
      console.log(dataWorks);
      for (productWorks in dataWorks) {
          containerWorks.innerHTML += `
          <figure>
          <img src="${dataWorks[productWorks].imageUrl}" alt="${dataWorks[productWorks].title}">
          <figcaption>${dataWorks[productWorks].title}</figcaption>
          </figure>
          `;
        }
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
                            <figure id="work-${dataWorks[productWorks].id}" data-image-id="${dataWorks[productWorks].id}">
                            <img src="${dataWorks[productWorks].imageUrl}" alt="${dataWorks[productWorks].title}">
                            <figcaption>${dataWorks[productWorks].title}</figcaption>
                            </figure>
                            `;
                        } 
                        else if (dataWorks[productWorks].categoryId === i) {
                        containerWorks.innerHTML += `
                          <figure id="work-${dataWorks[productWorks].id}" data-image-id="${dataWorks[productWorks].id}">
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
let authToken = sessionStorage.getItem("authToken");
console.log(authToken)

// vérification que l'utilisateur est bien connecté
window.addEventListener('DOMContentLoaded', function() {
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
});

editButton2.addEventListener("click", () => {
  modal.style.display = null
  modal.removeAttribute('aria-hidden')
  modal.setAttribute('aria-modal', 'true')
  editButton2.removeEventListener("click", ()=> {})
});

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

});

// fermeture de la modale principale quand on clique sur la croix
modalXmark.addEventListener("click", () => {
  modal.style.display = 'none'
  modal.removeAttribute('aria-modal')
  modal.setAttribute('aria-hidden', 'true')
  modalXmark.removeEventListener("click", ()=> {})
});

// fermeture de la modale d'ajout de photos quand on clique sur la croix
modalAddWorkXmark.addEventListener("click", () => {
  modalAddWork.style.display = 'none'
  modalAddWork.removeAttribute('aria-modal')
  modalAddWork.setAttribute('aria-hidden', 'true')
  modalAddWorkXmark.removeEventListener("click", ()=> {})
});


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
});

// affichage des images dans la modale
const containerWorksModal = document.getElementById("modal-gallery")

const getWorksModal = () => {
  containerWorksModal.innerHTML = ""
  fetch("http://localhost:5678/api/works")

      // renvoie tous les Works depuis la db api/categories
    .then(function (responseWorks) {
      return responseWorks.json();
    })

    // affiche de base tous les works
    .then(function (dataWorks) {
      console.log(dataWorks);
      for (productWorks in dataWorks) {
          containerWorksModal.innerHTML += `
          <figure>
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

    const urlDelete = `http://localhost:5678/api/works/${id}`

    fetch(urlDelete, {
      method: "DELETE",
      // ajout du token dans le headers
      headers: {"Authorization": `Bearer ${authToken}`}, 
    })

    .then ((response) => {
      if (!response.ok) {
        console.error("Une erreur s'est produite lors de la suppression de l'image.");
      } else {
      console.log("L'image a été supprimée avec succès !");
      
      // Suppression de l'élément de la liste sans recharger la page
      const elementToRemove = event.target.closest("figure");
      containerWorksModal.removeChild(elementToRemove);

      // non fonctionnel
      const imageIdToRemove = event.target.closest("figure").getAttribute("data-image-id");
      const elementToRemoveFromGallery = document.getElementById(`work-${imageIdToRemove}`);
      containerWorks.removeChild(elementToRemoveFromGallery);
     
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

const form = document.querySelector("form");

const formIncomplete = document.getElementById("form-incomplete");
const errorMessage = document.getElementById("add-work-error-message")
const validationMessage = document.getElementById("add-work-validation-message")

const greenButton = document.getElementById("modal-add-work-submit");


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
  const greenButton = document.getElementById("modal-add-work-submit");
  if (isValidImage && isValidTitle  && isValidFileSize) {
    greenButton.classList.remove("gray-button");
    greenButton.classList.add("green-button");
    errorMessage.style.display = "none";
    validationMessage.style.display = "none";
  } else {
    greenButton.classList.remove("green-button");
    greenButton.classList.add("gray-button");
    errorMessage.style.display = "block";
    validationMessage.style.display = "none";
  }
}

// Réinitialisation bouton et message d'erreur au chargement initial
checkFormValidity();


// Validation du formulaire

form.addEventListener("submit", async (event) => {

  event.preventDefault();

  const title = document.getElementById("title").value;

  const selectElement = document.getElementById("category");
  // Récupérer l'index de l'option sélectionnée
  const selectedIndex = selectElement.selectedIndex;
  // Récupérer l'attribut id de l'option sélectionnée
  const selectedOptionId = selectElement.options[selectedIndex].id;
  // Extraire le chiffre de l'attribut id
  const chiffre = selectedOptionId.split('-')[1];
  // Conversion du chiffre en nombre (integer)
  const category = parseInt(chiffre, 10);

  // récupération de l'image
  const pictureInput = addPictureInput.files[0];

  console.log("categorie est ",category)
  // la constante addPictureInput existe déjà

  // Vérification si l'image a été sélectionnée
  if (!pictureInput) {
    // affichage d'un message d'erreur
    errorMessage.style.display = "block";
    // return arrête la fonction ici s'il n'y a pas de fichier, sinon elle continue
    return;
  }

  if (!title || !chiffre) {
    // affichage d'un message d'erreur
    errorMessage.style.display = "block";
    return;
  } else {
    // pas de message d'erreur

    // Création d'un objet FormData pour envoyer les données en multipart/form-data
    const formData = new FormData();
    formData.append("image", pictureInput);
    formData.append("title", title);
    formData.append("category", category);

    errorMessage.style.display = "none";

    try{
      const response = await
      fetch("http://localhost:5678/api/works", {
      method: "POST",
      // ajout du token dans le headers
      headers: {
        Authorization: `Bearer ${authToken}`
      },
      body: formData,
      });
      if (response.ok) {
        console.log("POST réussi");
        validationMessage.style.display = "block";
        greenButton.classList.remove("green-button");
        greenButton.classList.add("gray-button");

        // réinitialisation des champs
        document.getElementById("title").value = "";
        document.getElementById("category").value = "objets";
        document.getElementById("add-picture").value = "";

        // réinitialisation de l'image prévisualisée
        document.getElementById("preview-image").src = "";
        document.getElementById("preview-image").style.display = "none";
        document.getElementById("icon-image").style.display = null;
        document.getElementById("add-picture-button").textContent = "+ Ajouter une photo";

        // Suppression de l'élément de la liste sans recharger la page
        // non fonctionnel
        const elementToAdd = event.target.closest("figure");
        containerWorksModal.appendChild(elementToAdd);
        containerWorks.appendChild(elementToAdd);


      } else {
        console.log("POST échoué");
      }
    }
    catch (error) {
      console.error("Erreur lors de la requête POST : ",error)
    }
  }
})