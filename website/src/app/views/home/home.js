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

        console.log('- - View "home" loaded.');
    }
})();
