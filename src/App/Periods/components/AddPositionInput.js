// @flow
import * as React from 'react';
import {Button, Typography, Select, List, Badge} from 'antd';
import FormInput from '../../../components/shared/FormInput';
import View from '../../../components/shared/View';
import RedDot from '../../../components/shared/RedDot';
import {DeleteOutlined} from '@ant-design/icons';

type Props = {
  data: {
    positionsData: Array<any>,
  },
  setFormData: any,
};

function AddPositionInput(props: Props) {
  const [quota, setQuota] = React.useState(1);
  const [positionID, setPositionID] = React.useState(undefined);
  const [addedPositions, setAddedPositions] = React.useState([]);
  const [addedPositionIDs, setAddedPositionIDs] = React.useState([]);

  console.log('ℹ️ addedPositions:=', addedPositions);
  console.log('ℹ️ addedPositionIDs:=', addedPositionIDs);

  const handleAddPosition = () => {
    setAddedPositionIDs((state) => [...state, positionID]);
    const newData = {positionID, quota};
    setAddedPositions((state) => [...state, newData]);
    setPositionID(undefined);
    setQuota(1);
  };

  const handleChangeSelect = (id) => {
    setPositionID(id);
  };

  const handleChangeQuota = (value: number) => {
    setQuota(value);
  };

  const handleDeleteSelectedPosition = (id) => {
    const updatedAddedPositions = addedPositions.filter(
      (item) => item.positionID !== id
    );
    setAddedPositions(updatedAddedPositions);
    const updatedPositionIDs = addedPositionIDs.map((item) => item !== id);
    setAddedPositionIDs(updatedPositionIDs);
  };

  return (
    <React.Fragment>
      <View marginBottom={4}>
        <View marginRight={8}>
          <Typography.Text>
            Posisi dibutuhkan <RedDot />
          </Typography.Text>
        </View>
      </View>

      {!props.data.isAllPositions ? (
        <React.Fragment>
          <View flex={1} marginBottom={16}>
            <View marginRight={8}>
              <Select
                showSearch
                style={{width: 200}}
                placeholder="Pilih posisi"
                optionFilterProp="children"
                value={positionID}
                onChange={handleChangeSelect}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }>
                {props.data.positionsData.map((item) => {
                  if (!addedPositionIDs.includes(item.id)) {
                    return (
                      <Select.Option key={item.id} value={item.id}>
                        {item.name}
                      </Select.Option>
                    );
                  }

                  return null;
                })}
              </Select>
            </View>

            <View marginRight={8}>
              <FormInput
                config={{
                  inline: true,
                }}
                inputProps={{
                  type: 'number',
                  min: 1,
                  max: 4,
                }}
                isRequired
                value={quota}
                onChange={handleChangeQuota}
              />
            </View>

            <Button onClick={handleAddPosition}>Tambah</Button>
          </View>

          <View>
            <List
              bordered
              size="small"
              dataSource={addedPositions}
              renderItem={(item) => (
                <List.Item>
                  <View flex={1} flexJustifyContent="space-between">
                    <View flex={1}>
                      <View marginRight={16}>
                        <Typography.Text>
                          {props.data.positionsData.find(
                            (position) => position.id === item.positionID
                          ).name || ''}
                        </Typography.Text>
                      </View>
                      <Badge
                        count={item.quota}
                        style={{backgroundColor: '#1890ff'}}
                      />
                    </View>
                    <Button
                      size="small"
                      type="link"
                      danger
                      onClick={() =>
                        handleDeleteSelectedPosition(item.positionID)
                      }>
                      <DeleteOutlined />
                    </Button>
                  </View>
                </List.Item>
              )}
            />
          </View>
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
}

export default AddPositionInput;
