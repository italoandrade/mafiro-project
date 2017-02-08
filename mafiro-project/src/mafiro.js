let mafiro;

(() => {
    window.onload = () => {
        const $body = mafiro.element('body')[0];

        mafiro.scope = new mafiro.Model($body);
        mafiro.scope.set({});

        mafiro.components.loadAll();
    };

    mafiro = () => {

    };

    mafiro.app = (app) => {
        mafiro.app.toLoad = app;
    };
    mafiro.app.toLoad = () => {
        console.log('No application was loaded.');
    };

    mafiro.components = {};
    mafiro.componentNames = [];
    mafiro.components.add = addComponent;
    mafiro.components.load = loadComponent;
    mafiro.components.loadAll = loadAllComponents;

    /**/

    function addComponent(component) {
        mafiro.componentNames.push(component.name);
        mafiro.components[component.name] = component;
    }

    function loadAllComponents(target) {
        if (!target) {
            console.log('- Loading all components');
        }

        mafiro.each(mafiro.componentNames, (i, component) => {
            if (!target || !mafiro.components[component].loadOnce) {
                mafiro.components[component].onWindowLoad(target);
            }
        });

        if (!target) {
            setTimeout(function () {
                const $body = mafiro.element('body')[0];
                mafiro.class.remove($body, 'loading');
            }, 200);

            const $body = mafiro.element('body')[0];

            if (mafiro.session.get('theme') === 'dark') {
                mafiro.class.add($body, 'theme-dark');
            }

            console.log('- All components loaded');

            mafiro.app.toLoad();
        }
    }

    function loadComponent(componentToLoad) {
        const isArray = componentToLoad.constructor === Array;

        if (isArray) {
            return {
                on: (element) => {
                    mafiro.each(componentToLoad, (i, component) => {
                        mafiro.components[component].load().on(element);
                    });
                }
            }
        } else {
            return mafiro.components[componentToLoad].load();
        }
    }
})();
