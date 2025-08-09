// Filter button functionality
// Filter button functionality
document.addEventListener("DOMContentLoaded", function () {
  // Authentication system
  let loggedIn = false;

  // Protected routes that require login
  const protectedRoutes = ["/account", "/new-post", "/buddy", "/chat"];
  const protectedSubpages = [
    "settings",
    "profile",
    "privacy",
    "more-filters",
    "my-activities",
    "message",
    "step2",
    "result",
  ];

  // Check if current route is protected
  function isProtectedRoute(path) {
    // Check main routes
    for (let route of protectedRoutes) {
      if (path.startsWith(route)) {
        return true;
      }
    }
    return false;
  }

  // Redirect to create account if not logged in
  function checkAuth() {
    const currentPath = window.location.pathname;

    if (!loggedIn && isProtectedRoute(currentPath)) {
      window.location.href = "/create-account";
      return false;
    }
    return true;
  }

  // Handle create account completion
  function completeRegistration() {
    loggedIn = true;
    localStorage.setItem("loggedIn", "true"); // Persist across page reloads
    console.log("User logged in successfully");
  }

  // Load login state from localStorage on page load
  function loadAuthState() {
    const stored = localStorage.getItem("loggedIn");
    loggedIn = stored === "true";
  }

  // Load auth state first
  loadAuthState();

  // Check authentication for current page
  checkAuth();

  // Handle create account button
  const createAccountBtn = document.getElementById("create-account");
  if (createAccountBtn) {
    createAccountBtn.addEventListener("click", function (e) {
      e.preventDefault();
      completeRegistration();

      // Redirect to activities page after account creation
      window.location.href = "/activities";
    });
  }

  // Handle navigation clicks for protected routes
  document.addEventListener("click", function (e) {
    const link = e.target.closest("a");
    if (link && link.href) {
      const url = new URL(link.href);
      const path = url.pathname;

      if (!loggedIn && isProtectedRoute(path)) {
        e.preventDefault();
        window.location.href = "/create-account";
      }
    }
  });

  // Find all filter containers
  const filterContainers = document.querySelectorAll(".filter-container");

  filterContainers.forEach((container) => {
    const filterBtns = container.querySelectorAll(".filter-btn");
    const allowMultiple = container.dataset.multiple === "true";

    filterBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        if (allowMultiple) {
          // For multiple selection containers - just toggle the clicked button
          this.classList.toggle("active");
        } else {
          // For single selection containers - remove active from all, add to clicked
          filterBtns.forEach((b) => b.classList.remove("active"));
          this.classList.add("active");
        }

        // Get the filter value
        const filterValue = this.getAttribute("data-filter");
        console.log(
          "Filter selected:",
          filterValue,
          "in container:",
          container
        );
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
  const findBuddyBtn = document.getElementById("findBuddyBtn");
  const loadingOverlay = document.getElementById("loadingOverlay");

  console.log("Find buddy button:", findBuddyBtn); // Debug line
  console.log("Loading overlay:", loadingOverlay); // Debug line

  if (findBuddyBtn && loadingOverlay) {
    findBuddyBtn.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("Button clicked - showing overlay"); // Debug line

      loadingOverlay.style.display = "flex";

      setTimeout(() => {
        console.log("Navigating to result page"); // Debug line
        window.location.href = "/buddy/result";
      }, 2000);
    });
  } else {
    console.log("Elements not found!");
  }

  // Debug logging
  console.log("Auth system initialized. Logged in:", loggedIn);
  console.log("Current path:", window.location.pathname);
  console.log(
    "Is protected route:",
    isProtectedRoute(window.location.pathname)
  );
});
