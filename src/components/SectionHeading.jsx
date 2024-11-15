import { VStack, Heading, Text } from '@chakra-ui/react';

const SectionHeading = ({ title, subtitle, tag, align = 'center', size = 'lg' }) => {
  return (
    <VStack spacing={4} align={align} textAlign={align} maxW="2xl" mx={align === 'center' ? 'auto' : '0'}>
      {tag && (
        <Text variant="section-title">
          {tag}
        </Text>
      )}
      <Heading
        size={size}
        variant="gradient"
        lineHeight="shorter"
      >
        {title}
      </Heading>
      {subtitle && (
        <Text variant="subtitle">
          {subtitle}
        </Text>
      )}
    </VStack>
  );
};

export default SectionHeading;