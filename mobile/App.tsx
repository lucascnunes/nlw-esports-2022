import { useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Subscription } from "expo-modules-core";
import { Text } from "react-native";
import * as Notifications from "expo-notifications";

import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from "@expo-google-fonts/inter";

import { Routes } from "./src/routes";
import { Background } from "./src/components/Background";
import { Loading } from "./src/components/Loading";

import "./src/services/notificationConfigs";
// import { getNotificationToken } from "./src/services/getPushNotificationToken";
import { registerForPushNotificationsAsync } from "./src/services/registerForPushNotifications";

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState<string>("");

  const getNotificationListener = useRef<Subscription>();
  const responseNotificationListener = useRef<Subscription>();

  useEffect(() => {
    // getNotificationToken();
  });

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));

    getNotificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      console.log(notification);
    });

    responseNotificationListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response);
      }
    );

    return () => {
      if (getNotificationListener.current && responseNotificationListener.current) {
        Notifications.removeNotificationSubscription(getNotificationListener.current);
        Notifications.removeNotificationSubscription(responseNotificationListener.current);
      }
    };
  }, []);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  });

  return (
    <Background>
      <StatusBar style="light" />
      {fontsLoaded ? <Routes /> : <Loading />}
      <Text
        style={{
          color: "#6061613e",
          fontSize: 10,
          paddingHorizontal: 12,
          paddingVertical: 12,
          alignItems: "center",
        }}
      >
        {expoPushToken} - NLW eSports v.1
      </Text>
    </Background>
  );
}
