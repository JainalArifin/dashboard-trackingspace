import React from 'react';
import styled from 'styled-components';
import { IMAGES } from 'src/configs';
import { Modal, Grid } from '@material-ui/core';
import { Text } from '../../elements';
import kebabCase from 'voca/kebab_case';

const Container = styled.main`
  position: absolute;
  width: ${props => props.width || '560px'};
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  outline: none;
  background: white;
  font-family: Ubuntu, Arial;
`;

const Icon = styled.div`
  width: 24px;
  height: 24px;
  background: url(${props => props.image});
  background-repeat: no-repeat;
  background-position: center;
  margin-right: 8px;
`;

const CloseButton = styled.button`
  width: 24px;
  height: 24px;
  background: url(${IMAGES.CLOSE_ICON});
  background-repeat: no-repeat;
  background-position: center;
  object-fit: contain;
  border: none;

  :hover {
    cursor: pointer;
  }
`;

const ContentWrapper = styled(Grid)`
  padding: ${props => props.padding || '16px'};
  padding-bottom: ${props => (props.withButton ? '16px' : '32px')};
`;

export default function ModalFragment({
  isOpen,
  hideCloseButton = false,
  handleCloseModalClick,
  iconVariant,
  title,
  children,
  withButton,
  modalId = 'modal',
  modalWidth,
  padding
}) {
  const titleIcon = {
    warning: IMAGES.WARNING_ICON,
    confirmation: IMAGES.QUESTION_ICON,
    success: IMAGES.CHECK_ICON
  };

  return (
    <Modal
      aria-labelledby={modalId}
      aria-describedby={`${modalId}-description`}
      open={isOpen}
    >
      <Container
        width={modalWidth}
        component="main"
        container
        direction="column"
      >
        <ContentWrapper item padding={padding} withButton={withButton}>
          <Grid item style={{ marginBottom: 32 }}>
            <Grid container direction="row" justify="space-between">
              <Grid item>
                <Grid container direction="row" alignItems="center">
                  {iconVariant && (
                    <Icon
                      image={titleIcon[iconVariant]}
                      style={{ marginRight: 8 }}
                    />
                  )}
                  {title && (
                    <Text
                      variant="h3"
                      height="0.83"
                      data-testid={`title-${kebabCase(title)}`}
                    >
                      {title}
                    </Text>
                  )}
                </Grid>
              </Grid>
              {(!hideCloseButton || !title) && (
                <CloseButton
                  data-testid="button-close-modal"
                  onClick={handleCloseModalClick}
                />
              )}
            </Grid>
          </Grid>
          <Grid item>{children}</Grid>
        </ContentWrapper>
      </Container>
    </Modal>
  );
}
