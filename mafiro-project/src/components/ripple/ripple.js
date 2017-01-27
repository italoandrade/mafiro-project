(() => {
    mafiro.components.add({
        name: 'ripple',
        load: loadRipple,
        onWindowLoad: onWindowLoad,
    });

    const $rippleContainerTemplate = mafiro.element('<div class="ripple-container"></div>');
    const $rippleTemplate = mafiro.element('<div class="ripple"></div>');

    function loadRipple() {
        return {
            on: (element) => {
                const $rippleContainerTemplateClone = $rippleContainerTemplate.cloneNode(true);

                $rippleContainerTemplateClone.style.borderRadius = mafiro.getStyle(element, 'border-radius');

                console.log(mafiro.getStyle(element, 'width'));

                console.log(element);
                element.addEventListener('mousedown', () => {
                    element.appendChild($rippleContainerTemplateClone);
                });

                element.addEventListener('mouseup', () => {
                    const $rippleTemplateClone = $rippleTemplate.cloneNode(true);

                    $rippleContainerTemplateClone.appendChild($rippleTemplateClone);
                });
            }
        };
    }

    function onWindowLoad() {
        console.log('- - Loading component "ripple"');

        const $ripples = mafiro.element('.mi-ripple');

        mafiro.each($ripples, (i, $ripple) => {
            if ($ripple.disabled === false) {
                mafiro.components.load('ripple').on($ripple);
            }
        });

        console.log('- - Component "ripple" loaded');
    }
})();
