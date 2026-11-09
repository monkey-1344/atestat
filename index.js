async function includeHtml() {
    const elements = document.querySelectorAll("[include_html]");

    await Promise.all([...elements].map(async (element) => {
        const file = element.getAttribute("include_html");
        const response = await fetch(file);

        if (!response.ok) {
            throw new Error(`Could not load ${file}: ${response.status}`);
        }

        element.innerHTML = await response.text();
    }));

    setActiveLink();
}

function setActiveLink() {
    const page = location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll("#navMain a[href]").forEach((link) => {
        const href = link.getAttribute("href").split("#")[0];
        if (href !== page) return;

        link.classList.add("active");
        link.setAttribute("aria-current", "page");

        if (link.classList.contains("menu-item")) {
            const parentButton = link.closest(".nav-item")?.querySelector(".nav-link");
            parentButton?.classList.add("active");
        }
    });
}

includeHtml();

let draggingScrollbar = false;

document.addEventListener("mousemove", (e) => {
    const nearEdge = e.clientX > window.innerWidth - 24;
    document.documentElement.classList.toggle("show-scrollbar", nearEdge || draggingScrollbar);
});

document.addEventListener("mousedown", (e) => {
    draggingScrollbar = e.clientX > window.innerWidth - 24;
});

document.addEventListener("mouseup", () => {
    draggingScrollbar = false;
});