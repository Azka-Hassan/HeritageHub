// function toggleMenu() {
//     var nav = document.getElementById("navbarNav");
//     nav.classList.toggle("active");
// }

// document.addEventListener("DOMContentLoaded", function () {
//     const sidebar = document.getElementById("sidebar");
//     const openMenu = document.getElementById("openMenu");
//     const closeMenu = document.getElementById("closeMenu");

//     openMenu.addEventListener("click", function () {
//         sidebar.classList.add("active"); // Show sidebar
//     });

//     closeMenu.addEventListener("click", function () {
//         sidebar.classList.remove("active"); // Hide sidebar
//     });

//     // Close sidebar when clicking outside
//     document.addEventListener("click", function (event) {
//         if (!sidebar.contains(event.target) && !openMenu.contains(event.target)) {
//             sidebar.classList.remove("active");
//         }
//     });
// });

let prevScrollPos = window.scrollY;

window.onscroll = function () {
    let currentScrollPos = window.scrollY;
    
    if (prevScrollPos > currentScrollPos) {
        document.getElementById("nav").classList.remove("hidden");
    } else {
        document.getElementById("nav").classList.add("hidden");
    }
    
    prevScrollPos = currentScrollPos;
};