import React from "react";
import ShoppingList from "../screens/shoppingList/ShoppingList";
import {create} from 'react-test-renderer'
import {render} from "@testing-library/react-native";

const tree = create(<ShoppingList />)

test('snapshot', () => {
    expect(tree).toMatchSnapshot();
}) 

describe("<ShoppingList />", () => {
    beforeEach(() => {
        component = render(<ShoppingList />);
    });

    it("Renderiza correctamente", () => {
        expect(component).toBeDefined();
    });
})