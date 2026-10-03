// carregar entradas do localStorage
const entriesList = document.getElementById("entriesList");
const diarioForm = document.getElementById("diarioForm");

function getEntries() {
    return JSON.parse(localStorage.getItem("entries")) || [];
}

function setEntries(entries) {
    localStorage.setItem("entries", JSON.stringify(entries));
}

function loadEntries() {
    const entries = getEntries();
    entriesList.innerHTML = "";

    entries.forEach((entry, index) => {
        const li = document.createElement("li");

        const cabecalho = document.createElement("div");
        const data = document.createElement("strong");
        data.textContent = entry.data;
        cabecalho.append(data, `: ${entry.titulo}`);

        const conteudo = document.createElement("p");
        conteudo.textContent = entry.conteudo;

        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";
        btnExcluir.addEventListener("click", () => removeEntry(index));

        li.append(cabecalho, conteudo, btnExcluir);
        entriesList.appendChild(li);
    });
}

function saveEntry(titulo, conteudo, data) {
    const entries = getEntries();
    entries.push({ titulo, conteudo, data });
    setEntries(entries);
    loadEntries();
}

function removeEntry(index) {
    const entries = getEntries();
    entries.splice(index, 1);
    setEntries(entries);
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

    if (!document.getElementById("installBtn")) {
        const installBtn = document.createElement("button");
        installBtn.id = "installBtn";
        installBtn.textContent = "Instalar App";

        document.getElementById("installArea").appendChild(installBtn);

        installBtn.addEventListener("click", () => {
            deferredPrompt.prompt();

            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === "accepted") {
                    console.log("Usuário aceitou o prompt de instalação");
                } else {
                    console.log("Usuário recusou o prompt de instalação");
                }

                installBtn.remove();
                deferredPrompt = null;
            });
        });
    }
}); 