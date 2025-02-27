/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

'use strict';

import {typeof VirtualizedList as VirtualizedListType} from '@react-native-tvos/virtualized-lists';

const VirtualizedList: VirtualizedListType =
  require('@react-native-tvos/virtualized-lists').VirtualizedList;

export type {
  RenderItemProps,
  RenderItemType,
  Separators,
} from '@react-native-tvos/virtualized-lists';
module.exports = VirtualizedList;
