import { 
  Box, 
  Container, 
  SimpleGrid, 
  VStack,
  HStack, 
  Text,
  Heading,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { keyframes } from '@emotion/react';
import { 
  Sparkles, 
  Network, 
  Globe2,
} from 'lucide-react';

// Animated background pattern
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

const CompaniesSection = ({ companies, blogs }) => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const glowColor = useColorModeValue('blue.400', 'blue.500');
  const accentColor = useColorModeValue('purple.500', 'purple.400');
  
  const float = keyframes`
    0% { transform: translateY(0px) }
    50% { transform: translateY(-20px) }
    100% { transform: translateY(0px) }
  `;

  return (
    <Box 
      bg={bgColor} 
      py={32} 
      position="relative" 
      overflow="hidden"
    >
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
          {/* Section Header */}
          <VStack spacing={6} align="center" textAlign="center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <HStack spacing={2}>
                {/* <Icon as={Network} w={5} h={5} color={glowColor} /> */}
                <Text
                  fontSize="sm"
                  fontWeight="semibold"
                  textTransform="uppercase"
                  letterSpacing="wider"
                  color={glowColor}
                >
                  Collaborating with awesome AI companies
                </Text>
              </HStack>
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
                  You're in Good Company
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
                Join forces with industry leaders pushing the boundaries 
                of artificial intelligence and shaping tomorrow's technology
              </Text>
            </motion.div>
          </VStack>

          {/* Company Grid */}
          <SimpleGrid 
            columns={{ base: 1, md: 2, lg: 3 }} 
            spacing={8}
            w="full"
          >
            {companies.map((company, index) => (
              <motion.div
                key={company}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <CompanyCard
                  company={company}
                  articleCount={blogs?.filter(blog => blog.company === company).length || 0}
                  float={float}
                  glowColor={glowColor}
                  accentColor={accentColor}
                />
              </motion.div>
            ))}
          </SimpleGrid>

          {/* Global collaboration indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <HStack spacing={3} color="gray.500">
              {/* <Icon as={Globe2} w={5} h={5} /> */}
              {/* <Text fontSize="sm">
                Collaborating with leading AI companies worldwide
              </Text> */}
            </HStack>
          </motion.div>
        </VStack>
      </Container>
    </Box>
  );
};

// Enhanced Company Card
const CompanyCard = ({ company, articleCount, float, glowColor, accentColor }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  
  return (
    <motion.div
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        transition: { duration: 0.2 } 
      }}
    >
      <Box
        bg={bgColor}
        p={8}
        rounded="2xl"
        borderWidth="1px"
        borderColor={borderColor}
        position="relative"
        overflow="hidden"
        height="200px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        role="group"
        boxShadow="lg"
        _before={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: 'inherit',
          padding: '2px',
        //   background: `linear-gradient(45deg, ${glowColor}, ${accentColor})`,
          WebkitMask: 
            'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          opacity: 0,
          transition: 'opacity 0.3s',
        }}
        _groupHover={{
          _before: {
            opacity: 1,
          }
        }}
      >
        <VStack spacing={4}>
          {/* Company Icon */}
          {/* <Box
            animation={`${float} 3s ease-in-out infinite`}
          >
            <Icon 
              as={Sparkles} 
              w={6} 
              h={6} 
              color={glowColor}
              opacity={0.8}
            />
          </Box> */}

          {/* Company Name */}
          <Heading 
            size="lg"
            bgGradient={`linear(to-r, ${glowColor}, ${accentColor})`}
            bgClip="text"
            transition="all 0.3s"
          >
            {company}
          </Heading>

          {/* Article Count */}
          <Text 
            color="gray.500" 
            fontSize="sm"
            fontWeight="medium"
          >
            {articleCount} {articleCount === 1 ? 'article' : 'articles'}
          </Text>
        </VStack>

        {/* Background Effects */}
        <Box
          position="absolute"
          inset={0}
          bgGradient={`radial(circle at bottom right, ${glowColor}10, transparent 70%)`}
          opacity={0.5}
          transition="opacity 0.3s"
          _groupHover={{ opacity: 0.8 }}
        />
      </Box>
    </motion.div>
  );
};

export default CompaniesSection;