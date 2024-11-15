// New utility file to handle CSV parsing
export const parseCSVToBlogs = (csvData) => {
  // Skip header row and map each row to blog format
  return csvData.slice(1).map((row, index) => ({
    id: index + 1,
    title: row.title,
    excerpt: row.card_description,
    link: `#${row.title.toLowerCase().replace(/\s+/g, '-')}`,
    date: row.date_published,
    image: `https://source.unsplash.com/random/800x600?${row.tags.split(',')[0]}`,
    author: {
      name: row.author,
      avatar: `https://source.unsplash.com/random/100x100?person`
    }
  }));
};