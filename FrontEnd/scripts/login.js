// VARIABLES ET CONSTANTES

const form = document.querySelector('form');
const errorMessage = document.getElementById('error-message');


// FONCTIONS

form.addEventListener('submit', function(event) {
    // on empêche la page de se recharger
    event.preventDefault(); // remise à 0 du message d'erreur (pour ne pas en avoir 10 à la suite)
    errorMessage.innerHTML = ``;
    authentification();
});

async function authentification () {
    let login = { // récupère ce qu'a entré le visiteur avec .value
        email : document.getElementById('email').value,
        password : document.getElementById('password').value
    };
    try {
    const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"}, 
        // envoi des données de login au format json
        body: JSON.stringify(login)
    });
        if (response.ok) {
            const data = await response.json();
            console.log(data.token);
            sessionStorage.setItem('authToken', data.token); // Stockage du token dans la sessionStorage
            window.location.href = "index.html"; // Redirection vers la page d'accueil       
        } else { // erreur email ou passwordn
            errorMessage.innerHTML += `Identifiant ou Mot de passe incorrect`;
        }
    } catch (error) {
    }
}





