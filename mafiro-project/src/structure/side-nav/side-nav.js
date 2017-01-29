(() => {
    mafiro.components.add({
        name: 'side-nav',
        onWindowLoad: onWindowLoad
    });

    function onWindowLoad() {
        console.log('- - Loading component "side-nav"');

        const $closeNavButton = mafiro.element('.mi-close-nav-button')[0];

        $closeNavButton.addEventListener('click', () => {
            const $sideNav = mafiro.element('.mi-side-nav')[0];

            mafiro.class.remove($sideNav, 'open');

            const $body = mafiro.element('body')[0];

            mafiro.class.remove($body, 'nav-open');
        });

        console.log('- - Component "side-nav" loaded');
    }
})();
