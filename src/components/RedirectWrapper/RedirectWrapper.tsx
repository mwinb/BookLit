import React, { FunctionComponent } from 'react';
import { Redirect } from 'react-router-dom';

export interface RedirectWrapperProps {
  to: string;
}

const RedirectWrapper: FunctionComponent<RedirectWrapperProps> = (props) => {
  return <Redirect to={props.to} />;
};

export default RedirectWrapper;
