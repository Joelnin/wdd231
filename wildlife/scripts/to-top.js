export function toTop(buttonId) {
    const button = document.querySelector(buttonId);

    if (button) {
        window.addEventListener('scroll', () => {
            button.classList[
                (document.documentElement.scrollTop > 200) ? 'remove' : 'add'
            ]('not-reveal');
        });

        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        })
    }
}