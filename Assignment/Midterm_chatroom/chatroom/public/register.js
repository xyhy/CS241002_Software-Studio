function initApp(){
    var Useremail = document.getElementById("inputEmail");
    var Userpassword = document.getElementById("inputPassword");
    var btnSignUp = document.getElementById("btnSignUp");

    btnSignUp.addEventListener("click", function(){
        firebase.auth().createUserWithEmailAndPassword(Useremail.value, Userpassword.value).then(function(result) {
            Useremail.value = "";
            Userpassword.value = "";
            window.location.href = "menu.html"
        }).catch(function(error) {
            Useremail.value = "";
            Userpassword.value = "";
            alert(error);
        });
    });
}
window.onload = () => {initApp();}