import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, {useState} from 'react';
import { COLORS, lightFONTS, SIZES } from '../../constants';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Icon from 'react-native-vector-icons/AntDesign';
import { useDispatch } from 'react-redux';
import { completeTask, deleteTask, loadUser } from '../../redux/action';

const Task = ({ title, description, status, taskId}) => {

	const dispatch = useDispatch();
 	const [completed, setCompleted] = useState(status);

    const handleChecked = () => {
		setCompleted(!completed);
		dispatch(completeTask(taskId));
    }

    const deleteHandler = async() => {
        console.log(taskId);
		await dispatch(deleteTask(taskId));
		dispatch(loadUser());
    }

	return (
		<View style={styles.taskContainer}>
			<View style={styles.taskText}>
				<Text style={styles.taskTitle}>{title}</Text>
				<Text style={styles.taskDescription}>{description}</Text>
			</View>
			<View style={styles.taskOptions}>
				<BouncyCheckbox
					size={25}
					fillColor="green"
					innerIconStyle={{ borderWidth: 2 }}
					isChecked={completed}
                    onPress={handleChecked}
				/>
				<View style={styles.deleteButton}>
					<Icon size={22} name="delete" color="white" onPress={deleteHandler}/>
				</View>
			</View>
		</View>
	);
};

export default Task;

const styles = StyleSheet.create({
	taskContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		margin: SIZES.padding2,
		padding: SIZES.padding,
		backgroundColor: COLORS.lightGray
	},
	taskText: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'flex-start'
	},
	taskOptions: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	taskTitle: {
		...lightFONTS.h4
	},
	taskDescription: {
		...lightFONTS.h6
	},
	deleteButton: {
		backgroundColor: 'red',
		padding: SIZES.padding,
		borderRadius: 100
	}
});
