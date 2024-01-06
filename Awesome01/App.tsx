import React from "react";

import { Text,SafeAreaView, ScrollView } from "react-native";
import FlatCards from "./components/FlatCards";
import ElevatedCards from "./components/ElevatedCards";
import FancyCard from "./components/FancyCard";
import ActionCard from "./components/ActionCard";
import ContactList from "./components/ContactList";

function App(){
 return(
  <SafeAreaView>
  <ScrollView>
    <FlatCards/>
    <ElevatedCards/>
    <FancyCard/>
    <ActionCard/>
    <ContactList/>
  </ScrollView>
</SafeAreaView>
 )
}

export default App;