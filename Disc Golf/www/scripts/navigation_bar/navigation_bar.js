function SetupNavigationBar() {
    var menuLeft = document.getElementById('cbp-spmenu-s1');
    var showNavigation = document.getElementById('showNavigation');

    showNavigation.onclick = function () {
        classie.toggle(this, 'active');
        classie.toggle(menuLeft, 'cbp-spmenu-open');
    }
}

function CloseNavigation() {
    var menuLeft = document.getElementById('cbp-spmenu-s1');
    classie.toggle(menuLeft, 'cbp-spmenu-open');
}