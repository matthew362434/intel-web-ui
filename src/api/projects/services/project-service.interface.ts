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
import {
  CreateProjectProps,
  ProjectIdentifier,
  ProjectProps,
  EditProjectProps,
  CELL_TYPES,
  MODEL_TYPES,
} from '../../projects';

export interface ProjectService {
  getProjects(workspaceId: string): Promise<ProjectProps[]>;
  getProject(projectIdentifier: ProjectIdentifier): Promise<ProjectProps>;
  editProject(
    projectIdentifier: ProjectIdentifier,
    body: EditProjectProps
  ): Promise<ProjectProps>;
  createProject(
    projectName: string,
    cellType: CELL_TYPES,
    modelType: MODEL_TYPES
  ): Promise<CreateProjectProps>;
  deleteProject(projectIdentifier: ProjectIdentifier): Promise<string>;
}
