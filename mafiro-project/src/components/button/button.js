(() => {
    mafiro.components.add({
        name: 'button',
        load: loadButton,
        onWindowLoad: onWindowLoad
    });

    function loadButton() {
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

    function onWindowLoad(target) {
        let $buttons;

        if (target) {
            $buttons = mafiro.element.find(target, '.mi-button');
        } else {
            $buttons = mafiro.element('.mi-button');
        }

        mafiro.each($buttons, (i, $button) => {
            if (!$button.disabled) {
                mafiro.components.load('button').on($button);
            }
        });

        window.addEventListener('mouseup', () => {
            const $elements = mafiro.element('.pressed');
            mafiro.each($elements, (i, $element) => {
                mafiro.class.remove($element, 'pressed');
            })
        });
    }
})();
