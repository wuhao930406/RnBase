/**
 * Created by kurosaki on 2018/11/29.
 */
import React, { Component } from 'react';
import {  Container,Icon} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {
    Text,
    View,
    ImageBackground,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
const { width,height } = Dimensions.get('window')
const styles = {
    container: {
        flex:1,
    },
    grid:{
        paddingTop:14,
        paddingBottom:14,
        borderBottomColor:"#f0f0f0",
        borderBottomWidth:1,
    }
}

export default class ServiceItem extends React.PureComponent{
    render() {
        let {item,pressFn} = this.props;

        let style1 = ()=>{
            return(
                <Grid style={styles.grid}>
                    <Row size={1} style={{marginBottom:12}}>
                        <Col size={1}>
                            <View style={{borderLeftColor:"#DD5144",borderLeftWidth:4,paddingLeft:12,height:24}}>
                                <Text  numberOfLines={1} style={{textAlign:"left",lineHeight:24}}>
                                    {item.name}
                                </Text>
                            </View>
                        </Col>
                        <Col style={{width:68,height:30}}>
                            <View style={{width:68,height:30,borderBottomLeftRadius:600,borderTopLeftRadius:600,backgroundColor:item.curnum<item.totalnum?"#34A34F":"#DD5144"}}>
                                <Text style={{textAlign:"center",lineHeight:30,color:"#ffffff"}}>
                                    {item.now+'/'+item.total}
                                </Text>
                            </View>
                        </Col>
                    </Row>
                    <Row size={1} style={{height:30}}>
                        <Col size={1} style={{height:30}}>
                            <Row>
                                <Icon type="Entypo" name="location-pin" style={{fontSize: 16, color: 'lightgrey',lineHeight:30}}></Icon>
                                <Text style={{textAlign:"left",lineHeight:30}}>
                                    {item.community}
                                </Text>
                            </Row>
                        </Col>
                        <Col style={{width:100,height:30}}>
                            <View>
                                <Text style={{textAlign:"right",lineHeight:30}}>
                                    {item.type}
                                </Text>
                            </View>
                        </Col>
                    </Row>
                </Grid>
            )
        }


        return (
            <TouchableOpacity style={styles.container} onPress={()=>{pressFn()}}>
                    {
                        style1()
                    }
            </TouchableOpacity>


        );
    }
}