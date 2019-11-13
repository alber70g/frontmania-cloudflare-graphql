const KVCache = require('./kv-cache');

module.exports = {
  Query: {
    topnewsLocal: async (_source, _args, { request, newsAPI, kvcache }) => {
      const country = request.headers.get('cf-ipcountry');

      const CACHE_KEY = `${country}/topnews`;
      const cached = await kvcache.get(CACHE_KEY);

      if (cached !== null) {
        return {
          fromCache: true,
          items: JSON.parse(cached),
        };
      } else {
        const topnews = await newsAPI.getTopnews(country);

        kvcache.set(CACHE_KEY, JSON.stringify(topnews.articles), {
          ttl: 10 * 60,
        });

        return {
          fromCache: false,
          items: topnews.articles,
        };
      }
    },
    topnewsTopic: async (_, { topic }, { newsAPI, kvcache }) => {
      const CACHE_KEY = `${topic}/topnews`;
      const cached = await kvcache.get(CACHE_KEY);

      if (cached) {
        return {
          fromCache: true,
          items: JSON.parse(cached),
        };
      } else {
        const topnewsTopic = await newsAPI.getTopnewsTopic(topic);
        kvcache.set(CACHE_KEY, JSON.stringify(topnewsTopic.articles), {
          ttl: 10 * 60,
        });
        return {
          fromCache: false,
          items: topnewsTopic.articles,
        };
      }
    },
  },
};
