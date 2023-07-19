console.log("hello")

// sélection de la balise form
let form = document.querySelector('form');

// ajout d'un écouteur sur le form
form.addEventListener('submit', function(event) {
    
    // Empêche la soumission du formulaire et le rechargement de la page
    event.preventDefault(); 

    // récupère la ligne de code de l'id email -> value récupère ce qu'a entré le visiteur
    let email = document.getElementById('email').value;
    // de même avec le mot de passe
    let password = document.getElementById('password').value;

    console.log(email);
    console.log(password);

});