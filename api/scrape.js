// api/scrape.js
const axios = require('axios');
const cheerio = require('cheerio');

export default async function handler(req, res) {
  const url = 'https://example.com'; // Replace with the URL you want to scrape
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const data = [];

    $('p').each((index, element) => {
      data.push($(element).text());
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
