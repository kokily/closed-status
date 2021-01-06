import React from 'react';
import styled from 'styled-components';
import media from '../../libs/styles/media';
import Header from './Header';

interface PageProps {}

const PageTemplate: React.FC<PageProps> = ({ children }) => {
  return (
    <>
      <Header />
      <PageBox>{children}</PageBox>
    </>
  );
};

export default PageTemplate;

// Styles
const PageBox = styled.div`
  margin-top: 6rem;
  padding: 1rem;
  width: 1200px;
  margin-left: auto;
  margin-right: auto;
  ${media.medium} {
    width: 992px;
  }
  ${media.large} {
    width: 100%;
  }
  ${media.small} {
    width: 360px;
  }
`;
