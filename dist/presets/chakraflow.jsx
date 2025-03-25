import { Box, Button, Container, Flex, Heading, HStack, Link, Text, VStack, SimpleGrid, useColorMode, useColorModeValue } from '@chakra-ui/react';

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  // Use standard colors that are guaranteed to exist in the default theme
  const bgGradient = useColorModeValue(
    'linear(to-br, blue.500, purple.500)',
    'linear(to-br, blue.800, purple.800)'
  );
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.100');
  const headerBg = useColorModeValue('white', 'gray.800');
  const buttonColorScheme = 'blue';

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      {/* Header/Navigation */}
      <Box as="header" bg={headerBg} py={4} borderBottomWidth="1px" boxShadow="sm">
        <Container maxW="container.xl">
          <Flex justify="space-between" align="center">
            <Heading as="h1" size="lg" color="blue.500">ChakraFlow</Heading>
            <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
              <Link fontWeight="medium" color={textColor}>Home</Link>
              <Link fontWeight="medium" color={textColor}>Features</Link>
              <Link fontWeight="medium" color={textColor}>Docs</Link>
              <Link fontWeight="medium" color={textColor}>About</Link>
            </HStack>
            <HStack>
              <Button onClick={toggleColorMode} size="sm" variant="ghost">
                {colorMode === 'light' ? '🌙' : '☀️'}
              </Button>
              <Button display={{ base: 'none', md: 'inline-flex' }} colorScheme={buttonColorScheme}>
                Get Started
              </Button>
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Hero Section */}
      <Box bgGradient={bgGradient} py={20} flex="1">
        <Container maxW="container.xl">
          <VStack spacing={6} textAlign="center" maxW="container.md" mx="auto">
            <Heading as="h2" size="2xl" color="white" fontWeight="bold">
              Build beautiful UIs with ChakraFlow
            </Heading>
            <Text fontSize="xl" color="whiteAlpha.900">
              A modern UI stack powered by Chakra UI. Create responsive, accessible 
              interfaces with ease using the power of React and Chakra UI.
            </Text>
            <HStack spacing={4} pt={4}>
              <Button size="lg" bg="white" color="blue.500" _hover={{ bg: 'gray.100' }}>
                Get Started
              </Button>
              <Button
                as="a"
                href="https://chakra-ui.com/docs/getting-started"
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                colorScheme="blue"
                variant="outline"
                _hover={{ bg: 'rgba(255,255,255,0.1)' }}
                borderColor="white"
                color="white"
              >
                Documentation
              </Button>
            </HStack>
          </VStack>
        </Container>
      </Box>

      {/* Features Section */}
      <Box py={16} bg={useColorModeValue('gray.50', 'gray.900')}>
        <Container maxW="container.xl">
          <VStack spacing={12}>
            <Heading as="h3" size="xl" textAlign="center" color={textColor}>
              Key Features
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} w="full">
              <Box p={8} bg={cardBg} rounded="xl" shadow="md">
                <VStack spacing={4} align="flex-start">
                  <Box p={2} bg="blue.50" rounded="md" color="blue.500">
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </Box>
                  <Heading as="h4" size="md" color={textColor}>
                    Responsive Components
                  </Heading>
                  <Text color={useColorModeValue('gray.600', 'gray.400')}>
                    All Chakra UI components are designed to work across all device sizes, from mobile to desktop.
                  </Text>
                </VStack>
              </Box>
              <Box p={8} bg={cardBg} rounded="xl" shadow="md">
                <VStack spacing={4} align="flex-start">
                  <Box p={2} bg="blue.50" rounded="md" color="blue.500">
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                    </svg>
                  </Box>
                  <Heading as="h4" size="md" color={textColor}>
                    Component Library
                  </Heading>
                  <Text color={useColorModeValue('gray.600', 'gray.400')}>
                    Access a comprehensive library of accessible and customizable UI components.
                  </Text>
                </VStack>
              </Box>
              <Box p={8} bg={cardBg} rounded="xl" shadow="md">
                <VStack spacing={4} align="flex-start">
                  <Box p={2} bg="purple.50" rounded="md" color="purple.500">
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </Box>
                  <Heading as="h4" size="md" color={textColor}>
                    Dark Mode
                  </Heading>
                  <Text color={useColorModeValue('gray.600', 'gray.400')}>
                    Built-in dark mode support. Easily toggle between light and dark themes.
                  </Text>
                </VStack>
              </Box>
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Footer */}
      <Box as="footer" bg={useColorModeValue('gray.800', 'gray.900')} color="white" py={8}>
        <Container maxW="container.xl">
          <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align="center">
            <VStack align={{ base: 'center', md: 'flex-start' }} mb={{ base: 4, md: 0 }}>
              <Heading as="h2" size="md">ChakraFlow</Heading>
              <Text color="gray.400">Modern UI development simplified</Text>
            </VStack>
            <HStack spacing={6}>
              <Link>GitHub</Link>
              <Link>Twitter</Link>
              <Link>Discord</Link>
            </HStack>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
}

export default App;
