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
