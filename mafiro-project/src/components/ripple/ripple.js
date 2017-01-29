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

                if (!mafiro.color.isBright(mafiro.style.get(element, 'background-color'))) {
                    mafiro.class.add($rippleContainerTemplateClone, 'white');
                }

                element.addEventListener('mousedown', (e) => {
                    const elementWidth = parseInt(mafiro.style.get(element, 'width'));
                    const elementHeight = parseInt(mafiro.style.get(element, 'height'));

                    mafiro.style.set($rippleContainerTemplateClone, 'border-radius', mafiro.style.get(element, 'border-radius'));
                    $rippleContainerTemplateClone.style.width = elementWidth + 'px';
                    $rippleContainerTemplateClone.style.height = elementHeight + 'px';

                    element.appendChild($rippleContainerTemplateClone);

                    const $rippleTemplateClone = $rippleTemplate.cloneNode(true);

                    const isElementHorizontal = elementWidth > elementHeight;

                    let finalWidth;
                    let finalHeight;
                    let finalTop;
                    let finalLeft;

                    if (isElementHorizontal) {
                        finalWidth = elementWidth * 3;
                        finalHeight = elementWidth * 3;
                    } else {
                        finalWidth = elementHeight * 3;
                        finalHeight = elementHeight * 3;
                    }

                    finalTop = - (finalWidth / 2)/* + (elementHeight / 2)*/;
                    finalLeft = - (finalWidth / 2)/* + (elementWidth / 2)*/;

                    mafiro.style.set($rippleTemplateClone, 'width', finalWidth);
                    mafiro.style.set($rippleTemplateClone, 'height', finalHeight);

                    const elementPos = mafiro.element.position(element);
                    const mousePos = mafiro.mouse.position(e);

                    const pos = {
                        y: mousePos.y - elementPos.top,
                        x: mousePos.x - elementPos.left
                    };

                    if (mafiro.style.get(element, 'border-radius') === elementWidth / 2) {
                        finalTop = finalTop + (elementWidth / 2);
                        finalLeft = finalLeft + (elementWidth / 2);
                    } else {
                        finalTop = finalTop + pos.y;
                        finalLeft = finalLeft + pos.x;
                    }

                    mafiro.style.set($rippleTemplateClone, 'top', finalTop);
                    mafiro.style.set($rippleTemplateClone, 'left', finalLeft);

                    mafiro.element.prepend($rippleContainerTemplateClone, $rippleTemplateClone);

                    mafiro.class.add($rippleContainerTemplateClone, 'pressed');

                    mafiro.animate($rippleContainerTemplateClone, 'border-spacing', 0, 1, 300, null, (tick) => {
                        mafiro.style.set($rippleTemplateClone, 'transform', 'scale(' + tick + ')');
                    });
                });

                element.addEventListener('mouseup', () => {
                    mafiro.class.remove($rippleContainerTemplateClone, 'pressed');

                    const $ripples = mafiro.element.childs($rippleContainerTemplateClone);

                    mafiro.each($ripples, function (i, $ripple) {
                        const elementOpacity = mafiro.style.get($ripple, 'opacity');

                        if (elementOpacity === 1) {
                            mafiro.animate($ripple, 'opacity', 1, 0, 300, () => {
                                try {
                                    mafiro.element.remove($ripple);
                                } catch (e) {
                                }
                            });
                        }
                    });

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

        window.addEventListener('mouseup', () => {

            /*Retirando todos os ripples que ficaram para trás*/

            const $ripples = mafiro.element('.mi-ripple');

            mafiro.each($ripples, function (i, $ripple) {

                const $ripples2 = mafiro.element.childs($ripple.parentNode);

                mafiro.each($ripples2, function (i, $ripple2) {
                    const elementOpacity = mafiro.style.get($ripple2, 'opacity');

                    if (elementOpacity === 1) {
                        mafiro.animate($ripple2, 'opacity', 1, 0, 300, () => {
                            try {
                                mafiro.element.remove($ripple2);
                            } catch (e) {
                            }
                        });
                    }
                });

            });

        });

        console.log('- - Component "ripple" loaded');
    }
})();
