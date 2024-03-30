const fastify = require('fastify')({
    logger: true
});
const axios = require('axios');
const cheerio = require('cheerio');

fastify.get('/', async (request, reply) => {
    return reply.send({
        status: 200,
        routes: [{
                path: '/search?q=something',
                description: 'Search for games on itch.io'
            },
            {
                path: '/newest/:type',
                description: 'Get newest games by type from itch.io'
            },
            {
                path: '/new-and-popular/:type',
                description: 'Get new and popular games by type from itch.io'
            },
            {
                path: '/top-sellers/:type',
                description: 'Get top sellers games by type from itch.io'
            },
            {
                path: '/top-rated/:type',
                description: 'Get top rated games by type from itch.io'
            }
        ]
    });
});

const fetchGamesByTag = async (tag, endpoint, reply) => {
    try {
        const response = await axios.get(`https://itch.io/games/${endpoint}/tag-${tag}`);
        const $ = cheerio.load(response.data);

        const games = [];

        $('.game_cell').each((index, element) => {
            const game = parseGame($(element));
            games.push(game);
        });

        reply.send({
            type: endpoint,
            genre: tag,
            games
        });
    } catch (error) {
        console.error(error);
        reply.code(500).send({
            error: 'Internal Server Error'
        });
    }
};

const parseGame = ($element) => {
    return {
        title: ($element.find('.game_title').text().trim()).replace(/\s\s+/g, ' ').replace($element.find('.price_value').text().trim(), ''),
        url: $element.find('.game_cell .thumb_link.game_link').attr('href'),
        author: $element.find('.game_author a').text().trim(),
        authorUrl: $element.find('.game_author a').attr('href'),
        coverUrl: $element.find('.game_thumb a.thumb_link img').attr('data-lazy_src'),
        description: $element.find('.game_text').text().trim(),
        price: $element.find('.price_value').text().trim() || 'Free',
        tags: $element.find('.tags a').map((index, tagElement) => $(tagElement).text().trim()).get()
    };
};

const validTypes = ['horror', '3d', 'short', 'atmospheric', 'first-person', 'singleplayer', 'creepy', 'psychological-horror', 'psx', 'survival-horror', 'retro'];

fastify.get('/newest/:type', async (request, reply) => {
    const type = request.params.type.toLowerCase();

    if (!validTypes.includes(type)) {
        reply.code(404).send({
            error: 'Invalid type'
        });
        return;
    }

    await fetchGamesByTag(type, 'newest', reply);
});

fastify.get('/new-and-popular/:type', async (request, reply) => {
    const type = request.params.type.toLowerCase();

    if (!validTypes.includes(type)) {
        reply.code(404).send({
            error: 'Invalid type'
        });
        return;
    }

    await fetchGamesByTag(type, 'new-and-popular', reply);
});

fastify.get('/top-sellers/:type', async (request, reply) => {
    const type = request.params.type.toLowerCase();

    if (!validTypes.includes(type)) {
        reply.code(404).send({
            error: 'Invalid type'
        });
        return;
    }

    await fetchGamesByTag(type, 'top-sellers', reply);
});

fastify.get('/top-rated/:type', async (request, reply) => {
    const type = request.params.type.toLowerCase();

    if (!validTypes.includes(type)) {
        reply.code(404).send({
            error: 'Invalid type'
        });
        return;
    }

    await fetchGamesByTag(type, 'top-rated', reply);
});

fastify.get('/search', async (request, reply) => {
    const query = request.query.q;
    if (!query) {
        return reply.send({
            status: 400,
            message: 'Query (?q=something) parameter is required'
        });
    }

    try {
        const response = await axios.get(`https://itch.io/search?q=${query}`);
        const $ = cheerio.load(response.data);

        const games = [];

        $('.game_cell').each((index, element) => {
            const game = parseGame($(element));
            games.push(game);
        });

        reply.send({
            type: 'search',
            query,
            games
        });
    } catch (error) {
        console.error(error);
        reply.code(500).send({
            error: 'Internal Server Error'
        });
    }
});

fastify.listen({
    port: 3000,
    host: '0.0.0.0'
}, (err, address) => {
    if (err) throw err
    console.log(`Server is now listening on ${address}`)
})