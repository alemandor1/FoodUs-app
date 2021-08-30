import React from "react";
import Home from "../screens/home/Home";
import {create} from 'react-test-renderer'
import {render} from "@testing-library/react-native";
import renderer from 'react-test-renderer';

//test snapshot
const tree = create(<Home />)
test('snapshot', () => {
    expect(tree).toMatchSnapshot();
})

//test renderización
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

//test unitario
describe('<Home />', () => {
    it('has 2 child', () => {
      const tree = renderer.create(<Home />).toJSON();
      expect(tree.children.length).toBe(2);
    });
  });

