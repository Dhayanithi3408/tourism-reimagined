// ===== GREENPASS AI CHATBOT =====

const chatResponses = {
  greetings: ['hi','hello','hey','good morning','good evening','good afternoon','hii','helo'],
  booking: ['book','booking','reserve','reservation','trip','travel','plan'],
  kerala: ['kerala','alleppey','munnar','thekkady','kovalam','wayanad','kochi','varkala','athirappilly','backwater','houseboat'],
  price: ['price','cost','fee','charge','rate','budget','cheap','affordable','rupee','rs','inr'],
  login: ['login','signup','register','account','password','sign in','sign up'],
  eco: ['eco','green','environment','sustainable','pollution','nature','iot','sensor'],
  ai: ['ai','artificial intelligence','recommend','suggestion','personalize'],
  team: ['team','who made','developer','creator','student','dhayanithi','dhivakar','karthikeyan'],
  contact: ['contact','email','phone','address','reach','support','help'],
  about: ['about','project','what is','greenpass','system','platform'],
};

const replies = {
  greetings: [
    "👋 Hello! Welcome to GreenPass! I'm your AI travel assistant. How can I help you explore today?",
    "Hi there! 😊 Ready to plan your next eco-friendly adventure? Ask me anything!",
    "Hey! Welcome aboard GreenPass 🌿 I can help with destinations, bookings, pricing and more!"
  ],
  booking: [
    "📅 To book a trip, go to our <b>Book Now</b> page! Fill in your destination, dates, number of travelers and accommodation type. It takes less than 2 minutes!",
    "🎯 Booking is super easy on GreenPass! Head to <b>booking.html</b> — choose your destination, dates, and activities. All secured with JWT authentication!",
  ],
  destinations: [
    "🗺️ We have <b>12 amazing destinations</b>!<br><br><b>Tamil Nadu (under ₹4,000):</b><br>• Ooty — ₹1,800<br>• Kodaikanal — ₹2,200<br>• Yercaud — ₹2,500<br>• Valparai — ₹1,500<br>• Hogenakkal — ₹2,800<br>• Mudumalai — ₹3,200<br>• Rameswaram — ₹3,500<br>• Kanyakumari — ₹3,800<br><br><b>Also:</b> Manali, Shimla, Vaishno Devi, Dal Lake!",
    "🌄 Check our <b>Destinations</b> page for all 12 places with real-time capacity, eco-badges, and pricing. Use the filter to find places under ₹4,000!",
  ],
  price: [
    "💰 All Tamil Nadu destinations are <b>under ₹4,000 per head</b>!<br><br>• Valparai — ₹1,500 ✅<br>• Ooty — ₹1,800 ✅<br>• Kodaikanal — ₹2,200 ✅<br>• Yercaud — ₹2,500 ✅<br>• Hogenakkal — ₹2,800 ✅<br>• Mudumalai — ₹3,200 ✅<br>• Rameswaram — ₹3,500 ✅<br>• Kanyakumari — ₹3,800 ✅",
    "🏷️ Use the <b>'Under ₹4000'</b> filter button on the Destinations page to see all budget-friendly Tamil Nadu spots!",
  ],
  login: [
    "🔐 You need to <b>Sign Up</b> first to access Destinations and Booking pages.<br><br>1. Click <b>Sign Up</b> in the navbar<br>2. Fill your name, email & password<br>3. Done! You're in 🎉",
    "👤 Already have an account? Click <b>Login</b> in the top right. New here? <b>Sign Up</b> is free and takes 30 seconds!",
  ],
  eco: [
    "🌿 GreenPass uses <b>IoT sensors</b> at destinations to monitor:<br>• 🌡️ Temperature<br>• 💨 Air Quality Index<br>• 👥 Crowd Density<br>• ⚡ Energy Usage<br><br>Destinations are rated <b>Eco-Safe</b> or <b>Moderate</b> based on live data!",
    "♻️ We're committed to sustainable tourism! Our IoT monitoring system tracks environmental conditions in real-time to prevent overcrowding and protect nature.",
  ],
  ai: [
    "🧠 Our AI recommendation system analyzes your <b>travel preferences, history, and real-time context</b> to suggest the perfect destination with <b>95% accuracy</b>!<br><br>It uses machine learning models trained on thousands of travel patterns.",
    "🤖 GreenPass AI provides personalized recommendations, predictive analytics, and 24/7 chatbot support — that's me! 😄",
  ],
  team: [
    "👨‍💻 GreenPass was built by:<br><br>• <b>Dhayanithi G</b> — 922523244008<br>• <b>Dhivakar T</b> — 922523244009<br>• <b>Karthikeyan S</b> — 922523244022<br><br>B.Tech CSBS, V.S.B. Engineering College, Karur<br>Supervisor: <b>Dr. M. Sangeetha M.E., Ph.D.</b>",
  ],
  contact: [
    "📞 You can reach us at:<br><br>📧 greenpass@vsb.edu.in<br>📧 support@greenpass.in<br>📍 V.S.B. Engineering College, Karur - 639 111<br>📱 +91 98765 43210<br><br>Or visit our <b>Contact</b> page!",
  ],
  about: [
    "🌐 <b>GreenPass</b> is a Smart Integrated Tourism Ecosystem for post-pandemic recovery.<br><br>It uses <b>AI + IoT + Cloud Computing</b> to connect tourists, service providers, local communities and administrators on one unified platform.<br><br>Built by CSBS students at V.S.B. Engineering College, Karur.",
  ],
  default: [
    "🤔 I'm not sure about that, but I can help with:<br>• 🗺️ Destinations & pricing<br>• 📅 Booking a trip<br>• 🔐 Login / Sign up<br>• 🌿 Eco & IoT features<br>• 👥 About the team<br><br>What would you like to know?",
    "💬 Try asking me about destinations, prices, booking, or our eco features! I'm here to help 😊",
    "🌿 I can answer questions about GreenPass destinations, pricing, booking process, AI features, and more. What's on your mind?",
  ]
};

function getReply(msg) {
  const m = msg.toLowerCase();
  for (const [key, keywords] of Object.entries(chatResponses)) {
    if (keywords.some(k => m.includes(k))) {
      const arr = replies[key];
      return arr[Math.floor(Math.random() * arr.length)];
    }
  }
  const arr = replies.default;
  return arr[Math.floor(Math.random() * arr.length)];
}

function createChatbot() {
  const html = `
  <div id="chatbot-btn" onclick="toggleChat()" title="Chat with AI">
    <span id="chat-icon">💬</span>
    <span id="chat-badge" style="display:none">1</span>
  </div>
  <div id="chatbot-box">
    <div id="chat-header">
      <div id="chat-header-info">
        <div id="chat-avatar">🤖</div>
        <div>
          <div id="chat-name">GreenPass AI</div>
          <div id="chat-status"><span class="dot"></span> Online</div>
        </div>
      </div>
      <button onclick="toggleChat()" id="chat-close">✕</button>
    </div>
    <div id="chat-messages" id="chatMessages"></div>
    <div id="chat-suggestions">
      <button onclick="quickAsk('What destinations are available?')">🗺️ Destinations</button>
      <button onclick="quickAsk('What is the price?')">💰 Pricing</button>
      <button onclick="quickAsk('How do I book?')">📅 Booking</button>
      <button onclick="quickAsk('Tell me about eco features')">🌿 Eco</button>
    </div>
    <div id="chat-input-row">
      <input type="text" id="chat-input" placeholder="Ask me anything..." onkeydown="if(event.key==='Enter')sendMsg()"/>
      <button onclick="sendMsg()" id="chat-send">➤</button>
    </div>
  </div>`;

  const wrapper = document.createElement('div');
  wrapper.innerHTML = html;
  document.body.appendChild(wrapper);

  // Add styles
  const style = document.createElement('style');
  style.textContent = `
    #chatbot-btn {
      position:fixed; bottom:28px; right:28px; width:58px; height:58px;
      background:linear-gradient(135deg,#16a34a,#15803d);
      border-radius:50%; display:flex; align-items:center; justify-content:center;
      font-size:1.5rem; cursor:pointer; z-index:9999;
      box-shadow:0 8px 24px rgba(22,163,74,0.4);
      transition:transform 0.2s;
    }
    #chatbot-btn:hover { transform:scale(1.1); }
    #chat-badge {
      position:absolute; top:-4px; right:-4px; background:#ef4444;
      color:#fff; border-radius:50%; width:18px; height:18px;
      font-size:0.65rem; font-weight:700; display:flex;
      align-items:center; justify-content:center;
    }
    #chatbot-box {
      position:fixed; bottom:100px; right:28px; width:360px;
      background:#fff; border-radius:18px; box-shadow:0 20px 60px rgba(0,0,0,0.2);
      z-index:9998; display:none; flex-direction:column;
      overflow:hidden; font-family:'Inter',sans-serif;
      border:1px solid #e5e7eb; max-height:520px;
    }
    #chatbot-box.open { display:flex; animation:slideUp 0.3s ease; }
    @keyframes slideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
    #chat-header {
      background:linear-gradient(135deg,#16a34a,#15803d);
      padding:14px 18px; display:flex; align-items:center;
      justify-content:space-between;
    }
    #chat-header-info { display:flex; align-items:center; gap:10px; }
    #chat-avatar {
      width:38px; height:38px; background:rgba(255,255,255,0.2);
      border-radius:50%; display:flex; align-items:center;
      justify-content:center; font-size:1.2rem;
    }
    #chat-name { color:#fff; font-weight:700; font-size:0.92rem; }
    #chat-status { color:rgba(255,255,255,0.8); font-size:0.72rem; display:flex; align-items:center; gap:4px; }
    .dot { width:7px; height:7px; background:#6ee7b7; border-radius:50%; display:inline-block; }
    #chat-close { background:rgba(255,255,255,0.2); border:none; color:#fff; width:28px; height:28px; border-radius:50%; cursor:pointer; font-size:0.85rem; }
    #chat-messages {
      flex:1; overflow-y:auto; padding:16px; display:flex;
      flex-direction:column; gap:10px; min-height:200px; max-height:300px;
    }
    .msg { max-width:82%; padding:10px 14px; border-radius:14px; font-size:0.85rem; line-height:1.6; }
    .msg.bot { background:#f0fdf4; color:#1a1a2e; border-bottom-left-radius:4px; align-self:flex-start; border:1px solid #dcfce7; }
    .msg.user { background:linear-gradient(135deg,#16a34a,#15803d); color:#fff; border-bottom-right-radius:4px; align-self:flex-end; }
    .msg.typing { background:#f0fdf4; border:1px solid #dcfce7; align-self:flex-start; }
    #chat-suggestions { padding:8px 12px; display:flex; gap:6px; flex-wrap:wrap; border-top:1px solid #f0fdf4; }
    #chat-suggestions button {
      background:#f0fdf4; border:1px solid #dcfce7; color:#16a34a;
      padding:5px 10px; border-radius:20px; font-size:0.72rem;
      cursor:pointer; font-weight:600; transition:all 0.2s; font-family:inherit;
    }
    #chat-suggestions button:hover { background:#16a34a; color:#fff; }
    #chat-input-row { display:flex; padding:12px; gap:8px; border-top:1px solid #e5e7eb; }
    #chat-input {
      flex:1; padding:10px 14px; border:1.5px solid #e5e7eb;
      border-radius:24px; font-size:0.88rem; outline:none;
      font-family:inherit; transition:border-color 0.2s;
    }
    #chat-input:focus { border-color:#16a34a; }
    #chat-send {
      width:38px; height:38px; background:linear-gradient(135deg,#16a34a,#15803d);
      border:none; border-radius:50%; color:#fff; cursor:pointer;
      font-size:1rem; display:flex; align-items:center; justify-content:center;
    }
    @media(max-width:480px){
      #chatbot-box { width:calc(100vw - 32px); right:16px; bottom:90px; }
      #chatbot-btn { right:16px; bottom:16px; }
    }
  `;
  document.head.appendChild(style);

  // Welcome message after 1.5s
  setTimeout(() => {
    addMsg('bot', "👋 Hi! I'm <b>GreenPass AI</b> — your smart travel assistant!<br>Ask me about destinations, pricing, booking, or anything about our platform 🌿");
    document.getElementById('chat-badge').style.display = 'flex';
  }, 1500);
}

function toggleChat() {
  const box = document.getElementById('chatbot-box');
  box.classList.toggle('open');
  document.getElementById('chat-badge').style.display = 'none';
  if (box.classList.contains('open')) {
    document.getElementById('chat-icon').textContent = '✕';
    setTimeout(() => document.getElementById('chat-input').focus(), 300);
  } else {
    document.getElementById('chat-icon').textContent = '💬';
  }
}

function addMsg(type, text) {
  const msgs = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = 'msg ' + type;
  div.innerHTML = text;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
  return div;
}

function sendMsg() {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text) return;
  addMsg('user', text);
  input.value = '';

  // Typing indicator
  const typing = addMsg('typing', '● ● ●');
  setTimeout(() => {
    typing.remove();
    addMsg('bot', getReply(text));
  }, 800 + Math.random() * 400);
}

function quickAsk(q) {
  document.getElementById('chat-input').value = q;
  sendMsg();
}

// Init on DOM ready
document.addEventListener('DOMContentLoaded', createChatbot);
