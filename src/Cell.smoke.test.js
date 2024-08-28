import React from 'react';
import { render } from '@testing-library/react';
import Cell from './Cell';

it("renders without crashing", () => {
    render(
        <Cell />
    );
});