class KVCache {
  get(key) {
    return NEWSAPI_CACHE.get(key)
  }

  set(key, value, options) {
    const opts = {}
    const ttl = options && options.ttl
    if (ttl) {
      opts.expirationTtl = ttl
    }
    return NEWSAPI_CACHE.put(key, value, opts)
  }
}

module.exports = KVCache
