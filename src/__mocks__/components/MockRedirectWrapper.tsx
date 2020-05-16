import React, { FunctionComponent } from 'react';
import { RedirectWrapperProps } from '../../components/RedirectWrapper/RedirectWrapper';

export const MockRedirectWrapper: FunctionComponent<RedirectWrapperProps> = (props) => {
  return <div>{props.to}</div>;
};
