import styled from 'styled-components';
import { IMAGES } from 'src/configs';
import Grid from '@material-ui/core/Grid';

export { default } from './ModalFragment';

export const ModalHighlight = styled.div`
  border-radius: 4px;
  padding: 8px;
  background-color: ${props => props.background || '#fff3bf'};
`;

export const ButtonWrapper = styled(Grid)`
  margin-top: 32px;
  border-top: 1px solid #e4e7eb;
  padding: 16px 16px 0 16px;
  width: calc(100% + 32px);
  transform: translate(-16px, 0);
`;

// DELETE CONST BELOW AFTER REFACTOR

export const Container = styled.div`
  position: absolute;
  width: 560px;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  border-radius: 5px;
  outline: none;
  background: white;
  font-family: Ubuntu, Arial;
`;

export const Icon = styled.div`
  width: 24px;
  height: 24px;
  background: url(${props => props.image});
  background-repeat: no-repeat;
  background-position: center;
  margin-right: 8px;
`;

export const CloseButton = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 24px;
  height: 24px;
  background: url(${IMAGES.CLOSE_ICON});
  background-repeat: no-repeat;
  background-position: center;
  object-fit: contain;

  :hover {
    cursor: pointer;
  }
`;

export const ConfirmationDeleteContainer = styled.div`
  width: ${props => props.width || '528px'};
  border-radius: 4px;
  padding: 8px;
  background-color: ${props => props.backgroundColor || '#fff3bf'};
`;
