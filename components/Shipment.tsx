import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { Image } from "expo-image";
import icons from "../assets/icons/icons";

interface ShipmentItemProps {
  id: string;
  title: string;
  shipmentNumber: string;
  fromCity: string;
  toCity: string;
  status: string;
  isChecked: boolean;
  toggleCheckbox: (id: string) => void;
}

export default function ShipmentItem({
  id,
  title,
  shipmentNumber,
  fromCity,
  toCity,
  status,
  isChecked,
  toggleCheckbox,
}: ShipmentItemProps) {
  return (
    <View
      style={tw`w-full bg-[#F4F2F8] rounded-[10px] px-3 py-3 flex flex-row justify-between items-center mb-2`}
    >
      <View style={tw`flex flex-row items-center gap-3`}>
        <TouchableOpacity
          onPress={() => toggleCheckbox(id)}
          style={tw`w-[24px] h-[24px] border-2 border-gray-400 bg-white rounded-md flex justify-center items-center`}
        >
          {isChecked && <Text style={tw`text-black text-sm`}>✓</Text>}
        </TouchableOpacity>

        <Image style={tw`w-[40px] h-[40px]`} source={icons.boxer} />

        <View style={tw`flex flex-col`}>
          <Text style={tw`font-normal text-[13px]`}>{title}</Text>
          <Text style={tw`font-semibold text-[18px]`}>{shipmentNumber}</Text>
          <View style={tw`flex flex-row items-center gap-1`}>
            <Text style={tw`font-normal text-[13px]`}>{fromCity}</Text>
            <Image
              style={tw`w-[6.67px] h-[5.83px]`}
              source={icons.rightarrow}
            />
            <Text style={tw`font-normal text-[13px]`}>{toCity}</Text>
          </View>
        </View>
      </View>

      <View
        style={tw`bg-[#D9E6FD] border-white border w-[60px] h-[15px] px-2 rounded-[10px]`}
      >
        <Text style={tw`font-medium text-[8px] py-0.5 text-center`}>
          {status}
        </Text>
      </View>

      <Image style={tw`w-[24px] h-[24px]`} source={icons.angle} />
    </View>
  );
}
