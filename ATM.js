let currentLang = 'en';
let balance = 0;
let transactions = [];

const translations = {
  en: {
    faceTitle: "Face Authentication",
    faceBtn: "Capture Face",
    faceStatusMatch: "Face matched successfully! Please proceed.",
    faceStatusNoMatch: "Fake person detected!",
    fpTitle: "Upload Fingerprint",
    fpBtn: "Verify Fingerprint",
    fpStatus: "Fingerprint verified!",
    loginTitle: "Login",
    loginBtn: "Login",
    loginStatusSuccess: "Login successful!",
    loginStatusFail: "Invalid User ID or PIN",
    atmTitle: "ATM Services",
    depositBtn: "Deposit",
    withdrawBtn: "Withdraw",
    balanceBtn: "Check Balance",
    historyBtn: "Transaction History",
    depositSuccess: "Amount deposited.",
    withdrawSuccess: "Amount withdrawn.",
    withdrawFail: "Insufficient balance!",
    currentBalance: "Current Balance: ₹",
    transactionHistory: "Transaction History"
  },
  ta: {
    faceTitle: "முகம் சரிபார்ப்பு",
    faceBtn: "முகத்தை பிடிக்கவும்",
    faceStatusMatch: "முகம் வெற்றிகரமாக பொருந்தியது! தொடரவும்.",
    faceStatusNoMatch: "தவறான நபர் கண்டறியப்பட்டது!",
    fpTitle: "கையொப்பத்தை பதிவேற்றவும்",
    fpBtn: "கையொப்பத்தை சரிபார்க்கவும்",
    fpStatus: "கையொப்பம் சரிபார்க்கப்பட்டது!",
    loginTitle: "உள்நுழைவு",
    loginBtn: "உள்நுழைய",
    loginStatusSuccess: "வெற்றிகரமாக உள்நுழைந்தீர்கள்!",
    loginStatusFail: "தவறான ஐடி அல்லது பின்",
    atmTitle: "ஏடிஎம் சேவைகள்",
    depositBtn: "வைத்தல்",
    withdrawBtn: "பின்வாங்கல்",
    balanceBtn: "இருப்பு",
    historyBtn: "பணப்பரிமாற்ற வரலாறு",
    depositSuccess: "தொகை வைக்கப்பட்டது.",
    withdrawSuccess: "தொகை எடுத்துவைக்கப்பட்டது.",
    withdrawFail: "போதிய இருப்பு இல்லை!",
    currentBalance: "தற்போதைய இருப்பு: ₹",
    transactionHistory: "பணப்பரிமாற்ற வரலாறு"
  }
};

// Change language
function setLanguage() {
  currentLang = document.getElementById("language").value;
  const t = translations[currentLang];
  document.getElementById("face-title").innerText = t.faceTitle;
  document.getElementById("face-btn").innerText = t.faceBtn;
  document.getElementById("fp-title").innerText = t.fpTitle;
  document.getElementById("fp-btn").innerText = t.fpBtn;
  document.getElementById("login-title").innerText = t.loginTitle;
  document.getElementById("login-btn").innerText = t.loginBtn;
  document.getElementById("atm-title").innerText = t.atmTitle;
  document.getElementById("deposit-btn").innerText = t.depositBtn;
  document.getElementById("withdraw-btn").innerText = t.withdrawBtn;
  document.getElementById("balance-btn").innerText = t.balanceBtn;
  document.getElementById("history-btn").innerText = t.historyBtn;
}

// Start webcam
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    document.getElementById('video').srcObject = stream;
  })
  .catch(err => console.error("Camera error:", err));

// Simulated Face Capture
function captureFace() {
  const canvas = document.getElementById("canvas");
  const video = document.getElementById("video");
  const context = canvas.getContext("2d");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Simulate success always
  const t = translations[currentLang];
  const status = document.getElementById("face-status");
  status.innerText = t.faceStatusMatch;
  status.style.color = "green";
  document.getElementById("fingerprint-section").classList.remove("hidden");
}

// Simulate fingerprint check
function verifyFingerprint() {
  const fileInput = document.getElementById("fingerprint");
  if (!fileInput.files[0]) {
    alert("Please upload fingerprint image.");
    return;
  }
  document.getElementById("fp-status").innerText = translations[currentLang].fpStatus;
  document.getElementById("login-section").classList.remove("hidden");
}

// Login
function login() {
  const userid = document.getElementById("userid").value;
  const pin = document.getElementById("pin").value;
  const t = translations[currentLang];
  if (userid === "1234" && pin === "0000") {
    document.getElementById("login-status").innerText = t.loginStatusSuccess;
    document.getElementById("atm-section").classList.remove("hidden");
  } else {
    document.getElementById("login-status").innerText = t.loginStatusFail;
  }
}

// ATM actions
function deposit() {
  const amount = prompt("Enter amount to deposit:");
  if (amount && !isNaN(amount)) {
    balance += parseFloat(amount);
    transactions.push(`+ ₹${amount}`);
    document.getElementById("atm-status").innerText = translations[currentLang].depositSuccess;
  }
}

function withdraw() {
  const amount = prompt("Enter amount to withdraw:");
  if (amount && !isNaN(amount)) {
    if (parseFloat(amount) <= balance) {
      balance -= parseFloat(amount);
      transactions.push(`- ₹${amount}`);
      document.getElementById("atm-status").innerText = translations[currentLang].withdrawSuccess;
    } else {
      document.getElementById("atm-status").innerText = translations[currentLang].withdrawFail;
    }
  }
}

function checkBalance() {
  document.getElementById("atm-status").innerText = translations[currentLang].currentBalance + balance.toFixed(2);
}

function viewHistory() {
  const historyDiv = document.getElementById("history");
  historyDiv.innerHTML = `<strong>${translations[currentLang].transactionHistory}:</strong><br>${transactions.join("<br>")}`;
}
