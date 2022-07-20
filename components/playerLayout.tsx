import { Box } from "@chakra-ui/react";
import Sidebar from "./sidebar";

const PlayerLayout = ({ children }) => {
  return (
    <Box height="100vh" width="100vw">
      <Box position="absolute" top="0" width="250px" left="0">
        <Sidebar />
      </Box>
      <Box height="100%" marginBottom="100px" marginLeft="250px">
        <Box height="calc(100vh - 100px)">{children}</Box>
      </Box>
      <Box position="absolute" left="0" bottom="0">
        Player
      </Box>
    </Box>
  );
};

export default PlayerLayout;
