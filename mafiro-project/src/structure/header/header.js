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

        verifyScroll();

        console.log('- - Component "header" loaded');
    }

    function verifyScroll() {
        const $elements = mafiro.element('.mi-header');

        mafiro.each($elements, (i, $element) => {
            mafiro.class.add(mafiro.element('body')[0], 'with-header');

            if (window.scrollY) {
                mafiro.class.add($element, 'scrolled');
            } else {
                mafiro.class.remove($element, 'scrolled');
            }
        });
    }
})();
