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
import { getDefinedFromList } from '../../../helpers/utils';
import { API_URLS } from '../../services';
import AXIOS from '../../services/axios-instance';
import { ProjectDTO } from '../dtos';
import {
  CELL_TYPES,
  CreateProjectProps,
  MODEL_TYPES,
  ProjectCreation,
  ProjectIdentifier,
  ProjectProps,
} from '../project.interface';
import { ProjectService } from './project-service.interface';

export const createApiProjectService = (): ProjectService => {
  const getProjects = async (workspaceId: string): Promise<ProjectProps[]> => {
    const response = await AXIOS.get<ProjectProps[]>(API_URLS.PROJECTS);

    const projectsList = response.data || [];

    return getDefinedFromList<ProjectProps>(projectsList);
  };

  const getProject = async (
    projectIdentifier: ProjectIdentifier
  ): Promise<ProjectProps> => {
    const { data } = await AXIOS.get<ProjectProps>(
      API_URLS.PROJECT(projectIdentifier.projectId)
    );

    return data;
  };

  const editProject = async (
    projectIdentifier: ProjectIdentifier,
    project: ProjectDTO
  ): Promise<ProjectProps> => {
    const { data } = await AXIOS.put(
      API_URLS.PROJECT(projectIdentifier.projectId),
      project
    );

    return data;
  };

  const createProject = async (
    projectName: string,
    cellType: CELL_TYPES,
    modelType: MODEL_TYPES
  ): Promise<CreateProjectProps> => {
    const body: ProjectCreation = {
      projectName,
      cellType,
      modelType,
    };
    const { data } = await AXIOS.post<ProjectProps>(API_URLS.PROJECTS, body);

    return data;
  };

  const deleteProject = async ({
    projectId,
  }: ProjectIdentifier): Promise<string> => {
    const { data } = await AXIOS.delete<{ result: string }>(
      API_URLS.PROJECT(projectId)
    );

    return data.result;
  };

  return {
    getProjects,
    getProject,
    editProject,
    createProject,
    deleteProject,
  };
};
