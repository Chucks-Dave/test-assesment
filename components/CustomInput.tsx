import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextInputProps,
} from "react-native";
import { Controller, Control, FieldValues } from "react-hook-form";
import tw, { style } from "twrnc";

interface ControlledFloatingLabelInputProps
  extends Omit<TextInputProps, "onChangeText" | "onBlur" | "value"> {
  name: string;

  control: any;

  rules?: object;

  containerStyle?: StyleProp<ViewStyle>;

  placeholder: string;
}

const CustomInput: React.FC<ControlledFloatingLabelInputProps> = ({
  name,
  control,
  rules,
  placeholder,
  containerStyle,
  secureTextEntry,
  ...rest
}: ControlledFloatingLabelInputProps & { onBlur?: (e: any) => void }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <View style={[styles.container, containerStyle]}>
          <TextInput
            style={[
              styles.input,
              {
                borderColor: isFocused ? "#007bff" : "#ced4da",
                transform: [
                  {
                    translateY: isFocused || !!value ? -10 : 0,
                  },
                ],
              },
            ]}
            placeholder={placeholder}
            placeholderTextColor="#6c757d"
            secureTextEntry={secureTextEntry}
            value={value}
            onChangeText={onChange}
            onFocus={(e) => {
              setIsFocused(true);

              rest?.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              onBlur();

              rest?.onBlur?.(e);
            }}
            {...rest}
          />

          {(isFocused || !!value) && (
            <Text style={styles.floatingLabel}>{placeholder}</Text>
          )}
          {error && (
            <Text style={tw`text-red-500 text-xs text-start `}>
              {error.message}
            </Text>
          )}
        </View>
      )}
    />
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    position: "relative",
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "white",
  },
  floatingLabel: {
    position: "absolute",
    top: -8,
    left: 10,
    backgroundColor: "white",
    paddingHorizontal: 5,
    color: "#007bff",
    fontSize: 12,
  },
});
