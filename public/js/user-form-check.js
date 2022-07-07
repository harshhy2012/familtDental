/* jshint esversion: 8 */
const form = document.querySelector('#formID');
const nameError = document.querySelector('#your_name');
const emailError = document.querySelector('#email');
const phoneError = document.querySelector('#phone');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    setSuccessFor(nameError);
    setSuccessFor(emailError);
    setSuccessFor(phoneError);
    
    // nameError.textContent = '';
    // emailError.textContent = '';
    // phoneError.textContent = '';

    const name = form.userName.value;
    const email = form.emailID.value;
    const phone = form.phoneNumber.value;
    const message = form.message.value;

    console.log(name, email, phone, message);

    try{
        const res = await fetch('/',{
            method: 'POST',
            body: JSON.stringify({name, email, phone, message}),
            headers: {'Content-Type': 'application/json'}
        });
        const data = await res.json();
        console.log(data);

       
        
        if(data.errors) {
            console.log(data.errors);
            setErrorFor(nameError, data.errors.name);
            setErrorFor(emailError, data.errors.email);
            setErrorFor(phoneError, data.errors.phone);
        }
        if(data.user){
            //give success modal!
            
            document.getElementById("#closeMain").trigger("click", () => {
            });
            
            setTimeout(() => {
                document.getElementById("#successButton").trigger("click");
                setTimeout(() => {
                    document.getElementById("#successButtonClose").trigger("click");
                },5000);
            },1000);

        }
    }
    catch (err){
        //give failure modal!
        document.getElementById("#closeMain").trigger("click", () => {
        });
        
        setTimeout(() => {
            document.getElementById("#successButton").trigger("click");
            setTimeout(() => {
                document.getElementById("#successButtonClose").trigger("click");
            },5000);
        },1000);
    }
});


const setErrorFor = (input, message) => {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    
    small.innerText = message;
    formControl.className = 'form-floating error';
};

const setSuccessFor = (input) => {
    const formControl = input.parentElement;
    formControl.className = 'form-floating success';  
};

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