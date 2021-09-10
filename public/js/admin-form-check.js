const form = document.querySelector('form');
const usernameError = document.querySelector('.username.error');
const passwordError = document.querySelector('.password.error');
    
console.log("from obj: ", form);

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    usernameError.textContent = '';
    passwordError.textContent = '';

    const username = form.user_name.value;
    const password = form.pass.value;

    try{
        console.log("fetch request for admin page");
        const res = await fetch('/admin',{
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type': 'application/json'}
        });
        const data = await res.json();
        console.log(data);

        if(data.errors) {
            usernameError.textContent = data.errors.username;
            passwordError.textContent = data.errors.password;
        }
        if(data.user){
            location.assign('/admin/backdoor');
        }
    }
    catch (err){
        console.log(err);
    }
});


// const form = document.getElementById('appointmentID');
// const username = document.getElementById('your_name');
// const phone = document.getElementById('phone');
// const email = document.getElementById('email');

// form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     checkInputs();
// });

// function checkInputs(){
//     const nameValue = username.value.trim();
//     const phoneValue = phone.value.trim();
//     const emailValue = email.value.trim();
    
//     if(nameValue === ''){
//         //show error
//         //add error class
//         setErrorFor(username,"username cannot be blank");
//     } else {
//         setSuccessFor(username);
//     }

//     if(phone === ''){
//         setErrorFor(phone, 'Phone number cannot be blank');
//     } else if(!isPhoneNumber(phoneValue)) {
//         setErrorFor(phone, 'Phone number is invalid');
//     } else{
//         setSuccessFor(phone);
//     }

//     if(email === ''){
//         setErrorFor(email, 'Email cannot be blank');
//     } else if(!isEmail(emailValue)) {
//         setErrorFor(email, 'Email is not valid');
//     } else {
//         setSuccessFor(email);
//     }

//     function setErrorFor(input, message){
//         const formControl = input.parentElement;
//         const small = formControl.querySelector('small');

//         small.innerText = message;
//         formControl.className = 'form-floating error';
//     }

//     function setSuccessFor(input){
//         const formControl = input.parentElement;
//         formControl.className = 'form-floating success';  
//     }

//     function isEmail(email){
//         return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
//     }

//     function isPhoneNumber(phone){
//         return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(phone);
//     }
// }