import { Text } from "@chakra-ui/react";

type Props = {
  message?: string;
};

export const NoContent = ({ message = "Nenhum dado foi encontrado" }: Props) => {
  return <Text color="primary.dark">{message}</Text>;
};
