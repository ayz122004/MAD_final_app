import React, { Component } from 'react';
import { ScrollView, AppRegistry, Text, View, TouchableHighlight, Dimensions, StyleSheet, ImageBackground, TextInput } from 'react-native';
import Constants from 'expo-constants';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;
let progress = 0.5;

export default class App extends Component {

    state = {
        taskList: [
            {
                name: 'Finish app',
                days: 0, //days left until deadline
                level: 'high',
                status: 0, //is complete
                statusDisplay: "incomplete" // not done, complete
            },
        ],

        // PRIORITY stuff
        priorityList: [
            "DEFCON 1",
        ],
        activelevelIndex: 0,

        //STATUS stuff
        completeCount: 0,
        taskCount: 1,
        percentComplete: 0,

        // BOTTOM NAVBAR:
        homePageDisplay: 'block',
        addPageDisplay: 'none',
        statusPageDisplay: 'none',
        profilePageDisplay: 'none',

        // user input variables:
        temp_taskName: '',
        temp_name: '',

    }

    //HOME PAGE
    _updateTaskStatus = (task) => {
        task.status = (task.status + 1) % 2
        if (task.status == 0) {
            task.statusDisplay = "incomplete"
            this.state.completeCount = this.state.completeCount - 1
        } else {
            task.statusDisplay = "complete"
            this.state.completeCount = this.state.completeCount + 1
        }
        this.setState({
            taskList: this.state.taskList,
            completeCount: this.state.completeCount,
            percentComplete: this.state.completeCount/this.state.taskCount,
        });
    }

    // ADD PAGE
    _addTask = (name, days, levelIndex) => {
        this.state.taskList.splice(0, 0, {
            name: name,
            days: days,
            level: this.state.priorityList[levelIndex],
            status: 0,
            statusDisplay: "incomplete",
        });
        this.setState({
            taskCount: this.state.taskCount + 1,
            percentComplete: this.state.completeCount/this.state.taskCount,
        });        
    }


    // PRIORITY PAGE
    _updateActivelevel = (name) => {
        this.setState({
            activelevelIndex: this.state.priorityList.indexOf(name),
        })
    }
    _addlevel = (text) => {
        this.state.priorityList.push(text);
        this.setState({
            priorityList: this.state.priorityList,
            activelevelIndex: this.state.priorityList.indexOf(text),
        })
    }


    // BOTTOM NAVBAR
    handleHomePagePress = () => this.setState(state => ({
        statusPageDisplay: 'none',
        homePageDisplay: 'block',
        addPageDisplay: 'none',
        profilePageDisplay: 'none',
    }));
    handleAddPagePress = () => this.setState(state => ({
        statusPageDisplay: 'none',
        homePageDisplay: 'none',
        addPageDisplay: 'block',
        profilePageDisplay: 'none',
    }));
    handleStatusPagePress = () => this.setState(state => ({
        statusPageDisplay: 'block',
        homePageDisplay: 'none',
        addPageDisplay: 'none',
        profilePageDisplay: 'none',
    }));
    profilePageDisplay = () => this.setState(state => ({
        statusPageDisplay: 'none',
        homePageDisplay: 'none',
        addPageDisplay: 'none',
        profilePageDisplay: 'block',
    }));

    render() {
        return (
            <View style={styles.container}>

                {/*HOME page screen layout*/}
                <View style={{ display: this.state.homePageDisplay }}>
                    <View style={styles.contentContainer}>
                        <ScrollView style={styles.scrollView}>
                            {this.state.taskList.map((task) => (
                                <View style={styles.taskCard}>
                                    <Text> Priority: {task.level}</Text>
                                    <Text> Task: {task.name} </Text>
                                    <Text> Deadline: {task.days} days</Text>
                                    <View style={styles.row2}>
                                        <TouchableHighlight
                                            onPress={() => {
                                                this._updateTaskStatus(task)

                                            }}
                                        >
                                            <Text style={styles.text2}>
                                                [DONE]
                                            </Text>
                                        </TouchableHighlight>

                                        <Text style={styles.text2}>
                                            Status: {task.statusDisplay}
                                        </Text>
                                    </View>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                </View>

                {/*ADD page screen layout*/}
                <View style={{ display: this.state.addPageDisplay }}>
                    <View style={styles.contentContainer}>
                        <View style={styles.column, {justifyContent: 'space-evenly', alignItems: 'center',}}>
                            <TextInput style={styles.input}
                                onChangeText={(temp_taskName) => this.setState({ temp_taskName })}
                                placeholder='task name'
                                placeholderTextColor={'#C9C9C9'}
                                value={this.state.temp_taskName}
                            />
                            <TextInput style={styles.input}
                                onChangeText={(temp_taskDays) => this.setState({ temp_taskDays })}
                                placeholder='task days'
                                placeholderTextColor={'#C9C9C9'}
                                value={this.state.temp_taskDays}
                            />
                            <TouchableHighlight style={styles.button_wide}
                                onPress={() => {
                                    this._addTask(
                                        this.state.temp_taskName, this.state.temp_taskDays, this.state.activelevelIndex)
                                }}>
                                <Text style={styles.navButtonText}>
                                    ADD TASK
                                </Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>

                {/*STATUS page screen layout*/}
                <View style={{ display: this.state.statusPageDisplay }}>
                    <View style={styles.contentContainer}>
                        <View style={styles.column}>
                            <Text style={styles.title}>
                                STATS
                            </Text>
                            <Text style={styles.card}>
                                Progress: {this.state.completeCount} / {this.state.taskCount} tasks
                            </Text>
                            <Text style={styles.card}>
                                {(this.state.completeCount / this.state.taskCount * 100).toPrecision(2)}% completed
                            </Text>
                            <View style={styles.progressBar}>
                                <View style={{
                                    width: (deviceWidth/4 * 3)*this.state.percentComplete, 
                                    backgroundColor: '#B5FFE9', 
                                    borderRadius: 16, 
                                    color: 'rgb(0, 0, 0, 0)',
                                }}>
                                    {this.state.percentComplete}
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                {/*PRIORITY page screen layout*/}
                <View style={{ display: this.state.profilePageDisplay }}>
                    <View style={styles.contentContainer}>
                        <View style={styles.column}>
                            <Text style={styles.text2}>
                                Current level: {this.state.priorityList[this.state.activelevelIndex]}
                            </Text>
                        </View>

                        {/* list-levelnames box */}
                        <View style={{flex: 5, backgroundColor: '#545555', width: deviceWidth/4 *3, borderRadius: 8,}}>
                            <ScrollView>
                                {this.state.priorityList.map((level) => (
                                    <View style={styles.row}>
                                        <TouchableHighlight
                                            onPress={() => {
                                                this._updateActivelevel(level)
                                            }}
                                        >
                                            <Text style={styles.taskCard}>
                                                {level}
                                            </Text>
                                        </TouchableHighlight>

                                    </View>
                                ))}
                            </ScrollView>
                        </View>

                        {/* create-new-level box */}
                        <View style={styles.row, {flex: 2}}>
                            <View style={styles.column}>
                                <TextInput style={styles.input}
                                    onChangeText={(temp_name) => this.setState({ temp_name })}
                                    value={this.state.temp_name}
                                    placeholder='priority level'
                                    placeholderTextColor={'#C9C9C9'}
                                />
                                <TouchableHighlight style={styles.button_wide}
                                    onPress={() => {
                                        this._addlevel(this.state.temp_name)
                                    }}>
                                    <Text style={styles.navButtonText}>
                                        ADD LEVEL
                                    </Text>
                                </TouchableHighlight>
                            </View>
                        </View>

                    </View>
                </View>

                {/*BOTTOM NAVBAR */}
                <View style={styles.navbarContainer}>
                    <TouchableHighlight style={styles.navButton}
                        onPress={this.handleHomePagePress}
                    >
                        <Text style={styles.navButtonText}>
                            HOME
                        </Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.navButton}
                        onPress={this.handleAddPagePress}
                    >
                        <Text style={styles.navButtonText}>
                            ADD
                        </Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.navButton}
                        onPress={this.handleStatusPagePress}
                    >
                        <Text style={styles.navButtonText}>
                            STATS
                        </Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.navButton}
                        onPress={this.profilePageDisplay}
                    >
                        <Text style={styles.navButtonText}>
                            PRIORITY
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: deviceHeight,
        width: deviceWidth,
        backgroundColor: 'rgb(44, 45, 45)',
    },
    contentContainer: {
        height: 5 * (deviceHeight / 6),
        width: deviceWidth,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: deviceHeight / 16,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
    },
    scrollView: {
        flex: 7,
        showsVerticalScrollIndicator: false,
    },
    navbarContainer: {
        flex: 1,
        // backgroundColor: 'darkblue',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    navButton: {
        flex: 1,
        backgroundColor: '#C5E0D8',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 4,
        padding: 8,
        borderRadius: 4,
    },
    navButtonText: {
        fontSize: deviceHeight / 48,
        textAlign: 'center',
        color: '#444545',
    },
    input: {
        alignItems: 'center',
        justifyContent: 'center',
        width: deviceWidth/4 * 3,
        fontSize: deviceHeight / 24,
        color: 'white',
        borderColor: 'white',
        borderWidth: 1,
        padding: 4,
        margin: 16,
        borderRadius: 4,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'green',
    },
    column: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
    },
    taskCard: {
        width: deviceWidth/4 * 3,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        color: 'white',
        backgroundColor: '#545555',
        margin: 4,
        padding: 8,
        borderRadius: 4,
        fontSize: deviceHeight/20,
    },
    card: {
        // flex: 1,
        width: deviceWidth/4 * 3,
        height: deviceWidth/8,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        backgroundColor: '#545555',
        margin: 4,
        padding: 8,
        borderRadius: 4,
    },
    button_wide: {
        // flex: 1,
        width: deviceWidth/4 * 3,
        height: deviceWidth/8,
        backgroundColor: '#CEABB1',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 4,
        padding: 8,
        borderRadius: 4,
    },
    progressBar: {
        width: deviceWidth/4 * 3,
        backgroundColor: '#545555',
        borderRadius: 16,
        height: deviceWidth/16,
    },
});