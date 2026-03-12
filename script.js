const btn = document.getElementById("newSkillBtn");
const container = document.getElementById("skillContainer");

btn.addEventListener("click", async () => {
  container.innerHTML = "Generating skill...";

  const prompt = `
  Create a 3-day skill challenge.
  Each day should be 15 minutes.
  Provide Day 1, Day 2, Day 3 instructions.
  Output as JSON with name and days.
  `;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_API_KEY"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: prompt}],
        max_tokens: 300
      })
    });

    const data = await response.json();
    const text = data.choices[0].message.content;

    // Parse AI response (JSON)
    const skill = JSON.parse(text);

    let html = `<h2>${skill.name}</h2><ol>`;
    skill.days.forEach((day, i) => {
      html += `<li>Day ${i+1}: ${day}</li>`;
    });
    html += "</ol>";
    container.innerHTML = html;

  } catch (err) {
    container.innerHTML = "Error generating skill. Try again.";
    console.error(err);
  }
});
