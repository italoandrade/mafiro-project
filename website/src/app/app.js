(() => {
    mafiro.app(() => {
        let currentPathname = window.location.pathname;

        if (currentPathname.substr(0, 1) === '/') {
            currentPathname = currentPathname.slice(1);
        }

        mafiro.view.load(currentPathname);

        // mafiro.scope.set({
        //     user: {
        //         name: 'Ítalo',
        //         last: {
        //             name: 'Andrade'
        //         }
        //     }
        // });

        console.log('- Application loaded.');
    })
})();
