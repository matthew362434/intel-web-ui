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

const HOME = '/';
const PROJECTS = '/projects';
const PROJECT = `${PROJECTS}/:projectId`;
const PROJECT_DATASET = `${PROJECT}/dataset`;

const ROUTER_PATHS = {
  HOME,
  LANDING_PAGE: HOME,
  PROJECTS,
  PROJECT,
  PROJECT_DATASET,
  PROJECT_DATASET_VIDEOS: `${PROJECT_DATASET}/videos`,
  PROJECT_DATASET_ACTIONS: `${PROJECT_DATASET}/actions`,
};

const getProjectUrl = (projectId: string): string =>
  encodeURI(`${PROJECTS}/${projectId}`);

const getAnnotatorUrl = (projectId: string): string =>
  encodeURI(`${PROJECTS}/${projectId}/annotator`);

const getProjectDatasetUrl = (projectId: string, chapterKey: string): string =>
  encodeURI(`${PROJECTS}/${projectId}/dataset/${chapterKey}`);

const PATHS = {
  getProjectUrl,
  getAnnotatorUrl,
  getProjectDatasetUrl,
};

export { ROUTER_PATHS, PATHS };
