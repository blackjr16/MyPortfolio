// Modal Functions - ADD THESE TO YOUR portfolio.js

function openLoginModal() {
    document.getElementById('loginModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function openSignupModal() {
    document.getElementById('signupModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
    document.body.style.overflow = 'auto';
}

function switchToSignup() {
    closeModal('loginModal');
    setTimeout(() => openSignupModal(), 150);
}

function switchToLogin() {
    closeModal('signupModal');
    setTimeout(() => openLoginModal(), 150);
}

function togglePassword(button) {
    const input = button.parentElement.querySelector('.form-input');
    const icon = button.querySelector('i');

    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fas fa-eye-slash';
    } else {
        input.type = 'password';
        icon.className = 'fas fa-eye';
    }
}

// Close modals when clicking outside
document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', function (e) {
        if (e.target === this) {
            this.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

// Close modals with Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.active').forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = 'auto';
    }
});

// Form submissions
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    // Add your login logic here
    console.log('Login form submitted');
});

document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault();
    // Add your signup logic here
    console.log('Signup form submitted');
});

// Update your existing handleLogin function to:
function handleLogin() {
    openLoginModal();
}