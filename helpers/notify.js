import React from 'react';
import { AsyncStorage } from 'react-native'

import * as Permissions from 'expo-permissions'
import { Notifications } from 'expo';

const NOTIFICATION_KEY = 'FlashCards'

export function clearLocalNotifications() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
  .then(Notifications.cancelAllScheduledNotificationsAsync);
}

export function setLocalNotification() {
AsyncStorage.getItem(NOTIFICATION_KEY)
  .then(JSON.parse)
  .then((data) => {
    if (data === null) {
      Permissions.askAsync(Permissions.NOTIFICATIONS).then(
        ({ status }) => {
          if (status === 'granted') {
            Notifications.cancelAllScheduledNotificationsAsync();

            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1)
            tomorrow.setHours(20)
            tomorrow.setMinutes(0)

            Notifications.scheduleLocalNotificationAsync(
              {
                title: 'Log your stats!',
                body:
                    "👋 don't forget to log your stats for today!",
                ios: {
                    sound: true,
                },
                android: {
                    sound: true,
                    sticky: false,
                },
              },
              {
                time: tomorrow,  
                repeat: 'day',
              }
            );

            AsyncStorage.setItem(
                NOTIFICATION_KEY,
                JSON.stringify(true)
            );
          }
        }
      );
    }
  });
}