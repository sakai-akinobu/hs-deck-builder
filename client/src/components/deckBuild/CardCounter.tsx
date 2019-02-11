import * as React from 'react';

interface CardCounterProps {
  count: number,
}

export default function CardCounter({count}: CardCounterProps) {
  return (
    <div>{count}/30枚</div>
  );
}
