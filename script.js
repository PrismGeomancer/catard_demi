const loader = document.querySelector('#loader');
const loadCount = document.querySelector('#loadCount');
let life = 9;
const countdown = setInterval(() => {
  life -= 1;
  loadCount.textContent = Math.max(life, 1);
  if (life <= 1) clearInterval(countdown);
}, 115);

window.addEventListener('load', () => {
  setTimeout(() => loader.classList.add('done'), 1150);
});

const nav = document.querySelector('#nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 40), { passive: true });

const rugTrack = document.querySelector('#rugTrack');
const trackProgress = document.querySelector('#trackProgress');
rugTrack.addEventListener('scroll', () => {
  const max = rugTrack.scrollWidth - rugTrack.clientWidth;
  const progress = max ? rugTrack.scrollLeft / max : 0;
  trackProgress.style.width = `${12.5 + progress * 87.5}%`;
}, { passive: true });

let isDown = false;
let dragStart = 0;
let scrollStart = 0;
rugTrack.addEventListener('pointerdown', event => {
  isDown = true;
  dragStart = event.clientX;
  scrollStart = rugTrack.scrollLeft;
  rugTrack.setPointerCapture(event.pointerId);
});
rugTrack.addEventListener('pointermove', event => {
  if (isDown) rugTrack.scrollLeft = scrollStart - (event.clientX - dragStart);
});
rugTrack.addEventListener('pointerup', () => isDown = false);
rugTrack.addEventListener('pointercancel', () => isDown = false);

const mapTitle = document.querySelector('#mapTitle');
const mapNote = document.querySelector('#mapNote');
document.querySelectorAll('.pin').forEach(pin => pin.addEventListener('click', () => {
  document.querySelectorAll('.pin').forEach(item => item.classList.remove('active'));
  pin.classList.add('active');
  mapTitle.textContent = pin.dataset.location;
  mapNote.textContent = pin.dataset.note;
}));

const betRange = document.querySelector('#betRange');
const betAmount = document.querySelector('#betAmount');
const balance = document.querySelector('#balance');
const gameResult = document.querySelector('#gameResult');
betRange.addEventListener('input', () => betAmount.textContent = `$${betRange.value}`);

document.querySelector('#apeBtn').addEventListener('click', () => {
  const amount = Number(betRange.value);
  balance.textContent = `$${(500 - amount).toFixed(2)}`;
  gameResult.textContent = amount === 500
    ? 'MAXIMUM CATARD. Position opened. Dignity closed.'
    : `$${amount} deployed. Suspiciously responsible by CATARD standards.`;
  gameResult.classList.add('show');
});

document.querySelector('#keepBtn').addEventListener('click', () => {
  balance.textContent = '$500.00';
  gameResult.textContent = 'You kept the cash. CATARD does not understand this ending.';
  gameResult.classList.add('show');
});

const copyButton = document.querySelector('#copyCa');
copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(copyButton.dataset.address);
    copyButton.textContent = 'COPIED ✓';
  } catch {
    copyButton.textContent = 'CA: ' + copyButton.dataset.address;
  }
  setTimeout(() => copyButton.textContent = 'COPY CONTRACT', 1800);
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.animate([
        { opacity: 0, transform: 'translateY(35px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], { duration: 650, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'both' });
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: .12 });

document.querySelectorAll('section:not(.hero) h2, .rug-card, .terminal, .phone, .chat').forEach(el => revealObserver.observe(el));
