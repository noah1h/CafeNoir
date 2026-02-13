window.addEventListener('load', function () {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  }
});

$(document).ready(function () {
  const $hamburgerMenu = $('.hamburger-menu');
  const $sidebar = $('.sidebar');

  $hamburgerMenu.on('click', function () {
    if ($sidebar.is(':visible')) {
      $sidebar.stop(true, true).slideUp();
    } else {
      $sidebar.stop(true, true).slideDown();
    }
  });
});

const swiper = new Swiper('.swiper', {
  speed: 400,
  spaceBetween: 30, // spacing between cards
  slidesPerView: 1, // default for mobile
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    640: {
      slidesPerView: 2, // tablets
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 4, // desktop
      spaceBetween: 30,
    }
  }
});

// Contact form

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const firstName = document.querySelector('.first-name-input');
    const lastName = document.querySelector('.last-name-input');
    const subject = document.querySelector('.subject-input');
    const email = document.querySelector('.email-input');
    const message = document.querySelector('textarea');

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Helper to show error
    function showError(input, message) {
      const errorDiv = input.parentElement.querySelector('.error-message');
      errorDiv.textContent = message;
      input.style.border = '2px solid red';
    }

    // Helper to clear error
    function clearError(input) {
      const errorDiv = input.parentElement.querySelector('.error-message');
      errorDiv.textContent = '';
      input.style.border = '';
    }

    // Helper to show success/error messages
    function showMessage(message, type) {
      const existingAlert = document.querySelector('.form-message');
      if (existingAlert) existingAlert.remove();
      
      const alertDiv = document.createElement('div');
      alertDiv.className = 'form-message';
      alertDiv.style.marginTop = '20px';
      alertDiv.style.padding = '15px';
      alertDiv.style.borderRadius = '5px';
      alertDiv.style.backgroundColor = type === 'success' ? '#d4edda' : '#f8d7da';
      alertDiv.style.color = type === 'success' ? '#155724' : '#721c24';
      alertDiv.style.border = `1px solid ${type === 'success' ? '#c3e6cb' : '#f5c6cb'}`;
      alertDiv.textContent = message;
      
      document.querySelector('.contact-form').appendChild(alertDiv);
      
      if (type === 'success') {
        setTimeout(() => {
          if (alertDiv.parentNode) {
            alertDiv.remove();
          }
        }, 5000);
      }
    }

    let isValid = true;

    if (firstName.value.trim() === '') {
      showError(firstName, 'First name is required.');
      isValid = false;
    } else {
      clearError(firstName);
    }

    if (lastName.value.trim() === '') {
      showError(lastName, 'Last name is required.');
      isValid = false;
    } else {
      clearError(lastName);
    }

    if (subject.value.trim() === '') {
      showError(subject, 'Please enter a subject.');
      isValid = false;
    } else {
      clearError(subject);
    }

    if (!emailPattern.test(email.value.trim())) {
      showError(email, 'Please enter a valid email address.');
      isValid = false;
    } else {
      clearError(email);
    }

    if (message.value.trim() === '') {
      showError(message, 'Message cannot be empty.');
      isValid = false;
    } else {
      clearError(message);
    }

    if (isValid) {
      const submitBtn = document.querySelector('.form-submit');
      const btnText = submitBtn.querySelector('.submit-btn-text');
    
      btnText.innerHTML = `
        <svg class="custom-spinner" width="20" height="20" viewBox="0 0 50 50">
          <circle cx="25" cy="25" r="20" fill="none" stroke="white" stroke-width="5" stroke-linecap="round"
            stroke-dasharray="100" stroke-dashoffset="60">
            <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25"
              dur="1s" repeatCount="indefinite" />
          </circle>
        </svg>
      `;
      submitBtn.style.filter = 'grayscale(100%)';
      submitBtn.disabled = true;

      const formData = {
        firstName: firstName.value.trim(),
        lastName: lastName.value.trim(),
        email: email.value.trim(),
        subject: subject.value.trim(),
        message: message.value.trim()
      };

      try {
        const response = await fetch('contact_handler.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (result.success) {
          document.querySelector('.contact-form').reset();
          showMessage('Thank you! Your message has been sent successfully.', 'success');
          
          btnText.textContent = 'Submit';
          submitBtn.disabled = false;
          submitBtn.style.filter = 'grayscale(0)';
        } else {
          showMessage(result.message || 'Failed to send message. Please try again.', 'error');
          
          setTimeout(() => {
            btnText.textContent = 'Submit';
            submitBtn.disabled = false;
            submitBtn.style.filter = 'grayscale(0)';
          }, 1000);
        }
      } catch (error) {
        console.error('Error:', error);
        showMessage('Network error. Please check your connection and try again.', 'error');
        
        setTimeout(() => {
          btnText.textContent = 'Submit';
          submitBtn.disabled = false;
          submitBtn.style.filter = 'grayscale(0)';
        }, 1000);
      }
    }
  });
}


