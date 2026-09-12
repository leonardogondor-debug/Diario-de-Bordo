// carregar entradas do localStorage
const entriesList = document.getElementById("entriesList");
const diarioForm = document.getElementById("diarioForm");

function loadEntries() {
    const entries = JSON.parse(localStorage.getItem("entries")) || [];
    entriesList.innerHTML = "";
    entries.forEach((entry, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
      <div>
      <strong>${entry.data}</strong>: ${entry.titulo}
      </div>
      ${entry.conteudo}
      <button onclick="removeEntry(${index})">Excluir</button>
    `;
        entriesList.appendChild(li);
    });
}

function saveEntry(titulo, conteudo, data) {
    const entries = JSON.parse(localStorage.getItem("entries")) || [];
    entries.push({ titulo, conteudo, data });
    localStorage.setItem("entries", JSON.stringify(entries));
    loadEntries();
}

function removeEntry(index) {
    const entries = JSON.parse(localStorage.getItem("entries")) || [];
    entries.splice(index, 1);
    localStorage.setItem("entries", JSON.stringify(entries));
    loadEntries();
}

diarioForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const titulo = document.getElementById("titulo").value;
    const conteudo = document.getElementById("conteudo").value;
    const data = document.getElementById("data").value;
    saveEntry(titulo, conteudo, data);
    diarioForm.reset();
});

loadEntries();

// registrar service worker
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js")
        .then((registration) => {
            console.log("Service Worker registrado com sucesso:", registration);
        })
        .catch((error) => {
            console.log("Falha ao registrar o Service Worker:", error);
        });
}

// evento de instalacao
let deferredPrompt;
window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const installBtn = document.createElement("button");
    installBtn.textContent = "Instalar App";

    document.getElementById("installArea").appendChild(installBtn);

    installBtn.addEventListener("click", () => {
        deferredPrompt.prompt();
    });
}); 