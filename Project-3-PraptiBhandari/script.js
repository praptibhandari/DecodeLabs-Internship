

(function () {
  "use strict";

  
  // Dark Mode Toggle

  const themeToggleBtn = document.querySelector("#themeToggle");
  const body = document.body;

  const THEME_KEY = "project3-theme"; 

  function setTheme(theme) {
    const isLight = theme === "light";
    body.classList.toggle("theme-light", isLight);

    themeToggleBtn?.setAttribute("aria-pressed", String(isLight));

    // Update button label/icon (simple and beginner-friendly)
    const icon = themeToggleBtn?.querySelector(".toggle-icon");
    const text = themeToggleBtn?.querySelector(".toggle-text");
    if (icon && text) {
      if (isLight) {
        icon.textContent = "☀️";
        text.textContent = "Light mode";
      } else {
        icon.textContent = "🌙";
        text.textContent = "Dark mode";
      }
    }
  }

  function getInitialTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === "light" || stored === "dark") return stored;

    // Default: honor system preference if available
    const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
    return prefersLight ? "light" : "dark";
  }

  if (themeToggleBtn) {
    setTheme(getInitialTheme());

    themeToggleBtn.addEventListener("click", () => {
      const nextTheme = body.classList.contains("theme-light") ? "dark" : "light";
      localStorage.setItem(THEME_KEY, nextTheme);
      setTheme(nextTheme);
    });
  }


  // Interactive Counter
 
  const counterValueEl = document.querySelector("#counterValue");
  const incrementBtn = document.querySelector("#incrementBtn");
  const decrementBtn = document.querySelector("#decrementBtn");
  const resetCounterBtn = document.querySelector("#resetCounterBtn");

  let counter = 0;

  function renderCounter() {
    
    // DOM update using textContent
    counterValueEl.textContent = String(counter);
  }

  incrementBtn?.addEventListener("click", () => {
    counter += 1;
    renderCounter();
  });

  decrementBtn?.addEventListener("click", () => {
    // Prevent negative values
    counter = Math.max(0, counter - 1);
    renderCounter();
  });

  resetCounterBtn?.addEventListener("click", () => {
    counter = 0;
    renderCounter();
  });

  renderCounter();

  // =====================
  // Live Character Counter
  // =====================
  const charInput = document.querySelector("#charInput");
  const charRemainingEl = document.querySelector("#charRemaining");

  const MAX_CHARS = Number(charInput?.getAttribute("maxlength") || 200);

  function updateRemaining() {
    const remaining = MAX_CHARS - (charInput?.value?.length || 0);
    if (charRemainingEl) charRemainingEl.textContent = String(remaining);
  }

  charInput?.addEventListener("input", updateRemaining);
  updateRemaining();

  // =====================
  // Dynamic Quote Generator
  // =====================
  const quoteTextEl = document.querySelector("#quoteText");
  const quoteBtn = document.querySelector("#quoteBtn");

  const quotes = [
    "The secret of getting ahead is getting started.",
    "Small steps every day add up to big results.",
    "Discipline is the bridge between goals and accomplishment.",
    "Make it work, make it right, make it fast.",
    "Your future depends on what you do today.",
    "Focus on progress, not perfection.",
    "Learn continuously—growth is a lifestyle.",
    "Success is built one decision at a time."
  ];

  function getRandomQuote() {
    const index = Math.floor(Math.random() * quotes.length);
    return quotes[index];
  }

  function fadeSwapQuote() {
    if (!quoteTextEl) return;

    quoteTextEl.classList.add("fade-out");

    window.setTimeout(() => {
      const newQuote = getRandomQuote();
      quoteTextEl.textContent = newQuote;
      quoteTextEl.classList.remove("fade-out");
    }, 220);
  }

  quoteBtn?.addEventListener("click", fadeSwapQuote);


  // Interactive FAQ

  const faq = document.querySelector("#faq");

  function closeAllFaqItems() {
    const items = faq?.querySelectorAll(".faq-item[data-faq]") || [];
    items.forEach((item) => {
      const qBtn = item.querySelector(".faq-q");
      const answer = item.querySelector(".faq-a");
      const icon = item.querySelector(".faq-icon");

      qBtn?.setAttribute("aria-expanded", "false");
      if (answer) answer.hidden = true;
      if (icon) icon.textContent = "+";
    });
  }

  faq?.addEventListener("click", (e) => {
    const clickedFaqQ = e.target.closest(".faq-q");
    if (!clickedFaqQ) return;

    const item = clickedFaqQ.closest(".faq-item");
    if (!item) return;

    closeAllFaqItems();

    const answer = item.querySelector(".faq-a");
    const icon = item.querySelector(".faq-icon");

    const isClosed = answer?.hidden === true;

    const qBtn = item.querySelector(".faq-q");
    qBtn?.setAttribute("aria-expanded", String(!isClosed));

    if (answer) answer.hidden = !isClosed;
    if (icon) icon.textContent = !isClosed ? "-" : "+";

    // If we closed all and want to open the clicked item, we need to open it explicitly
    // Since isClosed is true after closeAll, we open it:
    if (isClosed) {
      if (answer) answer.hidden = false;
      if (icon) icon.textContent = "-";
      qBtn?.setAttribute("aria-expanded", "true");
    }
  });

  // Start with all closed
  closeAllFaqItems();


  // Contact Form Validation

  const contactForm = document.querySelector("#contactForm");

  const nameInput = document.querySelector("#nameInput");
  const emailInput = document.querySelector("#emailInput");
  const messageInput = document.querySelector("#messageInput");

  const nameError = document.querySelector("#nameError");
  const emailError = document.querySelector("#emailError");
  const messageError = document.querySelector("#messageError");

  const successMessage = document.querySelector("#successMessage");

  function isValidEmail(email) {
    // Simple email pattern for beginner-friendly validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function setFieldError(errorEl, message) {
    if (!errorEl) return;
    errorEl.textContent = message || "";
  }

  function validate() {
    let isValid = true;

    const name = nameInput?.value?.trim() || "";
    const email = emailInput?.value?.trim() || "";
    const message = messageInput?.value?.trim() || "";

    // Name validation
    if (name.length < 2) {
      setFieldError(nameError, "Please enter your name (at least 2 characters)." );
      isValid = false;
    } else {
      setFieldError(nameError, "");
    }

    // Email validation
    if (!isValidEmail(email)) {
      setFieldError(emailError, "Please enter a valid email address." );
      isValid = false;
    } else {
      setFieldError(emailError, "");
    }

    // Message validation
    if (message.length < 10) {
      setFieldError(messageError, "Message should be at least 10 characters." );
      isValid = false;
    } else {
      setFieldError(messageError, "");
    }

    return isValid;
  }


  nameInput?.addEventListener("input", validate);
  emailInput?.addEventListener("input", validate);
  messageInput?.addEventListener("input", validate);

  contactForm?.addEventListener("submit", (e) => {
    e.preventDefault(); 

    const ok = validate();
    if (!ok) return;

    // Demonstrate innerHTML/textContent concept:
   
    if (successMessage) {
      successMessage.hidden = false;
      successMessage.textContent = "Message sent! ✅ We’ll get back to you soon.";
    }

    // Clear the form
    contactForm.reset();

    // Hide errors after successful submit
    setFieldError(nameError, "");
    setFieldError(emailError, "");
    setFieldError(messageError, "");

    // Optional: re-validate to ensure state is clean
    validate();
  });
})();

