import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export const Main = () => {
  return (
    <Box className="flex w-full h-screen overflow-auto py-6" bg="primary.100">
      <Outlet />
    </Box>
  );
};
