// ===== MOBILE MENU =====
function toggleMenu() {
  const nav = document.querySelector('.nav-links');
  nav.classList.toggle('open');
}

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.remove('open');
  });
});

// ===== BOOKING FORM =====
function submitBooking(e) {
  e.preventDefault();
  document.getElementById('bookingForm').style.display = 'none';
  document.getElementById('bookingSuccess').style.display = 'block';
}

// ===== CONTACT FORM =====
function submitContact(e) {
  e.preventDefault();
  document.getElementById('contactForm').style.display = 'none';
  document.getElementById('contactSuccess').style.display = 'block';
}

// ===== LOGIN =====
function handleLogin(e) {
  e.preventDefault();
  alert('Login successful! Welcome back to GreenPass.');
  window.location.href = 'index.html';
}

// ===== SIGNUP =====
function handleSignup(e) {
  e.preventDefault();
  const pass = document.getElementById('signupPass').value;
  const confirm = document.getElementById('confirmPass').value;
  if (pass !== confirm) {
    alert('Passwords do not match. Please try again.');
    return;
  }
  alert('Account created successfully! Welcome to GreenPass.');
  window.location.href = 'index.html';
}

// ===== TOGGLE PASSWORD =====
function togglePass(id) {
  const input = document.getElementById(id);
  input.type = input.type === 'password' ? 'text' : 'password';
}

// ===== FAQ TOGGLE =====
function toggleFaq(el) {
  const answer = el.nextElementSibling;
  const isOpen = answer.classList.contains('open');
  // Close all
  document.querySelectorAll('.faq-a').forEach(a => a.classList.remove('open'));
  document.querySelectorAll('.faq-q').forEach(q => q.classList.remove('open'));
  if (!isOpen) {
    answer.classList.add('open');
    el.classList.add('open');
  }
}

// ===== DESTINATION FILTER =====
function filterDest(cat) {
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  document.querySelectorAll('.dest-card').forEach(card => {
    if (cat === 'all' || card.dataset.cat.includes(cat)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// ===== NAVBAR SCROLL SHADOW =====
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    navbar.style.boxShadow = window.scrollY > 10
      ? '0 4px 20px rgba(0,0,0,0.12)'
      : '0 2px 12px rgba(0,0,0,0.06)';
  }
});
