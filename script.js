const btn = document.getElementById("newSkillBtn");
const container = document.getElementById("skillContainer");
const categoryEl = document.getElementById("category");

// Categories
const categories = ["Knowledge", "Skills", "Languages", "Personal Growth"];

// Load streak from localStorage
let streak = parseInt(localStorage.getItem("streak") || "0");
let lastDate = localStorage.getItem("lastDate");

// Check if streak should reset
const today = new Date().toDateString();
if (lastDate !== today) streak = 0;
updateStreak();

// Show category selection
let currentCategory = categories[0]; // default
categoryEl.innerHTML = `Category: ${currentCategory}`;

// Optional: cycle categories by click
categoryEl.addEventListener("click", () => {
  const idx = categories.indexOf(currentCategory);
  currentCategory = categories[(idx + 1) % categories.length];
  categoryEl.innerHTML = `Category: ${currentCategory}`;
});

// Main button click
btn.addEventListener("click", async () => {
  container.innerHTML = "Generating skill...";

  const prompt = `
Generate a 3-day skill challenge for category "${currentCategory}".
Each day should be around 15 minutes.
Output STRICTLY as JSON in this format:
{
  "name": "Skill Name",
  "days": ["Day 1 content", "Day 2 content", "Day 3 content"]
}
`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_API_KEY" // <-- Replace with your OpenAI API key
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 300
      })
    });

    const data = await response.json();
    let text = data.choices[0].message.content;

    // Parse JSON safely
    let skill;
    try {
      skill = JSON.parse(text);
    } catch (err) {
      container.innerHTML = "AI returned invalid JSON. Try again.";
      console.error("JSON parse error:", err, text);
      return;
    }

    // Display skill
    let html = `<h2>${skill.name}</h2><ol>`;
    skill.days.forEach((day, i) => {
      html += `<li>Day ${i + 1}: ${day} (15 min)</li>`;
    });
    html += "</ol>";
    container.innerHTML = html;

    // Update streak
    streak++;
    localStorage.setItem("streak", streak);
    localStorage.setItem("lastDate", today);
    updateStreak();

  } catch (err) {
    container.innerHTML = "Error generating skill. Try again.";
    console.error(err);
  }
});

// Update streak display
function updateStreak() {
  let streakEl = document.getElementById("streak");
  if (!streakEl) {
    streakEl = document.createElement("p");
    streakEl.id = "streak";
    streakEl.style.fontWeight = "bold";
    container.parentNode.insertBefore(streakEl, container);
  }
  streakEl.textContent = `Daily streak: ${streak}`;
}
