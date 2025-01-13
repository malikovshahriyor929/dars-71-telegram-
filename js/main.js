function access() {
  if (!localStorage.getItem("access")) {
    localStorage.removeItem("access");
    window.location.href = "./login.html";
  }
}
access();
let BASE_URL = "https://67828199c51d092c3dcfc05f.mockapi.io/telegram/message";
let messages = document.querySelector(".messages");
let name = document.querySelector(".name");
name.textContent = JSON.parse(localStorage.getItem("name"));
let check = JSON.parse(localStorage.getItem("name"));
let userid = JSON.parse(localStorage.getItem("userid"));

let message_form = document.querySelector(".message_form");
let date = new Date();
let hour = date.getHours() <= 10 ? "0" + date.getHours() : date.getHours();
let minute = date.getMinutes() <= 10 ? "0" + date.getMinutes() : date.getMinutes();

// logout
let logout = document.querySelector(".logout")
logout.addEventListener("click",()=>{
    localStorage.clear() 
    window.location.href = "./login.html"   
})
//   message_form  
message_form.addEventListener("submit", (e) => {
  e.preventDefault();
  let message_input = document.querySelector(".message_input");
if (message_input.value !== "" && message_input.value !== " " ) {
    fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: message_input.value,
        time: hour + ":" + minute,
        name: JSON.parse(localStorage.getItem("name")),
        userid: JSON.parse(localStorage.getItem("userid")),
      }),
    })
      .then((data) => data.json())
      .then(() => window.location.reload());
}
  message_input.value = "";
});
// get data 
function fetchfunc() {
  fetch(BASE_URL)
    .then((data) => data.json())
    .then((data) => {
      checkfunc(data);
      contactsfunc(data)
    });
}
// put messages 
function checkfunc(data) {
  data.forEach((value) => {
    if (value.name == check && value.userid == userid) {
      let text = document.createElement("div");
      text.innerHTML = `
      <div  class="flex items-end  flex-col">
              <div
                class="bg-[#effedd] relative flex flex-col items-end w-fit p-[9px_15px_0_15px] pb-5 m-3 rounded-md rounded-br-none min-w-[70px] "
              >
                <p class="text-[18px] message_for_green ">
               ${value.message}
                </p>
                <p
                  class="text-[12px] text-[#62ac55] absolute bottom-1 right-1 flex gap-2 items-center"
                >
                  ${value.time} <img src="./assets/svg/ticket.svg" alt="" />
                </p>
                <img
                  class="absolute bottom-0 h-4 right-[-8px]"
                  src="./assets/svg/mymess.svg"
                  alt=""
                />
              </div>
            </div>
    `;
      messages.append(text);
    } else {
        
      let text = document.createElement("div");
      text.innerHTML = ` 
        <div class="flex flex-col items-start message_for_white">
              <div
                class="bg-white relative flex flex-col items-end w-fit p-[9px_15px_0_15px] pb-5 m-3 rounded-lg rounded-bl-none"
              >
                <p class="text-[18px]">
                  ${value.message}
                </p>
                <p
                  class="text-[12px] text-[#a1aab3] absolute bottom-1 right-2 flex gap-2 items-center"
                >
                  12:06
                </p>
                <img
                  class="absolute bottom-0 h-4 left-[-5px]"
                  src="./assets/svg/yourmess.svg"
                  alt=""
                />
              </div>
            </div>
                  `;
           
      messages.append(text);
    }
  });
}
let contacts =document.querySelector(".contacts")

function contactsfunc(data) {
    data.forEach(value=>{
        if(value.name !== check){
            console.log(value.message);
            contacts.innerHTML = `
            <img src="./assets/svg/povel.svg" alt="" />
            <div class="flex flex-col justify-between">
              <p class="flex items-center gap-3 font-medium  text-[#222]">${value.name}
                <img src="./assets/svg/worth_thing_in_telegram.svg" alt="" />
              </p>
              <p  class="text-[15px] text-[#8d8e90]">
               ${value.message}
              </p>
            </div>
            `
        };
        
    })
}
fetchfunc();
