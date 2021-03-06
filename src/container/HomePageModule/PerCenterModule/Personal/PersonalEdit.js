/**
 * Created by kurosaki on 2018/12/17.
 */

import React, { Component } from 'react';
import {  Container, Header, Content, Item,Label , Button, Icon, Left, Right, Body,Input } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {
    Text,
    View,
    Image,
    ImageBackground,
    Dimensions,
    Animated,
    ScrollView,
    WebView,
    TouchableOpacity,
} from 'react-native';
import {timetrans,MyUtil,HttpUtils,BASE_URL,PORT_NAME} from '../../../../components'

const { width,height } = Dimensions.get('window')
const styles = {
    container: {
        flex:1,
    },
    map:{
        width:width,
        height:(height-180)*0.55
    },
    customInfoWindow: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        elevation: 4,
        borderWidth: 2,
        borderColor: '#DD5144',
        marginBottom: 5,
    },
    srcollView:{
        flex:1,
        padding:14,
    },
    rows:{
        paddingBottom:14,
        flexDirection:"row",
        width:width-28,
        justifyContent:"space-between",
        alignItems:"flex-start"
    },
    titled:{
        fontSize:16,
        color:"#333",
        width:88
    },
    cons:{
        fontSize:14,
        color:"#666",
        flex:1,
        textAlign:"right"
    }

}


export default class PersonalEdit extends React.PureComponent{
    constructor(props){
        super(props);
        this.state = {
            formvalue:{
                "qq":"15195593577",
                "partyname":"蓝湾国际党支部",
                "communist_id":1008,
                "mobile":"15195593577",
                "wechat":"12345",
                "is_communist":"0",
                "usr_org":"12345",
                "score":0,
                "duty_name":"普通党员",
                "img_url":require("../../../../assets/images/headtemp.jpg"),
                "usr_id":1008,
                "org_id":1115,
                "usr_idcard":"321027199007102429",
                "partyorg_name":"蓝湾国际党支部",
                "communist_dtm":"2012-06-10",
                "usr_name":"王菁菁",
                "usr_pwd":"123456",
                "email":"12345@163.com"
            },
        }


    }

    componentDidMount(){
        this.getUserInfo()
    }
    /*获取用户信息*/
    getUserInfo(){
        HttpUtils.post(BASE_URL+PORT_NAME.getUserInfo).then(res=>{
            if(res.code==0){
                this.setState({
                    formvalue:res.data
                })
            }else{
                alert("获取信息失败")
            }
        }).catch((error)=>{

        })
    }
    //修改信息
    updateInfomation(){
        let filedata = new FormData(),{formvalue}=this.state;
        filedata.append('userName',formvalue.usr_name);
        filedata.append('org',formvalue.usr_org);
        filedata.append('email',formvalue.email);
        filedata.append('mobile',formvalue.mobile);
        filedata.append('wechat',formvalue.wechat);
        filedata.append('qq',formvalue.qq);
        HttpUtils.postUpload(BASE_URL+PORT_NAME.updateUserForApp,filedata).then(res=>{
            if(res.code==0){
                this.props.navigation.goBack();
            }else{
                alert("修改失败")
            }
        }).catch((error)=>{

        })
    }


    render() {
        let {formvalue,center} = this.state;


        return (
            <Container style={{flex:1,position:"relative"}}>
                <Header style={{backgroundColor:"#DD5144"}}>
                    <Left style={{flex:1}}>
                        <Button transparent onPress={()=>{this.props.navigation.goBack()}}>
                            <Icon name="chevron-small-left" type="Entypo" style={{color:"#fff"}}/>
                        </Button>
                    </Left>
                    <Body style={{flex:4,justifyContent:"center",alignItems:"center"}}>
                    <Text style={{color:"#fff",fontSize:20}}>修改个人信息</Text>
                    </Body>
                    <Right style={{flex:1}}>
                    </Right>
                </Header>
                <Content style={{padding:14}}>
                    <ScrollView style={{flex:1}}>
                        <Row style={{width:width-28,paddingTop:12,marginBottom:12}}>
                            <Item floatingLabel style={{flex:1}}>
                                <Label>姓名</Label>
                                <Input
                                    onChangeText={(name) => this.setState({
                                    formvalue:{ ...formvalue, usr_name: name }
                                })}
                                    value={formvalue.usr_name}
                                    clearButtonMode="always"
                                />
                            </Item>
                        </Row>
                        <Row style={{width:width-28,paddingTop:12,marginBottom:12}}>
                            <Item disabled floatingLabel style={{flex:1}}>
                                <Label>身份证号</Label>
                                <Input
                                    disabled
                                    onChangeText={(idcard) => this.setState({
                                    formvalue:{ ...formvalue, usr_idcard: idcard }
                                })}
                                    value={formvalue.usr_idcard}
                                    clearButtonMode="always"
                                />
                            </Item>
                        </Row>
                        <Row style={{width:width-28,paddingTop:12,marginBottom:12}}>
                            <Item disabled floatingLabel style={{flex:1}}>
                                <Label>所属党支部</Label>
                                <Input
                                    disabled
                                    onChangeText={(partyname) => this.setState({
                                    formvalue:{ ...formvalue, partyname: partyname }
                                })}
                                    value={formvalue.partyname}
                                    clearButtonMode="always"
                                />
                            </Item>
                        </Row>
                        <Row style={{width:width-28,paddingTop:12,marginBottom:12}}>
                            <Item disabled floatingLabel style={{flex:1}}>
                                <Label>党内职务</Label>
                                <Input
                                    disabled
                                    onChangeText={(duty_name) => this.setState({
                                    formvalue:{ ...formvalue, duty_name: duty_name }
                                })}
                                    value={formvalue.duty_name}
                                    clearButtonMode="always"
                                />
                            </Item>
                        </Row>
                        <Row style={{width:width-28,paddingTop:12,marginBottom:32}}>
                            <Item floatingLabel style={{flex:1}}>
                                <Label>单位</Label>
                                <Input
                                    onChangeText={(partyorg) => this.setState({
                                    formvalue:{ ...formvalue, usr_org: partyorg }
                                })}
                                    value={formvalue.usr_org}
                                    clearButtonMode="always"
                                />
                            </Item>
                        </Row>
                        <Row style={{width:width-28,paddingTop:12,marginBottom:32}}>
                            <Item floatingLabel style={{flex:1}}>
                                <Label>邮箱</Label>
                                <Input
                                    onChangeText={(email) => this.setState({
                                    formvalue:{ ...formvalue, email: email }
                                })}
                                    value={formvalue.email}
                                    clearButtonMode="always"
                                />
                            </Item>
                        </Row>
                        <Row style={{width:width-28,paddingTop:12,marginBottom:32}}>
                            <Item floatingLabel style={{flex:1}}>
                                <Label>手机号</Label>
                                <Input
                                    onChangeText={(mobile) => this.setState({
                                    formvalue:{ ...formvalue, mobile: mobile }
                                })}
                                    value={formvalue.mobile}
                                    clearButtonMode="always"
                                />
                            </Item>
                        </Row>
                        <Row style={{width:width-28,paddingTop:12,marginBottom:32}}>
                            <Item floatingLabel style={{flex:1}}>
                                <Label>微信号</Label>
                                <Input
                                    onChangeText={(wechat) => this.setState({
                                    formvalue:{ ...formvalue, wechat: wechat }
                                })}
                                    value={formvalue.wechat}
                                    clearButtonMode="always"
                                />
                            </Item>
                        </Row>
                        <Row style={{width:width-28,paddingTop:12,marginBottom:32}}>
                            <Item floatingLabel style={{flex:1}}>
                                <Label>QQ号</Label>
                                <Input
                                    onChangeText={(qq) => this.setState({
                                    formvalue:{ ...formvalue, qq: qq }
                                })}
                                    value={formvalue.qq}
                                    clearButtonMode="always"
                                />
                            </Item>
                        </Row>

                        <Button full danger style={{width:width-28,justifyContent:"center",alignItems:"center",marginBottom:68}} onPress={()=>{
                            this.updateInfomation()
                        }}>
                            <Text style={{color:"#fff",fontSize:16}}>确定</Text>
                        </Button>
                    </ScrollView>
                </Content>




            </Container>

        );
    }
}