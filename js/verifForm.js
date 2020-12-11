/**
 * Verification du Formulaire
 * -------------------------
 */
// On attend que le DOM soit chargé
$(function() {

    // désactive le bouton au chargement
    buttonStatus();

    // Ecouteurs d'évènements
    $("#name").on("keyup", verifPseudo);
    $("#email").on("keyup", verifEmail);
    $("#phone").on("keyup", verifPhone);
    $("#message").on("keyup", verifText);
    $("#contactForm").on("submit", function(event) {
        event.preventDefault();
    });
    $("#sendMessageButton").on("mouseover", buttonStatus);
    $("#sendMessageButton").on("click", submitSuccess);
});

// Vérifie que tous les champs du formulaire sont corrects et active ou non le bouton
function buttonStatus() {
    let compteur = Number($("#name").attr("data-isValid")) + Number($("#email").attr("data-isValid")) + Number($("#phone").attr("data-isValid")) + Number($("#message").attr("data-isValid"));
    compteur == 4 ? $("#sendMessageButton").attr("disabled", false) : $("#sendMessageButton").attr("disabled", true);
}

// Cache le formulaire et affiche le message de succes
function submitSuccess() {
    $("#contactForm").hide(5000, showForm).prev().text("The message has been sent successfuly! I will get back to you as soon as possible!");
}

// Recharge la page et réinitialiser le formulaire
function showForm() {
    setTimeout(function(){location.reload()}, 5000);
    $(this)[0].reset();
}

// En cas de succes de la validation, affiche l'indication adéquate (succes)
function isSuccess(element) {
    element.parent().removeClass("border-danger").addClass("border-success");
    element.next().text("");
    element.attr("data-isValid", 1);
}

// En cas d'échec de la validation, affiche l'indication adéquate (erreur)
function isError(element, message) {
    element.parent().removeClass("border-success").addClass("border-danger");
    element.next().text(message);
    element.attr("data-isValid", 0);
}

// Vérifie la validité syntaxique d'une adresse email
function checkEmail(email){
    let pattern = /\S+@\S+\.\S+/;
    return pattern.test(email);
}

// Vérifie la validité syntaxique d'un numéro de téléphone
function checkPhone(phone) {
    let pattern = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
    return pattern.test(phone);
}

// Vérification du pseudonyme
function verifPseudo() {
    $(this).val().length >= 5 ? isSuccess($(this)) : isError($(this), "Le pseudonyme doit comporter au minimum 5 caractères");
}

// Vérification de l'email
function verifEmail() {
    checkEmail($(this).val()) ? isSuccess($(this)) : isError($(this), "L'adresse email est incorrecte");
}

// Vérification du numéro de téléphone
function verifPhone() {
    checkPhone($(this).val()) ? isSuccess($(this)) : isError($(this), "Le numéro de téléphone est incorrect");
}

// Vérification de la taille du texte
function verifText() {
    $(this).val().length >= 10 ? isSuccess($(this)) : isError($(this), "Le texte doit comporter au minimum 10 caractères");
}