(() => {
    mafiro.animate = animate;

    function animate(callback, duration) {
        let end;

        const interval = 33;
        let ticks = 0;

        const animation = setInterval(frame, interval);

        function frame() {
            if (ticks  > duration / interval - 1) {
                clearInterval(animation);

                if (end) end();
            } else {
                ticks++;

                callback(ticks);
            }
        }

        return {
            then: (callback) => {
                end = callback;
            }
        }
    }
})();
