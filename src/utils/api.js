export const fetchBlogs = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return [
    { id: 1, title: 'Advanced NLP Techniques for AI Startups', excerpt: 'Exploring cutting-edge NLP methods...', link: '#', date: '2023-05-15' },
    { id: 2, title: 'Implementing Efficient RAG Pipelines', excerpt: 'Best practices for building scalable RAG systems...', link: '#', date: '2023-06-02' },
    { id: 3, title: 'AI Ethics in Startup Environments', excerpt: 'Navigating ethical considerations in AI development...', link: '#', date: '2023-06-20' },
    // Add more mock blog posts to reach 50+
  ];
};
