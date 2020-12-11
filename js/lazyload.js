/**
 * LAZY LOAD
 * -------------------------
 */
// Attend que le DOM soit chargé
$(function() {

    // Écouteurs d'évènements
    $(window).on('scroll', lazyload);
    $(window).on('resize', lazyload);
})

// Charge l'image lorsqu'elle apparait à l'écran
function lazyload() {
    // Récupération de toutes mes images
    let images = document.querySelectorAll('img');

    // Pour chaque image de mon tableau "images"
    images.forEach(image => {
        // Si la position de l'image est inférieure à (la hauteur de la partie visible de la fenêtre de navigation 
        // + le nombre de pixel entre le haut du document et le haut de la partie visible de la fenêtre)
        if (image.offsetTop < window.innerHeight + window.pageYOffset) {
            image.src = image.dataset.src;
        }
    });
}