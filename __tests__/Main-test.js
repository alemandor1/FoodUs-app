import React from "react";
import Main from "../screens/main/Main";
import {create} from 'react-test-renderer'
import {render, waitFor, act, fireEvent} from "@testing-library/react-native";
import renderer from 'react-test-renderer';

//test snapshot
const tree = create(<Main />)
test('snapshot', () => {
    expect(tree).toMatchSnapshot();
})

//test renderización
describe("<Main />", () => {
    beforeEach(() => {
        component = render(<Main />);
    });

    it("Renderiza correctamente", () => {
        expect(component).toBeDefined();
        expect(component.queryAllByTestId("list").length).toEqual(0);
    });

    it("Renderiza los elementos despues de llamar a la api", () => {
        waitFor(() => expect(component.getByTestId("list")).toBeDefined());
    }) 
})

//test unitario
describe('<Main />', () => {
    it('has 1 child', () => {
      const tree = renderer.create(<Main />).toJSON();
      expect(tree.children.length).toBe(1);
    });
  });

