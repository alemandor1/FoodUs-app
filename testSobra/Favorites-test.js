import React from "react";
import Favorites from "../screens/favourites/Favourites";
import {create} from 'react-test-renderer'
import {render} from "@testing-library/react-native";

const tree = create(<Favorites />)

test('snapshot', () => {
    expect(tree).toMatchSnapshot();
})

describe("<Favorites />", () => {
    beforeEach(() => {
        component = render(<Favorites />);
    });

    it("Renderiza correctamente", () => {
        expect(component).toBeDefined();
    });
})