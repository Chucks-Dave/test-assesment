import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Pressable,
} from "react-native";
import React, { memo, useState } from "react";
import { Image } from "expo-image";
import { SafeArea } from "@/components/CustomSafeArea";
import tw, { style } from "twrnc";
import icons from "@/assets/icons/icons";
import ShipmentItem from "@/components/Shipment";
import Modal from "react-native-modal";

interface FilterModalProps {
  // isVisible: boolean;
  // toggleModal: () => void;
  onApplyFilter: (status: any) => void;
}

const DATA = [
  {
    id: "1",
    title: "AWS",
    shipmentNumber: "41785691423",
    fromCity: "Cairo",
    toCity: "Alexandria",
    status: "RECEIVED",
  },
  {
    id: "2",
    title: "Azure",
    shipmentNumber: "5123445566",
    fromCity: "Lagos",
    toCity: "Abuja",
    status: "IN TRANSIT",
  },
  {
    id: "3",
    title: "Azure",
    shipmentNumber: "5123445566",
    fromCity: "Lagos",
    toCity: "Abuja",
    status: "IN TRANSIT",
  },
  {
    id: "4",
    title: "Azure",
    shipmentNumber: "5123445566",
    fromCity: "Lagos",
    toCity: "Abuja",
    status: "IN TRANSIT",
  },
  {
    id: "5",
    title: "Azure",
    shipmentNumber: "5123445566",
    fromCity: "Lagos",
    toCity: "Abuja",
    status: "IN TRANSIT",
  },
];

const home = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [filterStatus, setFilterStatus] = useState("All");

  const allSelected = checkedItems.length === DATA.length;
  // const filteredData = DATA.filter(
  //   (item) =>
  //     item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     item.shipmentNumber.includes(searchTerm) ||
  //     item.fromCity.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     item.toCity.toLowerCase().includes(searchTerm.toLowerCase())

  // );
  const filteredData = DATA.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.shipmentNumber.includes(searchTerm) ||
      item.fromCity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.toCity.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "All" || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const statuses = ["All", "RECEIVED", "IN TRANSIT", "DELIVERED"];
  const [selectedStatus, setSelectedStatus] = useState("All");

  // const applyFilter = () => {
  //   onApplyFilter(selectedStatus);
  //   toggleModal();
  // };
  const toggleCheckboxes = (id: string) => {
    if (checkedItems.includes(id)) {
      setCheckedItems((prev) => prev.filter((checkedId) => checkedId !== id));
    } else {
      setCheckedItems((prev) => [...prev, id]);
    }
  };
  const renderItem = ({ item }: { item: (typeof DATA)[0] }) => {
    const isChecked = checkedItems.includes(item.id);
    return (
      <ShipmentItem
        id={item.id}
        title={item.title}
        shipmentNumber={item.shipmentNumber}
        fromCity={item.fromCity}
        toCity={item.toCity}
        status={item.status}
        isChecked={isChecked}
        toggleCheckbox={toggleCheckboxes}
      />
    );
  };
  const toggleCheckbox = () => {
    if (allSelected) {
      setCheckedItems([]);
    } else {
      setCheckedItems(DATA.map((item) => item.id));
    }
  };
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <SafeArea barStyle="dark" viewStyle={tw`flex-1 px-5`}>
      <View style={tw`flex-1 w-full px-5 pt-4 gap-3`}>
        <View style={tw`flex justify-between items-center flex-row w-full`}>
          <Image
            style={tw`w-[40px] h-[40px]  `}
            source={icons.user}
            // placeholder={{ blurhash }}
            // contentFit="cover"
            // transition={1000}
          />
          <Image
            style={tw`w-[92.28px] h-[16px]`}
            source={icons.shippex}
            // placeholder={{ blurhash }}
            // contentFit="cover"
            // transition={1000}
          />
          <View
            style={tw`flex justify-center items-center w-[40px] h-[40px] bg-[#F4F2F8] rounded-full`}
          >
            <Image
              style={tw`w-[24px] h-[24px]  `}
              source={icons.bell}
              // placeholder={{ blurhash }}
              // contentFit="cover"
              // transition={1000}
            />
          </View>
        </View>
        <Text style={tw`font-medium text-[14px]`}>Hello,</Text>
        <Text style={tw`font-bold text-[28px] text-black`}>Ibrahim Shaker</Text>
        <View style={tw`relative`}>
          <TextInput
            placeholder="Search..."
            placeholderTextColor="gray"
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            style={tw`w-full bg-[#F4F2F8] placeholder:text-[10px] rounded-[10px] h-[44px] focus:outline-none text-[16px] font-normal  pl-10`}
          />
          <Image
            style={tw`w-[24px] h-[24px] left-3  absolute top-3 bottom-7 `}
            source={icons.search}
          />
        </View>
        <View
          style={tw`flex flex-row w-full justify-between gap-1.5 items-center px-1`}
        >
          <Pressable
            onPress={toggleModal}
            style={tw`bg-[#F4F2F8] w-1/2 py-3 px-5 flex flex-row gap-1 justify-center items-center rounded-[10px]`}
          >
            <Image style={tw`w-[24px] h-[24px] `} source={icons.filter} />
            <Text style={tw`text-[16px] font-normal text-[#58536E]`}>
              Filter
            </Text>
          </Pressable>
          <View
            style={tw`bg-[#2F50C1] w-1/2 py-3 flex flex-row gap-1 justify-center items-center rounded-[10px] gap-1`}
          >
            <Image style={tw`w-[24px] h-[24px] `} source={icons.scan} />
            <Text style={tw`text-[16px] font-normal text-white`}>Add Scan</Text>
          </View>
        </View>
        <View style={tw`flex flex-row justify-between px-1 pt-3 items-center`}>
          <Text style={tw`text-black font-bold text-[25px]`}>Shipments</Text>
          <View style={tw`flex flex-row items-center gap-1`}>
            <TouchableOpacity
              onPress={toggleCheckbox}
              style={tw`w-[24px] h-[24px] border-2 border-gray-400 rounded-md flex justify-center items-center bg-${
                isChecked ? "[#2F50C1]" : "white"
              }`}
            >
              {allSelected && <Text style={tw`text-white font-bold`}>✔</Text>}
            </TouchableOpacity>

            <Text style={tw` text-[#2F50C1] font-medium text-[18px]`}>
              Mark All {isChecked ? "" : ""}
            </Text>
          </View>
        </View>

        <View style={tw`flex-1 w-full `}>
          <FlatList
            data={filteredData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={toggleModal}
          onSwipeComplete={toggleModal}
          swipeDirection={["up", "down"]}
          // propagateSwipe={true}
          // coverScreen={true}
          style={tw`m-0 `}
        >
          <Pressable
            onPress={toggleModal}
            style={tw`flex-1 bg-[#0000004D] justify-end`}
          >
            <View style={tw`bg-white p-2 rounded-t-xl gap-3`}>
              <View style={tw`flex justify-center items-center`}>
                <Image
                  style={tw`w-[36px] h-[5px] justify-self-center`}
                  source={icons.grabber}
                />
              </View>
              <View style={tw`flex flex-row justify-between items-center px-5`}>
                <Pressable style={tw`font-normal text-[17px] leading-[22px] `}>
                  <Text
                    style={tw`font-medium text-[16px] leading-[26px] text-[#2F50C1]`}
                  >
                    {" "}
                    Cancel
                  </Text>
                </Pressable>
                <Text
                  style={tw`font-semibold text-[18px] leading-[26px] text-black`}
                >
                  {" "}
                  Filters
                </Text>
                <Pressable
                  style={tw`gap-2`}
                  onPress={() => {
                    setFilterStatus(selectedStatus);
                    toggleModal();
                  }}
                >
                  <Text style={tw`font-medium text-[16px] text-[#2F50C1]`}>
                    Done
                  </Text>
                </Pressable>
              </View>
              <View style={tw`w-full bg-[#EAE7F2] border-[#EAE7F2] border`} />
              <View style={tw`flex-row flex-wrap items-center  mt-2 px-3`}>
                {statuses.map((status) => (
                  <Pressable
                    key={status}
                    onPress={() => setSelectedStatus(status)}
                    style={[
                      tw`w-1/3 h-10 rounded-[10px] rounded-md justify-center items-center mb-2`,
                      selectedStatus === status
                        ? tw`border-[#2F50C1] rounded-[10px] border text-[#2F50C1]`
                        : tw`border-gray-200 border rounded-[10px]`,
                    ]}
                  >
                    <Text
                      style={tw`${
                        selectedStatus === status
                          ? "text-[#2F50C1] font-bold"
                          : "text-black"
                      } text-center text-[12px]`}
                    >
                      {status}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </Pressable>
        </Modal>
      </View>
    </SafeArea>
  );
};

export default memo(home);
