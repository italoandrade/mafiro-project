(() => {
    mafiro.view = {
        add: addView,
        load: loadView,
        list: {},
        states: {}
    };

    window.onpopstate = history.onpushstate = onPopState;

    function addView(name, config) {
        const states = config.states;

        mafiro.view.list[name] = config;

        mafiro.each(states, (i, state) => {
            mafiro.view.states[state] = name;
        });
    }

    function loadView(state) {
        const stateName = mafiro.view.states[state];

        if (stateName) {
            const viewConfig = mafiro.view.list[stateName];

            if (viewConfig.templateUrl) {
                mafiro.request({
                    url: viewConfig.templateUrl,
                    success: (data) => {
                        const $view = mafiro.element('.mi-view')[0];

                        if (viewConfig.class) {
                            mafiro.class.add($view, viewConfig.class);
                        }

                        if (data.indexOf('<script') > -1) {
                            console.error('Script inside a view isn\'t supported');
                        }

                        const $header = mafiro.element('.mi-header')[0];
                        mafiro.class.remove($header, 'transparent');

                        $view.innerHTML = data;

                        mafiro.components.loadAll($view);

                        document.title = viewConfig.title;

                        viewConfig.onLoad();
                    }
                });
            } else {
                viewConfig.onLoad();
            }
        } else {
            console.error('The state "' + state + '" doesn\'t exist');
        }
    }

    function onPopState() {
        let currentPathname = window.location.pathname;

        if (currentPathname.substr(0, 1) === '/') {
            currentPathname = currentPathname.slice(1);
        }

        mafiro.view.load(currentPathname);
    }
})();
