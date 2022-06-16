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
import 'twin.macro';
import { NewProjectDialog, NewProjectDialogProvider } from '../create-project';

export const LandingContent = (): JSX.Element => {
  const projectActions = (
    <div tw="my-auto flex gap-[12px] justify-end">
      <div>{/* Search component */}</div>
      <div>{/* Filter component */}</div>
      <div>{/* Import button component */}</div>
      <NewProjectDialogProvider>
        <NewProjectDialog buttonText={'Create new project'} />
      </NewProjectDialogProvider>
    </div>
  );

  return (
    <>
      <div tw="flex justify-end mt-[16px]">{projectActions}</div>
      <div>{/* Project List Component */}</div>
    </>
  );
};
