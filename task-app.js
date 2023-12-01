//variables
const searchInput = document.querySelector("#searchInput");
const closeIcon = document.querySelector("#closeIcon");
const tableBody = document.querySelector("#tableBody");

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


document.addEventListener('DOMContentLoaded', () => {
  filteredList.filterByDescription('')
})

//search functionality

const filteredList = {
  list: [],
  filterByDescription: (query) => {
    filteredList.list = data.filter(({ description }) => {
      return description.toLowerCase().includes(query.toLowerCase());
    });
    upDateFilteredUi();
  },
  filterByStatus: (query) => {
    filteredList.list = data.filter(({ status }) => {
      return status.toLowerCase().includes(query.toLowerCase().replace(/\s/g, ""));
    });
    upDateFilteredUi();
  },
};


 const tableHeadingContainer = document.querySelector("#tableHeadingContainer");
 const tableHeadings = document.querySelector("#tableHeadings");

const upDateFilteredUi = () => {
  tableBody.innerHTML = "";
  tableHeadings.innerHTML = "";
  if (filteredList.list.length > 0) {
    filteredList.list.map((task, index) => {
      //i want to empty the empty state element when the array is being filtered
      emptyState.innerHTML = "";
      
      //as the filteredList array is being filtered i want to show the thead element content
      tableHeadings.innerHTML = `
      <th class="serial-num">S/N</th>
            <th class="description">Description</th>
            <th class="status">Status</th>
            <th class="date">Date</th>
            <th class="priority">priority</th>
            <th class="icon"></th>
      `;

      //create and append the tr element to the tbody element
      let tr = document.createElement("tr");
      tr.innerHTML += `
      <td>${index + 1}</td>
      <td>${task.description}</td>
      <td><button class = "round-btn  ${task.status.toLowerCase()}">${
        task.status
      }</button></td>
      <td>${task.date}</td>
      <td><button class="round-btn ${task.priority.toLowerCase()}">${
        task.priority
      }</button></td>
      <td><span class="vertical-icon">&#8942;</span><td>
      `;
      tableBody.appendChild(tr);
    });
  }
  
  if (filteredList.list.length <= 0) {
    let emptyState = document.querySelector("#emptyState");
    emptyState.innerHTML = `
    <img src="./images/icon-search.svg" alt="icon search for empty states" class="empty-state-search-icon">
    <h4>No Result for "${searchInput.value}"</h4>
    <span>check the spelling or try a new search</span>
    `;
  }
};

closeIcon.addEventListener('click', () => {
  filteredList.filterByDescription('');
})

searchInput.addEventListener("input", (e) => {
  filteredList.filterByDescription(e.target.value.trim());
});


//filter by status functionality
let buttons = document.querySelectorAll("div#statusBtns button");

  for (btn in buttons) {
        
    buttons[btn].onclick = function() {
        buttons.forEach((btn)=>{
        btn.classList.remove('highlight');
        })
        this.classList.add('highlight');
    }
}

buttons.forEach((statusBtn) => {
  statusBtn.addEventListener('click', (e) => {
    let text = e.target.textContent.toLowerCase();
    if (text == "all") {
      filteredList.filterByStatus("");
    } else {
      filteredList.filterByStatus(text);
    }
  })
})