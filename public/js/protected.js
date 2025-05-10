const token = sessionStorage.getItem("token");
const created = sessionStorage.getItem("created");
const errorEl = document.getElementById("protectedError");

if (!token) {
  errorEl.textContent = "Du måste vara inloggad för att se sidan!";
  setTimeout(() => (window.location.href = "index.html"), 1500);
}

fetch("http://127.0.0.1:3000/api/protected", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then(res => {
    if (!res.ok) {
      throw new Error("Obehörig eller sessionen har gått ut.");
    }
    return res.json();
  })
  .then(data => {
    const formattedDate = new Date(created).toLocaleString("sv-SE");
    document.getElementById("data").textContent = `${data.message} (Ditt konto skapades ${formattedDate})`;
  })
  .catch(err => {
    errorEl.textContent = err.message;
    setTimeout(() => (window.location.href = "index.html"), 2000);
  });
