import React from "react";
import Profile from "../screens/profile/Profile";
import {create} from 'react-test-renderer'

const navigation = {
    navigate: jest.fn(),
}

const tree = create(<Profile navigation={navigation}/>)

test('navigate to configuration screen', () =>{
    const button = tree.root.findByProps({testID: 'buttonReturn'}).props;
    button.onPress();

    expect(navigation.navigate).toBeCalledWith('Configuration');
});

