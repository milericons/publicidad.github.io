const designs = [
    {
        title: "Pendón Nuevo 2026",
        type: "Pendón",
        tag: "pendon",
        preview: "files/pendon_nuevo_2026/pendon_nuevo%202026.png",
        download: "files/pendon_nuevo_2026/pendon_nuevo_2026.zip",
        downloadFormat: "ZIP",
        downloadSizeBytes: 78954515,
        includedFormats: ["AI", "PSD", "PNG", "ICC"],
    },
    {
        title: "Sticker SIM Cards",
        type: "Sticker",
        tag: "sticker",
        preview: "files/sticker_sim/sticker.png",
        download: "files/sticker_sim/sticker_sim.zip",
        downloadFormat: "ZIP",
        downloadSizeBytes: 70162,
        includedFormats: ["AI"],
    },
    {
        title: "Sticker Claro Quindío",
        type: "Sticker",
        tag: "sticker",
        preview: "files/sticker_claro_quindio/sticker.png",
        download: "files/sticker_claro_quindio/sticker_claro_quindio.zip",
        downloadFormat: "ZIP",
        downloadSizeBytes: 91310708,
        includedFormats: ["AI", "TIF"],
    },
    {
        title: "Sticker Claro Risaralda",
        type: "Sticker",
        tag: "sticker",
        preview: "files/sticker_claro_risaralda/sticker.png",
        download: "files/sticker_claro_risaralda/sticker_claro_risaralda.zip",
        downloadFormat: "ZIP",
        downloadSizeBytes: 39534466,
        includedFormats: ["AI", "TIF"],
    },
    {
        title: "Sticker Claro Valle",
        type: "Sticker",
        tag: "sticker",
        preview: "files/sticker_claro_valle/sticker.png",
        download: "files/sticker_claro_valle/sticker_claro_valle.zip",
        downloadFormat: "ZIP",
        downloadSizeBytes: 12045057,
        includedFormats: ["AI", "TIF"],
    },
    {
        title: "Prohibido Parquear",
        type: "Señalización",
        tag: "senalizacion",
        preview: "files/prohibido_parquear/sticker.png",
        download: "files/prohibido_parquear/prohibido_parquear.zip",
        downloadFormat: "ZIP",
        downloadSizeBytes: 2573546,
        includedFormats: ["AI", "TIF"],
    },
    {
        title: "Aviso: Mantener puerta cerrada",
        type: "Señalización",
        tag: "senalizacion",
        preview: "files/aviso_ba%C3%B1o/aviso.png",
        download: "files/aviso_ba%C3%B1o/aviso_ba%C3%B1o.zip",
        downloadFormat: "ZIP",
        downloadSizeBytes: 2198702,
        includedFormats: ["AI", "TIF"],
    },
    {
        title: "Zona Monitoreada por CCTV",
        type: "Señalización",
        tag: "senalizacion",
        preview: "files/zona_monitoreada/mesa.png",
        download: "files/zona_monitoreada/zona_monitoreada.zip",
        downloadFormat: "ZIP",
        downloadSizeBytes: 2072908,
        includedFormats: ["AI", "TIF"],
    },
    {
        title: "Zona de Espera",
        type: "Señalización",
        tag: "senalizacion",
        preview: "files/zona_espera/mesa.png",
        download: "files/zona_espera/zona_espera.zip",
        downloadFormat: "ZIP",
        downloadSizeBytes: 1984947,
        includedFormats: ["AI", "TIF"],
    },
    {
        title: "Reglamento Interno DQ",
        type: "Manual",
        tag: "manual",
        preview: "files/manual_dq/mesa.png",
        download: "files/manual_dq/manual_dq.zip",
        downloadFormat: "ZIP",
        downloadSizeBytes: 2110589,
        includedFormats: ["AI"],
    },
    {
        title: "Reglamento Interno MafePhone",
        type: "Manual",
        tag: "manual",
        preview: "files/manual_mafe/mesa.png",
        download: "files/manual_mafe/manual_mafe.zip",
        downloadFormat: "ZIP",
        downloadSizeBytes: 2136725,
        includedFormats: ["AI"],
    },
    {
        title: "Plantilla de precio $9.000",
        type: "Plantilla",
        tag: "plantilla",
        preview: "files/Precio_9000_standar/mesa.png",
        download: "files/Precio_9000_standar/Precio_9000_standar.zip",
        downloadFormat: "ZIP",
        downloadSizeBytes: 1726812,
        includedFormats: ["AI"],
    },
    {
        title: "Plantilla mini de precio $9.000",
        type: "Plantilla",
        tag: "plantilla",
        preview: "files/precio_9000_mini/mesa.png",
        download: "files/precio_9000_mini/precio_9000_mini.zip",
        downloadFormat: "ZIP",
        downloadSizeBytes: 1784382,
        includedFormats: ["AI"],
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
const previewDialog = document.getElementById("preview-dialog");
const previewImage = document.getElementById("preview-image");
const previewImageWrap = previewDialog.querySelector(".preview-image-wrap");
const previewLens = document.getElementById("preview-lens");
const previewDetails = previewDialog.querySelector(".preview-details");
const previewTitle = document.getElementById("preview-title");
const previewType = document.getElementById("preview-type");
const previewPackage = document.getElementById("preview-package");
const previewSize = document.getElementById("preview-size");
const previewFormats = document.getElementById("preview-formats");
const previewDownload = document.getElementById("preview-download");
const previewCounter = document.getElementById("preview-counter");
const previewPrev = document.getElementById("preview-prev");
const previewNext = document.getElementById("preview-next");
const previewClose = document.getElementById("preview-close");

let activeFilter = "all";
let query = "";
let shareStatusTimeout;
let visibleDesigns = [];
let currentPreviewIndex = -1;
let previewOpener = null;

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

function formatFileSize(bytes) {
    if (bytes < 1_000_000) return `${(bytes / 1_000).toFixed(1)} KB`;
    return `${(bytes / 1_000_000).toFixed(1)} MB`;
}

function hidePreviewLens() {
    previewLens.hidden = true;
}

function updatePreviewLens(event) {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
        event.target.closest(".preview-nav, .preview-counter")) {
        hidePreviewLens();
        return;
    }

    if (!previewImage.complete || !previewImage.naturalWidth) {
        hidePreviewLens();
        return;
    }

    const imageRect = previewImage.getBoundingClientRect();
    const frameRect = previewImageWrap.getBoundingClientRect();
    const imageScale = Math.min(
        imageRect.width / previewImage.naturalWidth,
        imageRect.height / previewImage.naturalHeight
    );
    const imageWidth = previewImage.naturalWidth * imageScale;
    const imageHeight = previewImage.naturalHeight * imageScale;
    const imageLeft = imageRect.left + (imageRect.width - imageWidth) / 2;
    const imageTop = imageRect.top + (imageRect.height - imageHeight) / 2;
    const imageX = event.clientX - imageLeft;
    const imageY = event.clientY - imageTop;

    if (imageX < 0 || imageX > imageWidth || imageY < 0 || imageY > imageHeight) {
        hidePreviewLens();
        return;
    }

    const zoom = 2.5;
    const lensSize = 176;
    const lensRadius = lensSize / 2;
    previewLens.style.left = `${event.clientX - frameRect.left - lensRadius}px`;
    previewLens.style.top = `${event.clientY - frameRect.top - lensRadius}px`;
    previewLens.style.backgroundImage = `url("${previewImage.currentSrc}")`;
    previewLens.style.backgroundSize = `${imageWidth * zoom}px ${imageHeight * zoom}px`;
    previewLens.style.backgroundPosition =
        `${lensRadius - imageX * zoom}px ${lensRadius - imageY * zoom}px`;
    previewLens.hidden = false;
}

function updatePreview(animate = false) {
    const design = visibleDesigns[currentPreviewIndex];
    if (!design) return;

    hidePreviewLens();
    [previewImage, previewDetails].forEach(element => {
        element.classList.remove("preview-enter");
    });
    previewImage.src = design.preview;
    previewImage.alt = design.title;
    if (animate && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        [previewImage, previewDetails].forEach(element => {
            void element.offsetWidth;
            element.classList.add("preview-enter");
        });
    }
    previewTitle.textContent = design.title;
    previewType.textContent = design.type;
    previewPackage.textContent = design.downloadFormat;
    previewSize.textContent = formatFileSize(design.downloadSizeBytes);
    previewFormats.replaceChildren(...design.includedFormats.map(format => {
        const badge = document.createElement("span");
        badge.className = "format-badge";
        badge.textContent = format;
        return badge;
    }));
    previewDownload.href = design.download;
    previewDownload.setAttribute("aria-label", `Descargar ${design.title} (${design.downloadFormat}, ${formatFileSize(design.downloadSizeBytes)})`);
    previewCounter.textContent = `${currentPreviewIndex + 1} de ${visibleDesigns.length}`;
    previewPrev.disabled = visibleDesigns.length < 2;
    previewNext.disabled = visibleDesigns.length < 2;
}

function openPreview(index, opener) {
    currentPreviewIndex = index;
    previewOpener = opener;
    updatePreview();
    previewDialog.showModal();
    window.MillerIcons?.scan(previewDialog);
    previewClose.focus();
}

function closePreview() {
    if (!previewDialog.open) return;
    previewDialog.close();
}

function movePreview(direction) {
    if (visibleDesigns.length < 2) return;
    currentPreviewIndex = (currentPreviewIndex + direction + visibleDesigns.length) % visibleDesigns.length;
    updatePreview(true);
}

function render() {
    const q = query.trim().toLowerCase();
    const filtered = designs.filter(d => {
        const matchFilter = activeFilter === "all" || d.tag === activeFilter;
        const matchQuery = !q || d.title.toLowerCase().includes(q) || d.type.toLowerCase().includes(q);
        return matchFilter && matchQuery;
    });

    visibleDesigns = filtered;
    gallery.innerHTML = "";
    if (filtered.length === 0) { empty.hidden = false; return; }
    empty.hidden = true;

    filtered.forEach(d => {
        const card = document.createElement("article");
        card.className = "card";
        card.innerHTML = `
            <div class="card-media">
                <button type="button" class="card-preview" aria-label="Ver detalles de ${d.title}">
                    <img src="${d.preview}" alt="">
                </button>
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
    if (previewDialog.open && currentPreviewIndex >= 0) updatePreview();
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
    const previewButton = e.target.closest(".card-preview");
    if (previewButton) {
        const card = previewButton.closest(".card");
        const cardIndex = [...gallery.querySelectorAll(".card")].indexOf(card);
        openPreview(cardIndex, previewButton);
        return;
    }

    const btn = e.target.closest("button[data-file]");
    if (!btn) return;
    const a = document.createElement("a");
    a.href = btn.dataset.file;
    a.download = "";
    a.click();
});

previewPrev.addEventListener("click", () => movePreview(-1));
previewNext.addEventListener("click", () => movePreview(1));
previewClose.addEventListener("click", closePreview);
previewDownload.addEventListener("click", () => closePreview());
previewImageWrap.addEventListener("pointermove", updatePreviewLens);
previewImageWrap.addEventListener("pointerleave", hidePreviewLens);

previewDialog.addEventListener("click", e => {
    if (e.target === previewDialog) closePreview();
});

previewDialog.addEventListener("close", () => {
    if (previewOpener?.isConnected) previewOpener.focus();
    previewOpener = null;
});

document.addEventListener("keydown", e => {
    if (!previewDialog.open) return;
    if (e.key === "Escape") {
        e.preventDefault();
        closePreview();
    } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        movePreview(-1);
    } else if (e.key === "ArrowRight") {
        e.preventDefault();
        movePreview(1);
    }
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
