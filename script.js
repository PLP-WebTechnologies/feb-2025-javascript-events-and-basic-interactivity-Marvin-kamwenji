/**
 * Interactive Portfolio - JavaScript Event Handling & Interactive Elements
 * This script manages all event handling and interactive features of the portfolio
 */

// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive components
    initTabNavigation();
    initEventDemoSection();
    initGallery();
    initFormValidation();
    initAccordion();
    initThemeToggle();
});


function initTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            button.classList.add('active');
            
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}


function initEventDemoSection() {
    initButtonEvents();
    
    initHoverEffects();
    
    initKeypressDetection();
    
    initLongPressDemo();
}


function initButtonEvents() {
    const colorChangeBtn = document.getElementById('color-change-btn');
    const textChangeBtn = document.getElementById('text-change-btn');
    
    let colorIndex = 0;
    const colors = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6'];
    
    colorChangeBtn.addEventListener('click', () => {
        colorIndex = (colorIndex + 1) % colors.length;
        colorChangeBtn.style.backgroundColor = colors[colorIndex];
    });
    
    let textIndex = 0;
    const texts = [
        'Change My Text', 
        'Click Again!', 
        'One More Time!', 
        'Keep Going!', 
        'Almost There!'
    ];
    
    textChangeBtn.addEventListener('click', () => {
        textIndex = (textIndex + 1) % texts.length;
        textChangeBtn.textContent = texts[textIndex];
    });
}


function initHoverEffects() {
    const hoverBox = document.getElementById('hover-box');
    const originalText = hoverBox.innerHTML;
    const hoverText = '<p>Now you see the hover effect!</p>';
    
    hoverBox.addEventListener('mouseover', () => {
        hoverBox.innerHTML = hoverText;
        hoverBox.style.backgroundColor = '#e74c3c';
        hoverBox.style.transform = 'scale(1.05)';
    });
    
    hoverBox.addEventListener('mouseout', () => {
        hoverBox.innerHTML = originalText;
        hoverBox.style.backgroundColor = '';
        hoverBox.style.transform = 'scale(1)';
    });
}


function initKeypressDetection() {
    const keyName = document.getElementById('key-name');
    const keyCode = document.getElementById('key-code');
    
    document.addEventListener('keydown', (event) => {
        keyName.textContent = event.key;
        keyCode.textContent = `Code: ${event.code}`;
        
        keyName.style.animation = 'none';
        keyCode.style.animation = 'none';
        
        setTimeout(() => {
            keyName.style.animation = 'pulse 0.3s';
            keyCode.style.animation = 'pulse 0.3s';
        }, 10);
    });
}


function initLongPressDemo() {
    const longPressBtn = document.getElementById('long-press-btn');
    const progressBar = document.getElementById('long-press-progress');
    let pressTimer;
    let progress = 0;
    const pressDuration = 2000; 
    const interval = 50; 
    
    longPressBtn.addEventListener('mousedown', startProgress);
    longPressBtn.addEventListener('touchstart', startProgress);
    
    longPressBtn.addEventListener('mouseup', stopProgress);
    longPressBtn.addEventListener('mouseleave', stopProgress);
    longPressBtn.addEventListener('touchend', stopProgress);
    
    function startProgress(e) {
        if (e.type === 'touchstart') {
            e.preventDefault();
        }
        
        progress = 0;
        progressBar.style.setProperty('--progress', '0%');
        
        pressTimer = setInterval(() => {
            progress += (interval / pressDuration) * 100;
            progressBar.style.setProperty('--progress', `${progress}%`);
            
            progressBar.querySelector('::after') 
                ? progressBar.querySelector('::after').style.width = `${progress}%`
                : progressBar.style.background = `linear-gradient(to right, var(--secondary-color) ${progress}%, #eee ${progress}%)`;
            
            if (progress >= 100) {
                clearInterval(pressTimer);
                longPressCompleted();
            }
        }, interval);
    }
    
    function stopProgress() {
        clearInterval(pressTimer);
        
        const currentProgress = progress;
        const resetInterval = setInterval(() => {
            progress -= 5;
            
            progressBar.querySelector('::after') 
                ? progressBar.querySelector('::after').style.width = `${progress}%`
                : progressBar.style.background = `linear-gradient(to right, var(--secondary-color) ${progress}%, #eee ${progress}%)`;
            
            if (progress <= 0) {
                clearInterval(resetInterval);
                progress = 0;
            }
        }, 10);
    }
    
    function longPressCompleted() {
        longPressBtn.textContent = '🎉 Success! 🎉';
        longPressBtn.style.backgroundColor = 'var(--secondary-color)';
        longPressBtn.style.animation = 'pulse 0.5s 3';
        
        setTimeout(() => {
            longPressBtn.textContent = 'Press and hold me';
            longPressBtn.style.backgroundColor = '';
            longPressBtn.style.animation = '';
        }, 3000);
    }
}


function initGallery() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const images = document.querySelectorAll('.gallery-img');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;
    
    nextBtn.addEventListener('click', () => {
        showImage((currentIndex + 1) % images.length);
    });
    
    prevBtn.addEventListener('click', () => {
        showImage((currentIndex - 1 + images.length) % images.length);
    });
    
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-index'));
            showImage(index);
        });
    });
    
    function showImage(index) {
        images.forEach(img => img.classList.remove('showing'));
        
        dots.forEach(dot => dot.classList.remove('active'));
        
        images[index].classList.add('showing');
        
        dots[index].classList.add('active');
        
        currentIndex = index;
    }
    
    setInterval(() => {
        showImage((currentIndex + 1) % images.length);
    }, 5000);
}


function initFormValidation() {
    const form = document.getElementById('validation-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const successMessage = document.getElementById('success-message');
    
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    confirmPasswordInput.addEventListener('input', validateConfirmPassword);
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nameValid = validateName();
        const emailValid = validateEmail();
        const passwordValid = validatePassword();
        const confirmValid = validateConfirmPassword();
        
        if (nameValid && emailValid && passwordValid && confirmValid) {
            successMessage.textContent = 'Form submitted successfully! ✅';
            successMessage.style.display = 'block';
            
            setTimeout(() => {
                form.reset();
                successMessage.style.display = 'none';
                document.getElementById('strength-value').style.width = '0';
                document.getElementById('strength-text').textContent = 'None';
            }, 3000);
        }
    });
    
    function validateName() {
        const name = nameInput.value.trim();
        const nameError = document.getElementById('name-error');
        
        if (name === '') {
            nameError.textContent = 'Name is required';
            nameInput.style.borderColor = 'var(--accent-color)';
            return false;
        } else {
            nameError.textContent = '';
            nameInput.style.borderColor = 'var(--secondary-color)';
            return true;
        }
    }
    
    function validateEmail() {
        const email = emailInput.value.trim();
        const emailError = document.getElementById('email-error');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email === '') {
            emailError.textContent = 'Email is required';
            emailInput.style.borderColor = 'var(--accent-color)';
            return false;
        } else if (!emailRegex.test(email)) {
            emailError.textContent = 'Please enter a valid email address';
            emailInput.style.borderColor = 'var(--accent-color)';
            return false;
        } else {
            emailError.textContent = '';
            emailInput.style.borderColor = 'var(--secondary-color)';
            return true;
        }
    }
    
    function validatePassword() {
        const password = passwordInput.value;
        const passwordError = document.getElementById('password-error');
        const strengthValue = document.getElementById('strength-value');
        const strengthText = document.getElementById('strength-text');
        
        updatePasswordStrength(password, strengthValue, strengthText);
        
        if (password === '') {
            passwordError.textContent = 'Password is required';
            passwordInput.style.borderColor = 'var(--accent-color)';
            return false;
        } else if (password.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters';
            passwordInput.style.borderColor = 'var(--accent-color)';
            return false;
        } else {
            passwordError.textContent = '';
            passwordInput.style.borderColor = 'var(--secondary-color)';
            return true;
        }
    }
    
    function validateConfirmPassword() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const confirmPasswordError = document.getElementById('confirm-password-error');
        
        if (confirmPassword === '') {
            confirmPasswordError.textContent = 'Please confirm your password';
            confirmPasswordInput.style.borderColor = 'var(--accent-color)';
            return false;
        } else if (confirmPassword !== password) {
            confirmPasswordError.textContent = 'Passwords do not match';
            confirmPasswordInput.style.borderColor = 'var(--accent-color)';
            return false;
        } else {
            confirmPasswordError.textContent = '';
            confirmPasswordInput.style.borderColor = 'var(--secondary-color)';
            return true;
        }
    }
    
    function updatePasswordStrength(password, strengthValue, strengthText) {
        let strength = 0;
        
        if (password.length >= 8) strength += 25;
        
        if (/[A-Z]/.test(password)) strength += 25;
        
        if (/[0-9]/.test(password)) strength += 25;
        
        if (/[^A-Za-z0-9]/.test(password)) strength += 25;
        
        strengthValue.style.width = `${strength}%`;
        
        if (strength <= 25) {
            strengthValue.style.backgroundColor = '#e74c3c';
            strengthText.textContent = 'Weak';
        } else if (strength <= 50) {
            strengthValue.style.backgroundColor = '#f39c12';
            strengthText.textContent = 'Medium';
        } else if (strength <= 75) {
            strengthValue.style.backgroundColor = '#3498db';
            strengthText.textContent = 'Good';
        } else {
            strengthValue.style.backgroundColor = '#2ecc71';
            strengthText.textContent = 'Strong';
        }
    }
}


function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            header.classList.toggle('active');
            
            const content = header.nextElementSibling;
            
            if (content.classList.contains('active')) {
                content.classList.remove('active');
            } else {
                content.classList.add('active');
            }
        });
    });
}


function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    
    themeToggle.addEventListener('dblclick', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            themeToggle.textContent = '☀️';
            themeToggle.title = 'Double-click to toggle light mode!';
        } else {
            themeToggle.textContent = '🌙';
            themeToggle.title = 'Double-click to toggle dark mode!';
        }
        
        themeToggle.style.animation = 'pulse 0.5s';
        setTimeout(() => {
            themeToggle.style.animation = '';
        }, 500);
    });
}