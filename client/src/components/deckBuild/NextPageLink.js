// @flow
import React from 'react';

type NextPageLinkProps = {
  onClick: () => any,
};

export default function NextPageLink({onClick}: NextPageLinkProps) {
  return (
    <span onClick={onClick}>next</span>
  );
}
