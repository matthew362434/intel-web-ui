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
import { useMutation, UseMutationResult, useQueryClient } from 'react-query';
import {
  NOTIFICATION_TYPE,
  useNotification,
} from '../../../components/shared/notification';

import QUERY_KEYS from '../../requests/query-keys';
import { ProjectProps } from '../project.interface';
import { useProjectService } from './use-project-service.hook';

export interface UseEditProjectParams {
  projectId: string;
  project: ProjectProps;
}

interface UseEditProject {
  editProject: UseMutationResult<
    ProjectProps | undefined,
    AxiosError,
    UseEditProjectParams
  >;
}

export const useEditProject = (): UseEditProject => {
  const service = useProjectService().projectService;
  const client = useQueryClient();
  const { addNotification } = useNotification();

  const editProject = useMutation<
    ProjectProps | undefined,
    AxiosError,
    UseEditProjectParams
  >(
    async ({ projectId, project }: UseEditProjectParams) => {
      await service.editProject({ projectId }, project);

      const previousProject = client.getQueryData<ProjectProps>(
        QUERY_KEYS.PROJECT_KEY(project.projectID)
      );

      client.setQueryData<ProjectProps>(
        QUERY_KEYS.PROJECT_KEY(project.projectID),
        (oldData) => ({
          ...oldData,
          ...project,
        })
      );

      client.setQueryData<ProjectProps[] | undefined>(
        QUERY_KEYS.PROJECTS_KEY(),
        (oldData) =>
          oldData?.map((prevProject) =>
            prevProject.projectID === projectId ? project : prevProject
          )
      );

      return previousProject;
    },
    {
      onError: (error) => {
        addNotification(error.message, NOTIFICATION_TYPE.ERROR);
      },
    }
  );
  return { editProject };
};
