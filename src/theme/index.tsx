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

import { createGlobalStyle } from 'styled-components';
import tw, { GlobalStyles as BaseStyles } from 'twin.macro';

import { defaultTheme } from '@adobe/react-spectrum';
import { Theme } from '@react-types/provider';

import dark from './canyon-dark.module.css';
import light from './canyon-light.module.css';
import global from './canyon.module.css';

export const CanyonTheme: Theme = {
  ...defaultTheme,
  dark,
  light,
  global: {
    ...defaultTheme.global,
    ...global,
  },
};

const CustomStyles = createGlobalStyle`
  html {
    scroll-behavior: smooth;
    &.dark {
      color: white;
    }
    &.light {
      color: black;
    }
  }

  body {
    ${tw`antialiased`}
  }

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  
  ::-webkit-scrollbar-track {
    border-radius: 6px;
    background: transparent;
  }
  
  ::-webkit-scrollbar-thumb {
    border-radius: 6px;
    background: #0C1938;
    box-shadow: inset 0 0 4px #fff2;
  }
`;

const GlobalStyles = () => (
  <>
    {/* <BaseStyles /> */}
    <CustomStyles />
  </>
);

export default GlobalStyles;
