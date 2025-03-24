import { ChakraProvider, Button } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider>
      <div style={{ padding: "20px" }}>
        <h1>Welcome to Chakra UI Flow!</h1>
        <Button colorScheme="teal">Click Me</Button>
      </div>
    </ChakraProvider>
  );
}

export default App;
