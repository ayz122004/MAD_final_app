import React, { Component } from 'react';
import { ScrollView, AppRegistry, Text, View, TouchableHighlight, Dimensions, StyleSheet, ImageBackground, TextInput, Image } from 'react-native';
import Constants from 'expo-constants';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;
let progress = 0.5;

export default class App extends Component {

    state = {
        taskList: [
            {
                name: 'Finish app',
                time: 0, // time needed to complete task
                level: 'school',
                status: 0, //is complete
                statusDisplay: "incomplete" // not done, complete
            },
        ],

        // catetory stuff
        catList: [
            "School",
            "Code",
            "Work",
            "Idea",
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
        catPageDisplay: 'none',
        activePageIndex: 0,
        iconTintColors: ['white', '', '', ''], // set iTC[activePageIndex] to '#'
        homeIconUrl: 'https://codehs.com/uploads/885ab8c21bdc9bd1d5d44d5aa8d10218',
        addIconUrl: 'https://codehs.com/uploads/6ffbe82d2f5168bea168a7f9d8f5ed97',
        statusIconUrl: 'https://codehs.com/uploads/755a3766563fd53e226ada8d207784de',
        catIconUrl: 'https://codehs.com/uploads/d3a7b31bd65b4cd79530fb4f24e8d85a',

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
    _addTask = (name, time, levelIndex) => {
        this.state.taskList.splice(0, 0, {
            name: name,
            time: time,
            level: this.state.catList[levelIndex],
            status: 0,
            statusDisplay: "incomplete",
        });
        this.setState({
            taskCount: this.state.taskCount + 1,
            percentComplete: this.state.completeCount/this.state.taskCount,
            temp_taskName: '',
            temp_taskTime: '',
        });        
    }


    // category PAGE
    _updateActivelevel = (name) => {
        this.setState({
            activelevelIndex: this.state.catList.indexOf(name),
        })
    }
    _addlevel = (text) => {
        this.state.catList.push(text);
        this.setState({
            temp_name: '',
            catList: this.state.catList,
            activelevelIndex: this.state.catList.indexOf(text),
        })
    }


    // BOTTOM NAVBAR
    handleHomePagePress = () => this.setState(state => ({
        statusPageDisplay: 'none',
        homePageDisplay: 'block',
        addPageDisplay: 'none',
        catPageDisplay: 'none',
        percentComplete: this.state.completeCount/this.state.taskCount,
    }));
    handleAddPagePress = () => this.setState(state => ({
        statusPageDisplay: 'none',
        homePageDisplay: 'none',
        addPageDisplay: 'block',
        catPageDisplay: 'none',
        percentComplete: this.state.completeCount/this.state.taskCount,
    }));
    handleStatusPagePress = () => this.setState(state => ({
        statusPageDisplay: 'block',
        homePageDisplay: 'none',
        addPageDisplay: 'none',
        catPageDisplay: 'none',
        percentComplete: this.state.completeCount/this.state.taskCount,
    }));
    catPageDisplay = () => this.setState(state => ({
        statusPageDisplay: 'none',
        homePageDisplay: 'none',
        addPageDisplay: 'none',
        catPageDisplay: 'block',
        percentComplete: this.state.completeCount/this.state.taskCount,
    }));

    render() {
        return (
            <View style={styles.container}>

                {/*HOME page screen layout*/}
                <View style={{ display: this.state.homePageDisplay }}>
                    <View style={styles.contentContainer}>
                        <ScrollView style={styles.scrollView}>
                            {this.state.taskList.map((task) => (
                                <View style={styles.row}>
                                    <Text style={{transform: [{ rotate: "270deg" }]}}>
                                        {task.level}
                                    </Text>
                                    <View style={styles.taskCard}>
                                        <View style={{flexDirection: 'row'}}>
                                            <View style={{flex: 1}}>
                                                <TouchableHighlight 
                                                    onPress={() => {this._updateTaskStatus(task)}}
                                                >
                                                    <Text style={styles.cardText}>[X]</Text>
                                                </TouchableHighlight>
                                            </View>
                                            <View style={{flexDirection: 'column', justifyContent: 'center', flex: 3}}>
                                                <Text style={{fontSize: deviceHeight/30, fontWeight: 'bold', color: 'white'}}>
                                                    {task.name} 
                                                </Text>
                                                <Text style={{fontSize: deviceHeight/40, color: 'lightgray'}}>
                                                    {task.time} hours
                                                </Text>
                                                <Text style={styles.cardText}>Status: {task.statusDisplay}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <TouchableHighlight onPress={() => {this._updateTaskStatus(task)}}>
                                        <Text style={styles.cardText}>[D]</Text>
                                    </TouchableHighlight>
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
                                onChangeText={(temp_taskTime) => this.setState({ temp_taskTime })}
                                placeholder='hours required'
                                placeholderTextColor={'#C9C9C9'}
                                value={this.state.temp_taskTime}
                            />
                            <TouchableHighlight style={styles.button_wide}
                                onPress={() => {
                                    this._addTask(
                                        this.state.temp_taskName, this.state.temp_taskTime, this.state.activelevelIndex)
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

                {/*category page screen layout*/}
                <View style={{ display: this.state.catPageDisplay }}>
                    <View style={styles.contentContainer}>
                        <View style={styles.column}>
                            <Text>
                                Current category: {this.state.catList[this.state.activelevelIndex]}
                            </Text>
                        </View>

                        {/* list-levelnames box */}
                        <View style={{flex: 5, backgroundColor: '#545555', width: deviceWidth/4 *3, borderRadius: 8,}}>
                            <ScrollView>
                                {this.state.catList.map((level) => (
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
                                    placeholder='cat level'
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
                        <Image
                            style={{ height: 24, width: 24, tintColor: 'white' }}
                            source={{ uri: this.state.homeIconUrl }}
                        />
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.navButton}
                        onPress={this.handleAddPagePress}
                    >
                        <Image
                            source={{ uri: this.state.addIconUrl }}
                            style={{ height: 24, width: 24 }}
                        />
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.navButton}
                        onPress={this.handleStatusPagePress}
                    >
                        <Image
                            source={{ uri: this.state.statusIconUrl }}
                            style={{ height: 24, width: 24 }}
                        />
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.navButton}
                        onPress={this.catPageDisplay}
                    >
                        <Image
                            source={{ uri: this.state.catIconUrl }}
                            style={{ height: 24, width: 24 }}
                        />
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
        backgroundColor: '#222222',
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
    cardText: {
        fontSize: deviceHeight / 30,
        color: 'white',
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
        justifyContent: 'center',
        color: 'white',
        backgroundColor: '#545555',
        margin: 4,
        padding: 8,
        borderRadius: 4,
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