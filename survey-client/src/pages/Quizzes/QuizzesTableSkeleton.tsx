import { Button, HStack, Skeleton, Stack } from "@chakra-ui/react";

type Props = {
  className?: string;
};

export const QuizzesTableSkeleton = ({ className }: Props) => {
  const items = [1, 2, 3, 4];

  return (
    <Stack className={className}>
      <Skeleton height="30px" />

      {items.map((item) => (
        <HStack key={item} justifyContent="space-between">
          <Skeleton height="20px" width="90px" />
          <Skeleton height="20px" width="130px" />
          <Skeleton height="20px" width="90px" />
          <Skeleton>
            <Button width="100px">Criar</Button>
          </Skeleton>
        </HStack>
      ))}
    </Stack>
  );
};
