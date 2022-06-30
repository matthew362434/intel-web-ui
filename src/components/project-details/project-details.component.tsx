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
import { lazy, Suspense } from 'react';

import { Grid, View } from '@adobe/react-spectrum';
import { AxiosError } from 'axios';
import { useErrorHandler } from 'react-error-boundary';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { ProjectProvider, useProject } from './providers';
import { Header } from '../shared/header';
import { ProjectDetailsProps } from './project-details.interface';
import { useProjectIdentifier } from './hooks/use-project-identifier';
import { PATHS, ROUTER_PATHS } from '../../routes';
import { Loading } from '../shared';
import { Breadcrumbs } from '../shared/breadcrumbs';
import 'twin.macro';

const ProjectDataset = lazy(
  () => import('./project-dataset/project-dataset.component')
);

const ProjectDetailsContent = ({
  isAnnotatorRoute,
}: {
  isAnnotatorRoute: boolean;
}) => {
  const { project, error } = useProject();
  const { pathname } = useLocation();

  useErrorHandler((error as AxiosError)?.message ?? null);

  return (
    <>
      {!isAnnotatorRoute && (
        <>
          <View gridArea="header">
            <Header grayscale />
          </View>
        </>
      )}
      <View
        backgroundColor="gray-50"
        gridArea="content"
        overflow="hidden"
        position={'relative'}
      >
        <div tw="ml-[15px]">
          <Breadcrumbs />
        </div>
        <Routes>
          <Route
            path={ROUTER_PATHS.PROJECT_DATASET_VIDEOS.replace(
              ROUTER_PATHS.PROJECT + '/',
              ''
            )}
            element={
              <Suspense fallback={<Loading size="L" />}>
                <ProjectDataset />
              </Suspense>
            }
          />
          <Route
            path={ROUTER_PATHS.PROJECT_DATASET_ACTIONS.replace(
              ROUTER_PATHS.PROJECT + '/',
              ''
            )}
            element={
              <Suspense fallback={<Loading size="L" />}>
                <ProjectDataset />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Navigate
                to={ROUTER_PATHS.PROJECT_DATASET_VIDEOS.replace(
                  ROUTER_PATHS.PROJECT + '/',
                  ''
                )}
                replace
              />
            }
          />
        </Routes>
      </View>
    </>
  );
};

export const ProjectDetails = ({}: ProjectDetailsProps): JSX.Element => {
  const { projectId } = useProjectIdentifier();

  const isAnnotatorRoute =
    useLocation().pathname === PATHS.getAnnotatorUrl(projectId);

  const GRID_AREAS = isAnnotatorRoute ? ['content'] : ['header', 'content'];
  const GRID_COLUMNS = isAnnotatorRoute ? ['auto'] : ['auto'];
  const GRID_ROWS = isAnnotatorRoute ? ['auto'] : ['size-600', 'auto'];

  return (
    <Grid
      areas={GRID_AREAS}
      columns={GRID_COLUMNS}
      rows={GRID_ROWS}
      height="100vh"
      maxHeight={'100vh'}
    >
      <ProjectProvider projectIdentifier={{ projectId }}>
        <ProjectDetailsContent isAnnotatorRoute={isAnnotatorRoute} />
      </ProjectProvider>
    </Grid>
  );
};

export default ProjectDetails;
