function init(){
    var cfn_btn = document.getElementById('confirm');
    var old_pwd = document.getElementById('old-pwd');
    var new_pwd = document.getElementById('new-pwd');

    firebase.auth().onAuthStateChanged(function(user) {
        var menu = document.getElementById('dynamic-menu');
        var Email = document.getElementById('email');
        var uid = document.getElementById('id');
        var time = document.getElementById('time');
        var time_create = document.getElementById('time-create');
        // Check user login
        if (user) {
            user_email = user.email;
            user_state = user_email.replace('@gmail.com', '');
            menu.innerHTML = "<span class='dropdown-item'>" + user.email + "</span><span class='dropdown-item' id='logout-btn'>Logout</span>";
            Email.innerHTML = "<p>"+user.email+"</p>";
            uid.innerHTML = "<p>"+user.uid+"</p>";
            console.log(user.metadata);
            time.innerHTML = "<p>"+user.metadata.lastSignInTime+"</p>";
            time_create.innerHTML = "<p>"+user.metadata.creationTime+"</p>";
            var logoutbtn = document.getElementById('logout-btn');
            logoutbtn.addEventListener("click", function() {
                firebase.auth().signOut().then(function() {
                    window.location.href = "signin.html"
                }).catch(function(error) {
                    alert("User sign out failed!");
                })
            }, false);

        } else {
            // It won't show any post if not login

        }
    });
    cfn_btn.addEventListener('click', function(){
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(user.email, old_pwd.value);
        user.reauthenticateWithCredential(cred).then(function(){
            user.updatePassword(new_pwd.value).then(() => {
                firebase.auth().signOut().then(()=>{window.location.href = "signin.html"})
            }).catch((error) => { console.log(error); });
        })
    })
    
}

window.onload = () =>{init()};