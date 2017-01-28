(() => {
    mafiro.animate = animate;

    function animate(object, property, start_value, end_value, time, end, tick) {
        var frame_rate = 0.06; // 60 FPS
        var frame = 0;
        var delta = (end_value - start_value) / time / frame_rate;
        const propWithPx = mafiro.style.propWithPx;
        var handle = setInterval(function() {
            frame++;
            var value = start_value + delta * frame;

            if (tick) tick(value);

            const hasPx = propWithPx.indexOf(property) > -1;

            object.style[property] = value + (hasPx ? "px" : '');
            if (value == end_value) {
                clearInterval(handle);

                if (end) end();
            }
        }, 1 / frame_rate);
    }

    function animate2(config, callback) {
        let end;

        const interval = 33;
        let ticks = 0;

        const animation = setInterval(frame, interval);

        function frame() {
            if (ticks  > config.in / interval - 1) {
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
