import {render} from "@testing-library/react";
import Articles from "./Articles";

describe(Articles, () => {
    it("Miniaturki z tytułami mają stały rozmiar", () => {
        const {container} = render(<Articles/>);
        const divs = container.getElementsByClassName('articleDiv');
        setTimeout( () => {
            console.log("divs: ",divs);
            divs.forEach(element => {
                expect(element.height).toEqual("270");
                expect(element.width).toEqual("250");
            });
        }, 10000);
    })
})