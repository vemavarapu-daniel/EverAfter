// -------------------------
// LANDING PAGE LOGIC
// -------------------------
function generateLink() {
  const messageInput = document.getElementById("message");
  const fromInput = document.getElementById("fromName");
  const linkBox = document.getElementById("linkBox");
  const shareLink = document.getElementById("shareLink");

  if (!messageInput) return;

  const msg = encodeURIComponent(messageInput.value.trim());
  const from = encodeURIComponent(fromInput.value.trim());

  if (!msg) {
    alert("Write something romantic 😌");
    return;
  }

  const basePath = window.location.href.replace("index.html", "");
  const link = `${basePath}proposal.html?msg=${msg}&from=${from}`;

  linkBox.classList.remove("hidden");
  shareLink.value = link;
}

// -------------------------
// PROPOSAL PAGE LOGIC
// -------------------------
const params = new URLSearchParams(window.location.search);
const message = params.get("msg");
const from = params.get("from");

// Message rendering
const messageEl = document.getElementById("proposalMessage");
const fromEl = document.getElementById("fromText");

if (messageEl && message) {
  messageEl.innerText = decodeURIComponent(message);
}

if (fromEl && from) {
  fromEl.innerText = `— ${decodeURIComponent(from)} 💌`;
}

// -------------------------
// MUSIC (SAFE)
// -------------------------
const music = document.getElementById("music");
if (music) {
  music.volume = 0.5;
}

// -------------------------
// NO BUTTON EVASION 😈
// -------------------------
const noBtn = document.getElementById("noBtn");
if (noBtn) {
  noBtn.addEventListener("mouseenter", () => {
    const padding = 80;
    const x = Math.random() * (window.innerWidth - padding);
    const y = Math.random() * (window.innerHeight - padding);

    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
  });
}

// -------------------------
// YES BUTTON 💖
// -------------------------
const yesBtn = document.getElementById("yesBtn");
const result = document.getElementById("result");

if (yesBtn) {
  yesBtn.addEventListener("click", () => {
    if (result) {
      result.classList.remove("hidden");
      result.innerText = "YAYYYY 💖 I knew you’d say yes!";
    }

    if (music) music.play();
    startConfetti();
  });
}

// -------------------------
// CONFETTI 🎉
// -------------------------
function startConfetti() {
  const canvas = document.getElementById("confetti");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = Array.from({ length: 160 }).map(() => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 6 + 4,
    dx: Math.random() - 0.5,
    dy: Math.random() * 3 + 2
  }));

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pieces.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "#e91e63";
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;

      if (p.y > canvas.height) p.y = -10;
    });

    requestAnimationFrame(animate);
  }

  animate();
}
