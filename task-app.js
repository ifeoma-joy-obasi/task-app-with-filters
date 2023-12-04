//variables
const searchInput = document.querySelector("#searchInput");
const closeIcon = document.querySelector("#closeIcon");
const tableBody = document.querySelector("#tableBody");
const buttons = document.querySelectorAll("div#statusBtns button");

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


//pagination functionality
const prevButton = document.querySelector("#prev");
const nextButton = document.querySelector("#next");

const ITEMS_PER_PAGE = 10;

const paginationButtonsFunctionality = () => {
  //disable buttons
  if (pagination.pageNumber == 1) {
    disablePrevButton();
  } else {
    prevButton.disabled = false;
    prevButton.style.opacity = 1;
  }

  if (pagination.pageNumber == 5) {
    nextButton.disabled = true;
    nextButton.style.opacity = 0.3;
  } else {
    nextButton.disabled = false;
    nextButton.style.opacity = 1;
  }

  document.querySelector("#totalPage").innerText = Math.ceil(
    data.length / ITEMS_PER_PAGE
  );
  document.querySelector("#currentPage").innerText = pagination.pageNumber;
  document.querySelector("#totalItems").innerText = `Of ${data.length}`;
  document.querySelector("#pageNumber").innerText = pagination.pageNumber;
}

const displayData = (dataList) => {
  filteredList.list = dataList.filter(({ description }) => {
    return description.toLowerCase().includes("");
  });
  upDateFilteredUi();

  paginationButtonsFunctionality();
};



const pagination = {
  pageNumber: 1,
  increasePageNumber: () => {
    pagination.pageNumber++;
    return pagination.pageNumber;
  },
  decreasePageNumber: () => {
    pagination.pageNumber--;
    return pagination.pageNumber;
  },
};
//disable button to startwith
const disablePrevButton = () => {
prevButton.disabled = true;
prevButton.style.opacity = 0.3;
  return prevButton;
}
disablePrevButton();

const paginate = (list, itemsPerPage, pageNumber) => {
  return list.slice((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage);
};

let dataList = paginate(data, ITEMS_PER_PAGE, 1);



nextButton.addEventListener('click', () => {
let dataList = paginate(
  data,
  ITEMS_PER_PAGE,
  pagination.increasePageNumber()
  );
  displayData(dataList);


})

prevButton.addEventListener("click", () => {
  let dataList = paginate(
    data,
    ITEMS_PER_PAGE,
    pagination.decreasePageNumber()
  );
return displayData(dataList);
});



//search functionality
const filteredList = {
  list: [],
  filterByDescription: (query) => {
    filteredList.list = dataList.filter(({ description }) => {
      return description.toLowerCase().includes(query);
    });
    upDateFilteredUi();
  },
  filterByStatus: (query) => {
    let dataList = paginate(data, ITEMS_PER_PAGE, pagination.pageNumber);
    filteredList.list = dataList.filter(({ status }) => {
    return status
        .toLowerCase()
        .includes(query.toLowerCase().replace(/\s/g, ""));
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

for (btn in buttons) {
    
  buttons[0].classList.add('active-color');
  
  buttons[btn].onclick = function () {
      buttons[0].classList.remove("active-color");
      
        buttons.forEach((btn)=>{
          btn.classList.remove('highlight');
          
        })
    this.classList.add('highlight');
    
  }

}

  buttons.forEach((statusBtn) => {
    statusBtn.addEventListener("click", (e) => {
      let text = e.target.textContent.toLowerCase();
      if (text == "all") {
        filteredList.filterByStatus("");
      } else {
        filteredList.filterByStatus(text);
      }
    });
  });

