import logo from './logo.svg';
import './App.css';
import { Box } from '@chakra-ui/react';
import AllRoutes from './Routes/AllRoutes';

function App() {
  return (
    <Box minH={"100vh"} bg={"brand.50"}>

      <AllRoutes />

    </Box>
  );
}

export default App;
