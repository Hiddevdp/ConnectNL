// Filter button functionality
// Filter button functionality
document.addEventListener("DOMContentLoaded", function () {
  // Find all filter containers
  const filterContainers = document.querySelectorAll(".filter-container");

  filterContainers.forEach((container) => {
    const filterBtns = container.querySelectorAll(".filter-btn");

    filterBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        // Remove active class from buttons only within this container
        filterBtns.forEach((b) => b.classList.remove("active"));

        // Add active class to clicked button
        this.classList.add("active");

        // Get the filter value
        const filterValue = this.getAttribute("data-filter");
        console.log(
          "Filter selected:",
          filterValue,
          "in container:",
          container
        );

        // Here you would implement your filter logic for this specific container
      });
    });
  });

  const readMoreBtns = document.querySelectorAll(".read-more-btn-txt");

  readMoreBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const activity = this.closest(".activity");
      const activityFold = activity.querySelector(".activity-fold");
      const description = activityFold.querySelector(".activity-description p");

      if (activityFold.classList.contains("expanded")) {
        // Collapse - start container transition first
        activityFold.classList.remove("expanded");
        activity.classList.remove("expanded");
        this.textContent = "Read more";

        // Wait 800ms before truncating text (while container is closing)
        setTimeout(() => {
          description.style.overflow = "hidden";
          description.style.textOverflow = "ellipsis";
          description.style.display = "-webkit-box";
          description.style.webkitLineClamp = "2";
          description.style.webkitBoxOrient = "vertical";
        }, 1000);
      } else {
        // Expand - remove text truncation immediately, then expand container
        description.style.overflow = "visible";
        description.style.textOverflow = "unset";
        description.style.display = "block";
        description.style.webkitLineClamp = "unset";
        description.style.webkitBoxOrient = "unset";

        activityFold.classList.add("expanded");
        activity.classList.add("expanded");
        this.textContent = "Read less";
      }
    });
  });
  const applyBtnExtras = document.querySelectorAll(".activity-apply-btn-extra");

  applyBtnExtras.forEach((btn) => {
    btn.addEventListener("click", function () {
      const applyBtnContainer = this.closest(".apply-btn-container");

      // Toggle the expanded state
      if (applyBtnContainer.classList.contains("expanded")) {
        applyBtnContainer.classList.remove("expanded");
      } else {
        applyBtnContainer.classList.add("expanded");
      }
    });
  });
});
