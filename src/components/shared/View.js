// @flow
import * as React from 'react';

import styled, {css, type StyledComponent} from 'styled-components';
import {numToRem} from './utils';

type Size = 0 | 4 | 8 | 10 | 12 | 14 | 16 | 20 | 24 | 32 | 40 | number;

type FlexDirectionVariant = 'column' | 'row';

type FlexVariant =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around';

type FlexAlignVariant = 'stretch' | 'center' | 'start' | 'end';

type Props = {
  children?: React$Node,
  background?: string,
  flex?: string | number,
  flexDirection?: FlexDirectionVariant,
  flexJustifyContent?: FlexVariant,
  flexAlignItems?: FlexVariant,
  flexAlignSelf?: FlexAlignVariant,
  marginLeft?: Size,
  marginRight?: Size,
  marginX?: Size,
  marginTop?: Size,
  marginBottom?: Size,
  marginY?: Size,
  margin?: Size,
  paddingLeft?: Size,
  paddingRight?: Size,
  paddingX?: Size,
  paddingTop?: Size,
  paddingBottom?: Size,
  paddingY?: Size,
  padding?: Size,
  textAlign?: 'left' | 'right' | 'center',
  overflow?: 'hidden' | 'initial' | 'auto',
};

const StyledView: StyledComponent<Props, *, *> = styled.div`
  ${(props) =>
    props.flex ||
    props.flexDirection ||
    props.flexJustifyContent ||
    props.flexAlignItems ||
    props.flexAlignSelf
      ? css`
          display: flex;
        `
      : ''};

  ${(props) =>
    css`
      ${props.flex
        ? css`
            flex: ${props.flex};
          `
        : ''};
      ${props.flexDirection
        ? css`
            flex-direction: ${props.flexDirection};
          `
        : ''};
      ${props.flexAlignItems
        ? css`
            align-items: ${props.flexAlignItems};
          `
        : ''};
      ${props.flexJustifyContent
        ? css`
            justify-content: ${props.flexJustifyContent};
          `
        : ''};
      ${props.flexAlignSelf
        ? css`
            align-self: ${props.flexAlignSelf};
          `
        : ''};
      ${props.flexWrap
        ? css`
            flex-wrap: ${props.flexWrap};
          `
        : ''};
    `};

  ${(props) =>
    props.background
      ? css`
          background-color: ${props.background};
        `
      : css``};

  ${(props) =>
    props.overflow
      ? css`
          width: 100%;
          overflow: ${props.overflow};
        `
      : css``};

  ${(props) =>
    props.margin
      ? css`
          margin: ${numToRem(props.margin)};
        `
      : ''};
  ${(props) =>
    props.marginTop
      ? css`
          margin-top: ${numToRem(props.marginTop)};
        `
      : ''};
  ${(props) =>
    props.marginBottom
      ? css`
          margin-bottom: ${numToRem(props.marginBottom)};
        `
      : ''};
  ${(props) =>
    props.marginLeft
      ? css`
          margin-left: ${numToRem(props.marginLeft)};
        `
      : ''};
  ${(props) =>
    props.marginRight
      ? css`
          margin-right: ${numToRem(props.marginRight)};
        `
      : ''};
  ${(props) =>
    props.marginY
      ? css`
          margin-top: ${numToRem(props.marginY)};
          margin-bottom: ${numToRem(props.marginY)};
        `
      : ''};
  ${(props) =>
    props.marginX
      ? css`
          margin-left: ${numToRem(props.marginX)};
          margin-right: ${numToRem(props.marginX)};
        `
      : ''};
  ${(props) =>
    props.padding
      ? css`
          padding: ${numToRem(props.padding)};
        `
      : ''};
  ${(props) =>
    props.paddingTop
      ? css`
          padding-top: ${numToRem(props.paddingTop)};
        `
      : ''};
  ${(props) =>
    props.paddingBottom
      ? css`
          padding-bottom: ${numToRem(props.paddingBottom)};
        `
      : ''};
  ${(props) =>
    props.paddingLeft
      ? css`
          padding-left: ${numToRem(props.paddingLeft)};
        `
      : ''};
  ${(props) =>
    props.paddingRight
      ? css`
          padding-right: ${numToRem(props.paddingRight)};
        `
      : ''};
  ${(props) =>
    props.paddingY
      ? css`
          padding-top: ${numToRem(props.paddingY)};
          padding-bottom: ${numToRem(props.paddingY)};
        `
      : ''};
  ${(props) =>
    props.paddingX
      ? css`
          padding-left: ${numToRem(props.paddingX)};
          padding-right: ${numToRem(props.paddingX)};
        `
      : ''};

  ${(props) =>
    props.textAlign
      ? css`
          text-align: ${props.textAlign};
        `
      : css``};
`;

function View(props: Props) {
  return (
    <StyledView
      overflow={props.overflow}
      flex={props.flex}
      flexDirection={props.flexDirection}
      flexJustifyContent={props.flexJustifyContent}
      flexAlignItems={props.flexAlignItems}
      flexAlignSelf={props.flexAlignSelf}
      margin={props.margin}
      marginTop={props.marginTop}
      marginBottom={props.marginBottom}
      marginLeft={props.marginLeft}
      marginRight={props.marginRight}
      marginY={props.marginY}
      marginX={props.marginX}
      padding={props.padding}
      paddingTop={props.paddingTop}
      paddingBottom={props.paddingBottom}
      paddingLeft={props.paddingLeft}
      paddingRight={props.paddingRight}
      paddingY={props.paddingY}
      paddingX={props.paddingX}
      {...props}>
      {props.children}
    </StyledView>
  );
}

export default View;
