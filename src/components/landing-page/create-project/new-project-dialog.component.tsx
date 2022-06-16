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
} from '@adobe/react-spectrum';
import { PressEvent } from '@react-types/shared';

import { useNewProjectDialog } from './new-project-dialog-provider';
import { LimitedTextField } from '../../shared/limited-text-field';
import { ValidationErrorMsg } from '../../shared/validation-error-msg';
import { TabItem, Tabs } from '../../shared/tabs';
import {
  ProjectNameErrorPath,
  projectNameSchema,
  TABS_SINGLE_TEMPLATE,
} from './utils';
import { isYupValidationError } from '../../../helpers/utils';
import { ValidationError } from 'yup';
import { LoadingIndicator } from '../../shared';

const DEFAULT_ERRORS = { name: '' };

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
    metadata: { name },
    updateProjectState,
  } = useNewProjectDialog();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isValid, setValidity] = useState<boolean>(false);

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

  const [projectName, setProjectName] = useState<string>(name);
  const [errors, setErrors] =
    useState<{ [key in ProjectNameErrorPath]: string }>(DEFAULT_ERRORS);

  const handleTabSelectionChange = (key: Key) => {
    updateProjectState({});
  };

  const validateProjectName = useCallback(
    (inputProjectName: string): void => {
      console.log(inputProjectName);
      try {
        const trimedName = inputProjectName.trim();
        const validated = projectNameSchema(trimedName, projects).validateSync(
          { name: trimedName },
          { abortEarly: false }
        );

        updateProjectState({ name: validated.name });
        setErrors(DEFAULT_ERRORS);
        setValidity(true);
      } catch (error: unknown) {
        if (isYupValidationError(error)) {
          error.inner.forEach(({ path, message }: ValidationError) => {
            if (path === ProjectNameErrorPath.NAME) {
              setErrors((prevErrors) => ({ ...prevErrors, name: message }));
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
    if (!projectName) {
      setValidity(false);
    }
  }, [projectName, setValidity]);

  useEffect(() => {
    if (projectName) {
      validateProjectName(projectName);
    }
  }, [projectName, validateProjectName]);

  const ITEMS: TabItem[] = [
    ...Object.entries(TABS_SINGLE_TEMPLATE).map(([tab, cards]) => ({
      id: `${tab}-id`,
      key: `${tab}`,
      name: tab,
      children: <div />,
    })),
  ];

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
              <LimitedTextField
                label="Project name"
                value={projectName}
                onChange={handleProjectNameChange}
                placeholder={'Untitled'}
                id={'project-name-input-id'}
              />
              <ValidationErrorMsg errorMsg={errors.name} />
              <Tabs
                onSelectionChange={handleTabSelectionChange}
                items={ITEMS}
              />
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
