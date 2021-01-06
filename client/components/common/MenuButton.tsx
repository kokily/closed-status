import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import shadow from '../../libs/styles/shadow';

interface MenuButtonProps {
  onClick?: (e: React.MouseEvent) => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({ onClick }) => {
  return <MenuBox onClick={onClick}>메 뉴</MenuBox>;
};

export default MenuButton;

// Styled Components
const MenuBox = styled.button`
  width: 70px;
  padding: 0.5rem;
  padding-bottom: 0.4rem;
  font-size: 1rem;
  font-weight: bold;
  background: white;
  color: ${oc.cyan[8]};
  border: 1px solid ${oc.cyan[6]};
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  transition: 0.2s all;
  &:hover {
    background: ${oc.cyan[6]};
    color: white;
    ${shadow(1)}
  }
  &:active {
    transform: translateY(3px);
  }
`;
