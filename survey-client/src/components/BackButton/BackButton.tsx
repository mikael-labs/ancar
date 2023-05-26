import { ArrowBackIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

type Props = {
  className?: string;
  isDisabled?: boolean;
};

export const BackButton = ({ className, isDisabled }: Props) => {
  const navigate = useNavigate();

  return (
    <IconButton
      className={className}
      title="Clique para voltar"
      aria-label="Clique para voltar"
      icon={<ArrowBackIcon fontSize="3xl" />}
      variant="link"
      size="lg"
      onClick={() => navigate(-1)}
      isDisabled={isDisabled}
    />
  );
};
