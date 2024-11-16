import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  Input,
  Textarea,
  VStack,
  SimpleGrid,
  useToast,
  useColorModeValue,
  Icon,
  Text,
} from '@chakra-ui/react';
import { FaPaperPlane } from 'react-icons/fa';
import { useForm } from '@formspree/react';

export default function ContactForm() {
  const [state, handleSubmit] = useForm(import.meta.env.VITE_FORMSPREE_FORM_ID);
  const toast = useToast();
  
  // Match existing theme colors
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const inputBg = useColorModeValue('gray.50', 'gray.700');
  const inputHoverBg = useColorModeValue('gray.100', 'gray.600');

  // Handle form submission result
  if (state.succeeded) {
    toast({
      title: 'Message sent successfully!',
      description: "Thank you for reaching out. I'll get back to you soon.",
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  }

  return (
    <Box 
      p={{ base: 6, md: 8 }}
      borderRadius="xl"
      bg={bgColor}
      borderWidth="1px"
      borderColor={borderColor}
      shadow="sm"
      maxW="900px"
      mx="auto"
    >
      <form onSubmit={handleSubmit}>
        <VStack spacing={6}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="full">
            <FormControl isRequired>
              <Input
                name="name"
                placeholder="Your name"
                size="lg"
                fontSize="md"
                bg={inputBg}
                border="none"
                h="56px"
                _hover={{ bg: inputHoverBg }}
                _focus={{
                  borderColor: 'blue.400',
                  bg: useColorModeValue('white', 'gray.900'),
                  boxShadow: 'outline'
                }}
                disabled={state.submitting}
              />
            </FormControl>
            
            <FormControl isRequired>
              <Input
                name="email"
                type="email"
                placeholder="your@email.com"
                size="lg"
                fontSize="md"
                bg={inputBg}
                border="none"
                h="56px"
                _hover={{ bg: inputHoverBg }}
                _focus={{
                  borderColor: 'blue.400',
                  bg: useColorModeValue('white', 'gray.900'),
                  boxShadow: 'outline'
                }}
                disabled={state.submitting}
              />
            </FormControl>
          </SimpleGrid>
          
          <FormControl isRequired>
            <Textarea
              name="message"
              placeholder="Your message..."
              size="lg"
              fontSize="md"
              bg={inputBg}
              border="none"
              rows={4}
              _hover={{ bg: inputHoverBg }}
              _focus={{
                borderColor: 'blue.400',
                bg: useColorModeValue('white', 'gray.900'),
                boxShadow: 'outline'
              }}
              disabled={state.submitting}
            />
          </FormControl>

          <Button
            type="submit"
            colorScheme="blue"
            size="lg"
            width={{ base: "full", md: "auto" }}
            minW={{ md: "200px" }}
            h="56px"
            fontSize="md"
            fontWeight="600"
            isLoading={state.submitting}
            loadingText="Sending message..."
            leftIcon={<Icon as={FaPaperPlane} />}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}
            transition="all 0.2s"
            disabled={state.submitting}
          >
            Send Message
          </Button>
          
          {state.errors?.length > 0 && (
            <Text color="red.500" fontSize="sm" textAlign="center">
              Oops! There was an error. Please try again.
            </Text>
          )}
        </VStack>
      </form>
    </Box>
  );
}