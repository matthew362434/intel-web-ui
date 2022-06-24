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
import { getMockedProject } from '../../../test-utils/mocked-items-factory';
import {
  CELL_TYPES,
  CreateProjectProps,
  MODEL_TYPES,
  ProjectIdentifier,
  ProjectProps,
} from '../project.interface';
import { ProjectService } from './project-service.interface';

/* eslint-disable @typescript-eslint/no-unused-vars */

const inMemoryDatasets = [
  {
    id: 'in-memory-dataset',
    name: 'In memory dataset',
  },
];
export const createInMemoryProjectService = (): ProjectService => {
  const editProject = async (
    projectIdentifier: ProjectIdentifier,
    project: ProjectProps
  ): Promise<ProjectProps> => {
    return project;
  };

  const createProject = async (
    projectName: string,
    cellType: CELL_TYPES,
    modelType: MODEL_TYPES
  ): Promise<CreateProjectProps> => {
    return getMockedProject({
      projectName,
      cellType,
      modelType,
    });
  };

  const deleteProject = async (
    _projectIdentifier: ProjectIdentifier
  ): Promise<string> => {
    return 'success';
  };

  const getProjects = async (): Promise<ProjectProps[]> => [
    getMockedProject({
      projectID: '1112',
      projectName: 'Test project 1',
    }),
    getMockedProject({
      projectID: '1113',
      projectName: 'Animal project',
    }),
  ];

  const getProject = async (
    projectIdentifier: ProjectIdentifier
  ): Promise<ProjectProps> => {
    if (projectIdentifier.projectId === '1111') {
      return getMockedProject({
        projectID: projectIdentifier.projectId,
        projectName: 'In memory detection',
      });
    }
    return getMockedProject({});
  };

  return {
    getProjects,
    getProject,
    editProject,
    createProject,
    deleteProject,
  };
};
