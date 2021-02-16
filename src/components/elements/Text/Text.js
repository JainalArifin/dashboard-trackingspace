import React from 'react';
import styled from 'styled-components';
import { COLOR_FONT, COLOR_ERROR } from 'src/styles';

const StyledP = styled.p`
  font-family: Ubuntu, Arial;
  font-size: ${props => props.size || '16px'};
  line-height: ${props => props.height || 'normal'};
  margin: ${props => props.margin || '0px'};
  padding: ${props => props.padding || '0px;'};
  color: ${props => (props.isError ? COLOR_ERROR : props.color || COLOR_FONT)};
  letter-spacing: ${props => props.spacing || 'normal'};
  display: inline;
  text-align: ${props => props.align || 'left'};
  font-style: ${props => props.fontStyle || 'normal'};
  ${props => (props.weight ? `font-weight: ${props.weight};` : '')};
`;

const StyledH1 = styled.h1`
  font-family: Ubuntu, Arial;
  font-size: 48px;
  font-weight: bold;
  margin: ${props => props.margin || '0px'};
  padding: ${props => props.padding || '0px;'};
  color: ${props => props.color || COLOR_FONT};
  line-height: ${props => props.height || 'normal'};
  letter-spacing: ${props => props.spacing || 'normal'};
  display: inline;
  text-align: ${props => props.align || 'left'};
  font-style: ${props => props.fontStyle || 'normal'};
`;

const StyledH2 = styled.h2`
  font-family: Ubuntu, Arial;
  font-size: 34px;
  font-weight: normal;
  margin: ${props => props.margin || '0px'};
  padding: ${props => props.padding || '0px;'};
  color: ${props => props.color || COLOR_FONT};
  display: inline;
  text-align: ${props => props.align || 'left'};
  font-style: ${props => props.fontStyle || 'normal'};
  line-height: ${props => props.height || 'normal'};
  letter-spacing: ${props => props.spacing || 'normal'};
`;

const StyledH3 = styled.h3`
  font-family: Ubuntu, Arial;
  font-size: 24px;
  font-weight: normal;
  display: inline;
  color: ${props => props.color || COLOR_FONT};
  padding: ${props => props.padding || '0px;'};
  margin: ${props => props.margin || '0px'};
  text-align: ${props => props.align || 'left'};
  font-style: ${props => props.fontStyle || 'normal'};
  line-height: ${props => props.height || 'normal'};
  letter-spacing: ${props => props.spacing || 'normal'};
`;
const StyledH4 = styled.h4`
  font-family: Ubuntu, Arial;
  font-size: 16px;
  font-weight: bold;
  display: inline;
  margin: ${props => props.margin || '0px'};
  padding: ${props => props.padding || '0px;'};
  color: ${props => props.color || COLOR_FONT};
  text-align: ${props => props.align || 'left'};
  font-style: ${props => props.fontStyle || 'normal'};
  line-height: ${props => props.height || 'normal'};
  letter-spacing: ${props => props.spacing || 'normal'};
`;
const StyledH5 = styled.h5`
  font-family: Ubuntu, Arial;
  font-size: 14px;
  font-weight: normal;
  display: inline;
  margin: ${props => props.margin || '0px'};
  padding: ${props => props.padding || '0px;'};
  color: ${props => props.color || COLOR_FONT};
  text-align: ${props => props.align || 'left'};
  font-style: ${props => props.fontStyle || 'normal'};
  line-height: ${props => props.height || 'normal'};
  letter-spacing: ${props => props.spacing || 'normal'};
`;
const StyledH6 = styled.h6`
  font-family: Ubuntu, Arial;
  font-size: 12px;
  font-weight: normal;
  display: inline;
  margin: ${props => props.margin || '0px'};
  padding: ${props => props.padding || '0px;'};
  color: ${props => props.color || COLOR_FONT};
  text-align: ${props => props.align || 'left'};
  font-style: ${props => props.fontStyle || 'normal'};
  line-height: ${props => props.height || 'normal'};
  letter-spacing: ${props => props.spacing || 'normal'};
`;

const StyledLabel = styled.label`
  font-family: Ubuntu, Arial;
  ${props => (props.weight ? `font-weight: ${props.weight};` : '')};
  font-weight: normal;
  font-size: ${props => props.size || '16px'};
  display: inline;
  margin: ${props => props.margin || '0px'};
  padding: ${props => props.padding || '0px;'};
  color: ${props => props.color || COLOR_FONT};
  text-align: ${props => props.align || 'left'};
  font-style: ${props => props.fontStyle || 'normal'};
  line-height: ${props => props.height || 'normal'};
  letter-spacing: ${props => props.spacing || 'normal'};
`;

export default function Text({ variant = 'p', children, ...rest }) {
  switch (variant.toLowerCase()) {
    case 'h1':
      return <StyledH1 {...rest}>{children}</StyledH1>;
    case 'h2':
      return <StyledH2 {...rest}>{children}</StyledH2>;
    case 'h3':
      return <StyledH3 {...rest}>{children}</StyledH3>;
    case 'h4':
      return <StyledH4 {...rest}>{children}</StyledH4>;
    case 'h5':
      return <StyledH5 {...rest}>{children}</StyledH5>;
    case 'h6':
      return <StyledH6 {...rest}>{children}</StyledH6>;
    case 'label':
      return <StyledLabel {...rest}>{children}</StyledLabel>;
    default:
      return <StyledP {...rest}>{children}</StyledP>;
  }
}
