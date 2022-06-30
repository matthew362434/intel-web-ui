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
import { KeyboardEvent, useEffect, useRef, useState } from 'react';

import { ActionButton, Flex, Heading, Text } from '@adobe/react-spectrum';
import { TextFieldRef } from '@react-types/textfield';
import { ValidationError } from 'yup';

import { Edit } from '../../../assets/icons';
import { LimitedTextField } from '../limited-text-field/limited-text-field.component';
import { LoadingIndicator } from '../loading';
import { ValidationErrorMsg } from '../validation-error-msg';
import classes from './project-name.module.scss';
import { ProjectProps } from '../../../api/projects';
import { useEditProject } from '../../../api/projects/hooks/use-edit-project.hook';
import { projectNameSchema } from '../../landing-page/create-project/utils';
import { KeyMap } from '../keyboard-events';
import { idMatchingFormat } from '../../../test-utils/id-utils';

interface ProjectNameDomainProps {
  project: ProjectProps;
  textInRow?: boolean;
  isEditableName?: boolean;
}

export const ProjectNameDomain = ({
  project,
  textInRow = false,
  isEditableName = false,
}: ProjectNameDomainProps): JSX.Element => {
  const { projectName } = project;
  const [editMode, setEditMode] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>(projectName);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { editProject } = useEditProject();

  const nameTextbox = useRef<TextFieldRef>(null);

  const shouldShowArrow = (index: number, arrayLength: number): boolean => {
    return index < arrayLength - 1;
  };

  useEffect(() => {
    if (editMode) {
      nameTextbox.current?.focus();
    }
  }, [editMode]);

  const changeName = (inputNewName: string) => {
    setNewName(inputNewName);
    setErrorMessage('');
  };

  const updateName = (value: string) => {
    if (projectName === value) {
      setEditMode(false);

      return;
    }

    try {
      projectNameSchema(projectName, [project]).validateSync(
        { projectName: value },
        { abortEarly: false }
      );

      errorMessage && setErrorMessage('');

      editProject.mutate(
        {
          projectId: project.projectID,
          project: { ...project, projectName: newName },
        },
        {
          onSuccess: () => {
            setEditMode(false);
          },
        }
      );
    } catch (error: unknown) {
      setErrorMessage((error as ValidationError).message);
      setNewName(projectName);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    const updatedName = (e.currentTarget as HTMLInputElement).value;

    if (e.key === KeyMap.Enter) {
      updateName(updatedName);
    }
  };

  const onBlurTextHandler = () => {
    updateName(newName);
  };

  return (
    <Flex direction={'row'} alignItems={'start'} gap={'size-200'}>
      <Flex
        direction={textInRow ? 'row' : 'column'}
        id={`project-name-${idMatchingFormat(projectName)}`}
        minWidth={0}
      >
        <Flex direction={'row'} alignItems={'center'} minWidth={0}>
          {editMode ? (
            <>
              <LimitedTextField
                value={newName}
                onChange={changeName}
                onKeyDown={handleKeyDown}
                onBlur={onBlurTextHandler}
                ref={nameTextbox}
                isDisabled={editProject.isLoading}
                id={'edit-project-name-field-id'}
                aria-label={'Edit project name field'}
              />
              {editProject.isLoading ? <LoadingIndicator size={'S'} /> : <></>}
            </>
          ) : (
            <Flex
              alignItems={'center'}
              UNSAFE_className={isEditableName ? classes.headerBox : ''}
              minHeight={'size-450'}
              height={'fit-content'}
              minWidth={0}
            >
              <Heading level={3} UNSAFE_className={classes.header}>
                <span title={projectName}>{projectName}</span>
              </Heading>

              <ActionButton
                id={'edit-project-name-button-id'}
                isQuiet
                onPress={() => setEditMode(!editMode)}
                UNSAFE_className={classes.editNameButton}
                aria-label={'Edit name of the project'}
              >
                <Edit />
              </ActionButton>
            </Flex>
          )}
        </Flex>
        <ValidationErrorMsg errorMsg={errorMessage} inheritHeight />
      </Flex>
    </Flex>
  );
};
