import { StyleSheet, Text, TouchableOpacity, ScrollView, TextInput, View, Pressable, SafeAreaView, Platform, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import { icons, images, FONTS, SIZES, COLORS } from '../constants'
import Icon from 'react-native-vector-icons/Ionicons';
import { Dialog, Button } from 'react-native-paper'

import Task from './Task/Task';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, loadUser } from '../redux/action';

const Main = ({ navigation }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { loading, message, error } = useSelector(state => state.message)
  const handleDismiss = () => {
    setOpenDialog(!openDialog);
    setTitle('');
    setDescription('');
  }

  const addTaskHandler = async () => {
    await dispatch(addTask(title, description))
    dispatch(loadUser());
  }

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch({ type: "clearError" });
    }
    if (message) {
      alert(message);
      dispatch({ type: "clearMessage" });
    }
  }, [alert, error, message, dispatch])

  return (
    <>
      <View style={{
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
      }}>
        <ScrollView>
          <SafeAreaView>
            <Text style={styles.headerTitle}>Tasks</Text>

            {
              user && user.tasks.map((task, index) => (
                <Task
                  taskId={task._id}
                  title={task.title}
                  description={task.description}
                  status={task.completed}
                  key={index}
                />
              ))
            }

          </SafeAreaView>
        </ScrollView>
        <TouchableOpacity onPress={handleDismiss} style={styles.floatingAdd}>
          <Icon
            color='white'
            size={30}
            name='add'
          />
        </TouchableOpacity>
      </View>

      <Dialog visible={openDialog} onDismiss={handleDismiss}>
        <Dialog.Title>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Text style={{ ...FONTS.h3 }}>Add Task</Text>
            <TouchableOpacity onPress={handleDismiss}>
              <Icon name="close" color='red' size={25} />
            </TouchableOpacity>
          </View>
        </Dialog.Title>
        <Dialog.Content>
          <TextInput
            style={styles.taskInput}
            placeholder='Title'
            placeholderTextColor='white'
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.taskInput}
            placeholder='Description'
            placeholderTextColor='white'
            value={description}
            onChangeText={setDescription}
          />
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            margin: SIZES.padding
          }}>
            <TouchableOpacity onPress={addTaskHandler} disabled={!title || !description || loading} style={styles.dialogButton}>
              <Text style={{ ...FONTS.body3, color: 'white' }}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDismiss} style={[styles.dialogButton, { backgroundColor: 'red' }]}>
              <Text style={{ ...FONTS.body3, color: 'white' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Dialog.Content>
      </Dialog>
    </>
  )
}

export default Main

const styles = StyleSheet.create({
  headerTitle: {
    ...FONTS.h2,
    textAlign: 'center',
    margin: SIZES.padding
  },
  floatingAdd: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 100,
    right: 30,
    padding: SIZES.padding2 * 1.3,
    backgroundColor: 'green',
    borderRadius: 50
  },
  taskInput: {
    marginVertical: 8,
    padding: SIZES.padding,
    color: COLORS.white,
    height: 45,
    width: '100%',
    borderRadius: SIZES.padding,
    backgroundColor: COLORS.darkgray
  },
  dialogButton: {
    height: 45,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.padding,
    backgroundColor: 'green',
  }

})