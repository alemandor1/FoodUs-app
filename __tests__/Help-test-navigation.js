import React from "react";
import Help from "../screens/help/Help";
import {create} from 'react-test-renderer'

const navigation = {
    navigate: jest.fn(),
}

const tree = create(<Help navigation={navigation}/>)

test('navigate to Configuration screen', () =>{
    const button = tree.root.findByProps({testID: 'button'}).props;
    button.onPress();

    expect(navigation.navigate).toBeCalledWith('Configuration');
});

