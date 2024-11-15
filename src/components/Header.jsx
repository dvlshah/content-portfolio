import React from 'react';
import { Flex, Box, Text, Spacer, IconButton } from '@chakra-ui/react';
import { FaTwitter, FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Header = () => {
  return (
    <Flex as="header" bg="black" color="white" p={4} alignItems="center">
      <Box>
        <Text as="a" href="#" fontWeight="bold" mr={4}>About me</Text>
        <Text as="a" href="#" fontWeight="bold" mr={4}>UX & UI Design</Text>
        <Text as="a" href="#" fontWeight="bold" mr={4}>Art</Text>
        <Text as="a" href="#" fontWeight="bold">Blog</Text>
      </Box>
      <Spacer />
      <Box>
        <IconButton as="a" href="#" icon={<FaTwitter />} variant="ghost" aria-label="Twitter" mr={2} />
        <IconButton as="a" href="#" icon={<FaInstagram />} variant="ghost" aria-label="Instagram" mr={2} />
        <IconButton as="a" href="#" icon={<FaLinkedin />} variant="ghost" aria-label="LinkedIn" mr={2} />
        <IconButton as="a" href="#" icon={<FaEnvelope />} variant="ghost" aria-label="Email" />
      </Box>
    </Flex>
  );
};

export default Header;