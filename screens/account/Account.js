import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, ScrollView, Image, View } from "react-native";
import Loading from "../../components/Loading";
import { getCurrentUser } from "../../utils/actions";
import { useFocusEffect } from "@react-navigation/native";

import UserGuest from "./UserGuest";
import Main from "../main/Main";

export default function Account() {
  const [login, setLogin] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const user = getCurrentUser();
      user ? setLogin(true) : setLogin(false);
    }, [])
  );

  if (login == null) {
    return <Loading isVisible={true} text="Loading..." />;
  }

  return login ? <Main /> : <UserGuest />;
}

const styles = StyleSheet.create({});
