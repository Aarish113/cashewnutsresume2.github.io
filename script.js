document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = document.getElementById('theme-icon');

    // Check for saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        if (themeIcon) themeIcon.src = 'sun.png';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            document.documentElement.classList.toggle('light-theme-base');

            const isLight = document.body.classList.contains('light-theme');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');

            // Change icon
            if (themeIcon) {
                themeIcon.src = isLight ? 'sun.png' : 'moon.png';
            }
        });
    }

    // Initial sync for html class
    if (savedTheme === 'light') {
        document.documentElement.classList.add('light-theme-base');
    }

    // Email Copy to Clipboard
    const emailContainer = document.querySelector('.email-copy');
    if (emailContainer) {
        const originalContent = emailContainer.innerHTML;
        let isCopying = false;

        emailContainer.addEventListener('click', () => {
            if (isCopying) return;
            isCopying = true;

            const emailText = emailContainer.querySelector('span').innerText;
            navigator.clipboard.writeText(emailText).then(() => {
                console.log('Email copied to clipboard:', emailText);
                emailContainer.innerHTML = '<i class="fas fa-check" style="color: #2ecc71;"></i> <span>Copied!</span>';

                setTimeout(() => {
                    emailContainer.innerHTML = originalContent;
                    isCopying = false;
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
                isCopying = false;
            });
        });
    }
});
