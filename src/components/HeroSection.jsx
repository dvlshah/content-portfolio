import { motion, AnimatePresence } from 'framer-motion';
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  VStack, 
  HStack, 
  useColorModeValue, 
  Icon,
  Grid,
  Circle,
  Square,
} from '@chakra-ui/react';
import { BookOpen, Building2, Sparkles, Terminal } from 'lucide-react';
import { useState, useEffect } from 'react';

const StatBadge = ({ icon, value, label }) => {
  const badgeBg = useColorModeValue('white', 'gray.800')
  const iconColor = useColorModeValue('blue.500', 'blue.300')
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      {/* <HStack
        spacing={4}
        bg={badgeBg}
        px={6}
        py={4}
        rounded="2xl"
        shadow="lg"
        border="1px"
        borderColor={useColorModeValue('gray.100', 'gray.700')}
      >
        <Circle
          size={12}
          bg={useColorModeValue('blue.50', 'blue.900')}
        >
          <Icon as={icon} w={5} h={5} color={iconColor} />
        </Circle>
        <VStack spacing={0} align="start">
          <Text fontSize="2xl" fontWeight="bold" lineHeight="1">
            {value}
          </Text>
          <Text fontSize="sm" color="gray.500">
            {label}
          </Text>
        </VStack>
      </HStack> */}
    </motion.div>
  );
};

const FloatingShape = ({ delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ 
      opacity: [0.5, 0.8, 0.5],
      scale: [0.5, 0.7, 0.5],
      rotate: [0, 180, 360]
    }}
    transition={{
      duration: 20,
      delay,
      repeat: Infinity,
      ease: "linear"
    }}
  >
    <Square
      size={["100px", "150px", "200px"]}
      bg="transparent"
      borderWidth="2px"
      borderColor={useColorModeValue('blue.100', 'blue.900')}
      rounded="3xl"
      transform="rotate(45deg)"
      opacity={0.3}
    />
  </motion.div>
);

const RotatingText = () => {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const topics = ["Artificial Intelligence", "LLMs", "Computer Vision", "IoT"];
  const cursorColor = useColorModeValue('blue.500', 'blue.300');
  const typingSpeed = 100; // Speed of typing
  const deletingSpeed = 50; // Speed of deleting
  const delayBeforeDelete = 3000; // How long to wait before deleting

  useEffect(() => {
    let timeout;
    const currentText = topics[index];

    if (!isDeleting && displayText !== currentText) {
      // Typing
      timeout = setTimeout(() => {
        setDisplayText(currentText.slice(0, displayText.length + 1));
      }, typingSpeed);
    } else if (!isDeleting && displayText === currentText) {
      // Wait before deleting
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, delayBeforeDelete);
    } else if (isDeleting && displayText !== '') {
      // Deleting
      timeout = setTimeout(() => {
        setDisplayText(currentText.slice(0, displayText.length - 1));
      }, deletingSpeed);
    } else if (isDeleting && displayText === '') {
      // Move to next word
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % topics.length);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, index, topics]);

  return (
    <Box 
      display="inline" 
      position="relative"
      whiteSpace="nowrap"
    >
      <Box
        as="span"
        bgGradient="linear(to-r, blue.400, purple.500)"
        bgClip="text"
        position="relative"
      >
        {displayText}
      </Box>
      <motion.div
        style={{
          display: 'inline-block',
          marginLeft: '4px',
          verticalAlign: 'middle',
        }}
        animate={{ opacity: [1, 0] }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      >
        <Icon 
          as={Terminal}
          w={6}
          h={6}
          color={cursorColor}
          verticalAlign="baseline"
        />
      </motion.div>
    </Box>
  );
};

const HeroSection = ({ totalArticles = 0, totalCompanies = 0 }) => {
  const bgStart = useColorModeValue('gray.50', 'gray.900');
  const bgEnd = useColorModeValue('white', 'gray.800');
  const glowColor = useColorModeValue('blue.400', 'blue.500');
  
  return (
    <Box
      position="relative"
      overflow="hidden"
      bg={bgStart}
      pt={32}
      pb={20}
    >
      {/* Animated background gradient */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bgGradient={`linear(to-b, ${bgStart}, ${bgEnd})`}
        opacity={0.8}
      />

      {/* Floating shapes */}
      <Box position="absolute" top="10%" left="5%" opacity={0.5}>
        <FloatingShape delay={0} />
      </Box>
      <Box position="absolute" top="60%" right="10%" opacity={0.3}>
        <FloatingShape delay={5} />
      </Box>
      <Box position="absolute" bottom="20%" left="15%" opacity={0.4}>
        <FloatingShape delay={10} />
      </Box>

      {/* Content */}
      <Container maxW="7xl" position="relative" px={{ base: 4, md: 8 }}>
        <Grid
          templateColumns={{ base: "1fr", lg: "1fr auto" }}
          gap={{ base: 6, md: 12 }}
          alignItems="center"
        >
          <VStack spacing={{ base: 6, md: 8 }} align="start">
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <HStack
                spacing={2}
                bg={useColorModeValue('blue.50', 'blue.900')}
                color="blue.500"
                px={4}
                py={2}
                rounded="full"
              >
                <Icon as={Sparkles} w={4} h={4} />
                <Text
                  fontSize={{ base: "xs", md: "sm" }}
                  fontWeight="medium"
                  letterSpacing="wider"
                >
                  Content Portfolio
                </Text>
              </HStack>
            </motion.div>

            {/* Main heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <Heading
                as="h1"
                fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
                fontWeight="bold"
                lineHeight={{ base: "1.2", md: "shorter" }}
                letterSpacing="tight"
                maxW={{ base: "100%", md: "xl" }}
                position="relative"
              >
                <VStack spacing={{ base: 2, md: 4 }} align="start" width="full">
                  <Box
                    as="span"
                    display="block"
                    position="relative"
                    _after={{
                      content: '""',
                      width: 'full',
                      height: '30%',
                      position: 'absolute',
                      bottom: 1,
                      left: 0,
                      bg: useColorModeValue('blue.100', 'blue.900'),
                      zIndex: -1,
                    }}
                  >
                    Exploring
                  </Box>
                  <Box as="span" display="block">
                    <RotatingText />
                  </Box>
                </VStack>
              </Heading>
            </motion.div>

            {/* Subtitle */}
            <Text
              fontSize={{ base: "md", md: "lg" }}
              color={useColorModeValue('gray.600', 'gray.400')}
              maxW={{ base: "100%", md: "2xl" }}
              lineHeight="tall"
            >
              Curated insights on artificial intelligence
              and emerging technologies shaping our future
            </Text>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <HStack 
                spacing={4}
                pt={8}
                flexWrap={{ base: "wrap", md: "nowrap" }}
                gap={4}
              >
                <StatBadge 
                  icon={BookOpen}
                  value={totalArticles}
                  label="Articles"
                />
                <StatBadge 
                  icon={Building2}
                  value={totalCompanies}
                  label="Companies"
                />
              </HStack>
            </motion.div>
          </VStack>

          {/* Geometric decoration */}
          <Box
            display={{ base: "none", lg: "block" }}
            position="relative"
            width="400px"
            height="400px"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <Grid
                templateColumns="repeat(2, 1fr)"
                gap={8}
                transform="rotate(45deg)"
              >
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 90, 0],
                    }}
                    transition={{
                      duration: 20,
                      delay: i * 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <Box
                      width="full"
                      height="full"
                      aspectRatio={1}
                      bg="transparent"
                      borderWidth="2px"
                      borderColor={glowColor}
                      rounded="3xl"
                      opacity={0.3}
                      _after={{
                        content: '""',
                        position: "absolute",
                        inset: "-2px",
                        borderRadius: "inherit",
                        padding: "2px",
                        background: `linear-gradient(45deg, ${glowColor}, transparent)`,
                        WebkitMask: 
                          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                      }}
                    />
                  </motion.div>
                ))}
              </Grid>
            </motion.div>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;