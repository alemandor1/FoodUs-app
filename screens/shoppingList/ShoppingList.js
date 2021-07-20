import React, { useCallback, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Input, Icon, ListItem, Button } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native'
import { SIZES, FONTS,  } from "../../constants";

import {
  getCurrentUser,
  addDocumentWithoutId,
  updateDocument,
} from "../../utils/actions";
import firebase from "firebase";
import { firebaseApp } from "../../utils/firebase";
import "firebase/firebase-firestore";
import { map } from "lodash";
import Loading from "../../components/Loading";
import { FAB } from "react-native-paper";

export default function ShoopingList() {
    const navigation = useNavigation()

 

  return (
    <View>
      <View style={{ padding: SIZES.padding * 2 }}>
            <View
              style={{
                backgroundColor: "#67C7BB",
                borderBottomRightRadius: SIZES.radius,
                borderBottomLeftRadius: SIZES.radius,
                marginBottom: 15,
              }}
            >
              <Text
                style={{
                  ...FONTS.h1,
                  marginTop: 10,
                  marginBottom: 15,
                  textAlign: "center",
                  color: "white",
                }}>
                Shopping List
              </Text>
            </View>
          </View>
  
          <FAB
          style={styles.fab}
          large
          icon="undo"
          onPress={() => navigation.goBack()}
        ></FAB>
        </View>
      
  );
}

const styles = StyleSheet.create({
    fab: {
        position: "fixed",
        margin: 16,
        right: 0,
        bottom: 0,
      }  
});
