import { Box, Button, Text } from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";

type Props = {
  onTryAgain: () => void;
};

export const ErrorComponent = ({ onTryAgain }: Props) => {
  return (
    <Box className="flex flex-col justify-center items-center">
      <Text color="primary.dark" className="mb-3">
        Ocorreu um erro, por favor, tente novamente.
      </Text>
      <Button variant="outline" onClick={onTryAgain}>
        Tentar novamente
        <RepeatIcon className="ml-2" />
      </Button>
    </Box>
  );
};
