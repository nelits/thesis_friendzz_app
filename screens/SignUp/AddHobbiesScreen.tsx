import { Pressable, StyleSheet, Text, View } from "react-native";
import SwipePageIndicator from "../../components/ui/SwipePageIndicator";
import { GlobalStyles } from "../../constants/styles";
import HobbyItem from "../../components/HobbyItem";
import { HOBBIES } from "../../data/dummy_hobbies";
import Title from "../../components/ui/Title";
import { Hobby } from "../../models/Hobby";
import * as yup from "yup";
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateUserInfo } from "../../api/userAPI";
import { useAppDispatch, useAppSelector } from "../../store/redux/hooks";
import {
  currentUserIDSelector,
  setCurrentUserHobbies,
} from "../../store/redux/accountSlice";
import { endMoreInfoFlow } from "../../store/redux/authSlice";
import { useState } from "react";
import LoadingOverlay from "../../components/ui/LoadingOverlay";

const hobbiesFormSchema = yup
  .object({
    hobbies: yup.array().min(3).max(5),
  })
  .required();

const AddHobbiesScreen = () => {
  const [isLoading, setIsLoading] = useState(false);

  const userID = useAppSelector(currentUserIDSelector);
  const dispatch = useAppDispatch();

  const methods = useForm<{ hobbies: Hobby[] }>({
    resolver: yupResolver(hobbiesFormSchema),
    defaultValues: {
      hobbies: [],
    },
  });

  const onSubmitForm: SubmitHandler<{ hobbies: Hobby[] }> = async (data) => {
    setIsLoading(true);
    await updateUserInfo(userID, { hobbies: data.hobbies.map((h) => h.id) });
    dispatch(setCurrentUserHobbies(data));
    setIsLoading(false);
    dispatch(endMoreInfoFlow());
  };

  const onError: SubmitErrorHandler<{ hobbies: Hobby[] }> = (errors, e) => {
    return console.log(errors);
  };

  const onPressHobbyHandler = (
    selectedHobbies: Hobby[],
    newHobby: Hobby
  ): Hobby[] => {
    const idx = selectedHobbies.findIndex((h) => h.id === newHobby.id);

    if (idx === -1) {
      return [...selectedHobbies, newHobby];
    } else {
      return selectedHobbies.filter((h) => h.id !== newHobby.id);
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.textWrapper}>
        <Title> Select 3-5 hobbies that you have</Title>
      </View>
      <Controller
        control={methods.control}
        name={"hobbies"}
        render={({ field }) => (
          <View style={styles.hobbiesWrapper}>
            {HOBBIES.map((h) => (
              <Pressable
                onPress={() =>
                  field.onChange(onPressHobbyHandler(field.value, h))
                }
                key={h.id}
              >
                <HobbyItem
                  hobby={h}
                  pressed={field.value.findIndex((v) => v.id === h.id) !== -1}
                />
              </Pressable>
            ))}
          </View>
        )}
      />
      <View style={styles.buttonNavWrapper}>
        <Pressable>
          <Text style={styles.text}>{/*Skip*/}</Text>
        </Pressable>
        <SwipePageIndicator totalPages={3} activePageIndex={2} />
        <Pressable onPress={methods.handleSubmit(onSubmitForm, onError)}>
          <Text
            style={[styles.text, { color: GlobalStyles.colors.primary500 }]}
          >
            Done
          </Text>
        </Pressable>
      </View>
      <LoadingOverlay isLoading={isLoading} />
    </View>
  );
};

export default AddHobbiesScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 10,
  },
  hobbiesWrapper: {
    flex: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "flex-start",
  },
  textWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    fontWeight: "500",
  },
  buttonNavWrapper: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
