//LOGIN CHECKING
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');

const loginCheck = user =>{
    if (user){
        loggedInLinks.forEach(link =>{
            link.style.display = 'block';
        });
        loggedOutLinks.forEach(link =>{
            link.style.display = 'none';
        });
    }else{
        loggedInLinks.forEach(link =>{
            link.style.display = 'none';
        });
        loggedOutLinks.forEach(link =>{
            link.style.display = 'block';
        });
    }
}




//REGISTRO FORM
const obtenerForm = document.querySelector("#registro-form");

obtenerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const obtenerEmail = document.querySelector("#idEmail").value;
  const obtenerContra = document.querySelector("#idContra").value;

  console.log(obtenerEmail, obtenerContra);

  auth
    .createUserWithEmailAndPassword(obtenerEmail, obtenerContra)
    .then((userCredential) => {
      obtenerForm.reset();

      $("#loginUsuaario").modal("hide");
      $('.modal-backdrop').remove();
      Swal.fire({
        icon: "success",
        title: `REGISTRO EXITOSO, :)`,
        showConfirmButton: false,
        timer: 1500,
      });

      console.log("REGISTRADO");
    })
    .catch((err) => {
      console.error(err.message);
      Swal.fire({
        icon: "error",
        title: "Oops!!!...",
        text: "Algo no salió como se esperaba...",
      });
    });
});

//TERMINO REGISTRO

//LOGIN USUARIO

const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.querySelector("#login-email").value;
  const contra = document.querySelector("#login-contra").value;

  console.log(email, contra);

  auth
    .signInWithEmailAndPassword(email, contra)
    .then((userCredential) => {
      loginForm.reset();

      $("#logeandoUsuario").modal("hide");
      $('.modal-backdrop').remove();
      Swal.fire({
        icon: "success",
        title: `HOLA  ${ email } bienvenid@, :)`,
        showConfirmButton: false,
        timer: 1500,
      });

      console.log("LOGUEADO");
    })
    .catch((err) => {
      console.error(err.message);
      Swal.fire({
        icon: "error",
        title: "Oops!!!...",
        text: "Usuario o Contraseña incorrectos...",
      });
    });
});

//TERMINO

//SALIR

const exit = document.querySelector("#exit");
exit.addEventListener("click", (e) => {
  e.preventDefault();
  auth
    .signOut()
    .then(() => {
      Swal.fire({
        icon: "success",
        title: `SESION CERRADA, :)`,
        showConfirmButton: false,
        timer: 1500,
      });

      console.log("SALIR EXITOSO");
    })
    .catch((err) => {
      console.error(err.message);
      Swal.fire({
        icon: "error",
        title: "Oops!!!...",
        text: "La sesion no se cerró...",
      });
    });
});
//GOOGLE LOGIN
const googleButton= document.querySelector('#googleLogin');
googleButton.addEventListener("click", (e) =>{
    console.log('logueando con google');
    const provider=new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then(result =>{
        loginForm.reset();

      $("#logeandoUsuario").modal("hide");
      $('.modal-backdrop').remove();

        Swal.fire({
            icon: "success",
            title: "Excelente!!!...",
            text: "Usuario logueado...",
          });

    }).catch(err =>{
        Swal.fire({
            icon: "error",
            title: "Oops!!!...",
            text: "Ah Ocurrido un error Uusuario no logueado...",
            showConfirmButton: false,
            timer: 4500,
          });
        console.log('ha ocurrido un error: '+err);
        
    });
});

//FACEBOOK LOGIN 

const facebookButton = document.querySelector('#facebookLogin');

facebookButton.addEventListener("click", (e) =>{
    e.preventDefault();
    console.log('logueando con facebook');
    const provider = new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider).then(result =>{
        console.log(result);
        loginForm.reset();

        $("#logeandoUsuario").modal("hide");
        $('.modal-backdrop').remove();
  
          Swal.fire({
              icon: "success",
              title: "Excelente!!!...",
              text: "Usuario logueado...",
            });
        
        

        console.log('facebook logueado');
    }).catch(err =>{
        Swal.fire({
            icon: "error",
            title: "Oops!!!...",
            text: "Ah Ocurrido un error Uusuario no logueado...",
            showConfirmButton: false,
            timer: 4500,
          });
        console.log(err);
    })
});

//PUBLICACIONES POSTS

const postList = document.querySelector('.posts');
//PARA CREAR HTML DESDE JAVASCRIPT
const setUpPosts = data => {
    if (data.length ) {
        let html = '';
        data.forEach(doc => {
            const posts = doc.data();

            const li = `<li class="list-group-item list-group-item-action " >
                <h5>${posts.titulo}</h5>
                <p>${posts.descripcion}</p>
            </li>`;
            html += li;
        });
        postList.innerHTML = html;
    }else{
        postList.innerHTML = '<p class="text-center">Logueate para ver las publicaciones</p>'
    }
}

//EVENTOS
//LISTAR POR USUAIRO AUTENTICADOS
auth.onAuthStateChanged(user =>{
    if (user){
        // Swal.fire({
        //     icon: "success",
        //     title: "Excelente!!!...",
        //     text: "Usuario ya está logueado...",
        //   });
          console.log('auth: usuario logueado');
          fs.collection('posts').get().then((snapshot) =>{
              console.log(snapshot.docs);
              setUpPosts(snapshot.docs);
              loginCheck(user);
          })
    }else{
        // Swal.fire({
        //     icon: "error",
        //     title: "Oops!!!...",
        //     text: "Usuario no está logueado...",
        //   });
          console.log('auth: usuario no logueado');
          setUpPosts([]);
          loginCheck(user);
    }
})




