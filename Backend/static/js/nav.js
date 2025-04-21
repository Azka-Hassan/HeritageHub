document.addEventListener("DOMContentLoaded", function () {
    fetch("/load_navbar")
        .then(response => response.text())
        .then(data => {
            document.getElementById("nav-container").innerHTML = data;

            // Initialize sidebar and avatar dropdown now that navbar is loaded
            initializeSidebar();
            initializeAvatarDropdown();
        })
        .catch(error => console.error("Error loading navbar:", error));
});

function initializeSidebar() {
    const sidebar = document.getElementById("sidebar");
    const openMenu = document.getElementById("openMenu");
    const closeMenu = document.getElementById("closeMenu");

    if (openMenu && closeMenu && sidebar) {
        openMenu.addEventListener("click", function () {
            sidebar.classList.add("active"); // Show sidebar
        });

        closeMenu.addEventListener("click", function () {
            sidebar.classList.remove("active"); // Hide sidebar
        });

        // Close sidebar when clicking outside
        document.addEventListener("click", function (event) {
            if (!sidebar.contains(event.target) && !openMenu.contains(event.target)) {
                sidebar.classList.remove("active");
            }
        });
    } else {
        console.error("Sidebar elements not found!");
    }
}

function initializeAvatarDropdown() {
    const avatar = document.getElementById("avatarDropdown");
    const menu = document.getElementById("dropdownMenu");

    if (!avatar || !menu) return;

    avatar.addEventListener("click", () => {
        menu.style.display = (menu.style.display === "block") ? "none" : "block";
    });

    window.addEventListener("click", (e) => {
        if (!avatar.contains(e.target) && !menu.contains(e.target)) {
            menu.style.display = "none";
        }
    });
}
