import { View, Text, FlatList } from "react-native";
import {Button} from "@ui-kitten/components";
import React from "react";
import {useGetUserEventsQuery} from "../gql/generated/schema";
import { List } from "./components/"

export default function EventsScreen() {

    const { data: events } = useGetUserEventsQuery({
        variables: {
            isOver: false,
            userId: 0,
        },
        errorPolicy: "ignore",
    });
    const datas = events.map(event => {
        return {
            title: event.title,
            description: event.description,
            date: event.date,
            location: event.location,
        }
    })

    return (
        <View>
            <Button>HOME</Button>
            <Text>
                Hello World
            </Text>
            <FlatList
                data={events}
                renderItem={}
                keyExtractor={}
            />
        </View>
    )
}

// TODO: JE ME SUIS ARRETER LA IL FAUT FAIRE UNE LISTE DES EVENT ET METTRE LE TRUC STYLÉ DE UI KITTEN