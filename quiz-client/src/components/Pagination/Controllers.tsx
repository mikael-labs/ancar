import { IconButton } from "@chakra-ui/react";
import classNames from "classnames";

export type ControllersProps = {
  pageToChange: number;
  boundaryPage: number;
  Icon: React.FC<any>;
  BoundaryIcon: React.FC<any>;
  onChange?: (page: number) => any;
  rtl?: boolean;
  disabled?: boolean;
  show?: boolean;
};

export const Controllers = ({
  BoundaryIcon,
  Icon,
  onChange,
  boundaryPage,
  pageToChange,
  rtl,
  disabled = false,
  show = true,
}: ControllersProps) => {
  const classes = classNames("flex items-center gap-3", {
    "flex-row-reverse": rtl,
    invisible: !show,
  });

  const nextButtonAriaLabel = rtl ? "Voltar" : "Avançar";
  const lastButtonAriaLabel = rtl ? "Ir para o último" : "Ir para o primeiro";

  return (
    <div className={classes}>
      <IconButton
        bg="white"
        color="black"
        aria-label={nextButtonAriaLabel}
        icon={<BoundaryIcon fontSize={"lg"} />}
        className={`
          flex justify-center items-center cursor-pointer rounded p-1
          hover:bg-green-500 hover:text-white 
          disabled:cursor-not-allowed disabled:bg-white disabled:text-black
        `}
        isDisabled={disabled}
        disabled={disabled}
        onClick={() => onChange?.(boundaryPage)}
      />

      <IconButton
        bg="white"
        color="black"
        aria-label={lastButtonAriaLabel}
        icon={<Icon fontSize={"xl"} />}
        className={`
          flex justify-center items-center cursor-pointer rounded p-1
          hover:bg-green-500 hover:text-white 
          disabled:cursor-not-allowed disabled:bg-white disabled:text-black
        `}
        isDisabled={disabled}
        disabled={disabled}
        onClick={() => onChange?.(pageToChange)}
      />
    </div>
  );
};
