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
import { createContext, ReactNode, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateProject } from '../../../../api/projects/hooks/use-create-project.hook';
import { MissingProviderError } from '../../../../helpers/missing-provider-error';
import { PATHS } from '../../../../routes';

import {
  NewProjectDialogContextProps,
  Project,
} from './new-project-dialog-provider.interface';

interface NewProjectDialogProviderProps {
  children: ReactNode;
}

export const NewProjectDialogContext = createContext<
  NewProjectDialogContextProps | undefined
>(undefined);

export const NewProjectDialogProvider = ({
  children,
}: NewProjectDialogProviderProps): JSX.Element => {
  const PROJECT_CREATION_INITIAL_STATE = {
    name: '',
  };

  const navigate = useNavigate();
  const { createProject } = useCreateProject();
  const [projectCreationState, setProjectCreationState] = useState<Project>(
    PROJECT_CREATION_INITIAL_STATE
  );

  const updateProjectState = (projectState: Partial<Project>) => {
    setProjectCreationState((prevState) => ({ ...prevState, ...projectState }));
  };

  const save = async () => {
    const { name } = projectCreationState;

    createProject.mutate(
      { name },
      {
        onSuccess: (response) => {
          navigate(PATHS.getProjectUrl(response.name));
        },
      }
    );
  };

  return (
    <NewProjectDialogContext.Provider
      value={{
        save,
        isLoading: createProject.isLoading,
        metadata: projectCreationState,
        updateProjectState,
      }}
    >
      {children}
    </NewProjectDialogContext.Provider>
  );
};

export const useNewProjectDialog = (): NewProjectDialogContextProps => {
  const context = useContext(NewProjectDialogContext);

  if (context === undefined) {
    throw new MissingProviderError(
      'useNewProjectDialog',
      'NewProjectDialogProvider'
    );
  }

  return context;
};
