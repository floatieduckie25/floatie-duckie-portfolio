const viewTitles = {home:"overview",projects:"projects",skills:"skills",about:"about"};
const navButtons = document.querySelectorAll("[data-view]");
const topTitle = document.getElementById("topTitle");

function setView(view){
  if(!viewTitles[view]) return;
  topTitle.textContent = viewTitles[view];
  document.querySelectorAll(".side-link").forEach(btn=>btn.classList.toggle("selected",btn.dataset.view===view));
  const target = document.getElementById(view);
  if(target) target.scrollIntoView({behavior:"smooth",block:"start"});
}
navButtons.forEach(btn=>btn.addEventListener("click",()=>setView(btn.dataset.view)));

const projects = {
  timer:{
    title:"Round Timer System",
    description:"A countdown UI concept for a round-based Roblox experience. The goal is to make the timer readable at a glance and give the interface a clear visual hierarchy. Add your real scripts, screenshots, and gameplay clip here."
  },
  obby:{
    title:"Obby Framework",
    description:"A modular obstacle-course concept focused on checkpoint progression and player feedback. Use this space to explain how your checkpoint logic works and link a playable demo when it is published."
  }
};
const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
function openProject(key){
  const project = projects[key];
  if(!project) return;
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden","false");
}
document.querySelectorAll("[data-project]").forEach(btn=>btn.addEventListener("click",()=>openProject(btn.dataset.project)));
function closeModal(){modal.classList.remove("open");modal.setAttribute("aria-hidden","true")}
document.getElementById("modalClose").addEventListener("click",closeModal);
modal.addEventListener("click",event=>{if(event.target===modal) closeModal()});
document.addEventListener("keydown",event=>{if(event.key==="Escape") closeModal()});

const search = document.getElementById("searchInput");
search.addEventListener("input",()=>{
  const query = search.value.trim().toLowerCase();
  document.querySelectorAll(".work-card").forEach(card=>{
    card.style.display = card.dataset.search.includes(query) ? "" : "none";
  });
  if(query) setView("projects");
});
document.addEventListener("keydown",event=>{
  if(event.key==="/" && !["INPUT","TEXTAREA"].includes(document.activeElement.tagName)){
    event.preventDefault();search.focus();
  }
});
