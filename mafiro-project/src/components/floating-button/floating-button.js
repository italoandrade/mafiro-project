(() => {
    mafiro.components.add({
        name: 'floating-button',
        load: loadFloatingButton,
        onWindowLoad: onWindowLoad
    });

    function loadFloatingButton() {
        return {
            on: (element) => {
                mafiro.components.load('ripple').on(element);

                element.addEventListener('mousedown', () => {
                    mafiro.class.add(element, 'pressed');
                });

                element.addEventListener('mouseup', () => {
                    element.blur();
                    mafiro.class.remove(element, 'pressed');
                });
            }
        };
    }

    function onWindowLoad() {
        console.log('- - Loading component "floating-button"');

        const $buttons = mafiro.element('.mi-floating-button');

        mafiro.each($buttons, (i, $button) => {
            if (!$button.disabled) {
                mafiro.components.load('floating-button').on($button);
            }
        });

        window.addEventListener('mouseup', () => {
            const $elements = mafiro.element('.pressed');
            mafiro.each($elements, (i, $element) => {
                mafiro.class.remove($element, 'pressed');
            })
        });

        console.log('- - Component "floating-button" loaded');
    }
})();
