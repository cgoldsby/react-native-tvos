/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import type {RNTesterModuleExample} from '../../types/RNTesterTypes';

import * as React from 'react';
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  useTVEventHandler,
} from 'react-native';

function TVEventView(): React.Node {
  const [lastEventType, setLastEventType] = React.useState('');
  const myTVEventHandler = (evt: {eventType: string}) => {
    setLastEventType(evt.eventType);
  };
  useTVEventHandler(myTVEventHandler);
  if (Platform.isTV) {
    return <Text>TVEvent: {lastEventType}</Text>;
  } else {
    return <View />;
  }
}

function ModalOnShowOnDismiss(): React.Node {
  const [modalShowComponent, setModalShowComponent] = React.useState(true);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [onShowCount, setOnShowCount] = React.useState(0);
  const [onDismissCount, setOnDismissCount] = React.useState(0);

  const [lastEvent, setLastEvent] = React.useState('');

  const buttonOpacity = (pressed: boolean, focused: boolean) =>
    pressed || focused ? 0.7 : 1.0;

  useTVEventHandler(evt => {
    setLastEvent(evt.eventType);
  });

  return (
    <View style={styles.container}>
      {modalShowComponent && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onShow={() => {
            setOnShowCount(onShowCount + 1);
          }}
          onDismiss={() => {
            setOnDismissCount(onDismissCount + 1);
          }}
          onRequestClose={() => {
            setModalVisible(false);
          }}>
          <View style={[styles.centeredView, styles.modalBackdrop]}>
            <View style={styles.modalView}>
              <TVEventView />
              <Text testID="modal-on-show-count">
                onShow is called {onShowCount} times
              </Text>
              <Text testID="modal-on-dismiss-count">
                onDismiss is called {onDismissCount} times
              </Text>
              <Pressable
                style={({pressed, focused}) => [
                  styles.button,
                  styles.buttonClose,
                  {opacity: buttonOpacity(pressed, focused)},
                ]}
                onPress={() => setModalVisible(false)}>
                <Text testID="dismiss-modal" style={styles.textStyle}>
                  Hide modal by setting visible to false
                </Text>
              </Pressable>
              <Pressable
                style={({pressed, focused}) => [
                  styles.button,
                  styles.buttonClose,
                  {opacity: buttonOpacity(pressed, focused)},
                ]}
                onPress={() => setModalShowComponent(false)}>
                <Text
                  testID="dismiss-modal-by-removing-component"
                  style={styles.textStyle}>
                  Hide modal by removing component
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
      <Text testID="on-show-count">onShow is called {onShowCount} times</Text>
      <Text testID="on-dismiss-count">
        onDismiss is called {onDismissCount} times
      </Text>
      <Text> Last event = {lastEvent}</Text>
      <Pressable
        style={({pressed, focused}) => [
          styles.button,
          styles.buttonOpen,
          {opacity: buttonOpacity(pressed, focused)},
        ]}
        onPress={() => {
          setModalShowComponent(true);
          setModalVisible(true);
        }}>
        <Text testID="open-modal" style={styles.textStyle}>
          Show Modal
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'flex-start',
    paddingVertical: 30,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    marginVertical: 20,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ({
  title: "Modal's onShow/onDismiss",
  name: 'onShow',
  description:
    'onShow and onDismiss (iOS only) callbacks are called when a modal is shown/dismissed',
  render: (): React.Node => <ModalOnShowOnDismiss />,
}: RNTesterModuleExample);
