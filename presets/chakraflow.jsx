import { 
  Box, Container, Heading, Text, Button, Link, 
  Flex, VStack, HStack, useColorModeValue, 
  SimpleGrid, Card, CardHeader, CardBody, CardFooter,
  IconButton, useColorMode
} from '@chakra-ui/react';

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgGradient = useColorModeValue(
    'linear(to-br, teal.400, blue.500)',
    'linear(to-br, teal.800, blue.900)'
  );
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.100');
  const headingColor = useColorModeValue('teal.600', 'teal.300');

  return (
    <Box minH="100vh">
      <Flex 
        as="nav" 
        align="center" 
        justify="space-between" 
        wrap="wrap" 
        padding="1.5rem" 
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow="sm"
      >
        <Heading as="h1" size="lg" letterSpacing="tight" color={headingColor}>
          ChakraFlow
        </Heading>
        <HStack spacing="24px">
          <Button variant="ghost">Home</Button>
          <Button variant="ghost">Features</Button>
          <Button variant="ghost">Docs</Button>
          <IconButton
            icon={colorMode === 'light' ? <span>🌙</span> : <span>☀️</span>}
            onClick={toggleColorMode}
            variant="ghost"
            aria-label="Toggle color mode"
          />
        </HStack>
      </Flex>

      <Box
        bgGradient={bgGradient}
        py={{ base: 12, md: 20 }}
        color="white"
      >
        <Container centerContent maxW="container.lg" py={8}>
          <VStack spacing={6} align="center" textAlign="center">
            <Heading as="h1" size="2xl" mb={2}>
              Welcome to ChakraFlow
            </Heading>
            <Text fontSize="xl" maxW="container.md" mb={4}>
              Build stunning UIs with Chakra UI's composable and accessible component library.
            </Text>
            <HStack spacing={4}>
              <Button 
                colorScheme="teal" 
                size="lg" 
                shadow="md" 
                _hover={{ transform: 'translateY(-2px)' }}
              >
                Get Started
              </Button>
              <Link
                href="https://chakra-ui.com/docs"
                isExternal
                _hover={{ textDecoration: 'none' }}
              >
                <Button 
                  colorScheme="whiteAlpha" 
                  size="lg" 
                  shadow="md"
                  _hover={{ transform: 'translateY(-2px)' }}
                >
                  Chakra Docs
                </Button>
              </Link>
            </HStack>
          </VStack>
        </Container>
      </Box>

      <Container maxW="container.xl" py={12}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          <Card variant="outline" bg={cardBg} shadow="md">
            <CardHeader>
              <Heading size="md" color={headingColor}>Responsive Design</Heading>
            </CardHeader>
            <CardBody>
              <Text color={textColor}>Create responsive layouts easily with Chakra UI's style props and responsive syntax.</Text>
            </CardBody>
            <CardFooter>
              <Button variant="ghost" colorScheme="teal" rightIcon={<span>→</span>}>
                Learn more
              </Button>
            </CardFooter>
          </Card>
          
          <Card variant="outline" bg={cardBg} shadow="md">
            <CardHeader>
              <Heading size="md" color={headingColor}>Color Mode</Heading>
            </CardHeader>
            <CardBody>
              <Text color={textColor}>Seamlessly switch between light and dark modes with Chakra UI's built-in color mode support.</Text>
            </CardBody>
            <CardFooter>
              <Button variant="ghost" colorScheme="teal" rightIcon={<span>→</span>}>
                Learn more
              </Button>
            </CardFooter>
          </Card>
          
          <Card variant="outline" bg={cardBg} shadow="md">
            <CardHeader>
              <Heading size="md" color={headingColor}>Accessibility</Heading>
            </CardHeader>
            <CardBody>
              <Text color={textColor}>Build accessible applications with components that follow WAI-ARIA standards by default.</Text>
            </CardBody>
            <CardFooter>
              <Button variant="ghost" colorScheme="teal" rightIcon={<span>→</span>}>
                Learn more
              </Button>
            </CardFooter>
          </Card>
        </SimpleGrid>
      </Container>
    </Box>
  );
}

export default App;
