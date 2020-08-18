import React from 'react';
import {View,Image,StyleSheet,Text,TouchableOpacity, Dimensions} from 'react-native';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

export default class Chart extends React.Component{
    render(){
        return (
            <View>
                <LineChart
                    data={{
                    labels: [],
                    datasets: [
                        {
                        data: [
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100
                        ]
                        }
                    ]
                    }}
                    width={360} // from react-native
                    height={220}
                    yAxisLabel="$"
                    yAxisSuffix="k"
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                    backgroundColor: "#FAB511",
                    backgroundGradientFrom: "#FAB511",
                    backgroundGradientTo: "#FAB511",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 100) => `rgba(0, 133, 133, ${opacity})`,
                    labelColor: (opacity = 100) => `rgba(0, 133, 133, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#008585"
                    }
                    }}
                    bezier
                    style={{
                    marginVertical: 8,
                    marginLeft: 5,
                    marginRight: 5,
                    borderRadius: 16
                    }}
                />
            </View>
        );
    }
}