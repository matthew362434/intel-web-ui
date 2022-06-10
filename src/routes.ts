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

const HOME = "/";
const PROJECTS = "/projects";
const PROJECT = `${PROJECTS}/:projectId`;
const REGISTRATION_ROUTE_PREFIX = "/registration";

const ROUTER_PATHS = {
  HOME,
  LANDING_PAGE: HOME,
  PROFILE_PAGE: "/profile",
  ABOUT_PAGE: "/about",
  TEAM: "/team",
  LOGS: "/logs",
  PROJECTS,
  PROJECT,
  PROJECT_TESTS: `${PROJECT}/tests`,
  PROJECT_DEPLOYMENTS: `${PROJECT}/deployments`,
  SIGN_OUT: "/oauth2/sign_out",
  SIGN_OUT_PAGE: "/sign_out_page",
  REGISTER: `${REGISTRATION_ROUTE_PREFIX}/sign-up`,
  FORGOT_PASSWORD: `${REGISTRATION_ROUTE_PREFIX}/forgot-password`,
  RESET_PASSWORD: `${REGISTRATION_ROUTE_PREFIX}/reset-password`,
};

const getProjectUrl = (projectId: string): string =>
  encodeURI(`${PROJECTS}/${projectId}`);
const getProjectTestsUrl = (projectId: string): string =>
  encodeURI(`${PROJECTS}/${projectId}/tests`);
const getProjectDeploymentsUrl = (projectId: string): string =>
  encodeURI(`${PROJECTS}/${projectId}/deployments`);
const getProjectLabelsUrl = (projectId: string): string =>
  encodeURI(`${PROJECTS}/${projectId}/labels`);

const PATHS = {
  getProjectUrl,
  getProjectTestsUrl,
  getProjectDeploymentsUrl,
  getProjectLabelsUrl,
};

export { ROUTER_PATHS, PATHS };
