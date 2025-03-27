import {
  Text,
  View,
  Button,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useForm } from "react-hook-form";
import { Link, Redirect, useRouter } from "expo-router";
import tw, { style } from "twrnc";
import { Image } from "expo-image";

import { SafeArea } from "@/components/CustomSafeArea";
import Modal from "react-native-modal";
import { useState } from "react";
import CustomInput from "@/components/CustomInput";

interface FormValues {
  email: string;
  password: string;
}

export default function Index() {
  const router = useRouter();

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: FormValues) => {
    // Alert.alert("Form Data", JSON.stringify(data));
    router.push("/home");
    setModalVisible(!isModalVisible);
  };

  return (
    <SafeArea
      barStyle="light"
      backgroundColor="#2F50C1"
      viewStyle={tw`flex-1 px-5`}
    >
      <View
        style={tw`bg-[##2F50C1] px-5 flex justify-center items-center h-screen flex-1 w-full`}
      >
        <Image
          style={tw`w-[207.36px] h-[30px]`}
          source={require("../assets/images/Group.svg")}
          // placeholder={{ blurhash }}
          // contentFit="cover"
          // transition={1000}
        />
      </View>
      <View style={tw`w-full px-5`}>
        <TouchableOpacity
          style={tw`bg-white py-2 w-full px-5 rounded-md h-[56px]`}
          onPress={toggleModal}
        >
          <Text
            style={tw`text-[#2F50C1] text-center text-balance py-3 font-bold text-[17px] leading-[22px]`}
          >
            Login
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal} // close on backdrop press
        onSwipeComplete={toggleModal} // close when user swipes
        swipeDirection={["up", "down"]} // user can swipe down to dismiss
        propagateSwipe={true}
        coverScreen={true}
        style={tw`m-0 `} // slide up from the bottom
        // avoidKeyboard={true}
      >
        {/* <Image
          style={tw`w-[207.36px] h-[30px] bg-black w-full h-[500px]`}
          source={require("../assets/images/Grabber.svg")}
          // placeholder={{ blurhash }}
          // contentFit="cover"
          // transition={1000}
        /> */}
        {/* <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={tw`w-full`} // or flex:1, depending on your layout
          keyboardVerticalOffset={80} // optional offset if you have a header
        > */}
        <View style={tw`bg-white flex-1 p-5  rounded-t-xl flex-col gap-3`}>
          <TouchableOpacity
            onPress={toggleModal}
            style={tw`flex flex-row  items-center mt-5`}
          >
            <Image
              style={tw`w-[18px] h-[18px]`}
              source={require("../assets/images/Chevron.svg")}
              // placeholder={{ blurhash }}
              // contentFit="cover"
              // transition={1000}
            />
            <Text style={tw`font-normal text-[17px] leading-[22px]`}>
              Cancel
            </Text>
          </TouchableOpacity>
          <Text
            style={tw`text-[34px] leading-[41px] font-bold text-black mt-5`}
          >
            Login
          </Text>
          <Text
            style={tw`text-[##757281] font-normal text-[17px] leading-[24px] mt-3`}
          >
            Please enter your First, Last name and your phone number in order to
            register
          </Text>

          <View style={tw`flex-1 pb-12 py-5`}>
            <CustomInput
              name="url"
              control={control}
              rules={{ required: "url is required" }}
              placeholder="url"
            />
            <CustomInput
              name="email"
              control={control}
              rules={{ required: "Email is required" }}
              placeholder="Email"
              keyboardType="email-address"
            />

            <CustomInput
              name="password"
              control={control}
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "At least 6 characters",
                },
              }}
              placeholder="Password"
              secureTextEntry
            />
          </View>
          <View style={tw` mb-8 `}>
            <TouchableOpacity
              disabled={!isValid} // ← disable if not valid
              style={
                isValid
                  ? tw`bg-[#2F50C1] py-4 w-full px-5 rounded-md h-[50px]`
                  : tw`bg-gray-300  w-full px-5 py-4 rounded-md h-[50px]`
              }
              onPress={handleSubmit(onSubmit)}
            >
              <Text
                style={tw`text-white text-center text-balance  font-bold text-[17px] leading-[22px]`}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* </KeyboardAvoidingView> */}
      </Modal>
    </SafeArea>
  );
}
