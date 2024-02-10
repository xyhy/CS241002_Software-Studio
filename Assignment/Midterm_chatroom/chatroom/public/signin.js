function initApp(){
    var Useremail = document.getElementById('inputEmail');
    var Userpassword = document.getElementById('inputPassword');
    var btnLogin = document.getElementById('btnLogin');
    var btnGoogle = document.getElementById('btngoogle');
    var btnSignUp = document.getElementById('btnSignup');

    btnSignUp.addEventListener('click',function(){
        window.location.href = "register.html";
    });

    btnGoogle.addEventListener('click', function() {
        var Provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(Provider).then(
            (result) => {
                var token = result.credential.accessToken;
                var user = result.user;
                window.location.href = "menu.html";
        })
    });

    btnLogin.addEventListener('click', function() {
        firebase.auth().signInWithEmailAndPassword(Useremail.value, Userpassword.value).then(function(result) {
            window.location.href = "menu.html";
        }).catch(function(error) {
            Useremail.value = "";
            Userpassword.value = "";
            alert(error.message);
        });
    });
}

window.onload = () => {initApp();}