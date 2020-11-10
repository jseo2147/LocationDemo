import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import haversine from 'haversine';

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [start, setStart] = useState({
    coords: {
      latitude: null,
      longitude: null
    }
  });
  const [goal, setGoal] = useState({
    coords: {
      latitude: 40.769719,
      longitude: -73.98247
    }
  });


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setStart({
        coords: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        }
      });
    })();
  }, []);

  console.log(start);
  console.log(goal);
  console.log(location);

  let text = 'Waiting..';
  let lat_text, long_text, distance = 'Processing..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    lat_text = JSON.stringify(location.coords.latitude);
    long_text = JSON.stringify(location.coords.longitude);
  }
  
  console.log(lat_text);
  console.log(long_text);
  console.log(haversine(start.coords, goal.coords, {unit:'mile'}));
  distance = JSON.stringify(haversine(start.coords, goal.coords, {unit:'mile'}));

  return (
    <View style={styles.container}>
      <Text> User Current Location (negative indicates west/south):</Text>
      <Text> latitude: {lat_text}</Text>
      <Text> longitude: {long_text}</Text>
      <Text> Distance from NYIT (miles): {distance}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});