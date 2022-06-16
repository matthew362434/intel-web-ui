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
