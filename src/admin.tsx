import * as React from "react";
import * as ReactDOM from "react-dom";

import {Main} from './Main/Main';

ReactDOM.render(<Main compiler="TypeScript" framework="React" />,
                  document.getElementById('main'));
