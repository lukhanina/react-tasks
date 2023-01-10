import React from "react";
import Message from "./Message";
import {render} from '@testing-library/react';

describe('testing Message', () => {
  it('render component Message', () => {
    render(<Message/>)
  })
})
