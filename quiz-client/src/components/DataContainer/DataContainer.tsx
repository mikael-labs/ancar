import React, { PropsWithChildren, useMemo } from "react";
import { ErrorComponent as AppErrorComponent } from "../Error/Error";
import { NoContent } from "../NoContent/NoContent";

type Props = PropsWithChildren<{
  onTryAgain: () => void;
  hasError?: boolean;
  hasData?: boolean;
  isLoading?: boolean;
  LoadingComponent: React.ReactNode | React.FC;
  NoContentComponent?: React.ReactNode | React.FC;
  ErrorComponent?: React.ReactNode | React.FC<{ onTryAgain: () => void }>;
}>;

export const DataContainer = ({
  hasError,
  hasData = true,
  isLoading,
  onTryAgain,
  LoadingComponent,
  children,
  NoContentComponent = <NoContent />,
  ErrorComponent = AppErrorComponent,
}: Props) => {
  const LoadingComponentResolved = useMemo(
    () => (typeof LoadingComponent === "function" ? <LoadingComponent /> : LoadingComponent),
    [LoadingComponent]
  );

  const NoContentComponentResolved = useMemo(
    () => (typeof NoContentComponent === "function" ? <NoContentComponent /> : NoContentComponent),
    [NoContentComponent]
  );

  const ErrorComponentResolved = useMemo(
    () => (typeof ErrorComponent === "function" ? <ErrorComponent onTryAgain={onTryAgain} /> : ErrorComponent),
    [ErrorComponent, onTryAgain]
  );

  return (
    <>
      {isLoading && LoadingComponentResolved}
      {!isLoading && hasError && ErrorComponentResolved}
      {!isLoading && !hasError && !hasData && NoContentComponentResolved}
      {!isLoading && !hasError && hasData && <>{children}</>}
    </>
  );
};
