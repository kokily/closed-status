export const mediaQuery = (maxWidth: number) => `
  @media (max-width: ${maxWidth}px)
`;

const media = {
  xlarge: mediaQuery(1920),
  large: mediaQuery(1200),
  medium: mediaQuery(768),
  small: mediaQuery(375),
  custom: mediaQuery,
};

export default media;
