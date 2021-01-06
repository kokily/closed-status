import styled, { createGlobalStyle } from 'styled-components';

const Loading = () => {
  return (
    <>
      <FullPage />
      <LoadWrapper>
        <Box>
          <div className="cat">
            <div className="cat_body" />
            <div className="cat_body" />
            <div className="cat_tail" />
            <div className="cat_head" />
          </div>
        </Box>
      </LoadWrapper>
    </>
  );
};

export default Loading;

// Styled Components
const FullPage = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: #e6dcdc;
  }
`;

const LoadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  line-height: 1.4;
  background: #e6dcdc;
  .cat {
    position: relative;
    width: 100%;
    max-width: 20em;
    overflow: hidden;
    background: #e6dcdc;
    &::before {
      content: '';
      display: block;
      padding-bottom: 100%;
    }
    &:hover > * {
      animation-play-state: paused;
    }
    &:active > * {
      animation-play-state: running;
    }
  }
  .cat_head,
  .cat_tail,
  .cat_body {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    animation: rotating 2.79s cubic-bezier(0.65, 0.54, 0.12, 0.93) infinite;
  }
  .cat_head::before,
  .cat_tail::before,
  .cat_body::before {
    content: '';
    position: absolute;
    width: 50%;
    height: 50%;
    background-size: 200%;
    background-repeat: no-repeat;
    background-image: url('https://images.weserv.nl/?url=i.imgur.com/M1raXX3.png&il');
  }
  .cat_head::before {
    top: 0;
    right: 0;
    background-position: 100% 0%;
    transform-origin: 0% 100%;
    transform: rotate(90deg);
  }
  .cat_tail {
    animation-delay: 0.2s;
    &::before {
      left: 0;
      bottom: 0;
      background-position: 0% 100%;
      transform-origin: 100% 0%;
      transform: rotate(-30deg);
    }
  }
  .cat_body {
    animation-delay: 0.1s;
    &:nth-of-type(2) {
      animation-delay: 0.2s;
    }
    &::before {
      right: 0;
      bottom: 0;
      background-position: 100% 100%;
      transform-origin: 0% 0%;
    }
  }
  @keyframes rotating {
    from {
      transform: rotate(720deg);
    }
    to {
      transform: none;
    }
  }
`;

const Box = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  justify-content: center;
  align-items: center;
`;
