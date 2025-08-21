module.exports = async function (context, req) {
    const documentName = req.query.name; // ?name=Policy001
    const urls = {
        'Policy001': 'https://teststorage.blob.core.windows.net/docs/Policy001.pdf',
        'Policy002': 'https://teststorage.blob.core.windows.net/docs/Policy002.pdf',
        'Policy003': 'https://teststorage.blob.core.windows.net/docs/Policy003.pdf'
    };
    
    context.res = {
        status: 200,
        body: { url: urls[documentName] || null }
    };
};
