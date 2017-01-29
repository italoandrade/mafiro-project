(() => {
    mafiro.components.add({
        name: 'header',
        onWindowLoad: onWindowLoad
    });

    function onWindowLoad() {
        console.log('- - Loading component "header"');

        window.addEventListener('scroll', () => {
            verifyScroll();
        });

        mafiro.class.add(mafiro.element('body')[0], 'with-header');

        const $navButton = mafiro.element('.mi-nav-button')[0];

        mafiro.components.load('ripple').on($navButton);

        verifyScroll();

        console.log('- - Component "header" loaded');
    }

    function verifyScroll() {
        const $elements = mafiro.element('.mi-header');

        mafiro.each($elements, (i, $element) => {
            if (window.scrollY) {
                mafiro.class.add($element, 'scrolled');
            } else {
                mafiro.class.remove($element, 'scrolled');
            }
        });
    }
})();
