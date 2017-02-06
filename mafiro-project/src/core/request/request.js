(() => {
    mafiro.request = request;

    function request(config) {
        const type = config.type;
        const url = config.url;
        const success = config.success;

        const request = new XMLHttpRequest();

        switch (type) {
            case 'POST':

                request.open('POST', url, true);
                request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                request.send(data);

                break;
            default:

                request.open('GET', url, true);

                request.onload = function() {
                    if (request.status >= 200 && request.status < 400) {
                        // Success!
                        const resp = request.responseText;

                        if (success) {
                            success(resp);
                        }
                    } else {
                        // We reached our target server, but it returned an error

                    }
                };

                request.onerror = function() {
                    // There was a connection error of some sort
                };

                request.send();

                break;
        }
    }
})();
