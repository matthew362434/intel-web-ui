import { Text, Flex } from '@adobe/react-spectrum';

interface ValidationErrorMsgProps {
  errorMsg: string;
  inheritHeight?: boolean;
  maxWidth?: string;
}

export const ValidationErrorMsg = ({
  errorMsg,
  inheritHeight = false,
  maxWidth,
}: ValidationErrorMsgProps): JSX.Element => {
  return (
    <Flex
      alignItems={'center'}
      height={inheritHeight ? 'inherit' : 'size-300'}
      UNSAFE_style={{ fontSize: 'small', color: 'red' }}
      maxWidth={maxWidth}
    >
      <Text UNSAFE_style={{ whiteSpace: 'normal' }}>{errorMsg}</Text>
    </Flex>
  );
};
