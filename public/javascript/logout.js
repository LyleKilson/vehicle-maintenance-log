// this should contain front end js for logging out an active user

async function logout() {
    const response = await fetch('/api/owners/logout', {
        method: 'post',
        headers: {'Content-Type': 'application/json'}
    });

    if(response.ok) {
        document.location.replace('/');
    }else {
        alert(response.statusText);
    }
};

document.querySelector('#logout').addEventListener('click', logout);