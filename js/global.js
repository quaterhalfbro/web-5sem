// load time
(() => {
  const loadTimeSpan = document.querySelector('.load-time');
  window.addEventListener('load', () => {
    const pageEnd = performance.mark('pageEnd');
    const loadTime = pageEnd.startTime / 1000;
    loadTimeSpan.innerHTML += `Page loaded in ${loadTime}s.`;
  });
})();

// change style of active nav link
const currentLocation = document.location.href.split('/').pop().split('.')[0];

const linksMapping = {
  index: 'home',
  users: 'users',
};

const links = document.querySelectorAll('.nav__link');
links.forEach((link) => {
  if (link.innerHTML.toLowerCase() === linksMapping[currentLocation]) {
    link.classList.add('nav__link_active');
  }
});
