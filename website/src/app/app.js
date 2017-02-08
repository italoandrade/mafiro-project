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

        console.log('- Application loaded.');
    })
})();
