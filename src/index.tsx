/*
##############################################################################
#
# Copyright (C) 2022 Intel Corporation
# 
# This software and the related documents are Intel copyrighted materials,
# and your use of them is governed by the express license under which they
# were provided to you ("License"). Unless the License provides otherwise,
# you may not use, modify, copy, publish, distribute, disclose or transmit
# this software or the related documents without Intel's prior written
# permission.
#
# This software and the related documents are provided as is, with no
# express or implied warranties, other than those that are expressly stated
# in the License.
#
##############################################################################
*/

import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { ErrorBoundary } from "./components/errors/error-boundary.component";
import { NotificationProvider } from "./components/shared/notification";
import { RouteBasedApplicationServiceProvider } from "./providers/application-provider/route-based-application-service-provider.component";
import reportWebVitals from "./report-web-vitals";
import { ThemeProvider } from "./theme/theme-provider.component";
import { GlobalStyles } from "twin.macro";
import StylesBase from "./theme";

function importBuildTarget(): Promise<
  typeof import("./components/app.component")
> {
  return import("./components/app.component");
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false,
    },
  },
});

importBuildTarget().then(({ default: App }) =>
  ReactDOM.render(
    <div>
      <GlobalStyles />
      <StylesBase />
      <ErrorBoundary>
        <StrictMode>
          <Router>
            <ThemeProvider>
              <RouteBasedApplicationServiceProvider>
                <NotificationProvider>
                  <QueryClientProvider client={queryClient}>
                    <App />
                  </QueryClientProvider>
                </NotificationProvider>
              </RouteBasedApplicationServiceProvider>
            </ThemeProvider>
          </Router>
        </StrictMode>
      </ErrorBoundary>
    </div>,
    document.getElementById("root")
  )
);

reportWebVitals();
