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

import { Key, useCallback, useEffect, useState } from 'react';
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
  ComboBox,
  Item,
} from '@adobe/react-spectrum';
import { PressEvent } from '@react-types/shared';

import { useNewProjectDialog } from './new-project-dialog-provider';
import { LimitedTextField } from '../../shared/limited-text-field';
import { ValidationErrorMsg } from '../../shared/validation-error-msg';
import { ProjectNameErrorPath, projectNameSchema } from './utils';
import { isYupValidationError } from '../../../helpers/utils';
import { ValidationError } from 'yup';
import { LoadingIndicator } from '../../shared';
import { CELL_TYPES, MODEL_TYPES } from '../../../api/projects';
import 'twin.macro';

const DEFAULT_ERRORS = { projectName: '' };

interface NewProjectDialogProps {
  buttonText: string;
}

export const NewProjectDialog = ({
  buttonText,
}: NewProjectDialogProps): JSX.Element => {
  const { projects } = { projects: [] };
  const {
    save,
    isLoading,
    metadata: { projectName, cellType, modelType },
    updateProjectState,
  } = useNewProjectDialog();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isValid, setValidity] = useState<boolean>(false);

  const [_projectName, setProjectName] = useState<string>(projectName);
  const [_cellType, setCellType] = useState<CELL_TYPES>(cellType);
  const [_modelType, setModelType] = useState<MODEL_TYPES>(modelType);

  const handleOpenDialog = (): void => {
    setIsOpen(true);
  };

  const handleCloseDialog = (): void => {
    setIsOpen(false);
  };

  const handleOnDismiss = (): void => {
    handleCloseDialog();
  };

  const create = (_e: PressEvent) => {
    save();
  };

  const [errors, setErrors] =
    useState<{ [key in ProjectNameErrorPath]: string }>(DEFAULT_ERRORS);

  const handleCellTypeChange = (key: Key) => {
    setCellType(key as CELL_TYPES);
    updateProjectState({ cellType: key as CELL_TYPES });
  };

  const handleModelTypeChange = (key: Key) => {
    setModelType(key as MODEL_TYPES);
    updateProjectState({ modelType: key as MODEL_TYPES });
  };

  const validateProjectName = useCallback(
    (inputProjectName: string): void => {
      try {
        const trimedName = inputProjectName.trim();
        const validated = projectNameSchema(trimedName, projects).validateSync(
          { projectName: trimedName },
          { abortEarly: false }
        );
        updateProjectState({ projectName: validated.projectName });
        setErrors(DEFAULT_ERRORS);
        setValidity(true);
      } catch (error: unknown) {
        if (isYupValidationError(error)) {
          error.inner.forEach(({ path, message }: ValidationError) => {
            if (path === ProjectNameErrorPath.PROJECT_NAME) {
              setErrors((prevErrors) => ({
                ...prevErrors,
                projectName: message,
              }));
            }
          });
        }

        setValidity(false);
      }
    },
    [projects, updateProjectState]
  );

  const handleProjectNameChange = (inputProjectName: string): void => {
    setProjectName(inputProjectName);
    validateProjectName(inputProjectName);
  };

  useEffect(() => {
    if (!_projectName) {
      setValidity(false);
    }
  }, [_projectName, setValidity]);

  useEffect(() => {
    if (_projectName) {
      validateProjectName(_projectName);
    }
  }, []);

  const CELL_TYPE_OPTIONS: { name: CELL_TYPES }[] = Object.values(
    CELL_TYPES
  ).map((el) => ({
    name: el,
  }));
  const MODEL_TYPE_OPTIONS: { name: MODEL_TYPES }[] = Object.values(
    MODEL_TYPES
  ).map((el) => ({
    name: el,
  }));

  return (
    <>
      <Button
        id="create-new-project-button"
        variant={'secondary'}
        position={'relative'}
        onPress={handleOpenDialog}
      >
        <span>{buttonText}</span>
      </Button>

      <DialogContainer onDismiss={handleOnDismiss}>
        {isOpen && (
          <Dialog height="100%">
            <Heading id={'create-new-project-id'}>Create new project</Heading>
            <Divider />
            <Content>
              <div tw="flex">
                <div tw="flex flex-col items-end mx-auto">
                  <LimitedTextField
                    label="Project name"
                    value={_projectName}
                    labelPosition={'side'}
                    onChange={handleProjectNameChange}
                    id={'project-name-input-id'}
                  />
                  <ValidationErrorMsg errorMsg={errors.projectName} />
                  <ComboBox
                    tw="mb-[20px] mt-2"
                    label="Cell type"
                    defaultItems={CELL_TYPE_OPTIONS}
                    defaultInputValue={_cellType}
                    labelPosition={'side'}
                    onSelectionChange={handleCellTypeChange}
                  >
                    {(item) => <Item key={item.name}>{item.name}</Item>}
                  </ComboBox>
                  <ComboBox
                    label="Model type"
                    defaultItems={MODEL_TYPE_OPTIONS}
                    defaultInputValue={_modelType}
                    labelPosition={'side'}
                    onSelectionChange={handleModelTypeChange}
                  >
                    {(item) => <Item key={item.name}>{item.name}</Item>}
                  </ComboBox>
                </div>
              </div>
            </Content>
            <ButtonGroup>
              <Button
                variant={'secondary'}
                onPress={handleOnDismiss}
                id={'cancel-new-project-button'}
              >
                Cancel
              </Button>
              <Button
                id="confirm-create-new-project-button"
                variant={'cta'}
                type="submit"
                isDisabled={!isValid || isLoading}
                onPress={create}
                position={'relative'}
              >
                <Flex alignItems={'center'} gap={'size-65'}>
                  {isLoading ? <LoadingIndicator size={'S'} /> : <></>}
                  <Text>Create</Text>
                </Flex>
              </Button>
            </ButtonGroup>
          </Dialog>
        )}
      </DialogContainer>
    </>
  );
};
