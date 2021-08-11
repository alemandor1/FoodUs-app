import React from "react";
import Configuration from "../screens/profile/Configuration";
import {create} from 'react-test-renderer'
import {render, waitFor} from "@testing-library/react-native";

const tree = create(<Configuration />)

test('snapshot', () => {
    expect(tree).toMatchSnapshot();
}) 

describe("<Configuration />", () => {
    beforeEach(() => {
        component = render(<Configuration />);
    });

    it("Renderiza correctamente", () => {
        expect(component).toBeDefined();
        expect(component.getByTestId("buttonLogOut")).toBeDefined();
        expect(component.queryAllByTestId("list").length).toEqual(1);
    });

    it("Renderiza los elementos despues de llamar a la api", () => {
        waitFor(() => expect(component.getByTestId("list")).toBeDefined());
    })
})