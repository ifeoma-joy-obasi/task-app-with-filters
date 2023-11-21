//variables
let searchInput = document.querySelector("#searchInput");
let closeIcon = document.querySelector("#closeIcon");

searchInput.addEventListener('focus', () => {
    closeIcon.style.display = 'block'

})

searchInput.addEventListener("focusout", () => {
  closeIcon.style.display = "none";
});

closeIcon.addEventListener('mousedown', (e) => {
    e.preventDefault();
    searchInput.value = ''
    
})


