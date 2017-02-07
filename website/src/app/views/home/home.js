(() => {
    const config = {
        class: 'home',
        title: 'Trackfy',
        states: ['', 'home'],
        onLoad: onLoad,
        templateUrl: '/app/views/home/home.html'
    };

    mafiro.view.add('home', config);

    function onLoad() {
        const $button = mafiro.element('#changeTheme')[0];
        const $body = mafiro.element('body')[0];

        $button.addEventListener('click', () => {
            mafiro.class.toggle($body, 'theme-dark');
            if (mafiro.class.has($body, 'theme-dark')) {
                mafiro.session.set('theme', 'dark');
            } else {
                mafiro.session.set('theme', 'white');
            }
        });

        const $home = mafiro.element('.mi-view.home')[0];
        const model = new mafiro.Model($home);

        // model.set('teste', 'ae');

        model.set({
            teste: 'ae',
            testeB: 'ae2',
            testeC: 'ae3'
        });

        console.log(model);

        console.log('- - View "home" loaded.');
    }
})();
