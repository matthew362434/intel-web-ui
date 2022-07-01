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
import { ErrorBoundary } from '../errors/error-boundary.component';
import { Header } from '../shared/header';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTER_PATHS } from '../../routes';
import { LandingContent } from './landing-page-content';
import 'twin.macro';
import { ProjectsListProvider } from './landing-page-content/projects-list';

export const LandingPage = (): JSX.Element => {
  return (
    <div tw="h-screen flex flex-col">
      <div tw="h-[72px]">
        <Header />
      </div>
      <div tw="flex flex-1">
        <div tw="w-[250px] bg-[#242528]"></div>
        <div tw="flex-1 bg-[#242528] px-[30px] pt-[30px]">
          <div>
            <Routes>
              <Route
                path={ROUTER_PATHS.LANDING_PAGE}
                element={
                  <ErrorBoundary>
                    <div>
                      <ProjectsListProvider>
                        <LandingContent />
                      </ProjectsListProvider>
                    </div>
                  </ErrorBoundary>
                }
              />
              <Route
                path=""
                element={<Navigate to={ROUTER_PATHS.LANDING_PAGE} replace />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
