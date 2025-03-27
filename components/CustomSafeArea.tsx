import React, { ReactNode } from "react";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StatusBar as RNStatusBar,
  StyleProp,
  ViewStyle,
  ViewProps,
} from "react-native";
import { StatusBarProps as ExpoStatusBarProps } from "expo-status-bar";

interface SafeAreaProps {
  children?: ReactNode;

  statusProps?: Partial<ExpoStatusBarProps>;

  viewProps?: ViewProps;

  viewStyle?: StyleProp<ViewStyle>;

  barStyle?: "auto" | "inverted" | "light" | "dark";

  backgroundColor?: string;
}

export function SafeArea({
  children,
  statusProps,
  viewProps,
  viewStyle,
  barStyle,
  backgroundColor = "#fff",
}: SafeAreaProps): JSX.Element {
  return (
    <>
      <StatusBar
        style={barStyle || "auto"}
        backgroundColor={backgroundColor}
        {...statusProps}
        animated
      />
      <SafeAreaView
        style={[
          {
            flex: 1,
            marginTop: RNStatusBar.currentHeight || 0,
            backgroundColor,
            alignItems: "center",
          },
          viewStyle,
        ]}
        {...viewProps}
      >
        {children}
      </SafeAreaView>
    </>
  );
}
