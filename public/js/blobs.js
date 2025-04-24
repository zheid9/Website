document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector(".blobs-canvas");
  canvas.className = "blobs-canvas";
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  const resize = () => {
    const body = document.body;
    const html = document.documentElement;
    const height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );

    canvas.width = window.innerWidth;
    canvas.height = height;
  };

  window.addEventListener("resize", resize);
  resize();

  // Track mouse position for repulsion
  let mouseX = -1000,
    mouseY = -1000;
  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX + window.scrollX;
    mouseY = e.clientY + window.scrollY;
  });

  const colors = [
    "rgba(255, 0, 208, 0.1)",
    "rgba(58, 123, 255, 0.1)",
    "rgba(0, 255, 76, 0.1)",
  ];
  const blobs = Array.from({ length: 20 }).map(() => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 1.5,
    vy: (Math.random() - 0.5) * 1.5,
    radius: 2 + Math.random() * 200,
    color: colors[Math.floor(Math.random() * colors.length)],
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    blobs.forEach((b1, i) => {
      b1.x += b1.vx;
      b1.y += b1.vy;
      if (b1.vx > 1.5) {
        b1.vx -= 0.1;
      } else if (b1.vx < -1.5) {
        b1.vx += 0.1;
      }
      if (b1.vy > 1.5) {
        b1.vy -= 0.1;
      } else if (b1.vy < -1.5) {
        b1.vy += 0.1;
      }

      if (b1.x - b1.radius < 0 || b1.x + b1.radius > canvas.width) b1.vx *= -1;
      if (b1.y - b1.radius < 0 || b1.y + b1.radius > canvas.height) b1.vy *= -1;

      // Repel from mouse
      const dxm = b1.x - mouseX;
      const dym = b1.y - mouseY;
      const distm = Math.sqrt(dxm * dxm + dym * dym);
      if (distm < 150) {
        const force = (150 - distm) / 150;
        b1.vx += (dxm / distm) * force * 0.25;
        b1.vy += (dym / distm) * force * 0.25;
      }

      for (let j = i + 1; j < blobs.length; j++) {
        const b2 = blobs[j];
        const dx = b2.x - b1.x;
        const dy = b2.y - b1.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < b1.radius + b2.radius) {
          const angle = Math.atan2(dy, dx);
          const overlap = 0.5 * (b1.radius + b2.radius - dist + 1);
          b1.x -= Math.cos(angle) * overlap;
          b1.y -= Math.sin(angle) * overlap;
          b2.x += Math.cos(angle) * overlap;
          b2.y += Math.sin(angle) * overlap;
        }
      }

      ctx.beginPath();
      ctx.arc(b1.x, b1.y, b1.radius, 0, Math.PI * 2);
      ctx.fillStyle = b1.color;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  draw();
});
