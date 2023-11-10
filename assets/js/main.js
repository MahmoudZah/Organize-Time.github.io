var tbody = document.getElementById("tbody")
var addBtn = document.getElementById("addBtn")
var removeBtn = document.getElementById("removeBtn")
var WIMD = document.getElementById("WIMD")
var time = document.getElementById("time")
var themeBtn = document.querySelector("#theme_btn")
var themePart = document.querySelector(".theme_part")

var data =[]
var old_doList_data = JSON.parse(localStorage.getItem('doList'))

if(old_doList_data !=null){
  data.push(...old_doList_data)
}

addBtn.onclick=() =>{
  var last_id = 0
  var old_doList_data = JSON.parse(localStorage.getItem('doList'))
  console.log(old_doList_data)
  if(old_doList_data!=null && old_doList_data.length !=0){
    last_id = old_doList_data[old_doList_data.length-1].id
  }else{
    last_id = 0;
  }
  var doList_data = {
    id: last_id+1,
    WIMD:WIMD.value,
    time:time.value,
    done:false
  };
  data.push(doList_data);
  localStorage.setItem('doList',JSON.stringify(data));
  WIMD.value = "";
  time.value =  "";
  viewDoList()
}
function viewDoList(){
  JSON.parse(localStorage.getItem('doList'))
  tbody.innerHTML='';
  for(var i = 0; i<data.length; i++){
    let IsDone = data[i].done == "true" ? "checked" : "";
    tbody.innerHTML+=`
    <tr class="tbody_tr ">
          <td class="d-flex justify-content-center border-0 p-0">
            <div class="form-check">
            <input class="form-check-input check_input" type="checkbox" value="" id="${data[i].id}" onchange="done(this)" ${IsDone}>
          </div>
          </td>
          <td class="text-center">
            <p class="mb-0 mt-2 main-color task_text">${data[i].WIMD}</p>
          </td>
          <td class="text-center">
            <p class="mb-0 mt-2 main-color">
              ${data[i].time}
            </p>
          </td>
          <td class="d-flex justify-content-center border-0">
            <button class="btn btn-danger" id="removeBtn" onclick="deleteDoList(${data[i].id})">Remove</button>
          </td>
        </tr>
    `
  }
}

function deleteDoList(id){
  var index = data.findIndex ( doList_data =>{
    return   doList_data.id == id
  })
  data.splice(index,1);
  localStorage.setItem('doList',JSON.stringify(data))
  viewDoList();
}

function done(checkbox){
  if(checkbox.checked){
    old_doList_data[checkbox.id-1].done = "true"
  }else{
    old_doList_data[checkbox.id-1].done = "false"
  }
  localStorage.setItem('doList',JSON.stringify(data));
}

viewDoList()


// theme part
themeBtn.onclick=()=>{
  themePart.classList.toggle("show")
}

let color_lis = document.querySelectorAll(".color_ul li");
let bg_lis = document.querySelectorAll(".bg_ul li");

let mainColor = localStorage.getItem("mainColor");

console.log(mainColor)
if(mainColor != null){
  
  document.documentElement.style.setProperty("--color-main", mainColor)
  
  document.querySelectorAll(".themes_container ul li").forEach(element =>{
    element.classList.remove("active")
    
    if(element.dataset.color == mainColor){
      element.classList.add("active")
    }
  })
  
}

let mainbg = localStorage.getItem("mainbg");

if (mainbg != null){
  document.documentElement.style.setProperty("--background-main", mainbg)
}



color_lis.forEach(li => {

  li.addEventListener("click", (e) =>{
    document.documentElement.style.setProperty("--color-main", e.target.dataset.color)
    localStorage.setItem("mainColor" , e.target.dataset.color)

    document.documentElement.style.setProperty("--background-main", e.target.dataset.bg)
    localStorage.setItem("mainbg" , e.target.dataset.bg)

    e.target.parentElement.querySelectorAll(".active").forEach(element =>{
      element.classList.remove("active")
    })
    e.target.classList.add("active")
    

  })
});
