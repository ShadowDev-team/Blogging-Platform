'use strict';

(async () => {
    if (await isUserLoggedIn()) window.location.replace('/');
})();

const alertContainer = document.getElementById('alert');

async function handleFormSubmit(e, formType) {
    e.preventDefault();
    const formData = {
        password: document.getElementById('password').value.trim(),
    }
    if (formType === 'login') {
        formData.login = document.getElementById('login').value.trim()
    } else {
        formData.username = document.getElementById('username').value.trim();
        formData.email = document.getElementById('email').value.trim();
    }

    // send request for login
    const response = await fetch(`/api/users/${formType}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });
    const result = await response.json();

    if (response.status === 200 || response.status === 201) {
        showAlert(result.message, 'success');
        setTimeout(() => window.location.replace(formType === 'login' ? '/' : '/login'), 2000);
    } else {
        showAlert(result.message || result.error, 'danger');
    }
}

function showAlert(msg, type) {
    const alertHTML = `
    <div class="alert alert-${type} alert-dismissible fade" role="alert">
        <span></span>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    `;
    alertContainer.innerHTML = '';
    alertContainer.insertAdjacentHTML('afterbegin', alertHTML);
    const alert = alertContainer.querySelector('.alert');
    alert.querySelector("span").textContent = msg;
    alert.classList.remove('fade');
}

async function isUserLoggedIn() {
    const response = await fetch('/api/users/me');
    return response.status === 200;
}

async function resetPassword(e) {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    if (!email) {
        showAlert('Email is required', 'danger');
        return;
    }

    const res = await fetch(`/api/users/reset-password?email=${email}`)
    const result = await res.json();
    if (res.status === 200) showAlert(result.message, 'success');
    else showAlert(result.message || result.error, 'danger');
}

async function handleNewPassword(e) {
    e.preventDefault();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    const token = new URLSearchParams(window.location.search).get('token');
    if (password !== confirmPassword) {
        showAlert('Passwords do not match', 'danger');
        return;
    }
    if (!token) {
        showAlert('Invalid token', 'danger');
        return;
    }
    const res = await fetch(`/api/users/reset-password/confirm?token=${token}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({password})
    });
    const result = await res.json();
    if (res.status === 200) {
        showAlert(result.message, 'success');
        setTimeout(() => window.location.replace('/login'), 2000);
    } else {
        showAlert(result.message || result.error, 'danger');
    }
}