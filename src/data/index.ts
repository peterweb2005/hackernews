export enum FilterType {
  eq = 'eq',
  ge = 'ge',
  gt = 'gt',
  le = 'le',
  lt = 'lt',
}

export enum Sort {
  asc = 'asc',
  desc = 'desc',
}

export type Filter = {
  type: FilterType,
  amount: number,
};

export type Options = {
  page: number;
  filter: Filter; // comments filter
  sort: Sort; // comments sort
};
