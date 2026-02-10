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
  shareLink.value =
    `${base}proposal.html?msg=${msg}&from=${from}&email=${email}`;

  linkBox.classList.remove("hidden");
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

  // Music (safe)
  const music = document.getElementById("music");
  if (music) music.volume = 0.5;

  // 🌸 Petals
  createPetals();

  // 😈 NO button
  const noBtn = document.getElementById("noBtn");
  if (noBtn) {
    noBtn.addEventListener("mouseenter", () => {
      noBtn.style.left = Math.random() * (window.innerWidth - 120) + "px";
      noBtn.style.top = Math.random() * (window.innerHeight - 80) + "px";
    });
  }

  // 💖 YES button
  const yesBtn = document.getElementById("yesBtn");
  const result = document.getElementById("result");
  const replyText = document.getElementById("replyText");
  const certBtn = document.getElementById("downloadCert");

  if (yesBtn) {
    yesBtn.addEventListener("click", () => {
      result.classList.remove("hidden");
      result.innerText = "YAYYYY 💖 I knew you’d say yes!";

      if (music) music.play().catch(() => {});
      startConfetti();
      certBtn.classList.remove("hidden");

      // 📩 Email response
      if (email) {
        const body = `
She said YES 💖

Her reply:
"${replyText.value || "💖"}"

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

  // 📜 Certificate
  certBtn.addEventListener("click", () => {
    downloadCertificate(
      decodeURIComponent(from || "Your Love"),
      replyText.value
    );
  });
});

// ===============================
// 🌸 PETALS
// ===============================
function createPetals() {
  const container = document.getElementById("petals");
  if (!container) return;

  setInterval(() => {
    const petal = document.createElement("img");
    petal.src = "assets/petal.png";
    petal.className = "petal";
    petal.style.left = Math.random() * 100 + "vw";
    petal.style.animationDuration = 6 + Math.random() * 5 + "s";
    container.appendChild(petal);

    setTimeout(() => petal.remove(), 12000);
  }, 500);
}

// ===============================
// 🎉 CONFETTI
// ===============================
function startConfetti() {
  const canvas = document.getElementById("confetti");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  canvas.width = innerWidth;
  canvas.height = innerHeight;

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

// ===============================
// 📜 CERTIFICATE
// ===============================
function downloadCertificate(name, reply) {
  const canvas = document.createElement("canvas");
  canvas.width = 800;
  canvas.height = 500;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#fff0f5";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#e91e63";
  ctx.font = "36px serif";
  ctx.fillText("💖 CERTIFICATE OF YES 💖", 160, 100);

  ctx.font = "24px serif";
  ctx.fillText(`This certifies that`, 300, 180);
  ctx.fillText(name, 330, 220);
  ctx.fillText(`received a YES 💘`, 290, 260);

  if (reply) {
    ctx.font = "18px serif";
    ctx.fillText(`"${reply}"`, 200, 320);
  }

  ctx.font = "16px serif";
  ctx.fillText(new Date().toDateString(), 330, 380);

  const link = document.createElement("a");
  link.download = "yes-certificate.png";
  link.href = canvas.toDataURL();
  link.click();
}
