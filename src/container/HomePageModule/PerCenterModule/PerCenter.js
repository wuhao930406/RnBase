/**
 * Created by kurosaki on 2018/11/27.
 */
import React, { Component } from 'react';
import { Container, Header, Content, Button,Icon, List, ListItem,Left, Body, Right, Switch } from 'native-base';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {
    Text,
    View,
    Image,
    ImageBackground,
    Dimensions,
    ScrollView,
    AsyncStorage,
    StatusBar,
    TouchableOpacity,
    TouchableWithoutFeedback
} from 'react-native';

let {height,width} =  Dimensions.get('window');

const styles = {
    container: {
        flex: 1,//percenterbac
    },
    imagehead:{
        width:76,
        height:76,
        borderRadius:600,
        overflow:"hidden",
        marginLeft:24,
        marginRight:12
    },
    items:{
        borderBottomColor:"#f0f0f0",
        borderBottomWidth:10,
        paddingBottom:-1
    }
}
export default class PerCenter extends Component<Props> {
    constructor(props){
        super(props);
        this.state={
            userInfo:{
                name:"",
                partyname:"",
                dutyname:""
            },
            navbar:{
                firstNav:[{
                    icon:require("../../../assets/images/pcicon01.png"),
                    route:"CostHistory",
                    name:"我的缴费"
                },{
                    icon:require("../../../assets/images/pcicon02.png"),
                    route:"Activity",
                    params:{index:3},
                    name:"我的活动"
                }],
                secondNav:[{
                    icon:require("../../../assets/images/pcicon03.png"),
                    route:"MyExam",
                    name:"我的考试"
                },{
                    icon:require("../../../assets/images/pcicon04.png"),
                    route:"MyService",
                    name:"我的服务"
                },{
                    icon:require("../../../assets/images/pcicon05.png"),
                    route:"Application",
                    name:"我的申请"
                }],
                thirdNav:[{
                    icon:require("../../../assets/images/pcicon06.png"),
                    route:"NewsList",
                    name:"消息通知"
                },{
                    icon:require("../../../assets/images/pcicon07.png"),
                    route:'Setting',
                    name:"设置"
                },{
                    icon:require("../../../assets/images/pcicon08.png"),
                    route:'Login',
                    name:"退出"
                },

                ]
            }

        }

    }
    componentWillMount(){
        this.props.navigation.addListener(
            'willFocus',
            payload => {
                AsyncStorage.getItem("userName",(error,result)=>{
                    if(error){
                        //some error logs
                    }else{
                        this.setState({
                            userInfo:{...this.state.userInfo,name:result?result:""}
                        })
                    }
                })
                AsyncStorage.getItem("partyname",(error,result)=>{
                    if(error){
                        //some error logs
                    }else{
                        this.setState({
                            userInfo:{...this.state.userInfo,partyname:result?result:""}
                        })
                    }
                })
                AsyncStorage.getItem("duty_name",(error,result)=>{
                    if(error){
                        //some error logs
                    }else{
                        this.setState({
                            userInfo:{...this.state.userInfo,dutyname:result?result:""}
                        })
                    }
                })
            }
        );
    }

    componentDidMount(){

    }


    render() {
        let { userInfo,navbar } = this.state;
        let itemcons = (item,i,length)=>{
            return(
                <ListItem key={i} last={i==length-1?true:false} icon onPress={()=>{
                    item.params?
                    this.props.navigation.navigate(item.route,item.params):
                    this.props.navigation.navigate(item.route)
                }}>
                    <Left>
                        <Image style={{width:18,height:18}} source={item.icon}></Image>
                    </Left>
                    <Body>
                        <Text>{item.name}</Text>
                    </Body>
                    <Right>
                        {
                            item.route=="Login"?null:<Icon active name="chevron-small-right" type="Entypo" />
                        }
                    </Right>
                </ListItem>)
        }

        return (
            <Container>
                <ScrollView showsVerticalScrollIndicator = {false}>
                    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
                        <TouchableWithoutFeedback onPress={()=>{
                            this.props.navigation.navigate("Personal");
                        }}>
                            <View style={{width:0.8*width,height:160}}>
                                <ImageBackground
                                    style={{width:0.8*width,height:160,flexDirection:"row",justifyContent:"center",alignItems:"center"}}
                                    source={require('../../../assets/images/percenterbac.png')}
                                    resizeMode='cover'>
                                    <View style={styles.imagehead}>
                                        <ImageBackground
                                            style={{width:76,height:76}}
                                            source={require('../../../assets/images/headtemp.jpg')}
                                            resizeMode='cover'>
                                        </ImageBackground>
                                    </View>
                                    <View style={{flex:1}}>
                                        <Text style={{color:"#fff",fontSize:18,fontWeight:"bold",marginBottom:10}} numberOfLines={1}>
                                            {userInfo.name}
                                        </Text>
                                        <Text style={{color:"#fff",fontSize:14}} numberOfLines={1}>
                                            {userInfo.partyname+userInfo.dutyname}
                                        </Text>
                                    </View>
                                </ImageBackground>
                            </View>
                        </TouchableWithoutFeedback>
                        <View>
                            <List style={styles.items}>
                                {
                                    navbar.firstNav.map((item,i)=>{
                                        return itemcons(item,i,navbar.firstNav.length)
                                    })
                                }
                            </List>
                            <List style={styles.items}>
                                {
                                    navbar.secondNav.map((item,i)=>{
                                        return itemcons(item,i,navbar.secondNav.length)
                                    })
                                }
                            </List>
                            <List style={[styles.items,{borderBottomWidth:0}]}>
                                {
                                    navbar.thirdNav.map((item,i)=>{
                                        return itemcons(item,i,navbar.thirdNav.length)
                                    })
                                }
                            </List>

                        </View>




                    </SafeAreaView>
                </ScrollView>
            </Container>
        );
    }
}


