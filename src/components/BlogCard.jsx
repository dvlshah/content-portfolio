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
  Flex,
} from '@chakra-ui/react';
import { CalendarIcon } from '@chakra-ui/icons';
import { FaBuilding } from 'react-icons/fa';
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
      bg={bgColor}
      position="relative"
      h="full"
      display="grid"
      gridTemplateRows="auto 1fr auto"
      transition="all 0.2s"
      overflow="hidden"
      _hover={{
        transform: 'translateY(-4px)',
        shadow: 'lg',
        borderColor: 'blue.500',
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Image Section */}
      <AspectRatio ratio={16/9}>
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
            />
          )}
        </Skeleton>
      </AspectRatio>

      {/* Content Section */}
      <Box 
        p={{ base: 5, md: 6 }} 
        display="flex" 
        flexDirection="column"
      >
        {/* Title */}
        <LinkOverlay href={blog.source_url} isExternal>
          <Heading
            as="h3"
            size={{ base: "sm", md: "md" }}
            color={headingColor}
            lineHeight="tight"
            mb={{ base: 3, md: 4 }}
          >
            {blog.title}
          </Heading>
        </LinkOverlay>

        {/* Tags */}
        <HStack 
          spacing={0} 
          gap={{ base: 1.5, md: 2 }}
          flexWrap="wrap"
          mb={{ base: 3, md: 4 }}
        >
          {blog.tags.slice(0, 3).map((tag, index) => (
            <Tag
              key={index}
              size={{ base: "sm", md: "sm" }}
              bg={tagBg}
              color={tagColor}
              px={{ base: 2, md: 3 }}
              py={{ base: 0.5, md: 1 }}
            >
              {tag}
            </Tag>
          ))}
        </HStack>
          
        {/* Description */}
        <Text 
          color={textColor}
          fontSize={{ base: "sm", md: "md" }}
          noOfLines={2}
          lineHeight="tall"
        >
          {blog.description}
        </Text>
      </Box>

      {/* Metadata Section */}
      <Box 
        px={{ base: 5, md: 6 }}
        pb={{ base: 5, md: 6 }}
      >
        <Flex 
          justify="space-between" 
          align="center"
          flexWrap={{ base: "wrap", sm: "nowrap" }}
          gap={{ base: 2, sm: 0 }}
        >
          <HStack spacing={1.5}>
            <Icon as={CalendarIcon} boxSize={{ base: 3, md: 4 }} />
            <Text fontSize={{ base: "xs", md: "sm" }} color={textColor}>
              {formattedDate}
            </Text>
          </HStack>
          
          {blog.company && (
            <HStack spacing={1.5}>
              <Icon as={FaBuilding} boxSize={{ base: 3, md: 4 }} />
              <Text fontSize={{ base: "xs", md: "sm" }} color={textColor}>
                {blog.company}
              </Text>
            </HStack>
          )}
        </Flex>
      </Box>
    </MotionBox>
  );
};

export default BlogCard;