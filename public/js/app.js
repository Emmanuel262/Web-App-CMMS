const customSlider = document.getElementById("custom-slider");
const currentValue = document.getElementById('current-value');
customSlider.addEventListener("input", function(e) {
  e.preventDefault();

  let value = e.target.value;
  currentValue.innerText = value;
  currentValue.classList.add("active");
  currentValue.style.left = `${value/2}%`;
});

customSlider.addEventListener("blur", function(e) {
  e.preventDefault();
  currentValue.classList.remove("active");
});