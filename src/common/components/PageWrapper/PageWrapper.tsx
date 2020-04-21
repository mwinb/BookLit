import React, { ReactElement, FunctionComponent } from 'react';
import './PageWrapper.css';

export interface PageWrapperProps {
  backgroundStyle?: any;
  shadeStyle?: any;
}

export const PageWrapper: FunctionComponent<PageWrapperProps> = (props): ReactElement => {
  return (
    <div className="backgroundDiv" style={props.backgroundStyle}>
      <div className="backgroundShade" style={props.shadeStyle}>
        {props.children}
      </div>
    </div>
  );
};

export default PageWrapper;
