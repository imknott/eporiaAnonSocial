
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
}

document.addEventListener('click', function (event) {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.querySelector('.toggle-sidebar-btn');

    if (
        sidebar.classList.contains('open') &&
        !sidebar.contains(event.target) &&
        !toggleBtn.contains(event.target)
    ) {
        sidebar.classList.remove('open');
    }
});

