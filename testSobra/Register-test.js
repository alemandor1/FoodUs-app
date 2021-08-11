import React from "react";
import Register from "../screens/register/Register";
import {create} from 'react-test-renderer'
import {render} from "@testing-library/react-native";

const tree = create(<Register />)

test('snapshot', () => {
    expect(tree).toMatchSnapshot();
}) 

describe("<Register />", () => {
    beforeEach(() => {
        component = render(<Register />);
    });

    it("Renderiza correctamente", () => {
        expect(component).toBeDefined();
    });
})