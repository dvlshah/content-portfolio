import { useState, useEffect } from 'react';
import { 
  Box, 
  Image, 
  Text, 
  Tag, 
  LinkBox, 
  LinkOverlay, 
  VStack, 
  HStack, 
  Heading,
  useColorModeValue,
  Skeleton,
  AspectRatio
} from '@chakra-ui/react';
import { CalendarIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import { logEvent } from '../utils/analytics';
import { format } from 'date-fns';

const MotionBox = motion(Box);

const BlogCard = ({ blog, featured = false }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  // Format date
  const formattedDate = blog.date ? format(new Date(blog.date), 'MMM dd, yyyy') : '';

  // Track blog card click
  const handleBlogClick = () => {
    logEvent('Blog', 'Click', {
      title: blog.title,
      company: blog.company,
      date: formattedDate
    });
  };

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    const element = document.getElementById(`blog-${blog.source_url}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [blog.source_url]);

  // Generate smaller thumbnail URL
  const thumbnailUrl = blog.image?.replace('/800/600', '/400/300') || '';

  return (
    <MotionBox
      id={`blog-${blog.source_url}`}
      as={LinkBox}
      onClick={handleBlogClick}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="xl"
      overflow="hidden"
      bg={bgColor}
      height="100%"
      display="flex"
      flexDirection="column"
      transition="all 0.2s"
      _hover={{
        transform: 'translateY(-4px)',
        shadow: 'lg',
        borderColor: 'blue.500',
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <AspectRatio ratio={16/9}>
        <Box position="relative">
          <Skeleton
            isLoaded={isImageLoaded}
            fadeDuration={1}
            width="100%"
            height="100%"
          >
            {shouldLoad && (
              <Image
                src={thumbnailUrl}
                alt={blog.title}
                objectFit="cover"
                width="100%"
                height="100%"
                loading="lazy"
                onLoad={() => setIsImageLoaded(true)}
                srcSet={`${thumbnailUrl} 400w, ${blog.image} 800w`}
                sizes="(max-width: 768px) 400px, 800px"
                fallbackSrc="https://via.placeholder.com/400x300?text=Loading..."
                transition="opacity 0.3s"
                opacity={isImageLoaded ? 1 : 0}
              />
            )}
          </Skeleton>
        </Box>
      </AspectRatio>

      <VStack p={6} spacing={4} align="stretch" flex="1">
        <VStack spacing={3} align="start" w="full">
          <HStack spacing={2} justify="space-between" w="full">
            <Tag colorScheme="purple" size="sm">
              {blog.company}
            </Tag>
            <HStack spacing={1} color="gray.500" fontSize="sm" align="center">
              <CalendarIcon boxSize={3} />
              <Text>{formattedDate}</Text>
            </HStack>
          </HStack>

          <LinkOverlay href={blog.source_url} isExternal>
            <Heading
              size={featured ? 'lg' : 'md'}
              lineHeight="tight"
              noOfLines={2}
              _hover={{ color: 'blue.500' }}
              mb={2}
            >
              {blog.title}
            </Heading>
          </LinkOverlay>

          <Text
            color="gray.500"
            noOfLines={3}
            fontSize="sm"
            lineHeight="tall"
          >
            {blog.excerpt}
          </Text>
        </VStack>

        <HStack spacing={2} flexWrap="wrap" pt={2}>
          {blog.tags.map((tag, index) => (
            <Tag
              key={index}
              size="sm"
              colorScheme="blue"
              variant="subtle"
            >
              {tag}
            </Tag>
          ))}
        </HStack>
      </VStack>
    </MotionBox>
  );
};

export default BlogCard;