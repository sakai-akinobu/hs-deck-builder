// @flow
import React from 'react';

type CardCounterProps = {
  count: number,
};

export default function CardCounter({count}: CardCounterProps) {
  return (
    <div>{count}/30枚</div>
  );
}
