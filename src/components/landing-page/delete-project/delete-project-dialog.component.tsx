/*
##############################################################################
#
# Copyright (C) 2022 Intel Corporation
# 
# This software and the related documents are Intel copyrighted materials,
# and your use of them is governed by the express license under which they
# were provided to you ("License"). Unless the License provides otherwise,
# you may not use, modify, copy, publish, distribute, disclose or transmit
# this software or the related documents without Intel's prior written
# permission.
#
# This software and the related documents are provided as is, with no
# express or implied warranties, other than those that are expressly stated
# in the License.
#
##############################################################################
*/
import { useState } from 'react';
import 'twin.macro';
import {
  Button,
  ButtonGroup,
  Dialog,
  DialogContainer,
  Divider,
  Flex,
  Text,
  Content,
  Heading,
} from '@adobe/react-spectrum';
import { LoadingIndicator } from '../../shared';
import { Delete } from '../../../assets/icons';

interface DeleteProjectDialogProps {
  onDelete: () => void;
}

export const DeleteProjectDialog = ({onDelete}: DeleteProjectDialogProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOpenDialog = (): void => {
    setIsOpen(true);
  };

  const handleCloseDialog = (): void => {
    setIsOpen(false);
  };

  const handleOnDismiss = (): void => {
    handleCloseDialog();
  };

  const handleOnDelete = (): void => {
    onDelete();
    handleCloseDialog();
  }

  return (
    <>
      <Delete
        id="delete-project-button"
        tw="absolute right-3 top-1.5"
        fill="white"
        onClick={handleOpenDialog}>
      </Delete>

      <DialogContainer onDismiss={handleOnDismiss}>
        {isOpen && (
          <Dialog height="100%">
            <Heading id={'delete-project-id'}>Delete a Project</Heading>
            <Divider />
            <Content>
              Are you sure you want to delete project?  
            </Content>
            <ButtonGroup>
              <Button
                variant={'secondary'}
                onPress={handleOnDismiss}
                id={'cancel-delete-project-button'}
              >
                Cancel
              </Button>
              <Button
                id="confirm-delete-project-button"
                variant={'cta'}
                type="submit"
                onPress={handleOnDelete}
                position={'relative'}
              >
                <Flex alignItems={'center'} gap={'size-65'}>
                  {isLoading ? <LoadingIndicator size={'S'} /> : <></>}
                  <Text>Delete</Text>
                </Flex>
              </Button>
            </ButtonGroup>
          </Dialog>
        )}
      </DialogContainer>
    </>
  );
};
