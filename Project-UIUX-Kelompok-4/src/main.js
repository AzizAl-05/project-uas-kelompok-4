document.addEventListener("DOMContentLoaded", () => {
  /* ===============================
     BURGER MENU (LANDING PAGE)
  =============================== */
  const menuburger = document.querySelector("#menuBurger");
  const navMobile = document.querySelector("#navMobile");

  if (menuburger) {
    menuburger.addEventListener("click", function () {
      navMobile.classList.toggle("hidden");
    });
  }

  // Close mobile nav when a nav link is clicked
  const mobileLinks = document.querySelectorAll("#navMobile a[href^='#']");
  if (mobileLinks.length) {
    mobileLinks.forEach((link) => {
      link.addEventListener("click", function () {
        navMobile.classList.add("hidden");
      });
    });
  }

  /* ===============================
     LOGIN ADMIN
  =============================== */
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value;

      // Hide previous error
      const err = document.getElementById("errorMsg");
      if (err) err.classList.add("d-none");

      // Check admin fixed credentials
      if (username === "admin" && password === "admin123") {
        localStorage.setItem("isLogin", "true");
        localStorage.setItem("currentUser", "admin");
        window.location.href = "admin.html";
        return;
      }

      // Check stored users in localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const match = users.find((u) => u.username === username && u.password === password);

      if (match) {
        localStorage.setItem("isLogin", "true");
        localStorage.setItem("currentUser", username);
        // Registered users -> site index; admin -> admin.html (handled earlier)
        window.location.href = "../../src/index.html";
      } else {
        document.getElementById("errorMsg").classList.remove("d-none");
      }
    });
  }

  /* ===============================
     REGISTER USER
  =============================== */
  const registerForm = document.getElementById("registerForm");

  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const username = document.getElementById("regUsername").value.trim();
      const password = document.getElementById("regPassword").value;
      const confirm = document.getElementById("regConfirm").value;
      const errorEl = document.getElementById("registerError");
      const successEl = document.getElementById("registerSuccess");

      // Reset messages
      if (errorEl) { errorEl.classList.add("d-none"); errorEl.textContent = ""; }
      if (successEl) { successEl.classList.add("d-none"); successEl.textContent = ""; }

      if (!username) {
        errorEl.textContent = "Username tidak boleh kosong.";
        errorEl.classList.remove("d-none");
        return;
      }

      if (password !== confirm) {
        errorEl.textContent = "Password dan konfirmasi tidak cocok.";
        errorEl.classList.remove("d-none");
        return;
      }

      if (password.length < 4) {
        errorEl.textContent = "Password minimal 4 karakter.";
        errorEl.classList.remove("d-none");
        return;
      }

      const users = JSON.parse(localStorage.getItem("users") || "[]");
      if (users.some((u) => u.username === username)) {
        errorEl.textContent = "Username sudah terdaftar.";
        errorEl.classList.remove("d-none");
        return;
      }

      // Save user (include timestamp and role)
      const createdAt = new Date().toLocaleString();
      users.push({ username, password, createdAt, role: 'user' });
      localStorage.setItem("users", JSON.stringify(users));

      successEl.textContent = "Pendaftaran berhasil! Mengalihkan ke halaman login...";
      successEl.classList.remove("d-none");

      setTimeout(() => {
        window.location.href = "login.html";
      }, 1200);
    });
  }

  /* ===============================
     AUTH UI (show username / logout)
  =============================== */
  function updateAuthUI() {
    const isLogin = localStorage.getItem("isLogin") === "true";
    const currentUser = localStorage.getItem("currentUser");
    const loginLink = document.getElementById("loginLink");
    const userArea = document.getElementById("userArea");
    const userAvatar = document.getElementById("userAvatar");
    const userName = document.getElementById("userName");
    const logoutBtn = document.getElementById("logoutBtn");
    const loginMobileLink = document.getElementById("loginMobileLink");
    const userMobileArea = document.getElementById("userMobileArea");
    const userAvatarMobile = document.getElementById("userAvatarMobile");
    const userNameMobile = document.getElementById("userNameMobile");
    const logoutMobileBtn = document.getElementById("logoutMobileBtn");

    if (isLogin && currentUser) {
      if (loginLink) loginLink.classList.add("hidden");
      if (loginMobileLink) loginMobileLink.classList.add("hidden");

      if (userArea) {
        userArea.classList.remove("hidden");
        if (userName) userName.textContent = currentUser;
        if (userAvatar) {
          userAvatar.textContent = currentUser.charAt(0).toUpperCase();
          userAvatar.title = currentUser;
        }
      }

      if (userMobileArea) {
        userMobileArea.classList.remove("hidden");
        if (userNameMobile) userNameMobile.textContent = currentUser;
        if (userAvatarMobile) {
          userAvatarMobile.textContent = currentUser.charAt(0).toUpperCase();
          userAvatarMobile.title = currentUser;
        }
      }
    } else {
      if (loginLink) loginLink.classList.remove("hidden");
      if (loginMobileLink) loginMobileLink.classList.remove("hidden");
      if (userArea) userArea.classList.add("hidden");
      if (userMobileArea) userMobileArea.classList.add("hidden");
      if (userAvatar) userAvatar.textContent = "";
      if (userAvatarMobile) userAvatarMobile.textContent = "";
    }

    if (logoutBtn) {
      logoutBtn.onclick = function () {
        localStorage.removeItem("isLogin");
        localStorage.removeItem("currentUser");
        updateAuthUI();
      };
    }

    if (logoutMobileBtn) {
      logoutMobileBtn.onclick = function () {
        localStorage.removeItem("isLogin");
        localStorage.removeItem("currentUser");
        if (typeof navMobile !== 'undefined' && navMobile) navMobile.classList.add("hidden");
        updateAuthUI();
      };
    }
  }

  // Run on load
  updateAuthUI();

});
