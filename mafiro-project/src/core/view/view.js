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

                        const viewScope = new mafiro.Model($view);

                        mafiro.components.loadAll($view);

                        document.title = viewConfig.title;

                        const injectables = {
                            scope: viewScope,
                            rootScope: mafiro.scope
                        };

                        const args = getArgs(viewConfig.onLoad);

                        const injectablesKeys = Object.keys(injectables);

                        mafiro.each(injectablesKeys, (i, key) => {
                            if (args.indexOf(key) === -1) {
                                delete injectables[key];
                            }
                        });

                        viewConfig.onLoad(injectables);
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

    function getArgs(func) {
        /*Source: https://davidwalsh.name/javascript-arguments*/

        // First match everything inside the function argument parens.
        var args = func.toString().match(/function\s.*?\(([^)]*)\)/)[1];

        // Split the arguments string into an array comma delimited.
        return args.split(',').map(function(arg) {
            // Ensure no inline comments are parsed and trim the whitespace.
            return arg.replace(/\/\*.*\*\//, '').trim();
        }).filter(function(arg) {
            // Ensure no undefined values are added.
            return arg;
        });
    }
})();
