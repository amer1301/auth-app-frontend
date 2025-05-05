const token = sessionStorage.getItem("token");

if (!token) {
  alert("Du måste vara inloggad för att se sidan!");
  window.location.href = "index.html";
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
    document.getElementById("data").textContent = data.message;
  })
  .catch(err => {
    alert(err.message);
    window.location.href = "index.html";
  });
