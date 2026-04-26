// ===== AUTH GUARD =====
// Pages that require login
const protectedPages = ['booking.html', 'destinations.html'];
const currentPage = window.location.pathname.split('/').pop();

function isLoggedIn() {
  return localStorage.getItem('gp_user') !== null;
}

function getUser() {
  return JSON.parse(localStorage.getItem('gp_user') || 'null');
}

// Redirect to login if not logged in on protected pages
if (protectedPages.includes(currentPage) && !isLoggedIn()) {
  window.location.href = 'login.html?redirect=' + currentPage;
}

// ===== UPDATE NAVBAR based on login state =====
document.addEventListener('DOMContentLoaded', () => {
  const navButtons = document.querySelector('.nav-buttons');
  if (!navButtons) return;

  if (isLoggedIn()) {
    const user = getUser();
    navButtons.innerHTML = `
      <span class="nav-user"><i class="fas fa-user-circle"></i> ${user.name}</span>
      <button class="btn-outline" onclick="logout()"><i class="fas fa-sign-out-alt"></i> Logout</button>
    `;
  }
});

// ===== MOBILE MENU =====
function toggleMenu() {
  const nav = document.querySelector('.nav-links');
  nav.classList.toggle('open');
}

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.remove('open');
  });
});

// ===== SIGNUP =====
function handleSignup(e) {
  e.preventDefault();
  const firstName = document.querySelector('#signupForm input[placeholder="First name"]').value;
  const lastName  = document.querySelector('#signupForm input[placeholder="Last name"]').value;
  const email     = document.querySelector('#signupForm input[type="email"]').value;
  const pass      = document.getElementById('signupPass').value;
  const confirm   = document.getElementById('confirmPass').value;

  if (pass !== confirm) {
    showError('Passwords do not match. Please try again.');
    return;
  }
  if (pass.length < 6) {
    showError('Password must be at least 6 characters.');
    return;
  }

  // Save user to localStorage
  const users = JSON.parse(localStorage.getItem('gp_users') || '[]');
  if (users.find(u => u.email === email)) {
    showError('An account with this email already exists. Please login.');
    return;
  }

  users.push({ name: firstName + ' ' + lastName, email, pass });
  localStorage.setItem('gp_users', JSON.stringify(users));

  // Auto login
  localStorage.setItem('gp_user', JSON.stringify({ name: firstName + ' ' + lastName, email }));

  showSuccess('signupForm', 'signupSuccess');
  setTimeout(() => window.location.href = 'index.html', 1500);
}

// ===== LOGIN =====
function handleLogin(e) {
  e.preventDefault();
  const email = document.querySelector('#loginForm input[type="email"]').value;
  const pass  = document.getElementById('loginPass').value;

  const users = JSON.parse(localStorage.getItem('gp_users') || '[]');
  const user  = users.find(u => u.email === email && u.pass === pass);

  if (!user) {
    showError('Invalid email or password. Please try again.');
    return;
  }

  localStorage.setItem('gp_user', JSON.stringify({ name: user.name, email: user.email }));

  // Redirect back if came from protected page
  const params = new URLSearchParams(window.location.search);
  const redirect = params.get('redirect') || 'index.html';
  window.location.href = redirect;
}

// ===== LOGOUT =====
function logout() {
  localStorage.removeItem('gp_user');
  window.location.href = 'index.html';
}

// ===== BOOKING FORM =====
function submitBooking(e) {
  e.preventDefault();
  const form = document.getElementById('bookingForm');
  const dest = form.querySelector('select').value;
  const travelers = form.querySelector('input[type="number"]').value;
  const checkin = form.querySelectorAll('input[type="date"]')[0].value;
  const checkout = form.querySelectorAll('input[type="date"]')[1].value;
  const accom = form.querySelectorAll('select')[1].value;
  const priceMap = {
    'Vaishno Devi, Jammu':6500,'Manali, Himachal Pradesh':8500,'Shimla, Himachal Pradesh':7800,
    'Patnitop, Jammu':7500,'Spiti Valley, Himachal Pradesh':9000,'Dal Lake, Srinagar':7200,
    'Ooty':1800,'Kodaikanal':2200,'Yercaud':2500,'Valparai':1500,'Mudumalai National Park':3200,
    'Hogenakkal Falls':2800,'Rameswaram':3500,'Kanyakumari':3800,
    'Alleppey Backwaters':3500,'Munnar':2800,'Thekkady':3200,'Kovalam Beach':2500,
    'Wayanad':3800,'Fort Kochi':3000,'Varkala Beach':3500,'Athirappilly Falls':2200
  };
  const base = (priceMap[dest] || 3500) * (parseInt(travelers) || 1);
  localStorage.setItem('gp_booking', JSON.stringify({destination:dest, travelers, checkin, checkout, accommodation:accom, total:base}));
  window.location.href = 'payment.html';
}

// ===== CONTACT FORM =====
function submitContact(e) {
  e.preventDefault();
  document.getElementById('contactForm').style.display = 'none';
  document.getElementById('contactSuccess').style.display = 'block';
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
  document.querySelectorAll('.faq-a').forEach(a => a.classList.remove('open'));
  document.querySelectorAll('.faq-q').forEach(q => q.classList.remove('open'));
  if (!isOpen) {
    answer.classList.add('open');
    el.classList.add('open');
  }
}

// ===== DESTINATION FILTER =====
function filterDest(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  document.querySelectorAll('.dest-card').forEach(card => {
    if (cat === 'all') {
      card.style.display = 'block';
    } else if (cat === 'budget') {
      card.style.display = parseInt(card.dataset.price) <= 4000 ? 'block' : 'none';
    } else {
      card.style.display = card.dataset.cat.includes(cat) ? 'block' : 'none';
    }
  });
}

// ===== HELPERS =====
function showError(msg) {
  let el = document.getElementById('authError');
  if (!el) {
    el = document.createElement('div');
    el.id = 'authError';
    el.className = 'auth-error';
    const form = document.querySelector('form');
    form.prepend(el);
  }
  el.textContent = msg;
  el.style.display = 'block';
}

function showSuccess(formId, successId) {
  const s = document.getElementById(successId);
  if (s) { document.getElementById(formId).style.display = 'none'; s.style.display = 'block'; }
}

// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    navbar.style.boxShadow = window.scrollY > 10
      ? '0 4px 20px rgba(0,0,0,0.12)'
      : '0 2px 12px rgba(0,0,0,0.06)';
  }
});

