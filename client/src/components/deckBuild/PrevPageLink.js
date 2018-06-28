// @flow
import React from 'react';

type PrevPageLinkProps = {
  onClick: () => any,
};

export default function PrevPageLink({onClick}: PrevPageLinkProps) {
  return (
    <span onClick={onClick}>prev</span>
  );
}
