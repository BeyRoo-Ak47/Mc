// Get references to the input and image elements
const imageInput = document.getElementById('imageInput');
const profilePicture = document.getElementById('profilePicture');

// Add event listener to the profile picture element
profilePicture.addEventListener('click', function() {
  imageInput.click();
});

// Add event listener to the input element
imageInput.addEventListener('change', function(event) {
  const file = event.target.files[0];

  // Check if a file was selected
  if (file) {
    const reader = new FileReader();

    // Read the file and display it as an image
    reader.onload = function(readerEvent) {
      profilePicture.src = readerEvent.target.result;
    };

    reader.readAsDataURL(file);
  }
});

let mainMenu = document.querySelector('.main .item ul')
let taskCat = document.querySelector('.app .left .item ul')
let addCat=document.querySelector(".addNewCat")
let Title=document.querySelector(".main .desc")
window.addEventListener('DOMContentLoaded', function() {
  var defaultItem = document.getElementById('defaultItem');
  defaultItem.click();
});
for (const category in tasks){
  let categoryChild = document.createElement("LI")
  categoryChild.innerHTML = `
      <div class="list" ondblclick="Rename('${category}')">
          <div class="logo">
              <img src="clutch-disc.png">
          </div>
          <div class="name" id="${category}"><label>${category}</label></div>
      </div>
    `
    categoryChild.setAttribute("onclick",`filterTaskByCategory('${category}')`)
    taskCat.appendChild(categoryChild)
}
function filterTaskByCategory(name){
  mainMenu.innerHTML="";
  if (name=="all"){
    Title.innerHTML="ALL Task"
    addCat.style.display = 'none';
    for (const category in tasks ){
      const taskByCategory = tasks[category];
      for(const task in taskByCategory){
        let taskchild = document.createElement("Li")
        taskchild.className = "task-1"
        taskchild.innerHTML = `
        <div class="list">
            <input type="checkbox">
            <label>${taskByCategory[task]}</label>
            <div class="logo2">
                <img src="star.png">
            </div>
        </div>
      `;
      mainMenu.appendChild(taskchild)
    }
  }}
  
  if(tasks.hasOwnProperty(name)){
    addCat.style.display = 'flex';
    addCat.innerHTML=``
    const taskByCategory = tasks[name]
    for(const task in taskByCategory){
      let taskchild = document.createElement("Li")
      taskchild.className = "task-1"
      taskchild.innerHTML = `
      <div class="list" id="${taskByCategory[task]}">
          <input type="checkbox">
          <label>${taskByCategory[task]}</label>
          <div class="logo2">
              <img src="star.png">
          </div>
      </div>
    `
    mainMenu.appendChild(taskchild)
    }
    let bottomAdd = document.createElement("Li")
    bottomAdd.innerHTML =`
        <div class="list" >
            <div class="logo" onclick="EachTaskAdd('${name}')">
                <img src="user-add.png">
                <label class="name">New Category</label>
            </div>
        </div>
    `
    addCat.appendChild(bottomAdd)
    const L = "li"
    const prefix = " label";
    const suffix = name
    const selector = L + " #" + suffix + prefix;
    let SubTitle = document.querySelector(selector)
    DisTitle = SubTitle.textContent
    console.log(DisTitle)
    Title.textContent=SubTitle.textContent
  }
}
let searchText = document.getElementById("searchBar")
searchText.addEventListener("keyup",function(e){
  mainMenu.innerHTML=""
  let search = e.target.value.toLowerCase();
  for (const category in tasks ){
    const taskByCategory = tasks[category];
    for(const task in taskByCategory){
      let lowSearch = search.toLowerCase
      console.log(search)
      if(taskByCategory[task].toLowerCase().includes(search)){
        let taskchild = document.createElement("Li")
        taskchild.className = "task-1"
        taskchild.innerHTML = `
        <div class="list">
            <input type="checkbox">
            <label>${taskByCategory[task]}</label>
            <div class="logo2">
                <img src="star.png">
            </div>
        </div>
        `
        mainMenu.appendChild(taskchild)
      }
    }
  }
})
function NewCategory(){
  let categoryChild = document.createElement("LI")
  categoryChild.innerHTML = `<div class="list">
  <div class="logo">
      <img src="clutch-disc.png">
  </div>
  <div><input type="text"></div>
  </div>`
  taskCat.appendChild(categoryChild)

  let Inp = categoryChild.querySelector("input")
  Inp.addEventListener("change",function(e){
    let InpValue=e.target.value
    tasks[InpValue] = [];
    Inp.replaceWith(InpValue);
    taskCat.appendChild(Inp)
    Inp.remove()
    categoryChild.innerHTML=''
    categoryChild.innerHTML=`<div class="list" ondblclick="Rename('${InpValue}')">
    <div class="logo">
        <img src="clutch-disc.png">
    </div>
    <div class="name" id="${InpValue}"><label>${InpValue}</label></div>
    </div>`
    categoryChild.setAttribute("onclick",`filterTaskByCategory('${InpValue}')`)
  })
}
function Rename(name){
  const prefix = " label";
  const suffix = name;
  const selector = "#" + suffix + prefix;

  let replaceName = taskCat.querySelector(selector)
  let NewInp = document.createElement("input")
  NewInp.setAttribute("type", "text")
  replaceName.replaceWith(NewInp)
  replaceName.remove()
  let Catch = taskCat.querySelector("input")
  Catch.addEventListener("change",function(e){
    let CatchVal = e.target.value
    let AfterEnter = document.createElement("label")
    AfterEnter.innerHTML=`${CatchVal}`
    // tasks[CatchVal] = tasks[name]
    // delete tasks[name]
    Catch.replaceWith(AfterEnter)
    Title.textContent=CatchVal
  })


}
function EachTaskAdd(name){
  let taskchild = document.createElement("Li")
        taskchild.className = "task-1"
        taskchild.innerHTML = `
        <div class="list">
            <input type="checkbox">
            <label><input type="text"></label>
            <div class="logo2">
                <img src="star.png">
            </div>
        </div>
        `
        mainMenu.appendChild(taskchild)
        let Inp = taskchild.querySelector("label input")
        Inp.addEventListener("change",function(e){
          let InpValue=e.target.value
          tasks[name].push(InpValue)
          Inp.replaceWith(InpValue)
          mainMenu.appendChild(Inp)
          Inp.remove()
        })
        
}
