(() => {
    mafiro.components.add({
        name: 'link',
        load: loadLink,
        onWindowLoad: onWindowLoad
    });

    function loadLink() {
        return {
            on: (element) => {
                element.addEventListener('click', (e) => {
                    e.preventDefault();

                    let href = element.getAttribute('href');

                    window.history.pushState(null, 'Trackfy', href);

                    if (href.substr(0, 1) === '/') {
                        href = href.slice(1);
                    }

                    mafiro.view.load(href);
                });
            }
        };
    }

    function onWindowLoad(target) {
        let $links;

        if (target) {
            $links = mafiro.element.find(target, 'a');
        } else {
            $links = mafiro.element('a');
        }

        mafiro.each($links, (i, $link) => {
            if (!$link.disabled) {
                mafiro.components.load('link').on($link);
            }
        });
    }
})();
