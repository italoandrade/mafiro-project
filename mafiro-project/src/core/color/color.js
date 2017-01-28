(() => {
    mafiro.color = {
        isBright: isBright
    };

    function isBright(hex, minDarkPerc) {
        var color = hex;
        if (hex.indexOf('rgb') > -1) {
            color = rgb2hex(hex);
        }
        color = hexToRgb(color);
        if (!color)
            return false;
        // Contando a luminosidade perceptiva
        // O olho humano favorece a cor verde
        var luminosityPerc = 1 - (0.299 * color.r + 0.587 * color.g + 0.114 * color.b) / 255;
        return (luminosityPerc < (minDarkPerc || 0.3));
    }

    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
    }

    function rgb2hex(rgb){
        if (rgb === 'rgba(0, 0, 0, 0)') {
            return '#FFFFFF'
        } else {
            rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
            return (rgb && rgb.length === 4) ? "#" +
                ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
                ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
                ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
        }
    }
})();
