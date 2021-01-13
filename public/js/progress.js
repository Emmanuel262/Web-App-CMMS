const progress = document.querySelector('.progress-done');
const data = progress.getAttribute('data-done');

setTimeout(() => {
  progress.style.width = data + '%';
  progress.style.opacity = 1;
  progress.innerHTML = data + '%';
}, 500)