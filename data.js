

let date = new Date().toLocaleDateString("en-us", { day: "numeric" });
let month = new Date().toLocaleDateString("en-us", { month: "short" });
let year = new Date().toLocaleDateString("en-us", { year: "numeric" });
const FormattedDate = `${date}st ${month[0].toLowerCase() + month.slice(1)}, ${year}`;


let data = [
  {
    id: Math.random(),
    description: "do some shopping at maxland shopping mall",
    status: "Done",
    date: FormattedDate,
    priority: "High",
  },
  {
    id: Math.random(),
    description: "fill my 12.5kg gas",
    status: "inprogress",
    date: FormattedDate,
    priority: "Low",
  },
  {
    id: Math.random(),
    description: "hang out with friends for about 1hr",
    status: "todo",
    date: FormattedDate,
    priority: "medium",
  },
  {
    id: Math.random(),
    description: "cut my hair",
    status: "todo",
    date: FormattedDate,
    priority: "High",
  },
  {
    id: Math.random(),
    description: "refill my car fuel tank",
    status: "inprogress",
    date: FormattedDate,
    priority: "High",
  },
  {
    id: Math.random(),
    description: "work on my project",
    status: "inprogress",
    date: FormattedDate,
    priority: "Low",
  },
  {
    id: Math.random(),
    description: "spend some time with friends",
    status: "Done",
    date: FormattedDate,
    priority: "Low",
  },
];
