import {render} from "@testing-library/react";
import ArticlesEditor from "./ArticlesEditor";
import Cookie from 'js-cookie';

describe(ArticlesEditor, () => {
    it("Rendering z role=editor", () => {
        Object.defineProperty(window.document, 'cookie', {
            writable: true,
            value: 'role=editor',
          });

        const {container} = render(<ArticlesEditor/>);
        expect(location.pathname).toEqual('/articlesEditor');
    });

    it("Rendering z role!=editor", () => {
        Object.defineProperty(window.document, 'cookie', {
            writable: true,
            value: 'role=nieedytor',
          });

        const {container} = render(<ArticlesEditor/>);
        expect(location.pathname).not.toEqual('/articlesEditor');
    });
})//TODO NIE DZIALA