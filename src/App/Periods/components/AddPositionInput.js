// @flow
import * as React from 'react';
import {Button, Typography, Select, List, Badge} from 'antd';
import FormInput from '../../../components/shared/FormInput';
import View from '../../../components/shared/View';
import RedDot from '../../../components/shared/RedDot';
import {DeleteOutlined} from '@ant-design/icons';

type Props = {
  positions?: Array<any>,
  data: {
    positionsData: Array<any>,
  },
  addData: any,
};

function AddPositionInput({data, addData, positions}: Props) {
  const [quota, setQuota] = React.useState(1);
  const [positionID, setPositionID] = React.useState(undefined);
  const [name, setName] = React.useState(undefined);
  const [addedPositions, setAddedPositions] = React.useState([]);
  const [addedPositionIDs, setAddedPositionIDs] = React.useState([]);

  const handleAddPosition = (e) => {
    setAddedPositionIDs((state) => [...state, positionID]);
    const newData = {positionID, quota, name};
    setAddedPositions((state) => [...state, newData]);
    setPositionID(undefined);
    setName(undefined);
    setQuota(1);
  };
  React.useEffect(
    () => {
      // Manipulate from positionId to id due the server needed
      const newData = addedPositions.map((item) => {
        return {
          id: item.positionID,
          ...item,
        };
      });

      addData(newData);
    },

    // eslint-disable-next-line
    [addedPositions]
  );

  const handleChangeSelect = (id) => {
    setPositionID(id);
    const name =
      data.positionsData.find((position) => position.id === id).name || '';
    setName(name);
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
              filterOption={(input, option) => {
                return (
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                );
              }}>
              {data.positionsData.map((item) => {
                if (
                  !addedPositionIDs.includes(item.id) &&
                  item.status === 'ACTIVE'
                ) {
                  return (
                    <Select.Option key={item.id} value={item.id} ss={'aww'}>
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
                max: 99,
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
                        {data.positionsData.find(
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
    </React.Fragment>
  );
}

export default AddPositionInput;
