export interface Page<Item> {
  items: Item[];
  total: number;
  totalPages: number;
  page: number;
  nextPage: number | null;
}
