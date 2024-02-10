// function initApp() {
    var total_post = [];
    var user_email = '';
    var room_state = firebase.database().ref('room/public');
    var user_state = '';


    firebase.auth().onAuthStateChanged(function(user) {
        var menu = document.getElementById('dynamic-menu');
        // Check user login
        if (user) {
            user_email = user.email;
            user_state = user_email.replace('@gmail.com', '');
            menu.innerHTML = "<span class='dropdown-item' id='profilebtn'>" + user.email + "</span><span class='dropdown-item' id='logout-btn'>Logout</span>";

            firebase.database().ref('user/'+user_state).update({public : "public"});
            var new_room_btn_before = "<input type='button' id='room-btn' class='btn btn-secondary' value='";
            var new_room_btn_after = "' onclick='change_room_ht(this)'>"
            var total_room = [];
            firebase.database().ref('user/'+user_state).on('child_added', function(child){
                total_room[total_room.length] = new_room_btn_before + child.val() + new_room_btn_after;
                document.getElementById('room-folder').innerHTML = total_room.join('');
            });



            var logoutbtn = document.getElementById('logout-btn');
            logoutbtn.addEventListener("click", function() {
                firebase.auth().signOut().then(function() {
                    window.location.href = "signin.html"
                }).catch(function(error) {
                    alert("User sign out failed!");
                })
            }, false);

            var profilebtn = document.getElementById('profilebtn');
            profilebtn.addEventListener("click", function() {
                    window.location.href = "profile.html";
                }).catch(function(error) {
                    alert(error);
                }, false);

        } else {
            // It won't show any post if not login
            menu.innerHTML = "<a class='dropdown-item' href='signin.html'>Sign In</a>"+"<a class='dropdown-item' href='register.html'>Sign up</a>";
            document.getElementById('post_list').innerHTML = "";
        }
    });

    post_btn = document.getElementById('post_btn');
    txt = document.getElementById('comment');

    post_btn.addEventListener('click', function() {
        if (txt.value != "") {
            var time = new Date();
            time_str = time.getFullYear()+"."+time.getMonth()+"."+time.getDate()+" "+time.getHours()+":"+time.getMinutes();
            var data = {
                message: txt.value,
                email: user_email,
                time: time_str,
                type: 0,
                url: ''
            };

            room_state.push(data).then(function(){
                txt.value = "";
                show();
            }).catch(function(error){
                txt.value = "";
                alert(error);
            });
        }
    });
    var createroom = document.getElementById('createroom');
    createroom.addEventListener('click', function(){
        room_name = document.getElementById('room-name');
        new_person = document.getElementById('invite-name');
        if(room_name.value != "" && new_person.value != null) {
            alert(user_state);
            var Ref = firebase.database().ref('user/'+user_state);
            Ref.push(room_name.value);
            var new_person_state = new_person.value.replace('@gmail.com', '');
            Ref = firebase.database().ref('user/'+new_person_state);
            Ref.push(room_name.value);
            change_room(room_name.value);
            room_name.value = "";
            new_person.value = "";
        }
    });


    img_btn = document.getElementById('img_btn');

    /// TODO 2: Put the image to storage, and push the image to database's "com_list" node
    ///         1. Get the reference of firebase storage
    ///         2. Upload the image
    ///         3. Get the image file url, the reference of "com_list" and push user email and the image
    img_btn.addEventListener('change', function(){
        var file = this.files[0];
        console.log(file);
        var storageRef = firebase.storage().ref(file.name);
        var time = new Date();
        time_str = time.getFullYear()+"."+time.getMonth()+"."+time.getDate()+" "+time.getHours()+":"+time.getMinutes();
        storageRef.put(file).then(function(){
            storageRef.getDownloadURL().then(function(url){
                console.log(url);
                var data = {
                    email: user_email,
                    // Type 1 for image
                    type: 1,
                    message: '',
                    url: url,
                    time: time_str,
                };
                room_state.push(data);
                show();
            });
        });
    });
    
    // room button

    // The html code for post
    var str_before_username = "<div class='my-3 p-3 bg-white rounded box-shadow'><h6 class='border-bottom border-gray pb-2 mb-0'>"
    var str_after_time = "</h6><div class='media text-muted pt-3'><p class='media-body pb-3 mb-0 small lh-125 border-bottom border-gray'><strong class='d-block text-gray-dark'>";
    var str_after_content = "</p></div></div>\n";
    
    var str_before_img = "<img class='img pt-2' style='height: 300px;' src='";
    var str_after_img = "'>";


    // List for store posts html
    
    // Counter for checking history post update complete
    var first_count = 0;
    // Counter for checking when to update new post
    var second_count = 0;

    function show(){
        // first_count = 0;
        // second_count = 0;
        var title = document.getElementById('label');
        title.innerHTML = "<h6 class='mb-0 text-white lh-100'>"+"Room"+"</h6>"
        total_post.length = 0;
        room_state.once('value').then(function(snapshot) {
            snapshot.forEach(function(childshot) {
                var childData = childshot.val();
                if(childData.type === 0){
                    total_post[total_post.length] = str_before_username+ childData.email + str_after_time + childData.time + "</strong>" + childData.message + str_after_content
                } else if (childData.type === 1){
                    total_post[total_post.length] = str_before_username+ childData.email + str_after_time + childData.time + "</strong>" + str_before_img + childData.url + str_after_img + str_after_content 
                }
                    // first_count += 1;
            });

            document.getElementById('post_list').innerHTML = total_post.join('');
            //alert(total_post);
            // room_state.on('child_added', function(data) {
            //     second_count += 1;

            //     if (second_count > first_count) {
            //         var childData = data.val();
            //         total_post[total_post.length] = str_before_username + childData.email + str_after_time + childData.time + "</strong>" + childData.message + str_after_content;
            //         document.getElementById('post_list').innerHTML = total_post.join('');
            //     }
            // });

        })
        .catch(e => console.log(e));
    }


    
    function change_room(room){

        if(room=="public"){
            room_state = firebase.database().ref('room/public');
        }else{
            room_state = firebase.database().ref('/room/'+room);
        }
        total_post.length = 0;
        first_count = 0;
        second_count = 0;

        show();
    }

    function change_room_ht(btn){
        change_room(btn.value);
    }

// }

window.onload = function() {
    show();
    // initApp();
};