import React from "react";
import Configuration from "../screens/profile/Configuration";
import {create} from 'react-test-renderer'

const navigation = {
    navigate: jest.fn(),
}

const tree = create(<Configuration navigation={navigation}/>)

test('navigate to home screen', () =>{
    const button = tree.root.findByProps({testID: 'buttonLogOut'}).props;
    button.onPress();

    expect(navigation.navigate).toBeCalledWith('Home');
});

