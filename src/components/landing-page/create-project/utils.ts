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
import DetectionImg from '../../../assets/domains/detection-normal.svg';
import DetectionRotatedImg from '../../../assets/domains/detection-rotated.svg';
import SegmentationInstanceImg from '../../../assets/domains/segmentation-instance.svg';
import SegmentationImg from '../../../assets/domains/segmentation-semantic.svg';
import { ProjectProps } from '../../../api/projects/hooks/project.interface';

const labelNameNotAllowedMultipleSpaces = new RegExp(/^((?! {2}).)*$/);

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
const NOT_EMPTY_LABELS_VALIDATION_MESSAGE = 'You should add at least one label';

export const trimAndLowerCase = (text: string): string =>
  text.trim().toLocaleLowerCase();

export const newLabelNameSchema = (
  name: string | undefined
): yup.SchemaOf<{ name: string }> => {
  return yup.object({
    name: yup
      .string()
      .trim()
      .required(REQUIRED_NAME_VALIDATION_MESSAGE)
      .max(100, MORE_THAT_ONE_HUNDRED_VALIDATION_MESSAGE)
      .matches(labelNameNotAllowedMultipleSpaces, ONE_SPACE_VALIDATION_MESSAGE),
  });
};

export const newLabelGroupSchema = (): yup.SchemaOf<{ group: string }> =>
  yup.object({
    group: yup.string().required(REQUIRED_GROUP_VALIDATION_MESSAGE),
  });

export const labelsListSchema = yup.object({
  labels: yup.array().min(1, NOT_EMPTY_LABELS_VALIDATION_MESSAGE),
});

export const projectNameSchema = (
  projectName: string,
  projects?: ProjectProps[]
): yup.SchemaOf<{ name: string }> =>
  yup.object({
    name: yup
      .string()
      .trim()
      .required('Please, type project name')
      .max(100, MORE_THAT_ONE_HUNDRED_VALIDATION_MESSAGE)
      .test(
        'unique',
        `Project '${projectName.trim()}' already exists`,
        (item?: string): boolean => {
          if (item && projects?.length) {
            return !projects
              .map((project: ProjectProps) => project.name.toLowerCase())
              .includes(item.toLowerCase());
          }

          return true;
        }
      ),
  });

export enum ProjectNameErrorPath {
  NAME = 'name',
}

type TABS = 'Model Type' | 'Cell Type';

export interface DomainCardsMetadata {
  alt: string;
  id: string;
  imgSrc: string;
  description: string;
}

export const TABS_SINGLE_TEMPLATE: Record<TABS, DomainCardsMetadata[]> = {
  'Model Type': [
    {
      imgSrc: DetectionImg,
      alt: 'detection-bounding-box',
      description: 'Draw a rectangle around an object in an image',
      id: 'detection-card-id',
    },
    {
      imgSrc: DetectionRotatedImg,
      alt: 'detection-rotated-bounding-box',
      description: 'Draw and enclose an object within a minimal rectangle',
      id: 'rotated-detection-card-id',
    },
  ],
  'Cell Type': [
    {
      imgSrc: SegmentationInstanceImg,
      alt: 'segmentation-instance',
      description:
        'Detect and delineate each distinct object of interest in an image',
      id: 'instance-segmentation-card-id',
    },
    {
      imgSrc: SegmentationImg,
      alt: 'segmentation-semantic',
      description: 'Group parts of an image that belong the same object',
      id: 'segmentation-card-id',
    },
  ],
};
