import React, { useCallback, useRef } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import oc from 'open-color';
import media from '../../libs/styles/media';
import shadow from '../../libs/styles/shadow';
import useToggle from '../../libs/hooks/useToggle';
import MenuButton from './MenuButton';
import MenuList from './MenuList';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const [userMenu, toggleUserMenu] = useToggle(false);
  const ref = useRef<HTMLDivElement>(null);

  const onOutsideClick = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      if (ref.current.contains(e.target as any)) return;

      toggleUserMenu();
    },
    [toggleUserMenu]
  );

  return (
    <HeaderBox>
      <AlignPane>
        <Content>
          <Link href={'/'} passHref={true}>
            <Logo>휴업현황</Logo>
          </Link>

          <Spacer />

          <>
            <div ref={ref}>
              <MenuButton onClick={toggleUserMenu} />
            </div>

            <MenuList visible={userMenu} onClose={onOutsideClick} />
          </>
        </Content>
      </AlignPane>
      <HrBar />
    </HeaderBox>
  );
};

export default Header;

// Styles
const HeaderBox = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0px;
  width: 100%;
  z-index: 20;
  ${shadow(1)}
`;

const AlignPane = styled.div`
  background: white;
  display: flex;
  justify-content: center;
  height: auto;
`;

const Content = styled.div`
  width: 100%;
  height: 55px;
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 1rem;
  padding-right: 1rem;
  ${media.medium} {
    width: 992px;
  }
  ${media.large} {
    width: 992px;
  }
  ${media.xlarge} {
    width: 992px;
  }
`;

const Logo = styled.a`
  font-size: 1.24rem;
  font-weight: bold;
  color: ${oc.indigo[7]};
  &:hover {
    text-shadow: 5px 2px ${oc.gray[4]};
  }
  &:active {
    transform: translateY(3px);
  }
`;

const Spacer = styled.div`
  flex-grow: 1;
`;

const HrBar = styled.div`
  height: 3px;
  background: linear-gradient(to right, ${oc.indigo[4]}, ${oc.cyan[4]});
`;
