const { RESTDataSource } = require('apollo-datasource-rest');

class NewsAPI extends RESTDataSource {
  constructor(apiKey) {
    super();
    this.API_KEY = apiKey;
    this.baseURL = 'https://newsapi.org/v2/';
  }

  async getTopnews(country = 'gb') {
    return await this.get(
      `${this.baseURL}top-headlines?country=${country}&apiKey=${this.API_KEY}`,
    );
  }

  async getTopnewsTopic(topic) {
    return await this.get(
      `${this.baseURL}top-headlines?q=${topic}&apiKey=${this.API_KEY}`,
    );
  }
}

module.exports = NewsAPI;
