const axios = require('axios').default;

class MessagesApiClient {
    constructor(host) {
        this.host = host;
    }

    async sendV1(body, auth) {
        const res = await axios.post(`https://${this.host}/v1/messages`, body, {
            headers: { Authorization: auth },
        });
        return res;
    }
}

module.exports = { MessagesApiClient };
