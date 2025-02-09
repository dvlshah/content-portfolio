import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  VStack, 
  Avatar,
  Flex,
  useColorModeValue,
  IconButton,
  HStack,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';

const MotionBox = motion(Box);

// Background Pattern Component
const BackgroundPattern = () => {
  const dotColor = useColorModeValue('blue.100', 'blue.900');
  const boxSize = 20;
  const gridSize = Math.ceil(1200 / boxSize);
  
  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      overflow="hidden"
      opacity={0.4}
    >
      <Box
        position="absolute"
        width="200%"
        height="200%"
        top="-50%"
        left="-50%"
        animation="rotate 60s linear infinite"
      >
        {Array.from({ length: gridSize }).map((_, i) => (
          <Box key={i} position="relative">
            {Array.from({ length: gridSize }).map((_, j) => (
              <Box
                key={`${i}-${j}`}
                position="absolute"
                top={i * boxSize}
                left={j * boxSize}
                width="2px"
                height="2px"
                bg={dotColor}
                borderRadius="full"
                opacity={Math.random()}
              />
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const testimonials = [
  {
    name: "Sabrina Shoshani",
    role: "Content Marketing Lead at Coralogix",
    image: "/sabrina.jpg",
    text: "Deval was Aporia's freelance content writer for several months. He was tasked with producing very complex blog posts on topics of AI, LLMs and surrounding areas, and he did so to extremely high standards. He has a very strong knowledge of the industry, an excellent writing style and always addressed comments professionally.",
  },
  {
    name: "Jess Miley",
    role: "Content Director at Wevolver",
    image: "/jess.jpg",
    text: "Deval is a highly competent technical writer. He is attentive to deadlines and comprehensively knows relevant engineering topics.",
  },
  {
    name: "Mayra Rojas Letrado",
    role: "Digital Media Specialist",
    image: "/mayra.jpg",
    text: "I had the pleasure of working with Deval Shah, a talented writer who provided article writing services for our data labeling company. Deval consistently delivered high-quality articles that effectively communicated complex topics related to machine learning and data labeling.",
  },
  {
    name: "Kas Szatylowicz",
    role: "Fractional Head of Marketing | Growth Advisor",
    image: "/kas.jpg",
    text: "Deval has been writing articles for the V7 blog for a couple of months now. He always delivers his work on time and ensures that his masterpieces align with the very detailed guidelines we provide. He is open to feedback and very responsive.",
  }
];

const TestimonialCard = ({ testimonial, isCenter }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const nameColor = useColorModeValue('gray.900', 'white');
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const shadowColor = useColorModeValue('blue.100', 'blue.900');

  return (
    <MotionBox
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        scale: isCenter ? 1.1 : 0.85,
        zIndex: isCenter ? 2 : 1,
      }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ 
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.5
      }}
      height="400px"
      width="100%"
      transformOrigin="center"
    >
      <Box
        bg={bgColor}
        px={6}
        py={8}
        borderRadius="2xl"
        height="100%"
        textAlign="center"
        borderWidth="1px"
        borderColor={isCenter ? 'blue.400' : borderColor}
        boxShadow={isCenter ? `0 4px 20px ${shadowColor}` : 'lg'}
        display="flex"
        flexDirection="column"
        opacity={isCenter ? 1 : 0.5}
        transform={`scale(${isCenter ? 1 : 0.95})`}
        transition="all 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
        overflow="hidden"
      >
        <VStack spacing={4} height="100%">
          <Avatar 
            size={isCenter ? "xl" : "lg"}
            name={testimonial.name} 
            src={testimonial.image}
          />
          <Box flex="1" overflow="auto" px={2}>
            <Text 
              fontSize={isCenter ? "md" : "sm"}
              color={textColor} 
              lineHeight="tall"
              mb={4}
            >
              {testimonial.text}
            </Text>
          </Box>
          <VStack spacing={1}>
            <Text 
              fontWeight="bold" 
              fontSize={isCenter ? "lg" : "md"} 
              color={nameColor}
            >
              {testimonial.name}
            </Text>
            <Text 
              fontSize={isCenter ? "md" : "sm"} 
              color={textColor}
            >
              {testimonial.role}
            </Text>
          </VStack>
        </VStack>
      </Box>
    </MotionBox>
  );
};

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const totalTestimonials = testimonials.length;
  const glowColor = useColorModeValue('blue.400', 'blue.500');
  const accentColor = useColorModeValue('purple.500', 'purple.400');
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  const nextSlide = useCallback(() => {
    setCurrentIndex(prev => (prev === totalTestimonials - 1) ? 0 : prev + 1);
  }, [totalTestimonials]);

  const prevSlide = useCallback(() => {
    setCurrentIndex(prev => (prev === 0) ? totalTestimonials - 1 : prev - 1);
  }, [totalTestimonials]);

  // Auto-play functionality
  useEffect(() => {
    let intervalId;
    if (isAutoPlaying) {
      intervalId = setInterval(() => {
        nextSlide();
      }, 10000); // 10 seconds
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isAutoPlaying, nextSlide]);

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  // Get visible testimonials (previous, current, next)
  const getVisibleTestimonials = () => {
    const prev = currentIndex === 0 ? totalTestimonials - 1 : currentIndex - 1;
    const next = currentIndex === totalTestimonials - 1 ? 0 : currentIndex + 1;
    return [
      testimonials[prev],
      testimonials[currentIndex],
      testimonials[next]
    ];
  };

  return (
    <Box py={32} bg={bgColor} position="relative" overflow="hidden">
      <BackgroundPattern />
      
      {/* Decorative elements */}
      <Box
        position="absolute"
        top="10%"
        left="5%"
        width="300px"
        height="300px"
        bgGradient={`radial(${glowColor}, transparent 70%)`}
        filter="blur(40px)"
        opacity={0.3}
      />
      <Box
        position="absolute"
        bottom="10%"
        right="5%"
        width="400px"
        height="400px"
        bgGradient={`radial(${accentColor}, transparent 70%)`}
        filter="blur(60px)"
        opacity={0.2}
      />

      <Container maxW="7xl" position="relative">
        <VStack spacing={20}>
          <VStack spacing={6} align="center" textAlign="center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Text
                fontSize="sm"
                fontWeight="semibold"
                textTransform="uppercase"
                letterSpacing="wider"
                color={glowColor}
              >
                Trusted by Industry Leaders
              </Text>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Box position="relative">
                <Heading
                  fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
                  fontWeight="bold"
                  lineHeight="shorter"
                  bgGradient={`linear(to-r, ${glowColor}, ${accentColor})`}
                  bgClip="text"
                  marginBottom={4}
                >
                  Testimonials
                </Heading>
                <Box
                  position="absolute"
                  bottom="-10px"
                  left="50%"
                  transform="translateX(-50%)"
                  width="100px"
                  height="4px"
                  bgGradient={`linear(to-r, ${glowColor}, ${accentColor})`}
                  borderRadius="full"
                />
              </Box>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Text
                fontSize={{ base: "lg", md: "xl" }}
                color="gray.500"
                maxW="2xl"
              >
                Empowering businesses with expert technical content that drives innovation and growth
              </Text>
            </motion.div>
          </VStack>
          
          <Box width="100%" height="500px">
            <Box 
              position="relative" 
              height="100%"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <AnimatePresence mode="wait">
                <Flex 
                  gap={{ base: 4, md: 6, lg: 8 }}
                  direction={{ base: "column", md: "row" }}
                  justify="center"
                  align="center"
                  height="100%"
                  position="relative"
                  px={4}
                >
                  {getVisibleTestimonials().map((testimonial, index) => (
                    <Box 
                      key={testimonial.name}
                      flex="1"
                      maxW={{ base: "100%", md: "400px" }}
                      height="100%"
                      zIndex={index === 1 ? 2 : 1}
                    >
                      <TestimonialCard 
                        testimonial={testimonial} 
                        isCenter={index === 1}
                      />
                    </Box>
                  ))}
                </Flex>
              </AnimatePresence>
            </Box>

            {/* Navigation Arrows */}
            <HStack justify="center" spacing={4} mt={8}>
              <IconButton
                icon={<ChevronLeftIcon />}
                aria-label="Previous testimonials"
                variant="ghost"
                colorScheme="blue"
                size="sm"
                onClick={prevSlide}
                _hover={{
                  transform: 'translateX(-2px)',
                }}
              />
              <IconButton
                icon={<ChevronRightIcon />}
                aria-label="Next testimonials"
                variant="ghost"
                colorScheme="blue"
                size="sm"
                onClick={nextSlide}
                _hover={{
                  transform: 'translateX(2px)',
                }}
              />
            </HStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default TestimonialsSection;
