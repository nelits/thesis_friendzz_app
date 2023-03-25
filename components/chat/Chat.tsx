import { GiftedChat } from "react-native-gifted-chat";
import { firebaseFirestore } from "../../firebaseConfig";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "../../store/redux/hooks";
import { currentUserSelector } from "../../store/redux/accountSlice";
import { StyleSheet, View } from "react-native";
import { IMessage } from "react-native-gifted-chat/lib/Models";

type ChatProps = {
  path: string;
};

const Chat = ({ path }: ChatProps) => {
  const currentUser = useAppSelector(currentUserSelector);
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    const collectionRef = collection(firebaseFirestore, path);
    const q = query(collectionRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setMessages(
        querySnapshot.docs.map(
          (doc) =>
            ({
              _id: doc.data()._id,
              createdAt: doc.data().createdAt.toDate(),
              text: doc.data().text,
              user: doc.data().user,
            } as IMessage)
        )
      );
    });

    return () => unsubscribe();
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(firebaseFirestore, path), {
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  return (
    <View style={styles.wrapper}>
      <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={true}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: currentUser.id,
          name: currentUser.username,
          avatar: currentUser.profileImg,
        }}
      />
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
