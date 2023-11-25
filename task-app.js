//variables
let searchInput = document.querySelector("#searchInput");
let closeIcon = document.querySelector("#closeIcon");
let tableBody = document.querySelector("#tableBody");

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



const upDateUi = () => {
    tableHeadings.innerHTML = `
      <th class="serial-num">S/N</th>
            <th class="description">Description</th>
            <th class="status">Status</th>
            <th class="date">Date</th>
            <th class="priority">priority</th>
            <th class="icon">icon</th>
      `;
    data.map((task, index) => {
      let tr = document.createElement("tr");
      tr.setAttribute('class', 'border-bottom');
      tr.innerHTML += `
    <td>${index + 1}</td>
    <td>${task.description}</td>
    <td><button class = ${task.priority.toLowerCase()}>${task.status}</button></td>
    <td>${task.date}</td>
    <td><button class = ${task.status.toLowerCase()}>${task.priority}</button></td>
    <td><img src=${"./images/vertical-dots.svg"} alt="three dot icon" class="vertical-icon"><td>
    `;
      console.log(tr)
      tableBody.appendChild(tr);
    });
  }



document.addEventListener('DOMContentLoaded', () => {
  upDateUi();
})

//search functionality

let filteredList = [];

let tableHeadingContainer = document.querySelector("#tableHeadingContainer");
let tableHeadings = document.querySelector("#tableHeadings");

const upDateFilteredUi = () => {
  tableBody.innerHTML = "";
  tableHeadings.innerHTML = "";
  if (filteredList.length > 0) {
    filteredList.map((task, index) => {
      //i want to empty the empty state element when the array is being filtered
      emptyState.innerHTML = "";
      
      //as the filteredList array is being filtered i want to show the thead element content
      tableHeadings.innerHTML = `
      <th class="serial-num">S/N</th>
            <th class="description">Description</th>
            <th class="status">Status</th>
            <th class="date">Date</th>
            <th class="priority">priority</th>
            <th class="icon">icon</th>
      `;

      //create and append the tr element to the tbody element
      let tr = document.createElement("tr");
      tr.setAttribute("class", "border-bottom");
      tr.innerHTML += `
      <td>${index + 1}</td>
      <td>${task.description}</td>
      <td><button class = ${task.priority.toLowerCase()}>${
        task.status
      }</button></td>
      <td>${task.date}</td>
      <td><button class=${`${task.status.toLowerCase()}`}>${
        task.priority
      }</button></td>
      <td><img src=${"./images/vertical-dots.svg"} alt="three dot icon" class="vertical-icon"><td>
      `;
      console.log(tr)
      tableBody.appendChild(tr);
    });
  }
  
  if (filteredList.length <= 0) {
    let emptyState = document.querySelector("#emptyState");
    emptyState.innerHTML = `
    <img src="./images/icon-search-1 (1).svg" alt="icon search for empty states" class="empty-state-search-icon">
    <h4>No Result for "${searchInput.value}"</h4>
    <span>check the spelling or try a new search</span>
    `;
  }
};


searchInput.addEventListener("input", (e) => {
  let value = e.target.value.trim();

  filteredList = data.filter((obj) => {
      return obj.description.toLowerCase().includes(value.toLowerCase());
  });
   upDateFilteredUi();
});


