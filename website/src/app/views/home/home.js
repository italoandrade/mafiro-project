(() => {
    const config = {
        class: 'home',
        title: 'Trackfy',
        states: ['', 'home'],
        onLoad: onLoad,
        templateUrl: '/app/views/home/home.html'
    };

    mafiro.view.add('home', config);

    function onLoad(vm, rootScope, scope) {
        const $button = mafiro.element('#changeTheme')[0];
        const $body = mafiro.element('body')[0];

        $button.addEventListener('click', () => {
            // mafiro.class.toggle($body, 'theme-dark');
            // if (mafiro.class.has($body, 'theme-dark')) {
            //     mafiro.session.set('theme', 'dark');
            // } else {
            //     mafiro.session.set('theme', 'white');
            // }

            mafiro.scope.set({
                user: {
                    picture: 'https://scontent.fsdu2-1.fna.fbcdn.net/v/t1.0-1/p160x160/14680699_1330685393631394_2674523568724954493_n.jpg?oh=e6e8cfd1490cdc1f3e2b21c7a90db471&oe=59433721',
                    name: 'Ítalo'
                }
            });
        });

        vm.scope.set({
            teste: 'ae',
            testeB: 'ae2',
            testeC: 'ae3'
        });
    }
})();
