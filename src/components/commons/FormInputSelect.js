// @flow
import * as React from 'react';

import {Select, Typography} from 'antd';
import View from '../shared/View';
import RedDot from '../shared/RedDot';

type Props = {
  options: Array<{key?: string, value: Object, label: string}>,
  label?: string,
  isRequired?: boolean,
  value: Object,
  error?: string,
  onChange: (value: Object) => void,
};

const styles = {
  fullWidth: {width: '100%'},
};

function FormInputSelect({
  options,
  label,
  isRequired,
  value,
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

      <Select onChange={onChange} value={value} style={styles.fullWidth}>
        {options.map((option, index) => (
          <Select.Option key={option.key || index} value={option.value}>
            {option.label}
          </Select.Option>
        ))}
      </Select>

      {error && <Typography.Text type="danger">{error}</Typography.Text>}
    </React.Fragment>
  );
}

FormInputSelect.defaultProps = {
  onChange: () => {},
  value: null,
};

export default FormInputSelect;
