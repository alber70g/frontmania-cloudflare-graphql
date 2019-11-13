const { RESTDataSource } = require('apollo-datasource-rest');

class NewsAPI extends RESTDataSource {
  constructor(apiKey) {
    super();
    this.API_KEY = apiKey;
    this.baseURL = 'https://newsapi.org/v2/';
  }

  async getTopnews(country) {
    const url = `${this.baseURL}top-headlines?country=${country}&apiKey=${this.API_KEY}`;
    const res = await this.get(url);
    return {
      res,
      url,
    };
  }

  async getTopnewsTopic(topic, country) {
    const url = `${this.baseURL}top-headlines?q=${topic}&country=${country}&apiKey=${this.API_KEY}`;
    const res = await this.get(url);
    return {
      res,
      url,
    };
  }
}

module.exports = NewsAPI;
