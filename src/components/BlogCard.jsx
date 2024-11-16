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
  AspectRatio,
  Icon,
} from '@chakra-ui/react';
import { CalendarIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

const MotionBox = motion(Box);

const BlogCard = ({ blog, featured = false }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  
  // Theme colors
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const headingColor = useColorModeValue('gray.800', 'white');
  const tagBg = useColorModeValue('blue.50', 'blue.900');
  const tagColor = useColorModeValue('blue.600', 'blue.200');
  
  const formattedDate = blog.date ? format(new Date(blog.date), 'MMM dd, yyyy') : '';

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50px' }
    );

    const element = document.getElementById(`blog-${blog.source_url}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [blog.source_url]);

  return (
    <MotionBox
      id={`blog-${blog.source_url}`}
      as={LinkBox}
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
                src={blog.image}
                alt={blog.title}
                objectFit="cover"
                width="100%"
                height="100%"
                loading="lazy"
                onLoad={() => setIsImageLoaded(true)}
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
            <Tag 
              size="md" 
              bg={tagBg}
              color={tagColor}
              fontWeight="600"
              px={3}
              py={1}
            >
              {blog.company}
            </Tag>
            <HStack spacing={1} color={textColor} fontSize="sm">
              <Icon as={CalendarIcon} boxSize={3} />
              <Text>{formattedDate}</Text>
            </HStack>
          </HStack>

          <LinkOverlay href={blog.source_url} isExternal>
            <Heading
              size={featured ? 'md' : 'sm'}
              lineHeight="tight"
              noOfLines={2}
              color={headingColor}
              _hover={{ color: 'blue.500' }}
              transition="color 0.2s"
            >
              {blog.title}
            </Heading>
          </LinkOverlay>

          <Text
            color={textColor}
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
              bg={tagBg}
              color={tagColor}
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