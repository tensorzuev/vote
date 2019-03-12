import * as React from "react";
import * as ReactDOM from "react-dom";

import {Vote} from './Client/Vote';

ReactDOM.render(<Vote compiler="TypeScript" framework="React" />,
                  document.getElementById('main'));
