import { ArrowLeftIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

import { Controllers } from "./Controllers";
import { PageNumber } from "./PageNumber";

import { useMemo } from "react";
import classNames from "classnames";

const DEFAULT_MAX_SHOW_PAGES = 5;

const range = (from: number, to: number) => {
  const range = [];

  for (let i = from; i <= to; i++) range.push(i);

  return range;
};

type PaginationProps = {
  maxShowPages?: number;
  totalPages: number;
  page: number;
  disabled?: boolean;
  onChange: (page: number) => any;
  className?: string;
};

export const Pagination = ({
  page,
  maxShowPages = DEFAULT_MAX_SHOW_PAGES,
  totalPages,
  onChange,
  disabled = false,
  className,
}: PaginationProps) => {
  const allPagesArray = useMemo(() => range(1, totalPages), [totalPages]);
  const classes = classNames("flex items-center gap-3 px-4 py-2", className);

  const pagesArray = useMemo(
    () =>
      allPagesArray.slice(
        page < maxShowPages ? 0 : page - maxShowPages + 1,
        page < maxShowPages ? maxShowPages : page + 1
      ),
    [allPagesArray, page, maxShowPages]
  );

  const nextPage = Math.min(totalPages, page + 1);
  const previousPage = Math.max(1, page - 1);

  const isFirstPage = page <= 1;
  const isLastPage = page >= totalPages;

  return (
    <div className={classes}>
      <Controllers
        show={!isFirstPage}
        disabled={disabled}
        Icon={ChevronLeftIcon}
        BoundaryIcon={ArrowLeftIcon}
        onChange={onChange}
        pageToChange={previousPage}
        boundaryPage={1}
      />

      <div className="flex gap-2">
        {pagesArray.map((arrPage) => (
          <PageNumber key={arrPage} disabled={disabled} page={arrPage} onClick={onChange} active={arrPage === page} />
        ))}
      </div>

      <Controllers
        show={!isLastPage}
        disabled={disabled}
        Icon={ChevronRightIcon}
        BoundaryIcon={ArrowRightIcon}
        onChange={onChange}
        pageToChange={nextPage}
        boundaryPage={totalPages}
        rtl
      />
    </div>
  );
};
