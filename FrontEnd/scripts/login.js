
const form = document.querySelector('form');
// définition de la constante du message d'erreur
const errorMessage = document.getElementById('error-message');

form.addEventListener('submit', function(event) {
    // on empêche la page de se recharger
    event.preventDefault();
    // remise à 0 du message d'erreur (pour ne pas avoir 10 messages d'erreur à la suite si l'utilisateur essaie 10 fois)
    errorMessage.innerHTML = ``;
    // on effectue la fonction de login
    authentification();
});

async function authentification () {
    
    let login = {
        // récupère ce qu'a entré le visiteur avec .value
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
            // Stockage du token dans la sessionStorage
            sessionStorage.setItem('authToken', data.token);
            // Redirection vers la page d'accueil
            window.location.href = "index.html";
        
        } else {
            // erreur email ou password
            console.log(response.statusText); // erreur connexion
            if (response.statusText == "Unauthorized") {
                errorMessage.innerHTML += `Mot de passe incorrect`;
            }
            else {errorMessage.innerHTML += `Identifiant incorrect`;}
        }

    } catch (error) {
        // Gestion des erreurs

    }
}





