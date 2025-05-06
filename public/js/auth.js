const API_BASE = "http://127.0.0.1:3000/api";

// Hantera registrering
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("regUsername").value;
    const password = document.getElementById("regPassword").value;

    try {
      const response = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      // Kolla om svaret är okej (200-299 status)
      if (!response.ok) {
        const data = await response.json(); // För att läsa felmeddelande från servern
        throw new Error(data.error || "Registration failed");
      }

      // Om registreringen är framgångsrik
      const data = await response.json();
      alert("Användare skapad!");
    } catch (err) {
      alert("Fel vid registrering: " + err.message);
    }
  });
}

// Hantera inloggning
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    try {
      const response = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      // Kolla om svaret är okej (200-299 status)
      if (!response.ok) {
        const data = await response.json(); // För att läsa felmeddelande från servern
        throw new Error(data.error || "Login failed");
      }

      // Om inloggningen är framgångsrik
      const data = await response.json();

      // Spara JWT i sessionStorage och gå till skyddad sida
      sessionStorage.setItem("token", data.response.token);
      sessionStorage.setItem("created", data.response.created);
      window.location.href = "protected.html";
    } catch (err) {
      alert("Fel vid inloggning: " + err.message);
    }
  });
}
