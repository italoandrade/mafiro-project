(() => {
    mafiro.components.add({
        name: 'header',
        loadOnce: true,
        onWindowLoad: onWindowLoad
    });

    let scroll = 0;

    function onWindowLoad() {
        console.log('- - Loading component "header"');

        window.addEventListener('scroll', () => {
            verifyScroll();
        });

        let ts;
        window.addEventListener('touchstart', function (e){
            ts = e.touches[0].clientY;

            scroll = window.scrollY;
        });

        window.addEventListener('touchmove', function (e){
            if (scroll !== window.scrollY) {
                const $header = mafiro.element('.mi-header')[0];

                let te = e.changedTouches[0].clientY;

                let translate = ts - te;

                translate = translate < -70 ? -70 : translate;
                translate = translate > 70 ? 70 : translate;

                if (ts > te + 5) {

                    mafiro.style.set($header, 'transform', 'translateY(-' + translate + 'px)');
                } else if (ts < te - 5) {
                    const isAlreadyOnTop = mafiro.style.get($header, 'transform') != 'matrix(1, 0, 0, 1, 0, 0)';

                    if (isAlreadyOnTop) {
                        mafiro.style.set($header, 'transform', 'translateY(' + (-70 - translate) + 'px)');
                    }
                }
            }
        });

        mafiro.class.add(mafiro.element('body')[0], 'with-header');

        const $navButton = mafiro.element('.mi-nav-button')[0];

        $navButton.addEventListener('click', () => {
            const $body = mafiro.element('body')[0];

            mafiro.class.add($body, 'nav-open');
        });

        const $searchButtons = mafiro.element('.mi-search-button');

        mafiro.each($searchButtons, (i, $searchButton) => {
            $searchButton.addEventListener('click', () => {
                const $searchInput = mafiro.element('.mi-header .search-input')[0];

                const toggleClass = mafiro.class.toggle($searchInput, 'show');

                if (toggleClass) {
                    mafiro.element.find($searchInput, 'input')[0].focus();
                }
            });
        });

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

        if (window.scrollY < 10) {
            const $header = mafiro.element('.mi-header')[0];

            mafiro.style.set($header, 'transform', 'translateY(0)');
        }
    }
})();
