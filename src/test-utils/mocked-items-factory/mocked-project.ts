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
import { CELL_TYPES, MODEL_TYPES, ProjectProps } from '../../api/projects';

const mockedProject: ProjectProps = {
  projectID: '1234',
  projectName: 'Test project 1',
  cellType: CELL_TYPES.OFF_SMALL,
  modelType: MODEL_TYPES.ALIGNED_FIRST,
  createdAt: new Date(),
};

export const getMockedProject = (
  customProjectValues: Partial<ProjectProps>
): ProjectProps => {
  return {
    ...mockedProject,
  };
};
