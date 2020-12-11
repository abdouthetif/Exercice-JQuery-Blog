/**
 * CAROUSEL
 * -------------------------
 */
// Tableau des images
let images = ["img/nature-bg.jpg", "img/about-bg.jpg", "img/contact-bg.jpg", "img/post-bg.jpg", "img/home-bg.jpg"];

// Index correspondant à l'image actuelle
let index = 0;

// Variable pour le setInterval
let timer;

// Attend que le DOM soit chargé
$(function () {
    
    // Écouteurs d'évènements
    // Start/stop slide
    $(".masthead").on("mouseover", stopCarousel);
    $(".masthead").on("mouseout", startCarousel);

    // Lancement du carousel
    startCarousel();
});

// Démarre le carousel
function startCarousel()
{
    timer = setInterval(avancer, 4000);
}

// Stop le carousel
function stopCarousel()
{
    clearInterval(timer);
}

// Passe à l'image suivante du carousel
function avancer(){
    // Modification de l'attribut "background-image" en lui ajoutant le prochain url de mon tableau
    $(".masthead").css("background-image", "url("+images[index]+")");

    index == images.length - 1 ? index = 0 : index++;
}