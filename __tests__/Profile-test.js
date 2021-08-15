import React from "react";
import Profile from "../screens/profile/Profile";
import {create} from 'react-test-renderer'
import {render} from "@testing-library/react-native";
import renderer from 'react-test-renderer';

//test snapshot
const tree = create(<Profile />)
test('snapshot', () => {
    expect(tree).toMatchSnapshot();
}) 

//test renderización
describe("<Profile />", () => {
    beforeEach(() => {
        component = render(<Profile />);
    });

    it("Renderiza correctamente", () => {
        expect(component).toBeDefined();
        expect(component.getByTestId("buttonReturn")).toBeDefined();
    });
})

//test unitario
describe('<Profile />', () => {
    it('has 1 child', () => {
      const tree = renderer.create(<Profile />).toJSON();
      expect(tree.children.length).toBe(1);
    });
  });