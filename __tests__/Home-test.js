import React from "react";
import Home from "../screens/home/Home";
import {create} from 'react-test-renderer'
import {render} from "@testing-library/react-native";

const tree = create(<Home />)

test('snapshot', () => {
    expect(tree).toMatchSnapshot();
})

describe("<Home />", () => {
    beforeEach(() => {
        component = render(<Home />);
    });

    it("Renderiza correctamente", () => {
        expect(component).toBeDefined();
        expect(component.getByTestId("buttonLogin")).toBeDefined();
        expect(component.getByTestId("buttonRegister")).toBeDefined();
    });
})