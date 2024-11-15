import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Image, 
  Heading, 
  Text, 
  Link, 
  VStack, 
  HStack, 
  Tag, 
  AspectRatio, 
  Icon, 
  Skeleton,
  useColorModeValue 
} from '@chakra-ui/react';
import { CalendarIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const BlogCard = ({ blog, featured = false }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  const {
    title = '',
    excerpt = '',
    date = '',
    company = '',
    tags = [],
    source_url = '#',
    image = '',
    author = {}
  } = blog;

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

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

    const element = document.getElementById(`blog-${source_url}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [source_url]);

  return (
    <MotionBox
      id={`blog-${source_url}`}
      position="relative"
      rounded={featured ? '2xl' : 'xl'}
      overflow="hidden"
      bg={bgColor}
      borderWidth="1px"
      borderColor={borderColor}
      _hover={{
        transform: 'translateY(-4px)',
        shadow: 'lg',
        borderColor: 'blue.500',
      }}
      transition="all 0.2s"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Link href={source_url} isExternal _hover={{ textDecoration: 'none' }}>
        <AspectRatio ratio={16/9}>
          <Box position="relative" overflow="hidden">
            <Skeleton
              position="absolute"
              top={0}
              left={0}
              width="100%"
              height="100%"
              isLoaded={isImageLoaded}
            >
              {shouldLoad && (
                <Image
                  src={image}
                  alt={title}
                  objectFit="cover"
                  w="full"
                  h="full"
                  opacity={isImageLoaded ? 1 : 0}
                  transition="opacity 0.3s"
                  onLoad={() => setIsImageLoaded(true)}
                  loading="lazy"
                  fallbackSrc={`https://picsum.photos/800/450?random=${blog.id}`}
                />
              )}
            </Skeleton>
            {featured && (
              <Tag
                position="absolute"
                top={4}
                left={4}
                colorScheme="blue"
                size="sm"
              >
                Featured
              </Tag>
            )}
          </Box>
        </AspectRatio>

        <VStack p={6} spacing={4} align="stretch" flex="1">
          <VStack spacing={2} align="start" w="full">
            <HStack spacing={2} justify="space-between" w="full">
              <Tag colorScheme="purple" size="sm">
                {company}
              </Tag>
              <HStack spacing={1} color="gray.500" fontSize="sm">
                <CalendarIcon />
                <Text>{formattedDate}</Text>
              </HStack>
            </HStack>

            <Heading
              size={featured ? 'lg' : 'md'}
              lineHeight="tight"
              noOfLines={2}
              _hover={{ color: 'blue.500' }}
            >
              {title}
            </Heading>

            <Text 
              color="gray.500" 
              noOfLines={2}
              fontSize="md"
            >
              {excerpt}
            </Text>
          </VStack>

          <Box mt="auto">
            <HStack 
              spacing={2} 
              flexWrap="wrap"
              mt={4}
            >
              {tags.map((tag, index) => (
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
          </Box>
        </VStack>
      </Link>
    </MotionBox>
  );
};

export default BlogCard;