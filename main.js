const designs = [
    {
        title: "Pendón Nuevo 2026",
        type: "Pendón",
        tag: "pendon",
        preview: "files/pendon_nuevo_2026/pendon_nuevo%202026.png",
        download: "files/pendon_nuevo_2026/pendon_nuevo_2026.zip",
        downloadFormat: "ZIP",
    },
    {
        title: "Sticker SIM Cards",
        type: "Sticker",
        tag: "sticker",
        preview: "files/sticker_sim/sticker.png",
        download: "files/sticker_sim/sticker_sim.zip",
        downloadFormat: "ZIP",
    },
    {
        title: "Sticker Claro Quindío",
        type: "Sticker",
        tag: "sticker",
        preview: "files/sticker_claro_quindio/sticker.png",
        download: "files/sticker_claro_quindio/sticker_claro_quindio.zip",
        downloadFormat: "ZIP",
    },
    {
        title: "Sticker Claro Risaralda",
        type: "Sticker",
        tag: "sticker",
        preview: "files/sticker_claro_risaralda/sticker.png",
        download: "files/sticker_claro_risaralda/sticker_claro_risaralda.zip",
        downloadFormat: "ZIP",
    },
    {
        title: "Sticker Claro Valle",
        type: "Sticker",
        tag: "sticker",
        preview: "files/sticker_claro_valle/sticker.png",
        download: "files/sticker_claro_valle/sticker_claro_valle.zip",
        downloadFormat: "ZIP",
    },
    {
        title: "Prohibido Parquear",
        type: "Señalización",
        tag: "senalizacion",
        preview: "files/prohibido_parquear/sticker.png",
        download: "files/prohibido_parquear/prohibido_parquear.zip",
        downloadFormat: "ZIP",
    },
    {
        title: "Aviso: Mantener puerta cerrada",
        type: "Señalización",
        tag: "senalizacion",
        preview: "files/aviso_ba%C3%B1o/aviso.png",
        download: "files/aviso_ba%C3%B1o/aviso_ba%C3%B1o.zip",
        downloadFormat: "ZIP",
    },
    {
        title: "Zona Monitoreada por CCTV",
        type: "Señalización",
        tag: "senalizacion",
        preview: "files/zona_monitoreada/mesa.png",
        download: "files/zona_monitoreada/zona_monitoreada.zip",
        downloadFormat: "ZIP",
    },
    {
        title: "Zona de Espera",
        type: "Señalización",
        tag: "senalizacion",
        preview: "files/zona_espera/mesa.png",
        download: "files/zona_espera/zona_espera.zip",
        downloadFormat: "ZIP",
    },
    {
        title: "Reglamento Interno DQ",
        type: "Manual",
        tag: "manual",
        preview: "files/manual_dq/mesa.png",
        download: "files/manual_dq/manual_dq.zip",
        downloadFormat: "ZIP",
    },
    {
        title: "Reglamento Interno MafePhone",
        type: "Manual",
        tag: "manual",
        preview: "files/manual_mafe/mesa.png",
        download: "files/manual_mafe/manual_mafe.zip",
        downloadFormat: "ZIP",
    },
    {
        title: "Plantilla de precio $9.000",
        type: "Plantilla",
        tag: "plantilla",
        preview: "files/Precio_9000_standar/mesa.png",
        download: "files/Precio_9000_standar/Precio_9000_standar.zip",
        downloadFormat: "ZIP",
    },
    {
        title: "Plantilla mini de precio $9.000",
        type: "Plantilla",
        tag: "plantilla",
        preview: "files/precio_9000_mini/mesa.png",
        download: "files/precio_9000_mini/precio_9000_mini.zip",
        downloadFormat: "ZIP",
    },
];

const gallery = document.getElementById("gallery");
const empty = document.getElementById("empty");
const searchInput = document.getElementById("search");
const filterList = document.getElementById("filter-list");
const downloadMenu = document.getElementById("download-menu");
const downloadMenuToggle = document.getElementById("download-menu-toggle");
const downloadMenuList = document.getElementById("download-menu-list");
const shareStatus = document.getElementById("share-status");

let activeFilter = "all";
let query = "";
let shareStatusTimeout;

function closeDownloadMenu() {
    downloadMenuToggle.setAttribute("aria-expanded", "false");
    downloadMenuList.hidden = true;
}

function showShareStatus(message) {
    shareStatus.textContent = message;
    shareStatus.hidden = false;
    clearTimeout(shareStatusTimeout);
    shareStatusTimeout = setTimeout(() => { shareStatus.hidden = true; }, 3000);
}

function updateFilterIndicator() {
    const activeButton = filterList.querySelector(".chip.active");
    if (!activeButton) return;

    const navRect = filterList.getBoundingClientRect();
    const buttonRect = activeButton.getBoundingClientRect();
    filterList.style.setProperty("--indicator-x", `${buttonRect.left - navRect.left - filterList.clientLeft}px`);
    filterList.style.setProperty("--indicator-width", `${buttonRect.width}px`);
}

function render() {
    const q = query.trim().toLowerCase();
    const filtered = designs.filter(d => {
        const matchFilter = activeFilter === "all" || d.tag === activeFilter;
        const matchQuery = !q || d.title.toLowerCase().includes(q) || d.type.toLowerCase().includes(q);
        return matchFilter && matchQuery;
    });

    gallery.innerHTML = "";
    if (filtered.length === 0) { empty.hidden = false; return; }
    empty.hidden = true;

    filtered.forEach(d => {
        const card = document.createElement("article");
        card.className = "card";
        card.innerHTML = `
            <div class="card-media">
                <img src="${d.preview}" alt="${d.title}">
            </div>
            <div class="card-body">
                <div class="card-meta-row">
                    <span class="card-tag">${d.type}</span>
                    <button class="btn card-download" data-file="${d.download}" aria-label="Descargar ${d.title} (${d.downloadFormat})" data-tooltip="Descargar archivo ${d.downloadFormat}">
                        <span class="miller-icon" data-icon="download" aria-hidden="true"></span>
                    </button>
                </div>
                <div class="card-title">${d.title}</div>
            </div>`;
        gallery.appendChild(card);
    });
    window.MillerIcons?.scan(gallery);
}

filterList.addEventListener("click", e => {
    const btn = e.target.closest("button[data-filter]");
    if (!btn) return;
    activeFilter = btn.dataset.filter;
    filterList.querySelectorAll("button[data-filter]").forEach(x => {
        const isActive = x === btn;
        x.classList.toggle("active", isActive);
        x.setAttribute("aria-pressed", String(isActive));
    });
    updateFilterIndicator();
    render();
});

window.addEventListener("resize", updateFilterIndicator);
document.getElementById("btn-search")?.addEventListener("click", () => { query = searchInput.value; render(); });
searchInput.addEventListener("keydown", e => { if (e.key === "Enter") { query = searchInput.value; render(); } });
searchInput.addEventListener("input", () => { query = searchInput.value; render(); });

gallery.addEventListener("click", e => {
    const btn = e.target.closest("button[data-file]");
    if (!btn) return;
    const a = document.createElement("a");
    a.href = btn.dataset.file;
    a.download = "";
    a.click();
});

downloadMenuToggle.addEventListener("click", () => {
    const isOpen = downloadMenuToggle.getAttribute("aria-expanded") === "true";
    downloadMenuToggle.setAttribute("aria-expanded", String(!isOpen));
    downloadMenuList.hidden = isOpen;
    if (!isOpen) downloadMenuList.querySelector('[role="menuitem"]').focus();
});

document.addEventListener("click", e => {
    if (!downloadMenu.contains(e.target)) {
        closeDownloadMenu();
    }
});

document.addEventListener("keydown", e => {
    if (e.key === "Escape" && downloadMenuToggle.getAttribute("aria-expanded") === "true") {
        closeDownloadMenu();
        downloadMenuToggle.focus();
    }
});

document.getElementById("download-all").addEventListener("click", () => {
    closeDownloadMenu();
    designs.forEach(d => {
        const a = document.createElement("a");
        a.href = d.download;
        a.download = "";
        document.body.appendChild(a);
        a.click();
        a.remove();
    });
});

document.getElementById("share-page").addEventListener("click", async () => {
    closeDownloadMenu();
    const shareData = { title: document.title, url: window.location.href };

    if (navigator.share) {
        try {
            await navigator.share(shareData);
            return;
        } catch (error) {
            if (error.name === "AbortError") return;
            console.error("No se pudo compartir el enlace:", error);
        }
    }

    try {
        await navigator.clipboard.writeText(shareData.url);
        showShareStatus("Enlace copiado al portapapeles");
    } catch (error) {
        console.error("No se pudo copiar el enlace:", error);
        window.prompt("Copia el enlace para compartirlo:", shareData.url);
    }
});

render();
updateFilterIndicator();
