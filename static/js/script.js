document.addEventListener("DOMContentLoaded", () => {
  // Language switching functionality
  const htmlElement = document.documentElement
  const enLangBtn = document.getElementById("en-lang")
  const ruLangBtn = document.getElementById("ru-lang")

  // Function to set language
  function setLanguage(lang) {
    htmlElement.setAttribute("lang", lang)
    localStorage.setItem("language", lang)

    // Update active state on buttons
    if (lang === "en") {
      enLangBtn.classList.add("active")
      ruLangBtn.classList.remove("active")
    } else {
      ruLangBtn.classList.add("active")
      enLangBtn.classList.remove("active")
    }

    // Update page title based on language
    document.title = lang === "en" ? "Web Developer | Portfolio" : "Веб-разработчик | Портфолио"
  }

  // Check for saved language preference or use default (English)
  const savedLanguage = localStorage.getItem("language")

  if (savedLanguage) {
    setLanguage(savedLanguage)
  } else {
    setLanguage("en") // Default language is English
  }

  // Language toggle event listeners
  enLangBtn.addEventListener("click", () => {
    setLanguage("en")
  })

  ruLangBtn.addEventListener("click", () => {
    setLanguage("ru")
  })

  // Theme toggle functionality
  const themeToggle = document.getElementById("theme-toggle")

  // Function to set theme
  function setTheme(theme) {
    htmlElement.setAttribute("data-theme", theme)
    localStorage.setItem("theme", theme)
  }

  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem("theme")

  if (savedTheme) {
    // Use saved preference if available
    setTheme(savedTheme)
  } else {
    // Use system preference
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)")

    if (prefersDarkScheme.matches) {
      setTheme("dark")
    } else {
      setTheme("light")
    }

    // Listen for system theme changes
    prefersDarkScheme.addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        // Only if user hasn't manually set a preference
        setTheme(e.matches ? "dark" : "light")
      }
    })
  }

  // Toggle theme when button is clicked
  themeToggle.addEventListener("click", () => {
    const currentTheme = htmlElement.getAttribute("data-theme")
    const newTheme = currentTheme === "dark" ? "light" : "dark"
    setTheme(newTheme)
  })

  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
  const navItems = document.querySelector(".nav-items")
  const bars = document.querySelectorAll(".bar")

  mobileMenuToggle.addEventListener("click", () => {
    navItems.classList.toggle("active")

    // Animate hamburger to X
    bars.forEach((bar) => {
      bar.classList.toggle("active")
    })

    if (navItems.classList.contains("active")) {
      bars[0].style.transform = "rotate(-45deg) translate(-5px, 6px)"
      bars[1].style.opacity = "0"
      bars[2].style.transform = "rotate(45deg) translate(-5px, -6px)"
    } else {
      bars[0].style.transform = "none"
      bars[1].style.opacity = "1"
      bars[2].style.transform = "none"
    }
  })

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll(".nav-link")

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navItems.classList.contains("active")) {
        navItems.classList.remove("active")

        // Reset hamburger icon
        bars[0].style.transform = "none"
        bars[1].style.opacity = "1"
        bars[2].style.transform = "none"
      }
    })
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for header
          behavior: "smooth",
        })
      }
    })
  })
/*
  // Form submission (for demo purposes)
  const contactForm = document.getElementById("contact-form")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form data
      const formData = new FormData(contactForm)
      const name = formData.get("name")

      // Show success message based on current language
      const lang = htmlElement.getAttribute("lang")
      let message = ""

      if (lang === "en") {
        message = `Thank you, ${name}! Your message has been sent. I will contact you soon.`
      } else {
        message = `Спасибо, ${name}! Ваше сообщение отправлено. Я свяжусь с вами в ближайшее время.`
      }

      alert(message)

      // Reset form
      contactForm.reset()
    })
  }
*/
  // Reveal animations on scroll
  const revealElements = document.querySelectorAll(".skill-card, .project-card, .service-card, .contact-link")

  function checkReveal() {
    const triggerBottom = window.innerHeight * 0.8

    revealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top

      if (elementTop < triggerBottom) {
        element.style.opacity = "1"
        element.style.transform = "translateY(0)"
      }
    })
  }

  // Set initial state for animation
  revealElements.forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(20px)"
    element.style.transition = "opacity 0.5s ease, transform 0.5s ease"
  })

  // Check on load
  window.addEventListener("load", checkReveal)

  // Check on scroll
  window.addEventListener("scroll", checkReveal)
})
