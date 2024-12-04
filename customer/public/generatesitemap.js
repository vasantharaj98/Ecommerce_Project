const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const { pipeline } = require('stream');
const axios = require('axios');

// Define your website's base URL
const baseUrl = 'https://ecommerce.live'; // Replace with your website's URL

const date = new Date().toISOString();


  const fetchData = async () => {
    try {
      const response = await axios.get("https://api.Ecommerce.live/api/user/EN/home/Breaking?page=1");
      return response.data; // Assuming the response is an array of items
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };

  const tafetchData = async () => {
    try {
      const response = await axios.get("https://api.Ecommerce.live/api/user/TA/home/Breaking?page=1");
      return response.data; // Assuming the response is an array of items
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };

// Function to generate the sitemap
const generateSitemap = async () => {
  try {
   
    const data = await fetchData();

    const tadata = await tafetchData();


    // Create a write stream to the sitemap file
    const writeStream = createWriteStream('public/sitemap.xml');

    // Write XML declaration to the file
    writeStream.write('<?xml version="1.0" encoding="UTF-8"?>\n');
    writeStream.write('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="https://www.google.com/schemas/sitemap-video/1.1" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.w3.org/1999/xhtml http://www.w3.org/2002/08/xhtml/xhtml1-strict.xsd">\n');

    // Write URLs to the file
    data?.data?.map(url => {
        writeStream.write(`
        <url>
        <loc>${baseUrl}/${url.url}</loc>
        <news>
        <publication>
        <name>Ecommerce</name>
        <language>${url.language}</language>
        </publication>
        <publication_date>${url.createdAt}</publication_date>
<title>${url.title}</title>
<keywords>${url.short_summary}</keywords>
        </news>
        <lastmod>${date}</lastmod>
        <image>
<loc>${url.summary_img}</loc>
</image>
        </url>`);
    });

    tadata?.data?.map(url => {
      writeStream.write(`
      <url>
      <loc>${baseUrl}/${url.url}</loc>
      <news>
      <publication>
      <name>Ecommerce</name>
      <language>${url.language}</language>
      </publication>
      <publication_date>${url.createdAt}</publication_date>
<title>${url.title}</title>
<keywords>${url.short_summary}</keywords>
      </news>
      <lastmod>${date}</lastmod>
      <image>
<loc>${url.summary_img}</loc>
</image>
      </url>`);
  });

    // End the XML document
    writeStream.write('</urlset>');
    writeStream.end();

    console.log('Sitemap generated successfully.');
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
};

// Call the generateSitemap function
generateSitemap();
