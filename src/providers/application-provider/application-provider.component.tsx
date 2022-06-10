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

import { createContext, ReactNode, useContext } from "react";
import { MissingProviderError } from "../../helpers/missing-provider-error";

interface ApplicationContextProps {}

interface ApplicationProviderProps {
  children: ReactNode;
}

const ApplicationContext = createContext<ApplicationContextProps | undefined>(
  undefined
);

export const ApplicationProvider = ({
  children,
}: ApplicationProviderProps): JSX.Element => {
  const value: ApplicationContextProps = {};

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplicationContext = (): ApplicationContextProps => {
  const context = useContext(ApplicationContext);

  if (context === undefined) {
    throw new MissingProviderError(
      "useApplicationContext",
      "ApplicationContextProvider"
    );
  }

  return context;
};
