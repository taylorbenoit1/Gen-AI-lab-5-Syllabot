// Floating chat widget that loads the Lab 3 Chatling Syllabus Assistant.
// Used on both pages so the chatbot is available everywhere.
(function () {
  var CHAT_URL = "https://share.chatling.ai/s/q2h1VECyf9YoDP1";

  var launcher = document.createElement("button");
  launcher.className = "chat-launcher";
  launcher.setAttribute("aria-label", "Open Syllabus Assistant chat");
  launcher.innerHTML =
    '<span class="pulse"></span>' +
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';

  var hint = document.createElement("div");
  hint.className = "chat-hint";
  hint.textContent = "Ask about any syllabus 👋";

  var panel = document.createElement("div");
  panel.className = "chat-panel";
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-label", "Syllabus Assistant");
  panel.innerHTML =
    '<div class="chat-head"><div><b>SyllaBot</b><small>Answers from your 4 course syllabi</small></div>' +
    '<button aria-label="Close chat">×</button></div>';

  var iframe = null;
  function open() {
    if (!iframe) {
      iframe = document.createElement("iframe");
      iframe.src = CHAT_URL;
      iframe.title = "Syllabus Assistant chatbot";
      iframe.allow = "clipboard-write";
      panel.appendChild(iframe);
    }
    panel.classList.add("open");
    hint.style.display = "none";
  }
  function close() { panel.classList.remove("open"); }

  launcher.addEventListener("click", function () {
    panel.classList.contains("open") ? close() : open();
  });
  panel.querySelector(".chat-head button").addEventListener("click", close);
  document.querySelectorAll("[data-open-chat]").forEach(function (el) {
    el.addEventListener("click", function (e) { e.preventDefault(); open(); });
  });

  document.body.appendChild(panel);
  document.body.appendChild(hint);
  document.body.appendChild(launcher);
  setTimeout(function () { hint.style.display = "none"; }, 9000);

  // Scroll-reveal animation for elements with .reveal
  var io = "IntersectionObserver" in window
    ? new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
      }, { threshold: 0.12 })
    : null;
  document.querySelectorAll(".reveal").forEach(function (el) { io ? io.observe(el) : el.classList.add("in"); });
})();
