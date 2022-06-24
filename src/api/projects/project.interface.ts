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

import { ProjectCommon } from './dtos';

export interface ProjectIdentifier {
  projectId: string;
}

interface ProjectPropsCommon {
  projectID: string;
  projectName: string;
  cellType: CELL_TYPES;
  modelType: MODEL_TYPES;
  createdAt: Date;
}

export interface ProjectProps extends ProjectPropsCommon {}
export type CreateProjectProps = Omit<ProjectProps, ''>;

export interface ProjectCreation extends ProjectCommon {}
export interface EditProjectProps extends ProjectPropsCommon {}

export enum CELL_TYPES {
  OFF_SMALL = 'Off Small',
  ON_SMALL = 'On Small',
  OFF_LARGE = 'Off Large',
  ON_LARGE = 'On Large',
}

export enum MODEL_TYPES {
  ALIGNED_FIRST = 'Aligned First',
  ALIGNED_LAST = 'Aligned Last',
  ROLLING = 'Rolling',
}
