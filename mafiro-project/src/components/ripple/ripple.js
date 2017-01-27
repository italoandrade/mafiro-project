(() => {
    mafiro.components.add({
        name: 'ripple',
        load: loadRipple,
        onWindowLoad: onWindowLoad,
    });

    const $rippleContainerTemplate = mafiro.element('<div class="mi-ripple-container"></div>');
    const $rippleTemplate = mafiro.element('<div class="mi-ripple"></div>');

    function loadRipple() {
        return {
            on: (element) => {
                const $rippleContainerTemplateClone = $rippleContainerTemplate.cloneNode(true);

                element.addEventListener('mousedown', () => {
                    const elementWidth = parseInt(mafiro.getStyle(element, 'width').replace('px', ''));
                    const elementHeight = parseInt(mafiro.getStyle(element, 'height').replace('px', ''));

                    $rippleContainerTemplateClone.style.borderRadius = mafiro.getStyle(element, 'border-radius');
                    $rippleContainerTemplateClone.style.width = elementWidth + 'px';
                    $rippleContainerTemplateClone.style.height = elementHeight + 'px';

                    element.appendChild($rippleContainerTemplateClone);

                    const $rippleTemplateClone = $rippleTemplate.cloneNode(true);

                    const isElementHorizontal = elementWidth > elementHeight;

                    let finalWidth;
                    let finalHeight;

                    if (isElementHorizontal) {
                        // $rippleTemplateClone.style.width = elementWidth * 2 + 'px';
                        finalWidth = elementWidth * 2 + 'px';
                        // $rippleTemplateClone.style.height = elementWidth * 2 + 'px';
                        finalHeight = elementWidth * 2 + 'px';
                    } else {
                        // $rippleTemplateClone.style.width = elementHeight * 2 + 'px';
                        finalWidth = elementHeight * 2 + 'px';
                        // $rippleTemplateClone.style.height = elementHeight * 2 + 'px';
                        finalHeight = elementHeight * 2 + 'px';
                    }

                    console.time();
                    mafiro.animate((ticks) => {
                        element.style.position = 'absolute';
                        element.style.left = ticks + 'px';
                        console.log(ticks);
                    }, 2000).then(() => {
                        console.timeEnd();
                    });

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
