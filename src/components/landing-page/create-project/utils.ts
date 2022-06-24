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
import * as yup from 'yup';
import { ProjectProps } from '../../../api/projects/project.interface';

export const REQUIRED_NAME_VALIDATION_MESSAGE = 'Name cannot be empty';
export const REQUIRED_GROUP_VALIDATION_MESSAGE = 'Group cannot be empty';
export const ONE_SPACE_VALIDATION_MESSAGE = 'You can only use single space';
export const UNIQUE_HOTKEY_VALIDATION_MESSAGE = 'This hotkey is already used';
export const REQUIRED_PROJECT_NAME_VALIDATION_MESSAGE =
  'Please, type project name';
export const MORE_THAT_ONE_HUNDRED_VALIDATION_MESSAGE =
  'Name cannot have more than 100 characters';
export const UNIQUE_VALIDATION_MESSAGE = (name: string): string =>
  `Label '${name}' already exists`;

export const trimAndLowerCase = (text: string): string =>
  text.trim().toLocaleLowerCase();

export const projectNameSchema = (
  projectName: string,
  projects?: ProjectProps[]
): yup.SchemaOf<{ projectName: string }> =>
  yup.object({
    projectName: yup
      .string()
      .trim()
      .required(REQUIRED_PROJECT_NAME_VALIDATION_MESSAGE)
      .max(100, MORE_THAT_ONE_HUNDRED_VALIDATION_MESSAGE)
      .test(
        'unique',
        `Project '${projectName.trim()}' already exists`,
        (item?: string): boolean => {
          if (item && projects?.length) {
            return !projects
              .map((project: ProjectProps) => project.projectName.toLowerCase())
              .includes(item.toLowerCase());
          }

          return true;
        }
      ),
  });

export enum ProjectNameErrorPath {
  PROJECT_NAME = 'projectName',
}
