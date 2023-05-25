import { Button } from "@chakra-ui/react";

export type PageNumberProps = {
  page: number;
  active?: boolean;
  onClick?: (page: number) => any;
  disabled?: boolean;
};

export const PageNumber = ({ page, onClick, active = false, disabled = false }: PageNumberProps) => {
  const fontColor = active ? "white" : "black";
  const bgColor = active ? "primary.default" : "white";

  const clickIfUnactive = () => {
    if (active) return null;

    onClick?.(page);
  };

  return (
    <Button bg={bgColor} color={fontColor} onClick={clickIfUnactive} disabled={disabled} isDisabled={disabled}>
      {page}
    </Button>
  );
};
