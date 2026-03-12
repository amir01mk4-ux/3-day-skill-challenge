const skills = [
  {name: "Memory Technique", days: ["Learn memory palace", "Practice memorizing 10 items", "Apply to 10 new words"]},
  {name: "Speed Reading", days: ["Learn speed reading rules", "Practice 5 pages", "Apply for 10 min"]},
  {name: "HTML Basics", days: ["Learn tags & structure", "Build a small page", "Style with CSS"]},
  {name: "Spanish Words", days: ["Learn 5 new words", "Use in sentences", "Revise and test"]},
];

const btn = document.getElementById("newSkillBtn");
const container = document.getElementById("skillContainer");

btn.addEventListener("click", () => {
  const randomSkill = skills[Math.floor(Math.random() * skills.length)];
  let html = `<h2>${randomSkill.name}</h2>`;
  html += "<ol>";
  randomSkill.days.forEach((day, i) => {
    html += `<li>Day ${i+1}: ${day} (15 min)</li>`;
  });
  html += "</ol>";
  container.innerHTML = html;
});
