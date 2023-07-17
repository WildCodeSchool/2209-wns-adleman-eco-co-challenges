import { View, Text, FlatList } from "react-native";
import {Button} from "@ui-kitten/components";
import React from "react";
import {useGetUserEventsQuery} from "../gql/generated/schema";
import { List } from "./../components/"

export default function EventsScreen() {

    const { data: events } = useGetUserEventsQuery({
        variables: {
            isOver: false,
            userId: 0,
        },
        errorPolicy: "ignore",
    });
    const datas = events?.getEvents?.map(event => {
        return {
            name: event.name,
            description: event.description,
            image: event.image,
            id: event.id,
        }
    })

    return (
        <View>
            <FlatList
                data={datas}
                renderItem={
                    ({item}) => {
                        return (
                            <List
                                title= {item.name}
                                description= {item.description}
                                image= {item.image}
                            />                        )
                    }
                }
                keyExtractor={
                    (item) => {
                        return item.id
                    }
                }
            />
        </View>
    )
}