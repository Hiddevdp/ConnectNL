// Filter button functionality
document.addEventListener("DOMContentLoaded", function () {
  const filterBtns = document.querySelectorAll(".filter-btn");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons
      filterBtns.forEach((b) => b.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      // Get the filter value
      const filterValue = this.getAttribute("data-filter");
      console.log("Filter selected:", filterValue);

      // Here you would implement your filter logic
    });
  });
});
