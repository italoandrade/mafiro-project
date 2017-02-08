(() => {
    const config = {
        class: 'not-found',
        title: 'Página não encontrada',
        states: ['not-found'],
        onLoad: onLoad,
        templateUrl: '/app/views/not-found/not-found.html'
    };

    mafiro.view.add('not-found', config);

    function onLoad() {
        const $header = mafiro.element('.mi-header')[0];

        mafiro.class.add($header, 'transparent');
    }
})();
