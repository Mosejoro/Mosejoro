// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize GSAP and ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // Set current year in footer
  document.getElementById("current-year").textContent =
    new Date().getFullYear();

  // Preloader Animation
  const preloaderAnimation = () => {
    const preloader = document.querySelector(".preloader");
    const preloaderText = document.querySelector(".preloader-text");
    const preloaderProgress = document.querySelector(".preloader-progress");

    const tl = gsap.timeline();

    tl.to(preloaderText, {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: "power3.out",
    });

    tl.to(preloaderProgress, {
      width: "100%",
      duration: 1.5,
      ease: "power3.inOut",
    });

    tl.to(preloader, {
      opacity: 0,
      duration: 0.8,
      onComplete: () => {
        preloader.style.display = "none";
        document.body.style.overflow = "auto";

        // Start animations after preloader
        initAnimations();
      },
    });
  };

  // Initialize all animations
  const initAnimations = () => {
    // Hero section animations
    gsap.from(".hero-content > *", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
    });

    // Parallax effect for hero background
    gsap.to(".parallax-bg", {
      y: "30%",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // About section animations
    gsap.from(".section-title", {
      opacity: 0,
      y: 50,
      duration: 0.8,
      scrollTrigger: {
        trigger: ".about",
        start: "top 80%",
      },
    });

    gsap.from(".about-content", {
      opacity: 0,
      y: 50,
      duration: 0.8,
      scrollTrigger: {
        trigger: ".about-grid",
        start: "top 80%",
      },
    });

    // Animate skill bars
    const skillBars = document.querySelectorAll(".skill-bar");
    skillBars.forEach((bar) => {
      const width = bar.dataset.width;
      gsap.to(bar, {
        width: `${width}%`,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".skills-container",
          start: "top 80%",
        },
      });
    });

    // Animate counters
    const counters = document.querySelectorAll(".counter");
    counters.forEach((counter) => {
      const target = parseInt(counter.dataset.count);
      gsap.to(counter, {
        innerText: target,
        duration: 2,
        ease: "power2.out",
        snap: { innerText: 1 },
        scrollTrigger: {
          trigger: ".counter-grid",
          start: "top 80%",
        },
      });
    });

    // Projects section animations
    // gsap.from(".filter-buttons", {
    //   opacity: 0,
    //   y: 30,
    //   duration: 0.8,
    //   scrollTrigger: {
    //     trigger: ".projects",
    //     start: "top 80%",
    //   },
    // });

    // gsap.from(".project-card", {
    //   opacity: 0,
    //   y: 50,
    //   duration: 0.8,
    //   stagger: 0.2,
    //   scrollTrigger: {
    //     trigger: ".projects-grid",
    //     start: "top 80%",
    //   },
    // });

    // Experience timeline animations
    gsap.from(".timeline-item", {
      opacity: 0,
      x: (i) => (i % 2 === 0 ? -50 : 50),
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".timeline",
        start: "top 80%",
      },
    });

    // Contact section animations
    gsap.from(".contact-card", {
      opacity: 1,
      y: 50,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".contact-info",
        start: "top 80%",
      },
    });

    gsap.from(".contact-form-card", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: ".contact-form-container",
        start: "top 80%",
      },
    });
  };

  // Initialize typing effect
  const initTypingEffect = () => {
    const typed = new Typed("#typed-text", {
      strings: ["Frontend Developer", "JavaScript Expert"],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 1500,
      loop: true,
    });
  };

  // Custom cursor
  const initCustomCursor = () => {
    const cursor = document.querySelector(".custom-cursor");
    const links = document.querySelectorAll("a, button");

    // Only show custom cursor on desktop
    if (window.innerWidth > 768) {
      cursor.style.display = "block";
      document.body.style.cursor = "none";

      document.addEventListener("mousemove", (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      });

      document.addEventListener("mousedown", () => {
        cursor.style.transform = "translate(-50%, -50%) scale(0.9)";
      });

      document.addEventListener("mouseup", () => {
        cursor.style.transform = "translate(-50%, -50%) scale(1)";
      });

      links.forEach((link) => {
        link.addEventListener("mouseenter", () => {
          cursor.style.width = "65px";
          cursor.style.height = "65px";
          cursor.style.backgroundColor = "#11042a";
          cursor.style.opacity = 0;
        });

        link.addEventListener("mouseleave", () => {
          cursor.style.width = "20px";
          cursor.style.height = "20px";
          cursor.style.backgroundColor = "#7c3aed";
          cursor.style.opacity = 1;
        });
      });
    }
  };

  // Mobile menu toggle
  const initMobileMenu = () => {
    const menuToggle = document.querySelector(".mobile-menu-toggle");
    const mobileNav = document.querySelector(".mobile-nav");
    const navLinks = document.querySelectorAll(".mobile-nav .nav-link");

    menuToggle.addEventListener("click", () => {
      mobileNav.style.display =
        mobileNav.style.display === "block" ? "none" : "block";
      menuToggle.querySelector("i").classList.toggle("fa-bars");
      menuToggle.querySelector("i").classList.toggle("fa-times");
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.style.display = "none";
        menuToggle.querySelector("i").classList.add("fa-bars");
        menuToggle.querySelector("i").classList.remove("fa-times");
      });
    });
  };

  // Theme toggle
  const initThemeToggle = () => {
    const themeToggle = document.getElementById("theme-toggle");
    const icon = themeToggle.querySelector("i");

    // Check for saved theme preference or use default
    const savedTheme = localStorage.getItem("theme") || "dark";
    document.body.classList.toggle("dark-mode", savedTheme === "dark");

    // Update icon based on current theme
    if (document.body.classList.contains("dark-mode")) {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    } else {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
    }

    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");

      // Save theme preference
      const currentTheme = document.body.classList.contains("dark-mode")
        ? "dark"
        : "light";
      localStorage.setItem("theme", currentTheme);

      // Update icon
      if (document.body.classList.contains("dark-mode")) {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
      } else {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
      }
    });
  };

  // Smooth scrolling for navigation links
  const initSmoothScrolling = () => {
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();

        const targetId = link.getAttribute("href");
        const targetSection = document.querySelector(targetId);

        window.scrollTo({
          top: targetSection.offsetTop - 70,
          behavior: "smooth",
        });
      });
    });
  };

  // Project filtering
  const initProjectFilter = () => {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Remove active class from all buttons
        filterButtons.forEach((btn) => btn.classList.remove("active"));

        // Add active class to clicked button
        button.classList.add("active");

        const filter = button.dataset.filter;

        // Filter projects
        projectCards.forEach((card) => {
          if (filter === "all" || card.dataset.category === filter) {
            card.style.display = "block";

            // Animate cards that are shown
            gsap.to(card, {
              opacity: 1,
              y: 0,
              duration: 0.5,
            });
          } else {
            gsap.to(card, {
              opacity: 0,
              y: 20,
              duration: 0.5,
              onComplete: () => {
                card.style.display = "none";
              },
            });
          }
        });
      });
    });
  };

  // Project modal
  const initProjectModal = () => {
    const modal = document.querySelector(".project-modal");
    const modalContent = document.querySelector(".modal-content");
    const modalBody = document.querySelector(".modal-body");
    const closeBtn = document.querySelector(".close-modal");
    const viewButtons = document.querySelectorAll(".view-project-btn");

    viewButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const projectId = parseInt(button.dataset.id);
        const project = projectsData.find((p) => p.id === projectId);

        if (project) {
          // Populate modal content
          modalBody.innerHTML = `
              <img src="${project.image}" alt="${project.title}">
              <h2>${project.title}</h2>
              <p>${project.description}</p>
              <div class="tech-stack">
                <h4>Technologies:</h4>
                <div class="project-tags">
                  ${project.technologies
                    .map((tech) => `<span>${tech}</span>`)
                    .join("")}
                </div>
              </div>
              <div class="project-links">
                <a href="${
                  project.demoUrl
                }" class="btn btn-primary" target="_blank">
                  <i class="fas fa-external-link-alt"></i> Live Demo
                </a>
              
              </div>
            `;

          // Show modal
          modal.classList.add("active");
          document.body.style.overflow = "hidden";
        }
      });
    });

    // Close modal when clicking the close button
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    });

    // Close modal when clicking outside the content
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "auto";
      }
    });
  };

  // Contact form handling
  const initContactForm = () => {
    const form = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    form.addEventListener("submit", (e) => {
      //   e.preventDefault();

      // Show loading state
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;
      e.preventDefault();

      const formData = new FormData(form);

      fetch("https://formsubmit.co/mosejoro1@gmail.com", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            formStatus.innerHTML =
              '<i class="fas fa-check-circle"></i> Your message has been sent successfully! I\'ll get back to you soon.';
            formStatus.classList.add("success");
            formStatus.classList.remove("error");
            form.reset();
          } else {
            throw new Error("Form submission failed");
          }
        })
        .catch((error) => {
          formStatus.innerHTML =
            '<i class="fas fa-times-circle"></i> Oops! There was a problem sending your message. Please try again.';
          formStatus.classList.add("error");
          formStatus.classList.remove("success");
        })
        .finally(() => {
          submitBtn.innerHTML = originalBtnText;
          submitBtn.disabled = false;

          setTimeout(() => {
            formStatus.innerHTML = "";
            formStatus.classList.remove("success", "error");
          }, 5000);
        });

      // Simulate form submission (replace with actual form submission)
      //   setTimeout(() => {
      //     // For demo purposes, we'll just simulate a successful submission
      //     formStatus.innerHTML =
      //       '<i class="fas fa-check-circle"></i> Your message has been sent successfully! I\'ll get back to you soon.';
      //     formStatus.classList.add("success");
      //     formStatus.classList.remove("error");

      //     // Reset form
      //     form.reset();

      //     // Reset button
      //     submitBtn.innerHTML = originalBtnText;
      //     submitBtn.disabled = false;

      //     // Hide success message after 5 seconds
      //     setTimeout(() => {
      //       formStatus.innerHTML = "";
      //       formStatus.classList.remove("success");
      //     }, 5000);
      //   }, 1500);
    });
  };

  // Active navigation link based on scroll position
  const initScrollSpy = () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
      let current = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop) {
          current = section.getAttribute("id");
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active");
        }
      });
    });
  };

  // Sample project data (replace with your actual data)
  const projectsData = [
    {
      id: 1,
      title: "Hub For Digital Excellence",
      description:
        "A platform showcasing the organization's mission, initiatives, and programs to drive digital innovation in Africa.",
      image: "img/Hub.png",
      technologies: ["HTML", "CSS", "JavaScript"],
      demoUrl: "https://xolu.vercel.app/",
      githubUrl: "#",
    },
    {
      id: 2,
      title: "SCM",
      description: "Church Fellowship Website",
      image: "img/SCM.png",
      technologies: ["HTML", "CSS", "JavaScript"],
      demoUrl: "https://scm-lautech.vercel.app",
      githubUrl: "#",
    },
    {
      id: 3,
      title: "BINA",
      description: "Online Examination Platform",
      image: "img/Bina.png",
      technologies: ["HTML", "CSS", "JavaScript"],
      demoUrl: "https://binativit.vercel.app",
      githubUrl: "#",
    },
    {
      id: 4,
      title: "Rev. Sr. Bridget Website",
      description: " Personal Website",
      image: "img/Rev.png",
      technologies: ["HTML", "CSS", "JavaScript"],
      demoUrl: "https://sister-bridget.vercel.app/",
      githubUrl: "#",
    },
    {
      id: 5,
      title: "Udigit",
      description: "Marketing Website",
      image: "img/Udigit.png",
      technologies: ["HTML", "CSS", "JavaScript"],
      demoUrl: "https://favour-blond.vercel.app",
      githubUrl: "#",
    },
  ];

  // Initialize everything
  preloaderAnimation();
  initTypingEffect();
  initCustomCursor();
  initMobileMenu();
  initThemeToggle();
  initSmoothScrolling();
  initProjectFilter();
  initProjectModal();
  initContactForm();
  initScrollSpy();
});
