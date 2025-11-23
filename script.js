document.addEventListener("DOMContentLoaded", function () {
  // Set current year in footer
  var yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Contact modal logic
  var modal = document.getElementById("contactModal");
  var openBtn = document.getElementById("openContactModal");
  var closeBtn = document.getElementById("closeContactModal");

  if (openBtn && modal) {
    openBtn.addEventListener("click", function () {
      modal.classList.add("active");
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", function () {
      modal.classList.remove("active");
    });
  }

  if (modal) {
    // Close when clicking outside the card
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        modal.classList.remove("active");
      }
    });
  }

  // Skills progress logic
  initSkillProgress();
});

function initSkillProgress() {
  var skillCards = document.querySelectorAll(".skill-card");
  if (!skillCards.length) return;

  skillCards.forEach(function (card) {
    var skillId = card.getAttribute("data-skill-id");
    if (!skillId) return;

    var checkboxes = card.querySelectorAll(".skill-checkbox");
    var fill = card.querySelector(".skill-progress-fill");
    var label = card.querySelector(".skill-progress-label");

    if (!checkboxes.length || !fill || !label) return;

    // Restore saved state from localStorage
    var saved = localStorage.getItem("skill_" + skillId);
    if (saved) {
      try {
        var checkedIndexes = JSON.parse(saved);
        checkboxes.forEach(function (cb, index) {
          cb.checked = checkedIndexes.indexOf(index) !== -1;
        });
      } catch (err) {
        console.warn("Could not parse saved skill state for", skillId);
      }
    }

    // Initial progress update
    updateCardProgress(checkboxes, fill, label);

    // Set listeners
    checkboxes.forEach(function (cb, index) {
      cb.addEventListener("change", function () {
        saveSkillState(skillId, checkboxes);
        updateCardProgress(checkboxes, fill, label);
      });
    });
  });
}

function saveSkillState(skillId, checkboxes) {
  var checkedIndexes = [];
  checkboxes.forEach(function (cb, index) {
    if (cb.checked) {
      checkedIndexes.push(index);
    }
  });
  try {
    localStorage.setItem("skill_" + skillId, JSON.stringify(checkedIndexes));
  } catch (err) {
    console.warn("Could not save skill state for", skillId);
  }
}

function updateCardProgress(checkboxes, fill, label) {
  var total = checkboxes.length;
  var checked = 0;
  checkboxes.forEach(function (cb) {
    if (cb.checked) checked += 1;
  });

  var percent = total > 0 ? Math.round((checked / total) * 100) : 0;
  fill.style.width = percent + "%";
  label.textContent = percent + "% complete";
}
