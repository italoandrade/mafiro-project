(() => {
    mafiro.mouse = {
        position: getMousePosition
    };

    function getMousePosition(e) {
        let pos = {};

        if (e.originalEvent && e.originalEvent.touches != undefined) {
            pos.y = e.originalEvent.touches[0].pageY;
            pos.x = e.originalEvent.touches[0].pageX;
        } else if (e.pageX) {
            pos.y = e.pageY;
            pos.x = e.pageX;
        }

        return pos;
    }
})();
