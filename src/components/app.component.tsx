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

import { Suspense } from "react";

import { AxiosRequestConfig, AxiosResponse } from "axios";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { setLogger } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Route, Routes } from "react-router-dom";

import { Loading } from "./shared";
import { ROUTER_PATHS } from "../routes";
import { useStorage } from "../hooks";
import { ApplicationProvider } from "../providers";

interface ResponseError {
  message: string;
  name: string;
  stack: string;
  config: AxiosRequestConfig;
  response: AxiosResponse;
}

const App = (): JSX.Element => {
  useStorage();

  setLogger({
    log: (log: string) => console.log(log),
    warn: (warn: string) => console.warn(warn),
    error: (error: ResponseError) => {
      if (
        error.hasOwnProperty("message") &&
        error.hasOwnProperty("config") &&
        error.hasOwnProperty("response")
      ) {
        const errorLog = `Error: '${error.message}'`;
        const urlLog = `Request url: '${error.config.url}'`;
        const requestBody = `Request body: ${
          error.config ? error.config.data : undefined
        }`;
        const responseBody = `Response body: ${
          error.response ? JSON.stringify(error.response.data) : undefined
        }`;
        console.error(
          `${errorLog}, ${urlLog}, ${requestBody}, ${responseBody}`
        );
      } else {
        console.error(error);
      }
    },
  });

  return (
    <>
      <ApplicationProvider>
        <DndProvider backend={HTML5Backend}>
          <Routes>
            <Route
              path={ROUTER_PATHS.PROJECT}
              element={<Suspense fallback={<Loading />}></Suspense>}
            />
            {/* <Route path={ROUTER_PATHS.LANDING_PAGE} element={LandingPage} /> */}
          </Routes>
        </DndProvider>
      </ApplicationProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};

export default App;
