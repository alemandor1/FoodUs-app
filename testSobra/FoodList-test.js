import React from "react";
import FoodList from "../screens/foodList/FoodList";
import {create} from 'react-test-renderer'
import {render} from "@testing-library/react-native";

const tree = create(<FoodList />)

test('snapshot', () => {
    expect(tree).toMatchSnapshot();
})  

describe("<FoodList />", () => {
    beforeEach(() => {
        component = render(<FoodList />);
    });

    it("Renderiza correctamente", () => {
        expect(component).toBeDefined();
    });
}) 