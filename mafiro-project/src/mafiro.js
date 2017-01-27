let mafiro;

(() => {
    window.onload = () => {
        mafiro.components.loadAll();
    };

    mafiro = () => {
    };

    mafiro.components = {};
    mafiro.componentNames = [];
    mafiro.components.add = addComponent;
    mafiro.components.load = loadComponent;
    mafiro.components.loadAll = loadAllComponents;

    function addComponent(component) {
        console.log('- Adding a new component');

        mafiro.componentNames.push(component.name);
        mafiro.components[component.name] = component;

        console.log('- Component ' + component.name + ' added');
    }

    function loadAllComponents() {
        console.log('- Loading all components');

        mafiro.each(mafiro.componentNames, (i, component) => {
            mafiro.components[component].onWindowLoad();
        });

        console.log('- All components loaded');
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
