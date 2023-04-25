exports.handler = async (event) => {
    console.log(`Processing on connect event [ ${JSON.stringify(event)} ]`);
    return { statusCode: 200, body: 'Connected.' };
};
