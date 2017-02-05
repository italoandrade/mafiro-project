(() => {
    mafiro.components.add({
        name: 'card',
        load: loadCard,
        onWindowLoad: onWindowLoad
    });

    function loadCard() {
        return {
            on: (element) => {

            }
        };
    }

    function onWindowLoad() {
        console.log('- - Loading component "card"');

        const $cards = mafiro.element('.mi-card');

        mafiro.each($cards, (i, $card) => {
            if (!$card.disabled) {
                mafiro.components.load('card').on($card);
            }
        });

        console.log('- - Component "card" loaded');
    }
})();
