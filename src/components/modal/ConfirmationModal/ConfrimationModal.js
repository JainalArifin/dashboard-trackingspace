import React from 'react';
import { Text, Button } from '../../elements';
import Grid from '@material-ui/core/Grid';
import ModalFragment, { ButtonWrapper } from '../ModalFragment';

const ConfirmationModal = ({
  isOpen,
  handleCloseModalClick,
  handleYesClick,
  body,
  isLoading
}) => (
  <ModalFragment
    isOpen={isOpen}
    iconVariant="confirmation"
    modalId="confirmation-modal"
    title="Wait a minute..."
    handleCloseModalClick={handleCloseModalClick}
    withButton
  >
    <Text size="14px">{body}</Text>
    <ButtonWrapper>
      <Grid container direction="row-reverse" spacing={1}>
        <Grid item>
          <Button
            text="Yes"
            onClick={handleYesClick}
            isLoading={isLoading}
            data-testid="button-yes"
          />
        </Grid>
        <Grid item>
          <Button
            variant="ghost"
            text="No"
            onClick={handleCloseModalClick}
            data-testid="button-no"
          />
        </Grid>
      </Grid>
    </ButtonWrapper>
  </ModalFragment>
);

export default ConfirmationModal;
