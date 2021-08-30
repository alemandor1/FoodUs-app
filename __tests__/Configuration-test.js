import React from "react";
import Configuration from "../screens/profile/Configuration";
import {create} from 'react-test-renderer'
import {render, waitFor} from "@testing-library/react-native";
import renderer from 'react-test-renderer';

//test snapshot
const tree = create(<Configuration />)
test('snapshot', () => {
    expect(tree).toMatchSnapshot();
}) 

//test renderización
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

//test unitario
describe('<Configuration />', () => {
    it('has 1 child', () => {
      const tree = renderer.create(<Configuration />).toJSON();
      expect(tree.children.length).toBe(1);
    });
  });