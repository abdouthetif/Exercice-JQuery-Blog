/**
 * Scroll infini
 * -------------------------
 */

// Variable qui contiendra la reponse de ma requête ajax
let articles;

// Initialise l'erreur à 0
let errorStatus = 0;

// Initialise l'index à 0
let indexArticles = 0;

// On attend que le DOM soit chargé
$(function() {

    // Requête GET dont la réponse est de type json et stockée dans la variable "articles"
    $.ajax({
        url: "https://jsonplaceholder.typicode.com/posts",
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            response.forEach(function() {
                articles = response
            }); 
        },
        error: function(error) {
            errorStatus = error.status;
            console.log(errorStatus);
        }
    });

    // Ecouteur d'événement
    $(window).on("scroll", scrollInfini);
})

function scrollInfini() {

    // Variable qui stocke la hauteur du document
    let scrollHeight = $(document).height();

    // Variable qui stocke la position sur la page
    let scrollPos = $(window).height() + $(window).scrollTop();
    
    // si la hauteur du document - la position sur la page = 0 alors on est en bas de la page
    if ((scrollHeight - scrollPos) == 0) {
        
        if(errorStatus == 0) {
            // si l'index de mon tableau d'articles est inférieur à la longueur de mon tableau
            // il reste des articles à afficher
            if(indexArticles < articles.length) {

                // stock l'index de fin pour afficher les 4 articles suivants
                let indexFin = indexArticles + 4;

                // boucle qui a pour borne l'index de début et l'index de fin
                // affiche les 4 articles suivants au-dessus du bouton "voir la suite"
                for(indexArticles; indexArticles < indexFin; indexArticles++) {
                    $("#btn-div").before(
                        '<div class="post-preview">'
                        +'<a href="post.html">'
                        +`<h2 class="post-title">${articles[indexArticles].title}</h2>`
                        +`<h3 class="post-subtitle">${articles[indexArticles].body}</h3>`
                        +'</a>'
                        +'<p class="post-meta">Posted by <a href="#">Start Bootstrap</a> on July 8, 2019</p>'
                        +'</div>'
                        +'<hr>'
                    );
                }
            }
            // sinon on a déjà affiché tous les articles, on peut réinitialiser l'index pour recommencer
            else {
                indexArticles = 0;
            }
        }
        else {
            if($("#erreur-serveur").length == 0) {
                $("#btn-div").before("<div id=\"erreur-serveur\" class=\"text-danger text-center\">Une erreur est survenue lors du chargement des articles, veuillez réessayer ultérieurement</div>");
            }
        }
    }
}