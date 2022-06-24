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

import { createContext, ReactNode, useContext, useMemo } from 'react';
import {
  createApiProjectService,
  createInMemoryProjectService,
  ProjectService,
} from '../../api/projects/services';
import { MissingProviderError } from '../../helpers/missing-provider-error';

export interface ApplicationServicesContextProps {
  useInMemoryEnvironment: boolean;
  projectService: ProjectService;
}

interface ApplicationServicesProviderProps
  extends Partial<ApplicationServicesContextProps> {
  children: ReactNode;
  useInMemoryEnvironment: boolean;
}

const ApplicationServiceContext = createContext<
  ApplicationServicesContextProps | undefined
>(undefined);

export const ApplicationServicesProvider = ({
  children,
  useInMemoryEnvironment = false,
  ...mockedServices
}: ApplicationServicesProviderProps): JSX.Element => {
  const services = useMemo((): ApplicationServicesContextProps => {
    if (useInMemoryEnvironment) {
      return {
        projectService: createInMemoryProjectService(),
        useInMemoryEnvironment,
      };
    }

    return {
      projectService: createApiProjectService(),
      useInMemoryEnvironment,
    };
  }, [useInMemoryEnvironment]);

  // this allows us to overwrite the services' behavior in our tests
  const value = { ...services, ...mockedServices };

  return (
    <ApplicationServiceContext.Provider value={value}>
      {children}
    </ApplicationServiceContext.Provider>
  );
};

export const useApplicationServices = (): ApplicationServicesContextProps => {
  const context = useContext(ApplicationServiceContext);

  if (context === undefined) {
    throw new MissingProviderError(
      'useApplicationServices',
      'ApplicationServiceProvider'
    );
  }

  return context;
};
