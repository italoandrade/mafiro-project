(() => {
    mafiro.app(() => {
        let currentPathname = window.location.pathname;

        if (currentPathname.substr(0, 1) === '/') {
            currentPathname = currentPathname.slice(1);
        }

        mafiro.view.load(currentPathname);

        const user = mafiro.session.get('user');

        if (user) {
            mafiro.scope.set({
                user: user
            });
        }

        mafiro.scope.set({
            openMenu: openMenu
        });

        console.log('- Application loaded.');

        /**/

        function openMenu() {
            mafiro.scope.set({
                user: undefined
            });

            mafiro.session.delete('user');

            mafiro.view.navigateTo('/');
        }
    })
})();
