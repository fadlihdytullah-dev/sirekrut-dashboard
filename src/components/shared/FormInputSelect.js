// @flow
import * as React from 'react';

import {Select, Typography} from 'antd';
import View from './View';
import RedDot from './RedDot';
import {capitalize} from '../../App/Utils';

type Props = {
  config?: {
    allowClear?: boolean,
    multiple?: boolean,
  },
  options: Array<{key?: string, value: Object, label: string}>,
  label?: string,
  isRequired?: boolean,
  value: Object,
  error?: string,
  onChange: (value: Object) => void,
  disabled?: boolean,
};

const styles = {
  fullWidth: {width: '100%'},
};

function FormInputSelect({
  config,
  options,
  label,
  isRequired,
  value,
  error,
  onChange,
  disabled,
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

      <Select
        value={value}
        style={styles.fullWidth}
        mode={config && config.multiple ? 'multiple' : null}
        allowClear={(config && config.allowClear) || false}
        onChange={onChange}
        disabled={disabled}>
        {options.map((option, index) => (
          <Select.Option key={option.key || index} value={option.value}>
            {capitalize(option.label)}
          </Select.Option>
        ))}
      </Select>

      {error && <Typography.Text type="danger">{error}</Typography.Text>}
    </React.Fragment>
  );
}

FormInputSelect.defaultProps = {
  disabled: false,
  value: null,
  onChange: () => {},
};

export default FormInputSelect;
