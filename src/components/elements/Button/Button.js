import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import { COLOR_PRIMARY, COLOR_DISABLED } from 'src/styles';

const StyledButton = styled.button`
  padding: ${props => props.padding || '0 16px'};
  margin: ${props => props.margin || '0px'};
  min-width: ${props => props.width || '100px'};
  height: ${props => props.height || props.theme.height};
  background-color: ${props => props.color || props.theme.color};
  display: inline-block;
  border-radius: ${props => props.borderRadius || props.theme.borderRadius};
  border: ${props => props.border || props.theme.border};

  font-size: ${props => props.fontSize || props.theme.fontSize};
  color: ${props => props.textColor || props.theme.textColor};
  font-family: Ubuntu, Arial;
  text-align: center;

  :hover:enabled {
    cursor: pointer;
    opacity: ${props => props.theme.hover.opacity};
  }

  :disabled {
    background-color: ${props => props.theme.disabled.color};
    color: ${props => props.theme.disabled.textColor};
    border: ${props => props.theme.disabled.border};
  }

  :hover:disabled {
    cursor: no-drop;
  }
`;

const Button = ({
  type,
  img,
  text,
  variant = 'regular',
  size = 'medium',
  isLoading,
  disabled,
  preserveColorWhenDisabled,
  showLabelWhenLoading,
  buttonImgAlt = 'Button Icon',
  ...rest
}) => {
  /**
   *
   * === preserveColorWhenDisabled ==
   * props to make button color not change
   * when in disabled state
   *
   **/

  const variantStyling = {
    regular: {
      background: COLOR_PRIMARY,
      border: 'none',
      textColor: '#fff',
      disabled: {
        background: COLOR_DISABLED,
        textColor: '#fff',
        border: 'none'
      }
    },
    ghost: {
      background: '#fff',
      border: `1px solid ${COLOR_PRIMARY}`,
      textColor: COLOR_PRIMARY,
      disabled: {
        textColor: COLOR_DISABLED,
        background: '#fff',
        border: `1px solid ${COLOR_DISABLED}`
      }
    },
    flat: {
      background: '#fff',
      border: 'none',
      textColor: COLOR_PRIMARY,
      disabled: {
        textColor: COLOR_DISABLED,
        background: '#fff',
        border: 'none'
      }
    }
  };

  const sizeStyling = {
    small: {
      fontSize: '14px',
      height: '24px'
    },
    medium: {
      fontSize: '14px',
      height: '32px'
    },
    large: {
      fontSize: '14px',
      height: '48px'
    }
  };

  const theme = {
    textColor: variantStyling[variant].textColor,
    fontSize: sizeStyling[size].fontSize,
    height: sizeStyling[size].height,
    border: variantStyling[variant].border,
    borderRadius: '4px',
    color: variantStyling[variant].background,
    hover: {
      opacity: '0.8'
    },
    disabled:
      preserveColorWhenDisabled || isLoading
        ? {
            color: variantStyling[variant].background,
            textColor: variantStyling[variant].textColor,
            border: variantStyling[variant].border
          }
        : {
            color: variantStyling[variant].disabled.background,
            textColor: variantStyling[variant].disabled.textColor,
            border: variantStyling[variant].disabled.border
          }
  };

  return (
    <StyledButton
      {...rest}
      type={type || 'button'}
      theme={theme}
      disabled={isLoading || disabled}
    >
      {img && (
        <img
          src={img}
          style={{ verticalAlign: 'middle', marginRight: 8 }}
          alt={buttonImgAlt}
        />
      )}{' '}
      {!isLoading || (isLoading && showLabelWhenLoading) ? text : ''}
      {isLoading && (
        <CircularProgress
          size={16}
          color="inherit"
          style={{
            verticalAlign: 'middle',
            marginLeft: showLabelWhenLoading ? 8 : 0
          }}
        />
      )}
    </StyledButton>
  );
};

export default Button;
