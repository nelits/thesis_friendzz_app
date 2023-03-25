import { StyleSheet, View, Text } from "react-native";
import FrieventCategoriesMenu from "../../components/FrieventCategoriesMenu";
import { FRIEVENT_CATEGORIES } from "../../data/dummy_data";
import ScrollPicker from "../../components/ui/ScrollPicker";
import * as yup from "yup";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../components/ui/buttons/Button";
import DateSelector from "../../components/ui/DateSelector";
import Title from "../../components/ui/Title";
import LocationSearch from "../../components/location-search/LocationSearch";
import { MEET_HOURS, PERSONS_COUNT } from "./data";
import { formToFbModel, FrieventForm } from "../../models/Frievent";
import { useAppSelector } from "../../store/redux/hooks";
import { currentUserSelector } from "../../store/redux/accountSlice";
import { createFrievent } from "../../api/frieventsAPI";

const createFrieventSchema = yup
  .object({
    location: yup.object().required(),
    categoryID: yup.string().required(),
    date: yup.date().required(),
    time: yup.string().required(),
    persons: yup.number().required(),
  })
  .required();

const defaultValues: FrieventForm = {
  categoryID: "1",
  date: new Date(),
  time: "18:00",
  persons: 4,
  location: null,
};

const CreateFrieventScreen = ({ navigation, route }) => {
  const currentUser = useAppSelector(currentUserSelector);
  const goBack: boolean = !!route?.params?.goBack;

  const methods = useForm<FrieventForm>({
    resolver: yupResolver(createFrieventSchema),
    defaultValues,
  });

  const onSubmitForm: SubmitHandler<FrieventForm> = async (data) => {
    const newFrievent = formToFbModel(data, currentUser);

    await createFrievent(newFrievent);
    methods.reset(defaultValues);
    if (goBack) {
      navigation.goBack();
    } else {
      navigation.navigate("Home");
    }
  };

  const onCancelHandler = () => {
    methods.reset(defaultValues);
    if (goBack) {
      navigation.goBack();
    } else {
      navigation.navigate("Home");
    }
  };

  return (
    <View style={styles.wrapper}>
      <Controller
        control={methods.control}
        name={"location"}
        render={({ field }) => <LocationSearch {...field} />}
      />
      <Controller
        control={methods.control}
        name={"categoryID"}
        render={({ field }) => (
          <FrieventCategoriesMenu {...field} categories={FRIEVENT_CATEGORIES} />
        )}
      />
      <View>
        <Title>Meet date</Title>
        <Controller
          control={methods.control}
          name={"date"}
          render={({ field }) => <DateSelector {...field} />}
        />
      </View>

      <View>
        <Title>Meet Time</Title>
        <Controller
          control={methods.control}
          name={"time"}
          render={({ field }) => <ScrollPicker {...field} items={MEET_HOURS} />}
        />
      </View>

      <View>
        <Title>Persons</Title>
        <Controller
          control={methods.control}
          name={"persons"}
          render={({ field }) => (
            <ScrollPicker {...field} items={PERSONS_COUNT} />
          )}
        />
      </View>
      <View style={styles.buttonsWrapper}>
        <Button
          style={styles.button}
          title={"Create"}
          onPress={methods.handleSubmit(onSubmitForm)}
        />
        <Button
          style={styles.button}
          title={"Cancel"}
          mode="outlined"
          onPress={onCancelHandler}
        />
      </View>
    </View>
  );
};

export default CreateFrieventScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
  },
  dateWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  buttonsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: { flex: 1, marginHorizontal: 10 },
});
