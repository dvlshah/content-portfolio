import { motion } from 'framer-motion';
import { 
  HStack, 
  VStack, 
  Text, 
  Icon, 
  Circle, 
  useColorModeValue 
} from '@chakra-ui/react';

const StatBadge = ({ icon, value, label }) => {
  const badgeBg = useColorModeValue('white', 'gray.800')
  const iconColor = useColorModeValue('blue.500', 'blue.300')
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <HStack
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
      </HStack>
    </motion.div>
  );
};

export default StatBadge;