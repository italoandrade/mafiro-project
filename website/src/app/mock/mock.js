(() => {
    const requestBackup = mafiro.request;

    mafiro.request = request;

    function request(config) {
        const type = config.type;
        const url = config.url;
        const success = config.success;

        switch (type) {
            case 'POST':
                let data;

                if (url.indexOf('public/login') > -1) {
                    data = {
                        picture: 'https://scontent.fsdu2-1.fna.fbcdn.net/v/t1.0-1/p160x160/14680699_1330685393631394_2674523568724954493_n.jpg?oh=e6e8cfd1490cdc1f3e2b21c7a90db471&oe=59433721',
                        name: 'Ítalo'
                    };
                }

                return success(data);

                break;
            default:



                break;
        }

        requestBackup(config);
    }
})();
