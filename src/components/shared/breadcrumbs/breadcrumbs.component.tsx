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
import { Breadcrumbs as BC, Item } from '@adobe/react-spectrum';
import { Key, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BreadcrumbsProps } from './breadcrumbs.interface';
import { PATHS, ROUTER_PATHS } from '../../../routes';
import { useProjectIdentifier } from '../../project-details/hooks/use-project-identifier';

export const Breadcrumbs = ({}: BreadcrumbsProps): JSX.Element => {
  const { projectId } = useProjectIdentifier();
  const location = useLocation();
  const navigate = useNavigate();
  const [items, setItems] = useState<any[]>([]);

  const handleAction = (key: Key) => {
    const item = items.find((el) => el.key === key);
    if (item && item.path) {
      navigate(item.path);
    }
  };

  useEffect(() => {
    const _items = [];
    if (projectId && projectId !== '') {
      _items.push({
        path: ROUTER_PATHS.PROJECTS,
        key: 'project',
        label: 'Projects',
      });
    }
    if (location.pathname === PATHS.getAnnotatorUrl(projectId)) {
      _items.push({
        key: 'annotation',
        label: 'Annotation',
      });
    } else if (
      location.pathname.indexOf(PATHS.getProjectDatasetUrl(projectId, '')) === 0
    ) {
      _items.push({
        key: 'dataset',
        label: 'Data set',
      });
    }
    setItems(_items);
  }, [location]);

  return (
    <div>
      <BC onAction={(e) => handleAction(e)}>
        {items.map((f) => (
          <Item key={f.key}>{f.label}</Item>
        ))}
      </BC>
    </div>
  );
};
