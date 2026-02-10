// ---------- Landing Page ----------
function generateLink() {
  const msg = encodeURIComponent(document.getElementById("message").value);
  const from = encodeURIComponent(document.getElementById("fromName").value);

  if (!msg) return alert("Write something romantic 😌");

  const link = `${window.location.origin}${window.location.pathname.replace("index.html", "")}proposal.html?msg=${msg}&from=${from}`;

  document.getElementById("linkBox").classList.remove("hidden");
  document.getElementById("shareLink").value = link;
}

// ---------- Proposal Page ----------
const params = new URLSearchParams(window.location.search);
const message = params.get("msg");
const from = params.get("from");

if (message) {
  document.getElementById("proposalMessage").innerText = decodeURIComponent(message);
}
if (from) {
  document.getElementById("fromText").innerText = `— ${decodeURIComponent(from)} 💌`;
}

// NO button logic 😈
const noBtn = document.getElementById("noBtn");
if (noBtn) {
  noBtn.addEventListener("mouseover", () => {
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 50);
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
  });
}

// YES button logic 💖
const yesBtn = document.getElementById("yesBtn");
if (yesBtn) {
  yesBtn.addEventListener("click", () => {
    document.getElementById("result").classList.remove("hidden");
    document.getElementById("result").innerText = "YAYYYY 💖 I knew you’d say yes!";

    document.getElementById("music")?.play();
    startConfetti();
  });
}

// ---------- Confetti ----------
function startConfetti() {
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const confetti = Array.from({ length: 150 }).map(() => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 6 + 4,
    d: Math.random() * 20,
  }));

  let angle = 0;

  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    confetti.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "#e91e63";
      ctx.fill();
    });
    update();
  }

  function update() {
    angle += 0.01;
    confetti.forEach(p => {
      p.y += Math.cos(angle + p.d) + 1;
      p.x += Math.sin(angle);
      if (p.y > canvas.height) p.y = 0;
    });
  }

  setInterval(draw, 20);
}
