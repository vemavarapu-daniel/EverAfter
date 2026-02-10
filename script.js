// ===============================
// LANDING PAGE
// ===============================
function generateLink() {
  const msgInput = document.getElementById("message");
  const fromInput = document.getElementById("fromName");
  const linkBox = document.getElementById("linkBox");
  const shareLink = document.getElementById("shareLink");

  if (!msgInput) return;

  const msg = encodeURIComponent(msgInput.value.trim());
  const from = encodeURIComponent(fromInput.value.trim());

  if (!msg) {
    alert("Write something romantic 😌");
    return;
  }

  const base = window.location.href.replace("index.html", "");
  const link = `${base}proposal.html?msg=${msg}&from=${from}`;

  linkBox.classList.remove("hidden");
  shareLink.value = link;
}

// ===============================
// PROPOSAL PAGE
// ===============================
document.addEventListener("DOMContentLoaded", () => {

  const params = new URLSearchParams(window.location.search);

  const messageEl = document.getElementById("proposalMessage");
  const fromEl = document.getElementById("fromText");

  if (messageEl && params.get("msg")) {
    messageEl.innerText = decodeURIComponent(params.get("msg"));
  }

  if (fromEl && params.get("from")) {
    fromEl.innerText = `— ${decodeURIComponent(params.get("from"))} 💌`;
  }

  // MUSIC (SAFE)
 // const music = document.getElementById("music");
 // if (music) music.volume = 0.5;

  // NO BUTTON 😈
  const noBtn = document.getElementById("noBtn");
  if (noBtn) {
    noBtn.addEventListener("mouseenter", () => {
      const x = Math.random() * (window.innerWidth - 120);
      const y = Math.random() * (window.innerHeight - 80);
      noBtn.style.left = `${x}px`;
      noBtn.style.top = `${y}px`;
    });
  }

  // YES BUTTON 💖
  const yesBtn = document.getElementById("yesBtn");
  const result = document.getElementById("result");

  if
