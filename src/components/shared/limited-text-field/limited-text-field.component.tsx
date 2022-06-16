import { ForwardedRef, forwardRef } from 'react';

import { TextField } from '@adobe/react-spectrum';
import { SpectrumTextFieldProps, TextFieldRef } from '@react-types/textfield';

export const LimitedTextField = forwardRef(
  (
    props: SpectrumTextFieldProps,
    ref: ForwardedRef<TextFieldRef>
  ): JSX.Element => {
    return <TextField {...props} ref={ref} maxLength={100} />;
  }
);