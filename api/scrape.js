// pages/api/fm-channels.js
import axios from 'axios';
import cheerio from 'cheerio';

export default async function handler(req, res) {
  const { zip } = req.query;
  
  // Validate ZIP code parameter
  if (!zip) {
    return res.status(400).json({ error: 'ZIP code is required' });
  }

  try {
    // Fetch HTML from the URL
    const response = await axios.get(`https://radio-locator.com/cgi-bin/vacant?select=city&city=${zip}&state=&x=0&y=0`);
    const html = response.data;

    // Load HTML into Cheerio
    const $ = cheerio.load(html);

    // Array to store FM channels
    const fmChannels = [];

    // Select and iterate over each 'td' element with the classes 'vacant' and 'smalltype'
    $('td.vacant.smalltype').each((i, element) => {
      const channel = $(element).text().trim();
      if (channel) {
        fmChannels.push(channel);
      }
    });

    // Send the response with the FM channels
    res.status(200).json(fmChannels);
  } catch (error) {
    // Log error and send error response
    console.error('Error fetching FM channels:', fmChannels, error);
    res.status(500).json({ error: 'An error occurred while fetching FM channels' });
  }
}
