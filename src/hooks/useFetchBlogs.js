import { useQuery } from '@tanstack/react-query';
import { blogData } from '../data/blogData';

const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

const fetchImage = async (index) => {
  try {
    // Add error handling for API key
    if (!PEXELS_API_KEY) {
      console.warn('Pexels API key not found, using fallback image');
      return `https://picsum.photos/800/600?random=${index}`;
    }

    const response = await fetch(
      `https://api.pexels.com/v1/search?query=artificial%20intelligence&per_page=1&page=${index + 1}`,
      {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
        mode: 'cors',
        cache: 'force-cache' // Add caching
      }
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.photos[0]?.src.large || `https://picsum.photos/800/600?random=${index}`;
  } catch (error) {
    console.error('Error fetching image:', error);
    // Return fallback image on error
    return `https://picsum.photos/800/600?random=${index}`;
  }
};

const useFetchBlogs = () => {
  const { data: images, isLoading, error } = useQuery(
    ['blogImages'],
    async () => {
      try {
        const images = await Promise.allSettled(
          blogData.map((_, index) => fetchImage(index))
        );
        return images.map(result => 
          result.status === 'fulfilled' ? result.value : `https://picsum.photos/800/600?random=${index}`
        );
      } catch (error) {
        console.error('Error fetching images:', error);
        // Return fallback images if batch fetch fails
        return blogData.map((_, index) => `https://picsum.photos/800/600?random=${index}`);
      }
    },
    {
      staleTime: 24 * 60 * 60 * 1000, // 24 hours
      cacheTime: 7 * 24 * 60 * 60 * 1000, // 7 days
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 2,
      retryDelay: 1000, // Wait 1 second between retries
      onError: (error) => {
        console.error('Query error:', error);
      }
    }
  );

  // Combine blog data with images
  const combinedData = blogData.map((blog, index) => ({
    ...blog,
    image: images?.[index] || `https://picsum.photos/800/600?random=${index}`,
  }));

  return {
    data: combinedData,
    isLoading,
    error
  };
};

export default useFetchBlogs;
