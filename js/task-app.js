import { data } from "./data.js";
import { formateTime } from "./helpers.js"



const dataList = () => {
  return paginate(data, ITEMS_PER_PAGE, pagination.pageNumber);
};


//variables
const searchInput = document.querySelector("#searchInput");
const closeIcon = document.querySelector("#closeIcon");
const tableBody = document.querySelector("#tableBody");
const buttons = document.querySelectorAll("div#statusBtns button");
const prevButton = document.querySelector("#prev");
const nextButton = document.querySelector("#next");
const selectPageDropDown = document.querySelector("#selectPageDropDown");


searchInput.addEventListener('focus', () => {
    closeIcon.style.display = 'block'

})

searchInput.addEventListener("focusout", () => {
  closeIcon.style.display = "none";
});

closeIcon.addEventListener('mousedown', (e) => {
  e.preventDefault();
  searchInput.value = ''
    
});

const ITEMS_PER_PAGE = 10;

const pagination = {
  pageNumber: 1,
  totalPages:Math.ceil(
    data.length / ITEMS_PER_PAGE
  ),
  increasePageNumber: () => {
    pagination.pageNumber++;
    return pagination.pageNumber;
  },
  decreasePageNumber: () => {
    pagination.pageNumber--;
    return pagination.pageNumber;
  },
  setCount: (num) => {
    return (pagination.pageNumber = num)
  }
};



document.addEventListener('DOMContentLoaded', () => {
  filteredList.filterByDescription('');
  let array = [];
  for (let count = 0; count < pagination.totalPages; count++){
    array.push(count + 1);
  }

  array.forEach((el) => {
    let option = document.createElement('option');
    option.value = el;
    option.innerText = el;
    selectPageDropDown.appendChild(option);
  
  })

  const formateToDateString = () => {
    // return the current date in this format YYYY-MM-DD
    let date = new Date();
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  }
  document.querySelector("[data-date]").value = formateToDateString();


})


//pagination functionality

const paginationButtonsFunctionality = () => {
  selectPageDropDown.value = pagination.pageNumber;
  //disable buttons
  if (pagination.pageNumber == 1) {
    disablePrevButton();
  } else {
    prevButton.disabled = false;
    prevButton.style.opacity = 1;
  }

  if (pagination.pageNumber == pagination.totalPages) {
    nextButton.disabled = true;
    nextButton.style.opacity = 0.3;
  } else {
    nextButton.disabled = false;
    nextButton.style.opacity = 1;
  }


}

const displayData = (dataList) => {
  filteredList.list = dataList.filter(({ description }) => {
    return description.toLowerCase().includes("");
  });
  upDateFilteredUi();

  paginationButtonsFunctionality();
};



//disable button 
const disablePrevButton = () => {
prevButton.disabled = true;
prevButton.style.opacity = 0.3;
  return prevButton;
}
disablePrevButton();

const paginate = (list, itemsPerPage, pageNumber) => {
  return list.slice((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage);
};


nextButton.addEventListener('click', () => {
  
let dataList = paginate(
  data,
  ITEMS_PER_PAGE,
  pagination.increasePageNumber()
  );
  displayData(dataList);

})

selectPageDropDown.addEventListener('input', (e) => {
  
  
  let dataList = paginate(
    data,
    ITEMS_PER_PAGE,
    pagination.setCount(e.target.value)
  );
  return displayData(dataList);
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
    dataList();
    filteredList.list = dataList().filter(({ description }) => {
      return description.toLowerCase().includes(query);
    });
    upDateFilteredUi();
  },
  filterByStatus: (query) => {
  dataList();
    filteredList.list = dataList().filter(({ status }) => {
      return status.toLowerCase().includes(query);
    });
    upDateFilteredUi();
   },
};



 const tableHeadingContainer = document.querySelector("#tableHeadingContainer");
 const tableHeadings = document.querySelector("#tableHeadings");

const upDateFilteredUi = () => {
  tableBody.innerHTML = "";
  if (filteredList.list.length > 0) {
    filteredList.list.map((task, index) => {
      //i want to empty the empty state element when the array is being filtered
      emptyState.innerHTML = "";

      //create and append the tr element to the tbody element
      let tr = document.createElement("tr");
      
      let timeStamp = new Date(task.date).getTime();
      tr.innerHTML += `
      <td>${index + 1}</td>
      <td>${task.description}</td>
      <td><button class = "round-btn  ${task.status
        .toLowerCase()
        .replace(/\s/g, "")}">${task.status}</button></td>
      <td>${formateTime(timeStamp)}</td>
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

  document.querySelector("#totalPage").innerText = pagination.totalPages;
  document.querySelector("#currentPage").innerText = pagination.pageNumber;
  document.querySelector("#totalItems").innerText = `Of ${data.length}`;
};


closeIcon.addEventListener('click', () => {
  filteredList.filterByDescription('');
})

searchInput.addEventListener("input", (e) => {
  filteredList.filterByDescription(e.target.value.trim());
});


//filter by status functionality

buttons.forEach((statusButton) => {

  statusButton.addEventListener('click', (e) => {
    buttons.forEach((btn) => {
      btn.classList.remove("active-color");
    })
    e.target.classList.add("active-color");
    let text = e.target.textContent.toLowerCase();

    if (text == "all") {
      filteredList.filterByStatus("");
    } else {
      filteredList.filterByStatus(text);
    }
  })
})

//add modal functionality
const modalOverlay = document.querySelector("[data-modal-container]");
const CloseBtnX = document.querySelector("[data-close-btn-x]");
const addTaskBtn = document.querySelector("[data-add-task-button]");
const addTaskButtonModal = document.querySelector("[data-add-task-button-modal]");
const statusButtons = document.querySelectorAll("[data-status-button]");
const statusContainer = document.querySelector("[data-status-container]");
const priorityButtons = document.querySelectorAll("[data-priority-button]");
const statusErrorMessage = document.querySelector("[data-status-error-message]");
const priorityErrorMessage = document.querySelector("[data-priority-error-message]");
const textareaErrorMessage = document.querySelector("[data-textarea-error-message]");
const textarea = document.querySelector("[data-textarea]");
const time = document.querySelector("[data-date]");
const form = document.querySelector("[data-form]");

const initialTask = {
  id: Math.random(),
  status: "",
  priority: "",
  description: "",
  date: '',
};

let task = initialTask;

  
const formValid = () => {
    if (task.status == "") {
      statusErrorMessage.innerText = "please select status";
    } else {
      statusErrorMessage.innerText = "";
    }

    if (task.priority == "") {
      priorityErrorMessage.innerText = "please select priority";
    } else {
      priorityErrorMessage.innerText = "";
    }

    if (task.description == "") {
      textareaErrorMessage.innerText = "please write on the description";
    } else {
      textareaErrorMessage.innerText = "";
    }
  }

addTaskBtn.addEventListener('click', () => {
  modalOverlay.style.display = "block";
})

CloseBtnX.addEventListener('click', () => {
  modalOverlay.style.display = "none"
})

// add task functionality
const addTask = (data, task = {}, paginate, pageNumber = 1, displayData)=>{
  data.unshift(task);
  const paginatedData = paginate(data, ITEMS_PER_PAGE, pageNumber);
  displayData(paginatedData);
  }


addTaskButtonModal.addEventListener('click', (e) => {
  e.preventDefault()

  //form validation
  formValid()

//form validation before actualy adding task to the todo list
  if (task.description && task.status && task.priority && task.date) {
    addTask(
      data,
      Object.assign({}, task),
      paginate,
      pagination.pageNumber,
      displayData,
    )
    //closing add task modal after filling and adding task to the list
    modalOverlay.style.display = "none";
    //reseting the addtask modal form
    form.reset();
    statusButtons.forEach((statusButton) => {
      statusButton.classList.remove("active-color");
    });
    priorityButtons.forEach((priorityButton) => {
      priorityButton.classList.remove("active-color");
    });
  }


})

statusButtons.forEach((statusButton) => {
  statusButton.addEventListener('click', (e) => {
    e.preventDefault();
    statusButtons.forEach((btn) => {
      btn.classList.remove("active-color");
    })
    e.target.classList.add("active-color");
    task.status = e.target.innerText;
  })
});

priorityButtons.forEach((priorityButton) => {
  priorityButton.addEventListener("click", (e) => {
    e.preventDefault();
    priorityButtons.forEach((btn) => {
      btn.classList.remove("active-color");
    });
    e.target.classList.add("active-color");
    task.priority = e.target.innerText;
  });
});

textarea.addEventListener('input', (e) => {
  task.description = e.target.value;
});


document.addEventListener('click', (e) => {
  if (e.target == modalOverlay) {
    modalOverlay.style.display = "none";
  }
});



time.addEventListener('input', (e) => {
   let timeStamp = new Date(e.target.value).getTime();
  task.date = formateTime(timeStamp);

});


// sorting date either in ascending or decending order

// decending order sorting
const upwardArrow = document.querySelector("[data-upwardArrow]");

upwardArrow.addEventListener('mouseenter', () => {
upwardArrow.title = 'decending order'
})

upwardArrow.onclick = () => {
  downwardArrow.style.color = "";
  upwardArrow.style.color = "red";
  dataList();
  let decendingOrderData = dataList().sort((a, b) => b.date - a.date);
  displayData(decendingOrderData);
};

// ascending order sorting
const downwardArrow = document.querySelector("[data-downwardArrow]");

downwardArrow.addEventListener("mouseenter", () => {
  downwardArrow.title = "ascending order";
});

downwardArrow.onclick = () => {
  upwardArrow.style.color = "";
  downwardArrow.style.color= "red"
  dataList();
  let ascendingOrderData = dataList().sort((a, b) => a.date - b.date);
  displayData(ascendingOrderData);
};


