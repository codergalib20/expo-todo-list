import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from 'react';
import { Button, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Item from './components/Item';
import DateTimePicker from '@react-native-community/datetimepicker';
import Preview from './components/Preview';
export default function App() {
  const [date, setDate] = useState(new Date());
  const [items, setItems] = useState([]);
  const [text, setText] = useState('');
  const [startShow, setStartShow] = useState("");
  const [endShow, setEndShow] = useState("");
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [makeNew, setMakeNew] = useState(false);
  const [previewItem, setPreviewItem] = useState(null);


  // Date Picker For Start Time
  const changeStartText = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setStartShow(Platform.OS === 'ios');
    let tempDate = new Date(currentDate);
    let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
    let fTime = tempDate.getHours() + ':' + tempDate.getMinutes();
    setStartDate(fDate + ' ' + fTime);
  };
  // Date Picker For Ending Time
  const changeEndText = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setEndShow(Platform.OS === 'ios');
    let tempDate = new Date(currentDate);
    let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
    let fTime = tempDate.getHours() + ':' + tempDate.getMinutes();
    setEndDate(fDate + ' ' + fTime);
  };
  // Handle Get data from locl Stroge
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@todo_item')
      if (value !== null) {
        setItems(JSON.parse(value));
      }
      console.log(value);
    } catch (e) {
      // error reading value
    }
  }
  useEffect(() => {
    getData();
  }, [])
  console.log(text);
  // Handle the input change and add the item to the list
  const handleAddItem = async () => {
    try {
      if (text !== '') {
        let _id = Math.floor(Math.random() * 100)
        _id = _id.toString()
        _id = _id + "-" + _id + "A" + _id + "B";
        await setItems([{ text, _id, startDate, endDate }, ...items]);
        setText('');
        await AsyncStorage.setItem('@todo_item', JSON.stringify([{ text, _id }, ...items]));
        Keyboard.dismiss();
        setMakeNew(false);
      } else {
        alert('Please enter some text');
      }
    } catch (error) {
      console.log(error);
    }
  }
  // Handle Delete the item from the list
  const deleteItem = (index) => {
    const newItems = items.filter(item => item._id !== index);
    setItems(newItems)
    AsyncStorage.setItem('@todo_item', JSON.stringify(newItems));
    console.log(newItems);
  }
  return (
    <View style={styles.container}>
      {!previewItem && !makeNew && <View style={styles.mainWrapper}>
        <Text style={styles.mainTitle}>Todo List</Text>
        {/* Tdoto List */}
        <View styles={styles.items}>
          <ScrollView
          >
            {
              items.map((item, index) => <Item
                item={item}
                key={index}
                setPreviewItem={setPreviewItem}
                deleteItem={deleteItem}
              />)
            }
          </ScrollView>
        </View>
        <TouchableOpacity style={styles.addItem} onPress={() => setMakeNew(true)}>
          <Text style={styles.addItemText}>+</Text>
        </TouchableOpacity>
        <StatusBar style="light" />
      </View>
      }
      {previewItem && <Preview previewItem={previewItem} setPreviewItem={setPreviewItem} />}
      {/* Make a new Todo */}
      {
        makeNew && (<View style={styles.makeNewTodoPage}>
          <TouchableOpacity style={styles.closeMakePageButton} onPress={() => setMakeNew(false)}>
            <Text style={styles.closeMakePageButtonText}>X</Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.mainTitle}>Make a new Todo</Text>
          </View>
          <KeyboardAvoidingView style={styles.safeKey} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={styles.buttonsBox}>
              <View style={styles.buttonsBoxParent}>
                <Text style={styles.datePickerHeader}>Task Start Time</Text>
                <View>
                  <Button style={styles.buttonsBoxButton} title="Date" color="#06283D" onPress={() => setStartShow("startdate")} />
                </View>
                <View style={{ marginTop: 5 }}>
                  <Button style={styles.buttonsBoxButton} title="Time" color="#06283D" onPress={() => setStartShow("starttime")} />
                </View>
              </View>
              <View style={styles.buttonsBoxParent}>
                <Text style={styles.datePickerHeader}>Task End Time</Text>
                <View>
                  <Button style={styles.buttonsBoxButton} title="Date" color="#06283D" onPress={() => setEndShow("enddate")} />
                  <View>
                  </View>
                  <View style={{ marginTop: 5 }}>
                    <Button style={styles.buttonsBoxButton} title="Time" color="#06283D" onPress={() => setEndShow("endtime")} />
                  </View>
                </View>
              </View>
            </View>
            <View>
              <View>
                {startShow === "startdate" && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={"date"}
                    is24Hour={true}
                    display="default"
                    onChange={changeStartText}
                  />
                )}
                {startShow === "starttime" && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={"time"}
                    is24Hour={true}
                    display="default"
                    onChange={changeStartText}
                  />
                )}
              </View>
              <View>
                {endShow === "enddate" && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={"date"}
                    is24Hour={true}
                    display="default"
                    onChange={changeEndText}
                  />
                )}
                {endShow === "endtime" && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={"time"}
                    is24Hour={true}
                    display="default"
                    onChange={changeEndText}
                  />
                )}
              </View>
            </View>
            <View style={styles.inputWrapper}>
              <TextInput placeholderTextColor="#ddd" defaultValue={text} onChangeText={texts => setText(texts)} style={styles.input} placeholder="Text here todo title" />
              <TouchableOpacity onPress={() => handleAddItem()} style={styles.buttonWrapper}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>+</Text>
                </View>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView >
          < StatusBar style="dark" />
        </View>)
      }
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#06283D',
  },
  mainWrapper: {
    paddingHorizontal: 20,
    paddingTop: 20,
    flex: 1,
  },
  mainTitle: {
    fontSize: 30,
    marginTop: 50,
    color: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  items: {
    paddingBottom: 20,
  },
  // This styles are for the input
  makeNewTodoPage: {
    // flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  safeKey: {
    marginBottom: 10,
    paddingTop: 2,
    borderTopColor: '#ECB390',
    borderTopWidth: 3,
    borderStyle: 'solid',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 3
  },
  input: {
    borderRadius: 4,
    backgroundColor: '#06283D',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.9,
    shadowRadius: 5,
    elevation: 3,
    width: '85%',
    color: '#fff',
  },
  buttonWrapper: {
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#06283D',
    borderRadius: 4,
    marginLeft: 10,
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.9,
    shadowRadius: 5,
    paddingVertical: 7,
    elevation: 5,
    width: "100%",
    height: "100%",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ECB390',
    fontSize: 30,
    fontWeight: 'bold',
  },
  // Date Picker Buttons
  buttonsBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonsBoxParent: {
    width: '49%',
    height: '100%',
  },
  buttonSingleParent: {
    marginTop: 2,
  },
  buttonsBoxButton: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
  datePickerHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#06283D',
    marginTop: 10,
    textAlign: 'center',
    marginBottom: 6
  },
  mainTitle: {
    fontSize: 30,
    marginBottom: 50,
    color: '#06283D',
  },
  closeMakePageButton: {
    position: 'absolute',
    top: 30,
    left: 10,
    backgroundColor: '#e83a3b',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.9,
    shadowRadius: 5,
    elevation: 5,
    width: 45,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeMakePageButtonText: {
    color: '#FFF',
    fontSize: 30,
    fontWeight: 'bold',
  },
  addItem: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 60,
    shadowColor: '#fff',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.9,
    shadowRadius: 5,
    elevation: 5,
    width: 60,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addItemText: {
    color: '#06283D',
    fontSize: 45,
  }
});
