import { Card, CardBody } from "@chakra-ui/react";
import { ErrorComponent } from "./Error";

type Props = {
  onTryAgain: () => void;
  width?: number;
  height?: number;
};

export const ErrorCard = ({ onTryAgain, width = 400, height = 300 }: Props) => {
  return (
    <Card width={width} height={height}>
      <CardBody className="flex justify-center items-center">
        <ErrorComponent onTryAgain={onTryAgain} />
      </CardBody>
    </Card>
  );
};
