'use client';

import { Bird } from './Bird';

type BirdsProps = {
  count: number;
}

export function Birds({ count }: BirdsProps) {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <Bird key={index} count={count} />
      ))}
    </>
  );
}

