// ===== GOOGLE AUTH SIMULATION =====
// Realistic Google account picker — works on static sites

const googleAccounts = [
  { name: 'Dhayanithi G',    email: 'dhayanithi3408@gmail.com',   avatar: 'D', color: '#4285f4' },
  { name: 'Dhivakar T',      email: 'dhivakar.t2024@gmail.com',   avatar: 'D', color: '#ea4335' },
  { name: 'Karthikeyan S',   email: 'karthikeyan.s22@gmail.com',  avatar: 'K', color: '#34a853' },
  { name: 'GreenPass User',  email: 'greenpass.user@gmail.com',   avatar: 'G', color: '#fbbc05' },
];

function createGoogleModal() {
  const modal = document.createElement('div');
  modal.id = 'googleModal';
  modal.innerHTML = `
    <div id="googleOverlay" onclick="closeGoogleModal()"></div>
    <div id="googlePicker">
      <div id="gp-header">
        <svg width="74" height="24" viewBox="0 0 74 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.24 8.19v2.46h5.88c-.18 1.38-.64 2.39-1.34 3.1-.86.86-2.2 1.8-4.54 1.8-3.62 0-6.45-2.92-6.45-6.54s2.83-6.54 6.45-6.54c1.95 0 3.38.77 4.43 1.76L15.4 2.5C13.94 1.08 11.98 0 9.24 0 4.28 0 .11 4.04.11 9s4.17 9 9.13 9c2.68 0 4.7-.88 6.28-2.52 1.62-1.62 2.13-3.91 2.13-5.75 0-.57-.04-1.1-.13-1.54H9.24z" fill="#4285F4"/>
          <path d="M25 6.19c-3.21 0-5.83 2.44-5.83 5.81 0 3.34 2.62 5.81 5.83 5.81s5.83-2.46 5.83-5.81c0-3.37-2.62-5.81-5.83-5.81zm0 9.33c-1.76 0-3.28-1.45-3.28-3.52 0-2.09 1.52-3.52 3.28-3.52s3.28 1.43 3.28 3.52c0 2.07-1.52 3.52-3.28 3.52z" fill="#EA4335"/>
          <path d="M53.58 7.49h-.09c-.57-.68-1.67-1.3-3.06-1.3C47.53 6.19 45 8.72 45 12c0 3.26 2.53 5.81 5.43 5.81 1.39 0 2.49-.62 3.06-1.32h.09v.81c0 2.22-1.19 3.41-3.1 3.41-1.56 0-2.53-1.12-2.93-2.07l-2.22.92c.64 1.54 2.33 3.43 5.15 3.43 2.99 0 5.52-1.76 5.52-6.05V6.49h-2.42v1zm-2.93 8.03c-1.76 0-3.1-1.5-3.1-3.52 0-2.05 1.34-3.52 3.1-3.52 1.74 0 3.1 1.49 3.1 3.54.01 2.03-1.36 3.5-3.1 3.5z" fill="#4285F4"/>
          <path d="M38 6.19c-3.21 0-5.83 2.44-5.83 5.81 0 3.34 2.62 5.81 5.83 5.81s5.83-2.46 5.83-5.81c0-3.37-2.62-5.81-5.83-5.81zm0 9.33c-1.76 0-3.28-1.45-3.28-3.52 0-2.09 1.52-3.52 3.28-3.52s3.28 1.43 3.28 3.52c0 2.07-1.52 3.52-3.28 3.52z" fill="#FBBC05"/>
          <path d="M58.93 0h2.57v17.46h-2.57z" fill="#34A853"/>
          <path d="M63.93 11.77c-.14-.37-.57-1.07-.91-1.4l2.1-1.73c.56.69 1.43 1.88 1.43 3.13 0 1.25-.87 2.44-1.43 3.13l-2.1-1.73c.34-.33.77-1.03.91-1.4z" fill="#EA4335"/>
        </svg>
        <div id="gp-title">Choose an account</div>
        <div id="gp-sub">to continue to GreenPass</div>
      </div>
      <div id="gp-accounts">
        ${googleAccounts.map((acc, i) => `
          <div class="gp-account" onclick="selectGoogleAccount(${i})">
            <div class="gp-avatar" style="background:${acc.color}">${acc.avatar}</div>
            <div class="gp-info">
              <div class="gp-name">${acc.name}</div>
              <div class="gp-email">${acc.email}</div>
            </div>
            <i class="fas fa-chevron-right gp-arrow"></i>
          </div>
        `).join('')}
        <div class="gp-account gp-add" onclick="showAddAccount()">
          <div class="gp-avatar gp-add-icon"><i class="fas fa-plus"></i></div>
          <div class="gp-info">
            <div class="gp-name">Use another account</div>
          </div>
        </div>
      </div>
      <div id="gp-footer">
        <a href="#">Privacy Policy</a> · <a href="#">Terms of Service</a>
      </div>
    </div>

    <!-- Add Account Form -->
    <div id="googleAddForm" style="display:none">
      <div id="gp-header">
        <svg width="74" height="24" viewBox="0 0 74 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.24 8.19v2.46h5.88c-.18 1.38-.64 2.39-1.34 3.1-.86.86-2.2 1.8-4.54 1.8-3.62 0-6.45-2.92-6.45-6.54s2.83-6.54 6.45-6.54c1.95 0 3.38.77 4.43 1.76L15.4 2.5C13.94 1.08 11.98 0 9.24 0 4.28 0 .11 4.04.11 9s4.17 9 9.13 9c2.68 0 4.7-.88 6.28-2.52 1.62-1.62 2.13-3.91 2.13-5.75 0-.57-.04-1.1-.13-1.54H9.24z" fill="#4285F4"/>
        </svg>
        <div id="gp-title">Sign in</div>
        <div id="gp-sub">Use your Google Account</div>
      </div>
      <div style="padding:0 24px 16px">
        <div class="form-group" style="margin-bottom:16px">
          <input type="email" id="googleEmailInput" placeholder="Email or phone" style="width:100%;padding:12px 16px;border:1px solid #dadce0;border-radius:4px;font-size:0.95rem;outline:none;font-family:inherit" onfocus="this.style.borderColor='#1a73e8'" onblur="this.style.borderColor='#dadce0'"/>
        </div>
        <div style="font-size:0.82rem;color:#5f6368;margin-bottom:20px">Not your computer? Use Guest mode to sign in privately.</div>
        <div style="display:flex;justify-content:space-between;align-items:center">
          <a href="#" style="color:#1a73e8;font-size:0.88rem;font-weight:600">Create account</a>
          <button onclick="signInWithEmail()" style="background:#1a73e8;color:#fff;border:none;padding:10px 24px;border-radius:4px;font-weight:600;cursor:pointer;font-size:0.9rem">Next</button>
        </div>
      </div>
      <div id="gp-footer"><a href="#" onclick="showAccountPicker()">← Back</a></div>
    </div>
  `;

  // Styles
  const style = document.createElement('style');
  style.textContent = `
    #googleModal { position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center; }
    #googleOverlay { position:absolute;inset:0;background:rgba(0,0,0,0.5);backdrop-filter:blur(4px); }
    #googlePicker, #googleAddForm {
      position:relative;background:#fff;border-radius:28px;width:100%;max-width:400px;
      box-shadow:0 24px 80px rgba(0,0,0,0.3);overflow:hidden;animation:gpSlide 0.25s ease;
      font-family:'Google Sans',Roboto,sans-serif;
    }
    #googleAddForm { display:none; }
    @keyframes gpSlide { from{opacity:0;transform:scale(0.95)} to{opacity:1;transform:scale(1)} }
    #gp-header { padding:28px 24px 16px;text-align:center;border-bottom:1px solid #e8eaed; }
    #gp-title { font-size:1.4rem;font-weight:400;color:#202124;margin-top:16px;margin-bottom:4px; }
    #gp-sub { font-size:0.88rem;color:#5f6368; }
    #gp-accounts { padding:8px 0; }
    .gp-account {
      display:flex;align-items:center;gap:14px;padding:12px 24px;cursor:pointer;transition:background 0.15s;
    }
    .gp-account:hover { background:#f8f9fa; }
    .gp-avatar {
      width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;
      color:#fff;font-weight:700;font-size:1rem;flex-shrink:0;
    }
    .gp-add-icon { background:#e8f0fe;color:#1a73e8;font-size:1rem; }
    .gp-info { flex:1; }
    .gp-name { font-size:0.92rem;font-weight:500;color:#202124; }
    .gp-email { font-size:0.8rem;color:#5f6368;margin-top:1px; }
    .gp-arrow { color:#5f6368;font-size:0.75rem; }
    .gp-add .gp-name { color:#1a73e8; }
    #gp-footer {
      padding:12px 24px;border-top:1px solid #e8eaed;text-align:center;font-size:0.78rem;color:#5f6368;
    }
    #gp-footer a { color:#1a73e8;text-decoration:none;margin:0 4px; }
    #gp-footer a:hover { text-decoration:underline; }
    .gp-loading {
      text-align:center;padding:32px;
    }
    .gp-spinner {
      width:36px;height:36px;border:3px solid #e8eaed;border-top-color:#1a73e8;
      border-radius:50%;animation:spin 0.8s linear infinite;margin:0 auto 16px;
    }
    @keyframes spin { to{transform:rotate(360deg)} }
  `;
  document.head.appendChild(style);
  document.body.appendChild(modal);
}

function openGoogleModal() {
  if (!document.getElementById('googleModal')) createGoogleModal();
  document.getElementById('googleModal').style.display = 'flex';
  document.getElementById('googlePicker').style.display = 'block';
  document.getElementById('googleAddForm').style.display = 'none';
}

function closeGoogleModal() {
  const m = document.getElementById('googleModal');
  if (m) m.style.display = 'none';
}

function showAddAccount() {
  document.getElementById('googlePicker').style.display = 'none';
  document.getElementById('googleAddForm').style.display = 'block';
}

function showAccountPicker() {
  document.getElementById('googlePicker').style.display = 'block';
  document.getElementById('googleAddForm').style.display = 'none';
}

function selectGoogleAccount(index) {
  const acc = googleAccounts[index];
  const picker = document.getElementById('googlePicker');

  // Show loading
  picker.innerHTML = `
    <div class="gp-loading">
      <div class="gp-spinner"></div>
      <div style="font-size:0.95rem;color:#202124;font-weight:500">Signing in as ${acc.name}...</div>
      <div style="font-size:0.82rem;color:#5f6368;margin-top:6px">${acc.email}</div>
    </div>
  `;

  setTimeout(() => {
    // Save to localStorage as logged-in user
    const users = JSON.parse(localStorage.getItem('gp_users') || '[]');
    if (!users.find(u => u.email === acc.email)) {
      users.push({ name: acc.name, email: acc.email, pass: 'google', provider: 'google' });
      localStorage.setItem('gp_users', JSON.stringify(users));
    }
    localStorage.setItem('gp_user', JSON.stringify({ name: acc.name, email: acc.email, provider: 'google' }));

    closeGoogleModal();
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get('redirect') || 'index.html';
    window.location.href = redirect;
  }, 1800);
}

function signInWithEmail() {
  const email = document.getElementById('googleEmailInput').value.trim();
  if (!email || !email.includes('@')) {
    document.getElementById('googleEmailInput').style.borderColor = '#d93025';
    return;
  }
  const name = email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  selectGoogleAccount(-1);
  // Override with typed email
  setTimeout(() => {
    const users = JSON.parse(localStorage.getItem('gp_users') || '[]');
    if (!users.find(u => u.email === email)) {
      users.push({ name, email, pass: 'google', provider: 'google' });
      localStorage.setItem('gp_users', JSON.stringify(users));
    }
    localStorage.setItem('gp_user', JSON.stringify({ name, email, provider: 'google' }));
    const params = new URLSearchParams(window.location.search);
    window.location.href = params.get('redirect') || 'index.html';
  }, 100);
}

// Close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeGoogleModal();
});
