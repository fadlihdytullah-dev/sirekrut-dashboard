// @flow
export const capitalize = (str: string) => {
  const chunks = str.split(' ');
  const capitalizeChunks = chunks.map((str) => {
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
  });

  return capitalizeChunks.join(' ');
};

export const getColumnSortProps = (
  dataIndex: string,
  isNumeric?: boolean
): Object => {
  if (isNumeric) {
    return {
      sorter: (a, b) => a[dataIndex] - b[dataIndex],
    };
  }

  return {
    sorter: (a, b) => a[dataIndex].length - b[dataIndex].length,
  };
};

export const isEmpty = (str: string) => str.trim().length === 0;

export const isBetween = (num: number, start: number, finish: number) =>
  num >= start && num <= finish;

export const setterStateObject = (state: any, name: string, value: *) => {
  return {...state, [name]: value};
};
