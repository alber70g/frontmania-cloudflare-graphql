module.exports = {
  Query: {
    topnewsLocal: async (
      _source,
      { country },
      { dataSources: { request, newsAPI, kvcache } },
    ) => {
      if (!country) country = request.headers.get('cf-ipcountry');

      const CACHE_KEY = `${country}/topnews`.toLowerCase();
      const cached = await kvcache.get(CACHE_KEY);

      if (cached !== null) {
        return {
          fromCache: true,
          items: JSON.parse(cached),
          country,
          url: "fromcache",
        };
      } else {
        const res = await newsAPI.getTopnews(country);

        kvcache.set(CACHE_KEY, JSON.stringify(res.res.articles), {
          ttl: 1 * 60,
        });

        return {
          fromCache: false,
          items: res.res.articles,
          country,
          url: res.url,
        };
      }
    },
    topnewsTopic: async (
      _,
      { topic, country },
      { dataSources: { request, newsAPI, kvcache } },
    ) => {
      if (!country) country = request.headers.get('cf-ipcountry');

      const CACHE_KEY = `${country}/${topic}/topnews`.toLowerCase();
      const cached = await kvcache.get(CACHE_KEY);

      if (cached) {
        return {
          fromCache: true,
          items: JSON.parse(cached),
          country,
          url: "fromcache",
        };
      } else {
        const res = await newsAPI.getTopnewsTopic(topic);
        kvcache.set(CACHE_KEY, JSON.stringify(res.res.articles), {
          ttl: 1 * 60,
        });
        return {
          fromCache: false,
          items: res.res.articles,
          country,
          url: res.url,
        };
      }
    },
  },
};
