import React from "react";
import Profile from "../screens/profile/Profile";
import {create} from 'react-test-renderer'
import {render} from "@testing-library/react-native";

const tree = create(<Profile />)

test('snapshot', () => {
    expect(tree).toMatchSnapshot();
}) 

describe("<Profile />", () => {
    beforeEach(() => {
        component = render(<Profile />);
    });

    it("Renderiza correctamente", () => {
        expect(component).toBeDefined();
        expect(component.getByTestId("buttonReturn")).toBeDefined();
    });
})