
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-nav");
  const navigationLinks = document.querySelectorAll(".main-nav a");
  const currentYear = document.querySelector("#current-year");

  function closeNavigation() {
    if (!menuToggle || !navigation) return;

    navigation.classList.remove("nav-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  }

  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
      const isOpen =
        menuToggle.getAttribute("aria-expanded") === "true";

      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Open navigation" : "Close navigation"
      );

      navigation.classList.toggle("nav-open", !isOpen);
    });

    navigationLinks.forEach((link) => {
      link.addEventListener("click", closeNavigation);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeNavigation();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) {
        closeNavigation();
      }
    });
  }

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }
});
