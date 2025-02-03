document.addEventListener('DOMContentLoaded', function() {
    // Funzione per il cambio tema
    window.switchTheme = function() {
        const darkThemeLink = document.getElementById('dark-theme');
        if (darkThemeLink.disabled) {
            darkThemeLink.disabled = false;
            localStorage.setItem('theme', 'dark');
        } else {
            darkThemeLink.disabled = true;
            localStorage.setItem('theme', 'light');
        }
    }

    // Applicare il tema salvato al caricamento della pagina
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.getElementById('dark-theme').disabled = false;
    } else {
        document.getElementById('dark-theme').disabled = true;
    }
});
