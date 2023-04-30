import { NextRouter } from 'next/router';

export const updateSortParams = (
  router: NextRouter,
  value: string,
  wayParam: string
) => {
  if (router.query.sort === value) {
    router.query.way = wayParam === 'asc' ? 'desc' : 'asc';
  } else {
    router.query.way = 'asc';
  }

  router.query.sort = value;
  router.push(router);
};
