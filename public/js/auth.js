const API_BASE = "http://127.0.0.1:3000/api";

// Hantera registrering
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  const registerError = document.getElementById("registerError");

  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    registerError.textContent = "";

    const username = document.getElementById("regUsername").value.trim();
    const password = document.getElementById("regPassword").value;

    // validering
    if (username.length < 3) {
      registerError.textContent = "Användarnamnet måste vara minst 3 tecken.";
      return;
    }
    if (password.length < 6) {
      registerError.textContent = "Lösenordet måste vara minst 6 tecken.";
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Registreringen misslyckades");
      }

      const data = await response.json();
      registerError.style.color = "green";
      registerError.textContent = "Användare skapad!";
    } catch (err) {
      registerError.style.color = "red";
      registerError.textContent = "Fel vid registrering: " + err.message;
    }
  });
}

// Hantera inloggning
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    loginError.textContent = "";

    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value;

    // Validering
     if (username.length < 3) {
      loginError.textContent = "Användarnamnet måste vara minst 3 tecken.";
      return;
    }
    if (password.length < 6) {
      loginError.textContent = "Lösenordet måste vara minst 6 tecken.";
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Inloggning misslyckades");
      }

      const data = await response.json();

      // Spara JWT i sessionStorage och gå till skyddad sida
      sessionStorage.setItem("token", data.response.token);
      sessionStorage.setItem("created", data.response.created);
      window.location.href = "protected.html";
    } catch (err) {
      loginError.textContent = "Fel vid inloggning: " + err.message;
    }
  });
}
