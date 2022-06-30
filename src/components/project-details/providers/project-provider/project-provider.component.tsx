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
import { createContext, ReactNode, useCallback, useContext } from 'react';
import { ProjectIdentifier, ProjectProps } from '../../../../api/projects';
import { useProject as useProjectQuery } from '../../../../api/projects/hooks/use-project.hook';
import { Loading } from '../../../shared';
import { MissingProviderError } from '../../../../helpers/missing-provider-error';

export interface ProjectContextProps {
  projectIdentifier: ProjectIdentifier;
  project: ProjectProps;
  error?: unknown;
}

const ProjectContext = createContext<ProjectContextProps | undefined>(
  undefined
);

interface ProjectProviderProps {
  children: ReactNode;
  projectIdentifier: ProjectIdentifier;
}

export const ProjectProvider = ({
  projectIdentifier,
  children,
}: ProjectProviderProps): JSX.Element => {
  const { projectId } = projectIdentifier;
  const { data: project, error: ProjectError } = useProjectQuery(projectId);

  if (project === undefined) {
    return <Loading />;
  }

  const value: ProjectContextProps = {
    projectIdentifier,
    project,
    error: ProjectError,
  };

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};

export const useProject = (): ProjectContextProps => {
  const context = useContext(ProjectContext);

  if (context === undefined) {
    throw new MissingProviderError('useProject', 'ProjectProvider');
  }

  return context;
};
