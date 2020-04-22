// @flow
import * as React from 'react';

import {Typography, Input, InputNumber} from 'antd';
import RedDot from './RedDot';
import View from './View';

type Props = {
  config?: {
    allowClear?: boolean,
  },
  inputProps?: {
    type: 'text' | 'number' | 'textarea',
    min?: number,
    max?: number,
  },
  label: string,
  isRequired?: boolean,
  value: *,
  placeholder?: string,
  error?: string,
  onChange: (value: any) => void,
  otherProps?: Object,
};

const styles = {
  fullWidth: {
    width: '100%',
  },
};

function FormInput({
  config,
  inputProps,
  label,
  isRequired,
  value,
  placeholder,
  error,
  onChange,
  ...otherProps
}: Props) {
  return (
    <React.Fragment>
      {label && (
        <View marginBottom={4}>
          <Typography.Text>
            {label} {isRequired && <RedDot />}
          </Typography.Text>
        </View>
      )}

      {inputProps && inputProps.type === 'text' && (
        <Input
          name="name"
          placeholder={placeholder}
          value={value}
          allowClear={(config && config.allowClear) || false}
          onChange={onChange}
          // $FlowFixMe
          {...otherProps}
        />
      )}

      {inputProps && inputProps.type === 'number' && (
        <InputNumber
          min={inputProps.min}
          max={inputProps.max}
          value={value}
          onChange={onChange}
          style={styles.fullWidth}
          // $FlowFixMe
          {...otherProps}
        />
      )}

      {inputProps && inputProps.type === 'textarea' && (
        <Input.TextArea
          value={value}
          allowClear={(config && config.allowClear) || false}
          onChange={onChange}
          // $FlowFixMe
          {...otherProps}
        />
      )}

      {error && <Typography.Text type="danger">{error}</Typography.Text>}
    </React.Fragment>
  );
}

FormInput.defaultProps = {
  inputProps: {
    type: 'text',
  },
  placeholder: '',
  value: '',
  onChange: () => {},
};

export default FormInput;
