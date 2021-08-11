import React from "react";
import Home from "../screens/home/Home";
import {create} from 'react-test-renderer'

const navigation = {
    navigate: jest.fn(),
}

const tree = create(<Home navigation={navigation}/>)

test('navigate to other screen', () =>{
    const button = tree.root.findByProps({testID: 'buttonLogin'}).props;
    button.onPress();

    const button2 = tree.root.findByProps({testID: 'buttonRegister'}).props;
    button2.onPress();


    expect(navigation.navigate).toBeCalledWith('Login');
    expect(navigation.navigate).toBeCalledWith('Register');
});

