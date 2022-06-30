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
import { Key, lazy, Suspense, useEffect, useState } from 'react';

import { Flex, Item, TabList, TabPanels, Tabs } from '@adobe/react-spectrum';
import { View } from '@react-spectrum/view';

import { useProject } from '../providers';
import classes from './project-dataset.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { TabItem } from '../../shared/tabs';
import { capitalize } from '../../../helpers/utils';
import { Loading } from '../../shared';
import { PATHS } from '../../../routes';
import { ProjectNameDomain } from '../../shared/project-name';
import 'twin.macro';

interface ProjectDatasetProps {}

export enum DatasetChapters {
  DEFAULT = 'videos',
  VIDEOS = 'videos',
  ACTIONS = 'actions',
}

export const ProjectDataset = ({}: ProjectDatasetProps): JSX.Element => {
  const navigate = useNavigate();
  const { project } = useProject();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<Key>(DatasetChapters.VIDEOS);
  const [isTabInEdition, setTabInEdition] = useState<boolean>(false);

  const tabs: TabItem[] = [
    {
      id: `${DatasetChapters.VIDEOS}-id`,
      key: DatasetChapters.VIDEOS,
      name: `${capitalize(DatasetChapters.VIDEOS)}`,
      children: (
        <Suspense fallback={<Loading size="L" />}>
          <div />
        </Suspense>
      ),
    },
    {
      id: `${DatasetChapters.ACTIONS}-id`,
      key: DatasetChapters.ACTIONS,
      name: `${capitalize(DatasetChapters.ACTIONS)}`,
      children: (
        <Suspense fallback={<Loading size="L" />}>
          <div />
        </Suspense>
      ),
    },
  ];

  useEffect(() => {
    const paths = location.pathname.split('/');
    const currentTab = paths[paths.length - 1];

    if (currentTab !== DatasetChapters.ACTIONS) {
      setTabInEdition(false);
    }
    setActiveTab(currentTab);
  }, [location]);

  return (
    <View UNSAFE_className={classes.componentWrapper}>
      <div tw="flex items-center">
        <ProjectNameDomain project={project} isEditableName />
        <div tw="mx-[20px]">
          Cell Type: <span tw="font-semibold">{project.cellType}</span>
        </div>
        <div tw="mx-[20px]">
          Model Type: <span tw="font-semibold">{project.modelType}</span>
        </div>
      </div>
      <Tabs
        items={tabs}
        height="100%"
        minHeight={0}
        selectedKey={activeTab}
        onSelectionChange={(key: Key) => {
          navigate(PATHS.getProjectDatasetUrl(project.projectID, String(key)));
        }}
      >
        <Flex justifyContent={'space-between'} width={'100%'}>
          <TabList UNSAFE_className={classes.parentTabList}>
            {(item: TabItem) => <Item>{item.name}</Item>}
          </TabList>
        </Flex>
        <TabPanels height="100%" minHeight={0}>
          {(item: TabItem) => <Item>{item.children}</Item>}
        </TabPanels>
      </Tabs>
    </View>
  );
};

export default ProjectDataset;
