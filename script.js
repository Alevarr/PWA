const date = new Date();

const renderCalendar = () => {
  date.setDate(1);

  const monthDays = document.querySelector(".days");

  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();

  const firstDayIndex = date.getDay();

  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  const nextDays = 7 - lastDayIndex - 1;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  document.querySelector(".date").innerHTML = months[date.getMonth()] + ' ' + date.getFullYear();

  let days = `
  <div class="weekday">Sun</div>
  <div class="weekday">Mon</div>
  <div class="weekday">Tue</div>
  <div class="weekday">Wed</div>
  <div class="weekday">Thu</div>
  <div class="weekday">Fri</div>
  <div class="weekday">Sat</div>`;

  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    let n = '0' + i;
    if (i > 9) n = i;
    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth()
    ) {
      days += `<div class="today">${n}</div>`;
    } else {
      days += `<div>${n}</div>`;
    }
    monthDays.innerHTML = days;
  }

  for (let j = 1; j <= nextDays; j++) {
    if(j < 10) j = '0' + j;
    days += `<div class="next-date">${j}</div>`;
    monthDays.innerHTML = days;
  }
};

document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});



// let onlongtouch = false;
// let timer = false;
// let duration = 800;

// onlongtouch = function(e){
//   e.target.classList.toggle("complete");
//   e.target.classList.remove('touch');
// }

// document.addEventListener("DOMContentLoaded", function(){
//   document.querySelector(".habits").addEventListener("touchstart", (e) => {
//     console.log(e.target);
//     e.target.classList.add("touch");
//     if (!timer) {
//       timer = setTimeout(onlongtouch(e), duration);
//     }
//     });
//     document.querySelector(".habits").addEventListener("touchend", (e) => {
//       if (timer) {
//         clearTimeout(timer)
//         timer = false;
//       }
//     });
// })
// document.querySelectorAll(".habits").forEach(el => {
//   el.addEventListener("touchstart", () => {
//     el.classList.add("touch");
//     timer = setTimeout(500);
//   })

//   el.addEventListener("touchstart", () => {
//     if(timer) { clearTimeout(timer); }
//     el.classList.remove("touch");
//   })
// })
var timer;
var setcomplete = function(t) {
  console.log(312);
  // t.classList.toggle("complete");
  console.log(t)
  // t.classList.remove('touch');
}
document.querySelector(".habits").addEventListener("touchstart", function(e) {
  console.log(123);
  if (e.target && e.target.matches("li")) {
    
    e.target.classList.add('touch');
    timer = setTimeout(setcomplete(e.target), 20000);
  }
});

document.querySelector(".habits").addEventListener("touchend",function(e) {
  if (e.target && e.target.matches("li")) {
    let term = e.target.getAttribute("term");
    let progress = Math.floor((1 / term) * 100);
    console.log(e.target);
    e.target.classList.remove('touch');
    e.target.classList.add("complete");

    e.target.querySelector(".progress").innerHTML = `${progress}%`;
    e.target.querySelector(".bar").setAttribute("style", `width: ${progress}%;`);
  }
  
  if(timer) {
    clearTimeout(timer);
    // e.target.classList.toggle("complete");
  }
});


renderCalendar();

let addHabitButton        = document.querySelector(".add-habit"),
    editWindow            = document.querySelector(".edit"),
    buttonInnerHtmlSave   = `<span>SAVE</safe>`,
    buttonInnerHtmlAdd    = `<img src="images/plus.png" alt="Плюс" srcset="">`;
addHabitButton.addEventListener("click", () => {
  addHabit.click();
});

document.querySelector(".close").addEventListener("click", () => {
  addHabit.close();
});

window.addEventListener('load', async () => {
  let json = await (await fetch("http://localhost/text.txt")).json();
  for(let i = 0; i < json.length; i++) {
    let el = json[i];
    habitManager.addDom(el.id, el.name, el.notificate, el.term, el.daysComplete);
  }
})

var Habit = {
  id : 0,
  name : "",
  createDate : 0,
  term : 21,
  daysComplete : 1,
  notificate : false,
}

// var fetch = new Fetch("http://localhost/text.txt")
// var fetchphp = new Fetch("http://localhost/test.php")

let habitManager = {
  dom        : document.querySelector(".habits"),
  counter    : 0,
  createDate : new Date(),

  async addHabit(name, notificate, term) 
  {

    let json = await (await fetch("http://localhost/text.txt")).json();
    console.log(json);
    Habit.id = 0
    // for(let i = 0; i < json.length; i++) {
    //   if(i != json[i].id) {
    //     Habit.id = i;
    //     break;
    //   }
    // }
    Habit.id = json.length;
    Habit.name = name;
    Habit.createDate = date.getTime();
    Habit.term = term;
    Habit.daysComplete = 1;
    Habit.notificate = notificate;
    json[json.length] = Habit;
    // fetch.request()
    // console.log(Habit);
    let send = JSON.stringify(json);
    caches.open('s-app-v3').then(function(cache) {
     cache.delete("http://localhost/text.txt");
    });
    fetch(`http://localhost/test.php?data=${send}`) 
    // console.log(await (await fetch("http://localhost/test.php")).text())
    json = await (await fetch("http://localhost/text.txt")).text();
    console.log(json);
    this.addDom(Habit.id, name, notificate, term, 0);
  },

  addDom(id, name, notificate, term, daysComplete) {
    // let progress = moment().diff(this.createDate, "days") / this.term * 100 + "%";
    let progress = Math.floor((daysComplete / term) * 100);
    this.dom.innerHTML += `
    <li id='${id}' term="${term}">
    <span class="name">${name}</span>
    <span class="progress">${progress}%</span>
    <div class="progress-bar">
      <div class="bar" style="width: ${progress}%"></div>
    </div>
    </li>
    `;
    document.querySelectorAll(".habits > li")[this.counter].addEventListener("click", (event) => {
      console.log(event);
    });
    this.counter++;
  }
  
}

document.getElementById("pizda").addEventListener("touchstart", (e) => {
  e.target.classList.add("touch");
  e.target.classList.toggle("no");
  e.target.innerHTML = e.target.classList.contains("no") ? `<img src="images/bell.png" alt="Уведомление" srcset="">` : `<img src="images/bell-no.png" alt="Уведомление" srcset="">`;
})
document.getElementById("pizda").addEventListener("touchend", (e) => {
  e.target.classList.remove("touch");
})

let addHabit = {
  dom: document.querySelector(".add-habit"),
  habitsContainer: document.querySelector(".menu > .habits"),
  inputField: document.querySelector("#habit-name"),
  notificateButton: document.querySelector(".edit .notificate"),
  termButton: document.querySelector(".edit .term"),
  closeButton: document.querySelector(".close"),
  saveInnerHtml: `<span>SAVE</safe>`,
  addInnerHtml: `<img src="images/plus.png" alt="Плюс" srcset="">`,

  click() {
    this.dom.classList.toggle("to-save");
    if (this.dom.classList.contains("submit")) {
      let name = this.inputField.value;
      if(name != "") {
        let term = document.querySelector(".term").value != "" ? document.querySelector(".term").value : 21;
        habitManager.addHabit(name, false, term);
      }
      this.close();
      return;
    }
    this.dom.classList.toggle("submit");
    this.dom.classList.contains("to-save") ? addHabitButton.innerHTML =  buttonInnerHtmlSave: addHabitButton.innerHTML = buttonInnerHtmlAdd;
    editWindow.classList.toggle("appear");
    this.notificateButton.classList.toggle("appear");
    this.termButton.classList.toggle("appear");
    this.closeButton.classList.toggle("appear");

  },

  close() {
    editWindow.classList.remove("appear");
    addHabitButton.classList.remove("to-save");
    this.dom.classList.remove("submit");
    addHabitButton.innerHTML = buttonInnerHtmlAdd;
    this.notificateButton.classList.remove("appear");
    this.termButton.classList.remove("appear");
    this.closeButton.classList.remove("appear");
  }
}