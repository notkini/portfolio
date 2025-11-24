document.addEventListener("DOMContentLoaded", function () {
  // Set current year in footer
  var yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Contact modal logic
  var modal = document.getElementById("contactModal");
  var openBtnMain = document.getElementById("openContactModal");
  var openBtnSecondary = document.getElementById("openContactModalSecondary");
  var closeBtn = document.getElementById("closeContactModal");

  function openModal() {
    if (modal) {
      modal.classList.add("active");
    }
  }

  function closeModal() {
    if (modal) {
      modal.classList.remove("active");
    }
  }

  if (openBtnMain) {
    openBtnMain.addEventListener("click", openModal);
  }

  if (openBtnSecondary) {
    openBtnSecondary.addEventListener("click", openModal);
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  if (modal) {
    // Close when clicking outside the card
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // Skills progress logic (read only, based on HTML)
  initSkillProgressReadOnly();
});

function initSkillProgressReadOnly() {
  var skillCards = document.querySelectorAll(".skill-card");
  if (!skillCards.length) return;

  skillCards.forEach(function (card) {
    var checkboxes = card.querySelectorAll(".skill-checkbox");
    var fill = card.querySelector(".skill-progress-fill");
    var label = card.querySelector(".skill-progress-label");

    if (!checkboxes.length || !fill || !label) return;

    updateCardProgressReadOnly(checkboxes, fill, label);
  });
}

function updateCardProgressReadOnly(checkboxes, fill, label) {
  var total = checkboxes.length;
  var checked = 0;
  checkboxes.forEach(function (cb) {
    if (cb.checked) checked += 1;
  });

  var percent = total > 0 ? Math.round((checked / total) * 100) : 0;
  fill.style.width = percent + "%";
  label.textContent = percent + "% complete";
}
