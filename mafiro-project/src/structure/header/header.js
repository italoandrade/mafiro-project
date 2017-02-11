(() => {
    mafiro.components.add({
        name: 'header',
        loadOnce: true,
        onWindowLoad: onWindowLoad
    });

    let scroll = 0;

    function onWindowLoad() {
        window.addEventListener('scroll', () => {
            verifyScroll();
        });

        let ts;
        window.addEventListener('touchstart', function (e) {
            ts = e.touches[0].clientY;

            scroll = window.scrollY;
        });

        window.addEventListener('touchmove', function (e) {
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

        const $searchContainer = mafiro.element('.mi-header .search-input')[0];
        const $searchInput = mafiro.element.find($searchContainer, 'input')[0];
        const $closeSearch = mafiro.element.find($searchContainer, '.close')[0];
        const $focusSearch = mafiro.element.find($searchContainer, '.focus')[0];
        const $searchButton = mafiro.element('.mi-header .mi-search-button.open')[0];

        $searchButton.addEventListener('click', () => {
            mafiro.class.add($searchContainer, 'show');

            $searchInput.focus();
        });

        $searchInput.addEventListener('focus', () => {
            mafiro.style.set($closeSearch, 'display', 'none');
            mafiro.class.add($searchContainer, 'focused');
        });

        $searchInput.addEventListener('blur', () => {
            mafiro.style.set($closeSearch, 'display', 'block');
            mafiro.class.remove($searchContainer, 'focused');
        });

        mafiro.element.on($searchInput, 'keyup blur focus', () => {
            if ($searchInput.value == '') {
                mafiro.style.set($closeSearch, 'display', 'none');
                mafiro.class.remove($searchContainer, 'has-query');
            } else {
                mafiro.style.set($closeSearch, 'display', 'block');
                mafiro.class.add($searchContainer, 'has-query');
            }
        });

        $closeSearch.addEventListener('click', () => {
            if (window.innerWidth > 930 ) {
                $searchInput.value = '';

                mafiro.class.remove($searchContainer, 'has-query');

                mafiro.style.set($closeSearch, 'display', 'none');
            } else {
                mafiro.class.remove($searchContainer, 'show');
            }

            $searchInput.blur();
        });

        $focusSearch.addEventListener('click', () => {
            $searchInput.focus();
        });

        verifyScroll();
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
