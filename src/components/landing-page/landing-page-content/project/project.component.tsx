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
import { ProjectProps } from '../../../../api/projects/project.interface';
import { useDeleteProject } from '../../../../api/projects/hooks/use-delete-project.hook';
import { formattingDate } from '../../../../helpers/utils';
import { DeleteProjectDialog } from '../../delete-project';

export const Project = ({ project }: { project: ProjectProps }): JSX.Element => {
    const { deleteProject } = useDeleteProject();

    const onDelete = () => {
        deleteProject.mutate(project.projectID);
    };

    return (
        <div tw="bg-[#ffffff20] py-1.5 px-3 mb-2 relative">
            <div tw="text-base font-bold">{project.projectName}</div>
            <div tw="text-sm font-normal">{formattingDate(project.createdAt, "YYYY-MM-DD")}</div>
            <DeleteProjectDialog 
                onDelete={onDelete} />
            <div tw="h-px bg-[#fff] mt-2" />
        </div>
    );
};
