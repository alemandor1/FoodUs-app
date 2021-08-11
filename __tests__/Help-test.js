import React from "react";
import Help from "../screens/help/Help";
import {act, create} from 'react-test-renderer'
import {render} from "@testing-library/react-native";


// Test snapshots
const tree = create(<Help />)

test('snapshot', () => {
    expect(tree).toMatchSnapshot();
})

// Test de renderización
describe("<Help />", () => {
    beforeEach(() => {
        component = render(<Help />);
    });

    it("Renderiza correctamente", () => {
        expect(component).toBeDefined();
        expect(component.getByTestId("button")).toBeDefined();
        expect(component.getByTestId("tittle")).toBeDefined();
        expect(component.getByTestId("container")).toBeDefined();
        expect(component.getByTestId("questions")).toBeDefined();
    });
})