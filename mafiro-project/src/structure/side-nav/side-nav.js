(() => {
    mafiro.components.add({
        name: 'side-nav',
        loadOnce: true,
        onWindowLoad: onWindowLoad
    });

    function onWindowLoad() {
        const $closeNavButton = mafiro.element('.mi-close-nav-button')[0];

        $closeNavButton.addEventListener('click', () => {
            const $body = mafiro.element('body')[0];

            mafiro.class.remove($body, 'nav-open');
        });
    }
})();
