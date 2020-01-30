import * as React from 'react';
import { ScrollView } from 'react-native';
import { StealthButton, Text, Separator } from '../components';
import { registerThemes } from './CustomThemes';
import { allTestComponents } from './TestComponents';
import { ViewWin32 } from '@office-iss/react-native-win32';
import { fabricTesterStyles } from './styles';

// uncomment the below lines to enable message spy
/*
const msgq = require('MessageQueue');
msgq.spy(true);
*/

registerThemes();

const EmptyComponent: React.FunctionComponent = () => {
  return <Text fontSize={14} style={fabricTesterStyles.noTest}>Select a component from the left.</Text>;
}

const TestListSeparator = Separator.customize(
  {
    tokens: {
      color: 'darkGray',
      separatorWidth: 2
    }
  }
);

export const FabricTester: React.FunctionComponent<{}> = ()=> {

  const [selectedTestIndex, setSelectedTestIndex] = React.useState(-1);
  const clickCallback = React.useCallback(setSelectedTestIndex, []);

  const TestComponent = selectedTestIndex == -1 ? EmptyComponent : allTestComponents[selectedTestIndex].component;

  return (
    <ViewWin32 style={fabricTesterStyles.root}>     
      <ScrollView style={fabricTesterStyles.testList} contentContainerStyle={fabricTesterStyles.testListContainerStyle}>
        {
          allTestComponents.map((description, index) => {
            return (
              <StealthButton
                key={index} 
                disabled={index == selectedTestIndex}
                content={description.name}
                onPress={()=>clickCallback(index)}
                style={fabricTesterStyles.testListItem} />
            );
          })
        }
      </ScrollView>

      <TestListSeparator vertical style={fabricTesterStyles.separator} />

      <ScrollView>
          <TestComponent />
      </ScrollView>
    </ViewWin32>
  );
}