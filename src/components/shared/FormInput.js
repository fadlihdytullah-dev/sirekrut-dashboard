// @flow
import * as React from 'react';

import {Typography, Input, InputNumber, DatePicker} from 'antd';
import RedDot from './RedDot';
import View from './View';

type Props = {
  config?: {
    allowClear?: boolean,
    inline?: boolean,
  },
  inputProps?: {
    type:
      | 'text'
      | 'number'
      | 'textarea'
      | 'date'
      | 'password'
      | 'date-range'
      | 'email',
    min?: number,
    max?: number,
  },
  label?: string,
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
          required={isRequired}
          name="name"
          placeholder={placeholder}
          value={value}
          allowClear={(config && config.allowClear) || false}
          onChange={onChange}
          // $FlowFixMe
          {...otherProps}
        />
      )}

      {inputProps && inputProps.type === 'password' && (
        <Input.Password
          required={isRequired}
          placeholder={placeholder}
          value={value}
          allowClear={(config && config.allowClear) || false}
          onChange={onChange}
          // $FlowFixMe
          {...otherProps}
        />
      )}

      {inputProps && inputProps.type === 'email' && (
        <Input
          required={isRequired}
          type="email"
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
          required={isRequired}
          min={inputProps.min}
          max={inputProps.max}
          value={value}
          onChange={onChange}
          style={config && config.inline ? {} : styles.fullWidth}
          // $FlowFixMe
          {...otherProps}
        />
      )}

      {inputProps && inputProps.type === 'textarea' && (
        <Input.TextArea
          required={isRequired}
          value={value}
          allowClear={(config && config.allowClear) || false}
          onChange={onChange}
          // $FlowFixMe
          {...otherProps}
        />
      )}

      {inputProps && inputProps.type === 'date' && (
        <DatePicker
          value={value}
          onChange={onChange}
          // $FlowFixMe
          {...otherProps}
        />
      )}

      {inputProps && inputProps.type === 'date-range' && (
        <DatePicker.RangePicker
          value={value}
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
