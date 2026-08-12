(() => {
  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");
  const glow = document.querySelector(".cursor-glow");
  const canvas = document.getElementById("particles");
  if(!dot || !ring || !glow || !canvas) return;

  let mx = innerWidth / 2, my = innerHeight / 2;
  let dx = mx, dy = my, rx = mx, ry = my, gx = mx, gy = my;
  addEventListener("mousemove", (e) => {
    mx = e.clientX; my = e.clientY;
    document.documentElement.style.setProperty("--mx", `${mx}px`);
    document.documentElement.style.setProperty("--my", `${my}px`);
  });

  function loop(){
    dx += (mx - dx) * 0.75; dy += (my - dy) * 0.75;
    rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
    gx += (mx - gx) * 0.08; gy += (my - gy) * 0.08;
    dot.style.transform = `translate(${dx}px,${dy}px)`;
    ring.style.transform = `translate(${rx}px,${ry}px)`;
    glow.style.transform = `translate(${gx}px,${gy}px)`;
    requestAnimationFrame(loop);
  }
  loop();

  document.querySelectorAll("[data-cursor='hover']").forEach((el) => {
    el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
    el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
  });

  const ctx = canvas.getContext("2d");
  let w = canvas.width = innerWidth, h = canvas.height = innerHeight;
  addEventListener("resize", ()=>{ w = canvas.width = innerWidth; h = canvas.height = innerHeight; });

  const pts = Array.from({length: 52}, () => ({
    x: Math.random()*w, y: Math.random()*h, vx:(Math.random()-.5)*.35, vy:(Math.random()-.5)*.35
  }));

  function particles(){
    ctx.clearRect(0,0,w,h);
    for(let i=0;i<pts.length;i++){
      const p = pts[i];
      p.x += p.vx; p.y += p.vy;
      if(p.x<0||p.x>w) p.vx *= -1;
      if(p.y<0||p.y>h) p.vy *= -1;

      const mdx = p.x - mx;
      const mdy = p.y - my;
      const mDist = Math.hypot(mdx, mdy);
      if (mDist < 180 && mDist > 0) {
        const force = (180 - mDist) / 180;
        p.x += (mdx / mDist) * force * 1.2;
        p.y += (mdy / mDist) * force * 1.2;
      }

      ctx.fillStyle = "rgba(120,180,255,.55)";
      ctx.beginPath(); ctx.arc(p.x,p.y,1.6,0,Math.PI*2); ctx.fill();
      for(let j=i+1;j<pts.length;j++){
        const q = pts[j];
        const dxl = p.x - q.x;
        const dyl = p.y - q.y;
        const dist = Math.hypot(dxl,dyl);
        if(dist < 120){
          ctx.strokeStyle = `rgba(120,180,255,${0.14*(1-dist/120)})`;
          ctx.lineWidth = .5;
          ctx.beginPath();
          ctx.moveTo(p.x,p.y);
          ctx.lineTo(q.x,q.y);
          ctx.stroke();
        }
      }

      if (mDist < 150) {
        ctx.strokeStyle = `rgba(34,211,238,${0.2*(1-mDist/150)})`;
        ctx.lineWidth = .6;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mx, my);
        ctx.stroke();
      }
    }
    requestAnimationFrame(particles);
  }
  particles();
})();
