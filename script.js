// ===============================
// GENERATE LINK (INDEX PAGE)
// ===============================
function generateLink() {
  const msgEl = document.getElementById("message");
  const fromEl = document.getElementById("fromName");
  const emailEl = document.getElementById("email");
  const linkBox = document.getElementById("linkBox");
  const shareLink = document.getElementById("shareLink");

  if (!msgEl || !emailEl) return;

  const msg = encodeURIComponent(msgEl.value.trim());
  const from = encodeURIComponent(fromEl.value.trim());
  const email = encodeURIComponent(emailEl.value.trim());

  if (!msg || !email) {
    alert("Please write a message and email 💌");
    return;
  }

  const base = window.location.href.replace("index.html", "");
  const link = `${base}proposal.html?msg=${msg}&from=${from}&email=${email}`;

  linkBox.classList.remove("hidden");
  shareLink.value = link;
}

// ===============================
// PROPOSAL PAGE
// ===============================
document.addEventListener("DOMContentLoaded", () => {

  const params = new URLSearchParams(window.location.search);

  const msg = params.get("msg");
  const from = params.get("from");
  const email = params.get("email");

  const msgEl = document.getElementById("proposalMessage");
  const fromEl = document.getElementById("fromText");

  if (msgEl && msg) msgEl.innerText = decodeURIComponent(msg);
  if (fromEl && from) fromEl.innerText = `— ${decodeURIComponent(from)} 💌`;

  // Music
  const music = document.getElementById("music");
  if (music) music.volume = 0.5;

  // NO button 😈
  const noBtn = document.getElementById("noBtn");
  if (noBtn) {
    noBtn.addEventListener("mouseenter", () => {
      noBtn.style.left = Math.random() * (window.innerWidth - 120) + "px";
      noBtn.style.top = Math.random() * (window.innerHeight - 80) + "px";
    });
  }

  // YES button 💖
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

      if (email) {
        const body = `
She said YES 💖

Proposal:
"${decodeURIComponent(msg)}"

Time:
${new Date().toLocaleString()}
        `.trim();

        window.location.href =
          `mailto:${decodeURIComponent(email)}?subject=She said YES 💖&body=${encodeURIComponent(body)}`;
      }
    });
  }
});

// ===============================
// CONFETTI 🎉
// ===============================
function startConfetti() {
  const canvas = document.getElementById("confetti");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = Array.from({ length: 150 }).map(() => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 6 + 4,
    dy: Math.random() * 3 + 2
  }));

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pieces.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "#e91e63";
      ctx.fill();
      p.y += p.dy;
      if (p.y > canvas.height) p.y = -10;
    });

    requestAnimationFrame(animate);
  }

  animate();
}
