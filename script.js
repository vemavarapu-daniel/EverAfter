const app = document.getElementById("app");
const params = new URLSearchParams(window.location.search);

const name = params.get("name");
const letter = params.get("letter");
const answer = params.get("answer");

const music = document.getElementById("bgMusic");
music.volume = 0.4;
document.body.addEventListener("click", () => music.play(), { once: true });

// 🌸 Flower petals generator
const petals = document.querySelector(".petals");
for (let i = 0; i < 25; i++) {
  const p = document.createElement("span");
  p.innerText = "🌸";
  p.style.left = Math.random() * 100 + "vw";
  p.style.animationDuration = 5 + Math.random() * 5 + "s";
  petals.appendChild(p);
}

// 🧠 Page Logic
if (!name) {
  app.innerHTML = `
    <h2>Hi 💖</h2>
    <p>Who are you proposing to?</p>
    <input id="nameInput" placeholder="Her Name">
    <textarea id="letterInput" placeholder="Write your love letter here 💌"></textarea>
    <button onclick="createLink()">Create Proposal 🌹</button>
  `;
}

else if (!answer) {
  app.innerHTML = `
    <h2>${name} 💕</h2>
    <p>${letter}</p>
    <p>Will you be mine forever? 💍</p>
    <button onclick="respond('yes')">💖 Yes</button>
    <button id="noBtn">💔 No</button>
  `;

  const noBtn = document.getElementById("noBtn");
  noBtn.addEventListener("mouseover", () => {
    noBtn.style.left = Math.random() * 80 + "vw";
    noBtn.style.top = Math.random() * 80 + "vh";
  });
}

else {
  app.innerHTML = `
    <h2>${name}</h2>
    <p>${answer === "yes" ? "💖 SHE SAID YES 💖" : "💔 She said no"}</p>
    <p>${answer === "yes" ? "Forever begins now ✨" : "Love is patient 🌙"}</p>
  `;

  if (answer === "yes") startConfetti();
}

// 🔗 Functions
function createLink() {
  const n = document.getElementById("nameInput").value.trim();
  const l = document.getElementById("letterInput").value.trim();
  if (!n || !l) return alert("Both are required 💕");
  window.location.href = `?name=${encodeURIComponent(n)}&letter=${encodeURIComponent(l)}`;
}

function respond(ans) {
  window.location.href = `?name=${encodeURIComponent(name)}&letter=${encodeURIComponent(letter)}&answer=${ans}`;
}

// 🎉 Confetti Explosion
function startConfetti() {
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = Array.from({ length: 200 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 6 + 2,
    d: Math.random() * 10
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ff4d6d";
    pieces.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      p.y += p.d;
      if (p.y > canvas.height) p.y = 0;
    });
    requestAnimationFrame(draw);
  }
  draw();
}
