import { AxiosError } from 'axios';
import { useMutation, UseMutationResult } from 'react-query';
import {
  NOTIFICATION_TYPE,
  useNotification,
} from '../../../components/shared/notification';

interface UseCreateProjectMutation {
  name: string;
}

interface UseCreateProject {
  createProject: UseMutationResult<
    UseCreateProjectMutation,
    AxiosError,
    UseCreateProjectMutation
  >;
}

export const useCreateProject = (): UseCreateProject => {
  // const service = useProjectService().projectService;
  const { addNotification } = useNotification();
  const createProject = useMutation<
    UseCreateProjectMutation,
    AxiosError,
    UseCreateProjectMutation
  >(
    async (args: UseCreateProjectMutation) => {
      const { name } = args;

      // return await service.createProject(name);
      return { name };
    },
    {
      onError: (error) => {
        addNotification(error.message, NOTIFICATION_TYPE.ERROR);
      },
    }
  );

  return {
    createProject,
  };
};
