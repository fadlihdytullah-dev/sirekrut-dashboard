// @flow
import * as React from 'react';

import {Typography, Input} from 'antd';
import RedDot from '../shared/RedDot';
import View from '../shared/View';

type Props = {
  label: string,
  isRequired?: boolean,
  value: string,
  placeholder?: string,
  error?: string,
  onChange: (event: SyntheticInputEvent<>) => void,
};

function FormInput({
  label,
  isRequired,
  value,
  placeholder,
  error,
  onChange,
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

      <Input
        name="name"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />

      {error && <Typography.Text type="danger">{error}</Typography.Text>}
    </React.Fragment>
  );
}

FormInput.defaultProps = {
  placeholder: '',
  value: '',
  onChange: () => {},
};

export default FormInput;
