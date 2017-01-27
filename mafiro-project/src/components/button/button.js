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
            }
        };
    }

    function onWindowLoad() {
        console.log('- - Loading component "button"');

        const $buttons = mafiro.element('.mi-button');

        mafiro.each($buttons, (i, $button) => {
            if ($button.disabled === false) {
                mafiro.components.load('button').on($button);
            }
        });

        console.log('- - Component "button" loaded');
    }
})();
