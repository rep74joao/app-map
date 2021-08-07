import React, {useState, useRef, useEffect} from 'react'
import S from './styles'
import MapView from 'react-native-maps'
import * as Location from 'expo-location';
import Geocoder from 'react-native-geocoding'
import {MapsApi} from '../../../config'
import MapViewDirections from "react-native-maps-directions";
import * as Permissions from 'expo-permissions';
import * as TaskManager from 'expo-task-manager';
import { Alert, Platform, Text } from 'react-native';


export default () => {
    
    
    const [location, setLocation] = useState(null);
    const [location1, setLocation1] = useState(null);
    const [mapLoc, setMapLoc] = useState({
        center:{
            latitude:-20.4203,
            longitude:-49.9783
        },
        zoom:16,
        pitch:0,
        altitude:0,
        heading:0,
    });
    const map = useRef();

    useEffect(() => {
        Geocoder.init(MapsApi, {language:'pt-br'});
       
    },[]);

    useEffect(() => {
        if(Platform.OS !== 'ios'){
            (async () => {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                  Alert.alert('Sem permissão para localização!');
                  return;
                }
          
                let loc = await Location.getCurrentPositionAsync();
               
                setLocation({
                  center:{
                      latitude:loc.coords.latitude,
                      longitude:loc.coords.longitude
                  },
                  zoom:16,
                  pitch:2,
                  altitude:0,
                  heading:0,
              });
              })();
        }
      }, []);

    const LOCATION_TASK_NAME = 'background-location-task';

     useEffect(() => {
         const requestPermissions = async () => {
           if(Platform.OS === 'ios'){
            const { status } = await Location.requestBackgroundPermissionsAsync();
            if (status === 'granted') {
              await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
               accuracy: Location.Accuracy.Balanced,
              });
            }
           }
           return;
           };
           requestPermissions()
    },[])

    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let lo = await Location.getCurrentPositionAsync({});
          setLocation({
            center:{
                latitude:lo.coords.latitude,
                longitude:lo.coords.longitude
            },
            zoom:16,
            pitch:2,
            altitude:0,
            heading:0,
            });
        })();
      }, []);

    if(Platform.OS === 'ios'){
        TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
            if (error) {
              // Error occurred - check `error.message` for more details.
              return;
            }
            if (data) {
              const { locations } = data;
              // do something with the locations captured in the background
            }
          });
    }

      async function handleDirectionsReady(r){
       
        map.current.fitToCoordinates(r.coordinates, {
            edgePadding: {
                left: 50,
                right: 50,
                bottom: 20,
                top:50
            }
        })
     }

     useEffect(() => {
        async function set(){
            let l = await Location.getCurrentPositionAsync({});
        
            setLocation1({
            center:{
                latitude:l.coords.latitude,
                longitude:l.coords.longitude
            },
            zoom:16,
            pitch:2,
            altitude:0,
            heading:0,
            })
        }
        set();        
     },[location1])

    return (
        <S.Container>
                {location && (
                    <MapView 
                    ref={map}
                    style={{flex:1}}
                    provider={'google'}
                    camera={location}
                    userInterfaceStyle={'dark'}
                    onRegionChangeComplete={handleDirectionsReady}
                >
                    {location1 && (
                        <>
                        <MapView.Marker
                            pinColor={'red'}
                            coordinate={location.center}/>
                       
                        <MapViewDirections
                                lineDashPattern={[0]}
                                origin={location.center}
                                destination={location1.center}
                                strokeWidth={5}
                                strokeColor='#000'
                                apikey={MapsApi}
                                waypoints={[location.center, location1.center]}
                                onReady={handleDirectionsReady}
                                />
                        </>
                    )}
                </MapView>
                )}
                {!location && (
                    <Text>carregando ... </Text>
                )}
        </S.Container>
    )
}