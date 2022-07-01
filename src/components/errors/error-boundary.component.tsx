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

import { ReactNode } from 'react';

import StatusCodes from 'http-status-codes';
import { ErrorBoundary as Boundary, FallbackProps } from 'react-error-boundary';

import { ErrorScreen } from './general-error-screen/general-error-screen.component';
import { ServiceUnavailable } from './service-unavailable/service-unavailable.component';
import { UnauthenticatedUser } from './unauthenticated-user/unauthenticated-user.component';

const ErrorFallback = ({ error }: FallbackProps) => {
  const errorType = Number(error.message);

  switch (errorType) {
    case StatusCodes.SERVICE_UNAVAILABLE:
    case StatusCodes.TOO_MANY_REQUESTS:
      return <ServiceUnavailable />;
    case StatusCodes.UNAUTHORIZED:
      return <UnauthenticatedUser />;
    default:
      return <ErrorScreen errorDescription={error.message} />;
  }
};

export interface ErrorBoundaryProps {
  children: ReactNode;
}

export const ErrorBoundary = ({
  children,
}: ErrorBoundaryProps): JSX.Element => {
  return <Boundary FallbackComponent={ErrorFallback}>{children}</Boundary>;
};
