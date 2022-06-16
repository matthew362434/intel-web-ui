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
import { Link } from 'react-router-dom';
import tw from 'twin.macro';
import { ROUTER_PATHS } from '../../../routes';
import Logo from '../../../assets/brain.png';

export const LandingPageHeader = ({
  grayscale = false,
}: {
  grayscale?: boolean;
}): JSX.Element => {
  return (
    <>
      <div
        css={[grayscale && tw``, !grayscale && tw`bg-[#0095ca]`, tw`h-[72px]`]}
      >
        <div tw="h-full flex">
          <div hidden={grayscale} tw="bg-[#00C7FD] w-[16px]" />
          <Link
            to={ROUTER_PATHS.LANDING_PAGE}
            tw="flex items-center text-[#e3e3e5]"
          >
            <div
              tw="ml-[16px] pl-[16px] h-[20px] my-auto bg-cover bg-no-repeat bg-center"
              css={{ backgroundImage: `url(${Logo})` }}
            />

            <div tw="ml-[16px] my-auto text-xl font-semibold">Canyon</div>
          </Link>
        </div>

        {/* <HeaderActions grayscale={grayscale} /> */}
      </div>
      <div hidden={grayscale} tw="w-[16px] h-[16px] bg-[#0095ca] absolute" />
      <div
        hidden={grayscale}
        tw="w-[8px] h-[8px] bg-[#0095ca] absolute ml-[16px] mt-[16px]"
      />
    </>
  );
};
