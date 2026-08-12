const projects = [
  {
    title: "Alte 2",
    titleKa: "Alte 2 - საქართველოს კულტურული რუკა",
    description: "Interactive cultural map of Georgia with region-based content and bilingual interface.",
    descriptionKa: "საქართველოს ინტერაქტიული კულტურული რუკა რეგიონების დეტალური ინფორმაციით და ორენოვანი ინტერფეისით.",
    liveUrl: "https://quiet-tiramisu-4ef4a7.netlify.app/"
  },
  {
    title: "SkyCast Weather App",
    titleKa: "SkyCast - ამინდის აპლიკაცია",
    description: "Modern weather app with geolocation, 7-day forecast, hourly modal details, theme toggle, and Georgian city quick-picks.",
    descriptionKa: "თანამედროვე ამინდის აპი: გეოლოკაცია, 7-დღიანი პროგნოზი, საათობრივი დეტალები, თემა და ქართული ქალაქების სწრაფი არჩევა.",
    liveUrl: "https://quiet-parfait-0ebf58.netlify.app/"
  }
];

function renderProjects(){
  const grid = document.getElementById("projectsGrid");
  const subtitle = document.querySelector("[data-i18n='projects.subtitle']");
  if(!grid) return;
  grid.innerHTML = "";
  if (subtitle) subtitle.style.display = projects.length ? "none" : "";
  if(!projects.length){
    for(let i=1;i<=3;i++){
      const card = document.createElement("article");
      card.className = "project";
      card.innerHTML = `<h3>Project ${i}</h3><p>${i18n[currentLang].coming}</p>`;
      grid.appendChild(card);
    }
    return;
  }
  projects.forEach((p)=>{
    const card = document.createElement("article");
    card.className = "project";
    const title = currentLang === "ka" ? (p.titleKa || p.title) : p.title;
    const description = currentLang === "ka" ? (p.descriptionKa || p.description || "") : (p.description || "");
    const openLabel = currentLang === "ka" ? "გახსნა" : "Open";
    card.innerHTML = `
      <h3>${title}</h3>
      <p>${description}</p>
      ${p.liveUrl ? `<p><a href="${p.liveUrl}" target="_blank" rel="noopener">${openLabel}</a></p>` : ""}
    `;
    grid.appendChild(card);
  });
}
