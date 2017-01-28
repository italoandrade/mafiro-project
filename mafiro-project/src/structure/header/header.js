(() => {
    mafiro.components.add({
        name: 'header',
        onWindowLoad: onWindowLoad
    });

    function onWindowLoad() {
        console.log('- - Loading component "header"');

        window.addEventListener('scroll', () => {
            const $elements = mafiro.element('.mi-header');

            mafiro.each($elements, (i, $element) => {
                if (window.scrollY) {
                    mafiro.class.add($element, 'scrolled');
                } else {
                    mafiro.class.remove($element, 'scrolled');
                }
            });
        });

        console.log('- - Component "header" loaded');
    }
})();
