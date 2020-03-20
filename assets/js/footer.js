$(document).ready(function () {
  setDate();
});

function setDate() {
  var currentYear = document.querySelector('.full-year');
  if (currentYear) {
    currentYear.innerHTML = new Date().getFullYear();
  }
}
