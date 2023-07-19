
const form = document.querySelector('form');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    authentification();

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

        } else {
            // erreur email ou password
            console.log(error)
            console.log(response.statusText); // erreur connexion
        }

        } catch (error) {
            console.log(error);
        }
    }
});