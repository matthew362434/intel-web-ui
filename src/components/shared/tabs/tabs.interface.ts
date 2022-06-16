import { ComponentProps, ReactNode } from 'react';

import { TabPanels } from '@adobe/react-spectrum';
import { SpectrumTabsProps } from '@react-types/tabs';

interface PanelOverflowY {
  panelOverflowY?: 'visible' | 'hidden' | 'clip' | 'scroll' | 'auto';
}

export interface TabItem {
  id: string;
  key: string;
  name: ReactNode;
  children: ReactNode;
  isLearningParametersTab?: boolean;
}

export interface TabsProps
  extends Omit<SpectrumTabsProps<TabItem>, 'children'>,
    PanelOverflowY {
  tabPanelsClassName?: ComponentProps<typeof TabPanels>['UNSAFE_className'];
}
