import {
  Tabs as SpectrumTabs,
  TabList,
  TabPanels,
  Item,
  Flex,
} from '@adobe/react-spectrum';

import { TabItem, TabsProps } from './tabs.interface';

export const Tabs = (props: TabsProps): JSX.Element => {
  const { tabPanelsClassName, ...rest } = props;
  const panelOverflowY = props.panelOverflowY ?? 'auto';

  return (
    <SpectrumTabs {...rest}>
      <TabList>
        {(item: TabItem) => (
          <Item key={item.key} textValue={item.key}>
            <Flex
              direction={'row'}
              alignItems={'center'}
              gap={'size-50'}
              id={item.id}
            >
              <>{item.name}</>
            </Flex>
          </Item>
        )}
      </TabList>
      <TabPanels UNSAFE_style={{ overflowY: panelOverflowY }}>
        {(item: TabItem) => <Item key={item.key}>{item.children}</Item>}
      </TabPanels>
    </SpectrumTabs>
  );
};
