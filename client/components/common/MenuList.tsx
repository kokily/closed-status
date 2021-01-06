import React from 'react';
import styled from 'styled-components';
import { animated, useTransition } from 'react-spring';
import OutsideClickHandler from 'react-outside-click-handler';
import MenuItem from './MenuItem';
import shadow from '../../libs/styles/shadow';

interface MenuListProps {
  visible: boolean;
  onClose: (e: React.MouseEvent) => void;
}

const MenuList: React.FC<MenuListProps> = ({ visible, onClose }) => {
  const transition = useTransition(visible, null, {
    from: { opacity: 0, transform: 'scale(0.5)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0.5)' },
    config: { tension: 400, friction: 26 },
  });

  return (
    <>
      {transition.map(({ item, key, props }) =>
        item ? (
          <OutsideClickHandler key={key} onOutsideClick={onClose}>
            <ListBox onClick={onClose} style={props}>
              <div className="menu-wrapper">
                <MenuItem to={'/'}>리스트</MenuItem>
                <MenuItem to={'/write'}>작 성</MenuItem>
              </div>
            </ListBox>
          </OutsideClickHandler>
        ) : null
      )}
    </>
  );
};

export default MenuList;

// Styles
const ListBox = styled(animated.div)`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.22rem;
  ${shadow(5)};
  > .menu-wrapper {
    position: relative;
    z-index: 5;
    width: 12rem;
    background: white;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  }
`;
