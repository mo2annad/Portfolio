const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const header = document.querySelector(".site-header");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

menuBtn?.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

const revealItems = document.querySelectorAll(".section-heading, .about-copy, .stats, .skill-card, .timeline-item, .project-card, .languages, .contact-inner");
revealItems.forEach((item, index) => {
  item.classList.add("reveal");
  item.style.transitionDelay = `${(index % 4) * 70}ms`;
});

if (reduceMotion) {
  revealItems.forEach(item => item.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => revealObserver.observe(item));
}

window.addEventListener("scroll", () => {
  header?.classList.toggle("scrolled", window.scrollY > 12);
}, { passive: true });

const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll('.nav-links a[href^="#"]');
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(item => item.classList.toggle("active", item.getAttribute("href") === `#${entry.target.id}`));
    }
  });
}, { rootMargin: "-35% 0px -55%" });
sections.forEach(section => sectionObserver.observe(section));

if (!reduceMotion) {
  window.addEventListener("pointermove", event => {
    document.body.style.setProperty("--mouse-x", `${event.clientX}px`);
    document.body.style.setProperty("--mouse-y", `${event.clientY}px`);
  }, { passive: true });

  const codeCard = document.querySelector(".code-card");
  codeCard?.addEventListener("pointermove", event => {
    const bounds = codeCard.getBoundingClientRect();
    const rotateY = ((event.clientX - bounds.left) / bounds.width - .5) * 8;
    const rotateX = ((event.clientY - bounds.top) / bounds.height - .5) * -8;
    codeCard.style.setProperty("--rotate-x", `${rotateX}deg`);
    codeCard.style.setProperty("--rotate-y", `${rotateY}deg`);
  });
  codeCard?.addEventListener("pointerleave", () => {
    codeCard.style.setProperty("--rotate-x", "0deg");
    codeCard.style.setProperty("--rotate-y", "0deg");
  });
}

document.getElementById("year").textContent = new Date().getFullYear();
