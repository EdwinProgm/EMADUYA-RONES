document.addEventListener("DOMContentLoaded", () => {
  initTheme()
  initSlider()
  initMobileMenu()
  initStickyHeader()
  initVideoModal()
  initChatbot()

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href")

      if (href !== "#" && href !== "#!" && !this.parentElement.classList.contains("dropdown")) {
        e.preventDefault()

        const targetElement = document.querySelector(href)
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
          })

          if (document.querySelector(".main-nav") && window.innerWidth <= 768) {
            const mainNav = document.querySelector(".main-nav")
            mainNav.classList.remove("active")
            const menuToggle = document.getElementById("menu-toggle")
            if (menuToggle) {
              const icon = menuToggle.querySelector("i")
              if (icon) {
                icon.classList.remove("fa-times")
                icon.classList.add("fa-bars")
              }
            }
          }
        }
      }
    })
  })

  const pageLinks = document.querySelectorAll("a[data-page]")

  pageLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      if (window.innerWidth <= 768 && this.parentElement.classList.contains("dropdown")) {
        return
      }

      const pageName = this.getAttribute("data-page")
      const pageUrl = this.getAttribute("href")

      if (window.location.pathname.includes(pageUrl) || (window.location.pathname === "/" && pageName === "home")) {
        return
      }

      document.querySelectorAll(".main-nav a").forEach((navLink) => {
        navLink.classList.remove("active")
      })
      this.classList.add("active")

      const mainNav = document.querySelector(".main-nav")
      const menuToggle = document.getElementById("menu-toggle")

      if (mainNav && window.innerWidth <= 768) {
        mainNav.classList.remove("active")
        if (menuToggle) {
          const icon = menuToggle.querySelector("i")
          if (icon) {
            icon.classList.remove("fa-times")
            icon.classList.add("fa-bars")
          }
        }
      }
    })
  })

  window.addEventListener("popstate", (e) => {
    if (e.state && e.state.page) {
      console.log("Volviendo a la página:", e.state.page)
    }
  })
})

function initSlider() {
  const slides = document.querySelectorAll(".slide")
  const prevBtn = document.querySelector(".prev")
  const nextBtn = document.querySelector(".next")
  let currentIndex = 0
  let slideInterval

  function showSlide(index) {
    slides.forEach((slide) => slide.classList.remove("active"))
    slides[index].classList.add("active")
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length
    showSlide(currentIndex)
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length
    showSlide(currentIndex)
  }

  function startSlideInterval() {
    slideInterval = setInterval(nextSlide, 5000)
  }

  function stopSlideInterval() {
    clearInterval(slideInterval)
  }

  if (nextBtn && prevBtn && slides.length > 0) {
    nextBtn.addEventListener("click", () => {
      nextSlide()
      stopSlideInterval()
      startSlideInterval()
    })

    prevBtn.addEventListener("click", () => {
      prevSlide()
      stopSlideInterval()
      startSlideInterval()
    })

    const heroSlider = document.querySelector(".hero-slider")
    if (heroSlider) {
      heroSlider.addEventListener("mouseenter", stopSlideInterval)
      heroSlider.addEventListener("mouseleave", startSlideInterval)
    }

    startSlideInterval()
  }
}

function initMobileMenu() {
  const menuToggle = document.getElementById("menu-toggle")
  const mainNav = document.querySelector(".main-nav")
  const dropdowns = document.querySelectorAll(".dropdown")

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      if (mainNav.style.display === "none" || mainNav.style.display === "") {
        mainNav.style.display = "block"
        mainNav.classList.add("active")
        const icon = menuToggle.querySelector("i")
        if (icon) {
          icon.classList.remove("fa-bars")
          icon.classList.add("fa-times")
        }
      } else {
        mainNav.style.display = "none"
        mainNav.classList.remove("active")
        const icon = menuToggle.querySelector("i")
        if (icon) {
          icon.classList.remove("fa-times")
          icon.classList.add("fa-bars")
        }
        dropdowns.forEach((dropdown) => {
          dropdown.classList.remove("active")
          const submenu = dropdown.querySelector(".dropdown-menu")
          if (submenu) {
            submenu.style.display = "none"
          }
        })
      }
    })
  }

  dropdowns.forEach((dropdown) => {
    const link = dropdown.querySelector("a")
    const submenu = dropdown.querySelector(".dropdown-menu")

    if (link && submenu) {
      link.addEventListener("click", (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault()
          e.stopPropagation()
          if (submenu.style.display === "block") {
            submenu.style.display = "none"
            dropdown.classList.remove("active")
          } else {
            dropdowns.forEach((otherDropdown) => {
              if (otherDropdown !== dropdown) {
                otherDropdown.classList.remove("active")
                const otherSubmenu = otherDropdown.querySelector(".dropdown-menu")
                if (otherSubmenu) {
                  otherSubmenu.style.display = "none"
                }
              }
            })
            submenu.style.display = "block"
            dropdown.classList.add("active")
          }
        }
      })
    }
  })

  window.addEventListener("resize", () => {
    if (mainNav) {
      if (window.innerWidth > 768) {
        mainNav.style.display = "block"
        mainNav.classList.remove("active")
        dropdowns.forEach((dropdown) => {
          const submenu = dropdown.querySelector(".dropdown-menu")
          if (submenu) {
            submenu.style.removeProperty("display")
          }
        })
      } else {
        if (!mainNav.classList.contains("active")) {
          mainNav.style.display = "none"
        }
      }
    }

    if (menuToggle && window.innerWidth > 768) {
      const icon = menuToggle.querySelector("i")
      if (icon) {
        icon.classList.remove("fa-times")
        icon.classList.add("fa-bars")
      }
    }
  })
}

function initTheme() {
  const savedTheme = localStorage.getItem("theme")
  const themeSwitch = document.getElementById("theme-switch")

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode")
    if (themeSwitch) themeSwitch.checked = true
  }

  if (themeSwitch) {
    themeSwitch.addEventListener("change", () => {
      if (themeSwitch.checked) {
        document.body.classList.add("dark-mode")
        localStorage.setItem("theme", "dark")
      } else {
        document.body.classList.remove("dark-mode")
        localStorage.setItem("theme", "light")
      }
    })
  }
}

function initStickyHeader() {
  const header = document.getElementById("main-header")
  if (header) {
    let lastScrollTop = 0

    function handleScroll() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop

      if (scrollTop > 100) {
        header.classList.add("sticky")
      } else {
        header.classList.remove("sticky")
      }

      lastScrollTop = scrollTop
    }

    window.addEventListener("scroll", handleScroll)
  }
}

function initVideoModal() {
  const playVideo = document.getElementById("play-video")
  const videoModal = document.getElementById("video-modal")
  const closeVideo = document.querySelector(".close-video")
  const youtubePlayer = document.getElementById("youtube-player")

  if (playVideo && videoModal && closeVideo && youtubePlayer) {
    playVideo.addEventListener("click", () => {
      youtubePlayer.src = "https://www.youtube.com/embed/40XCopZ-5DM?autoplay=1"
      videoModal.style.display = "block"
    })

    closeVideo.addEventListener("click", () => {
      youtubePlayer.src = ""
      videoModal.style.display = "none"
    })

    window.addEventListener("click", (e) => {
      if (e.target === videoModal) {
        closeVideo.click()
      }
    })
  }
}

function initChatbot() {
  const chatbotTrigger = document.getElementById("chatbot-trigger")
  const chatbotWindow = document.getElementById("chatbot-window")
  const chatbotClose = document.getElementById("chatbot-close")
  const chatbotSend = document.getElementById("chatbot-send")
  const chatbotInput = document.getElementById("chatbot-input")
  const chatbotBody = document.querySelector(".chatbot-body")

  if (chatbotTrigger && chatbotWindow) {
    chatbotTrigger.addEventListener("click", () => {
      chatbotWindow.style.display = "flex"
    })
  }

  if (chatbotClose && chatbotWindow) {
    chatbotClose.addEventListener("click", () => {
      chatbotWindow.style.display = "none"
    })
  }

  if (chatbotSend && chatbotInput && chatbotBody) {
    chatbotSend.addEventListener("click", sendMessage)
    chatbotInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") sendMessage()
    })

    function sendMessage() {
      const message = chatbotInput.value.trim()
      if (message !== "") {
        const userMsg = document.createElement("div")
        userMsg.className = "chat-message"
        userMsg.textContent = message
        chatbotBody.appendChild(userMsg)

        setTimeout(() => {
          const botMsg = document.createElement("div")
          botMsg.className = "chat-message bot"
          botMsg.textContent = "Gracias por tu mensaje, en breve te responderemos."
          chatbotBody.appendChild(botMsg)
          chatbotBody.scrollTop = chatbotBody.scrollHeight
        }, 500)

        chatbotInput.value = ""
        chatbotBody.scrollTop = chatbotBody.scrollHeight
      }
    }
  }
}
