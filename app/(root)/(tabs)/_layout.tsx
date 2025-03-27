import { View, Text } from "react-native";
import React from "react";
import { Tabs, Slot } from "expo-router";
import icons from "@/assets/icons/icons";
import tw from "twrnc";
import { Image } from "expo-image";

// const TabIcon = ({
//   focused,
//   icon,
//   title,
// }: {
//   focused: boolean;
//   icon: any;
//   title: string;
// }) => (
//   <View style={tw`flex-1 mt-3 flex flex-col items-center`}>
//     <Image
//       source={icon}
//       tintColor={focused ? "#0011FF1A" : "#000"}
//       resizeMode="contain"
//       style={[tw`w-[24px] h-[24px]`, focused && { tintColor: "blue" }]}
//     />
//     <Text
//       style={tw`${
//         focused ? "text-pink-500  font-medium" : "text-black "
//       } text-xs w-full text-center mt-1`}
//     >
//       {title}
//     </Text>
//   </View>
// );

const TabIcon = ({
  focused,
  icon,
  title,
}: {
  focused: boolean;
  icon: any;
  title: string;
}) => {
  // console.log("Icon being used:", icon);

  return (
    <View style={tw`flex-1 mt-3 flex flex-col items-center`}>
      <Image
        source={icon}
        tintColor={focused ? "#2F50C1" : "##2F50C1"}
        // resizeMode="contain"
        style={[tw`w-[24px] h-[24px]`, focused && { tintColor: "##2F50C1" }]}
      />
      <Text
        style={tw`${
          focused
            ? "text-[#5B4CCC]  font-medium text-[11px] leading-[13px]"
            : "text-black font-medium text-[11px] leading-[13px]"
        } text-xs w-full text-center mt-1`}
      >
        {title}
      </Text>
    </View>
  );
};
const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "white",
          position: "absolute",
          borderTopColor: "#0011FF1A",
          borderTopWidth: 1,
          minHeight: 70,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.boxes} focused={focused} title="Shipments" />
            // <Image
            //   style={tw`w-[25x] h-[25px] bg-black w-full h-[500px]`}
            //   source={require("../../../assets/images/Vector.svg")}
            //   // placeholder={{ blurhash }}
            //   // contentFit="cover"
            //   // transition={1000}
            // />
          ),
        }}
      />

      <Tabs.Screen
        name="scan"
        options={{
          title: "scan",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.Barcode} focused={focused} title="scan" />
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: "wallet",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.wallet} focused={focused} title="wallet" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.profile} focused={focused} title="profile" />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
