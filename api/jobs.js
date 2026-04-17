export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { query, location, date_posted, page, num_pages, employment_types, work_from_home, country, language } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    const url = new URL('https://jsearch.p.rapidapi.com/search');

    // Build query parameters
    url.searchParams.append('query', query);
    if (location) url.searchParams.append('location', location);
    if (date_posted) url.searchParams.append('date_posted', date_posted);
    if (page) url.searchParams.append('page', page);
    if (num_pages) url.searchParams.append('num_pages', num_pages);
    if (employment_types) url.searchParams.append('employment_types', employment_types);
    if (work_from_home) url.searchParams.append('work_from_home', work_from_home);
    if (country) url.searchParams.append('country', country);
    if (language) url.searchParams.append('language', language);

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': 'jsearch.p.rapidapi.com',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return res.status(500).json({ error: 'Failed to fetch jobs', message: error.message });
  }
}
