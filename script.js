let totalCount = 0;
let completedCount = 0;
let taskCount = 0;
let goalCount = 0;
let linkCount = 0;
let quoteCount = 0;
const entryForm = document.getElementById("entryForm");
const entriesGrid = document.getElementById("entriesGrid");
entryForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const type = document.getElementById("type").value.trim().toLowerCase();
  const description = document.getElementById("description").value.trim();
  if (!name || !type || description.length < 5) {
    alert("Please fill all fields. Description must be at least 5 characters.");
    return;
  }
  totalCount++;
  if (type === "task") taskCount++;
  else if (type === "goal") goalCount++;
  else if (type === "link") linkCount++;
  else if (type === "quote") quoteCount++;
  const card = document.createElement("div");
  card.classList.add("entry-card", type);
  card.style.maxWidth = "450px";
  card.style.margin = "0 auto";

  const title = document.createElement("h4");
  title.textContent = `${type.toUpperCase()}: ${name}`;

  const desc = document.createElement("p");
  // Check if description looks like a link
  if (description.startsWith("http://") || description.startsWith("https://")) {
    const link = document.createElement("a");
    link.href = description;
    link.textContent = description;
    link.target = "_blank"; // opens in new tab
    link.rel = "noopener noreferrer"; // safe link behavior
    link.style.color = "#1e90ff"; // optional style
    desc.appendChild(link);
  } else {
    desc.textContent = description;
  }

  const checkboxLabel = document.createElement("label");
  checkboxLabel.style.display = "block";
  checkboxLabel.style.marginTop = "0.5rem";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkboxLabel.appendChild(checkbox);
  checkboxLabel.append(" Mark as completed");
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      completedCount++;
      if (type === "task") taskCount--;
      else if (type === "goal") goalCount--;
      else if (type === "link") linkCount--;
      else if (type === "quote") quoteCount--;
      card.remove();
      updateCounts();
    }
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.className = "delete-btn";
  deleteBtn.style.marginTop = "0.5rem";
  deleteBtn.onclick = () => {
    alert("Delete clicked. No action taken.");
  };

  card.append(title, desc, checkboxLabel, deleteBtn);
  entriesGrid.appendChild(card);
  entryForm.reset();
  updateCounts();
});

function updateCounts() {
  document.getElementById("entriesCount").textContent = totalCount;
  document.getElementById("completedCount").textContent = completedCount;
  document.getElementById("taskscount").textContent = taskCount;
  document.getElementById("goalscount").textContent = goalCount;
  document.getElementById("linkscount").textContent = linkCount;
  document.getElementById("quotescount").textContent = quoteCount;
}
