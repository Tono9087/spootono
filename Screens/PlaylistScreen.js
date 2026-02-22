// src/screens/PlaylistScreen.js
import { useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, View, TextInput, TouchableOpacity, Text } from "react-native";
import SongItem from "../components/SongItem";
import { SONGS } from "../data/mockData";

// require the placeholder image once so bundler includes it and we don't use a dynamic require later
const placeholderCover = require("../assets/SongPlaceHolder.jpg");

export default function PlaylistScreen() {

  const [playlist, setPlaylist] = useState(SONGS);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");

  const addSong = () => {
    if (title.trim() === "" || artist.trim() === "") return;

    const newSong = {
      id: Date.now().toString(),
      title: title.trim(),
      artist: artist.trim(),
      cover: placeholderCover,
    };

    setPlaylist((currentPlaylist) => [...currentPlaylist, newSong]);
    setTitle("");
    setArtist("");
  };


  const deleteSong = (id) => {
    setPlaylist((currentSongs) =>
      currentSongs.filter((song) => song.id !== id)
    );
  };

  const renderSong = ({ item }) => (
    <SongItem
      title={item.title}
      artist={item.artist}
      cover={item.cover}
      onDelete={() => deleteSong(item.id)}
    />
  );

  const itemSeparator = () => <View style={styles.separator} />;

  const listEmptyComponent = () => (
    <View style={styles.listEmptyComponent}>
      <Text style={styles.emptyText}>Your playlist is empty</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.headerContainer}>
        <TextInput placeholder= "Song title" style={styles.titleInput} value={title} onChangeText={setTitle}></TextInput>
        <TextInput placeholder= "Artist name" style={styles.titleInput} value={artist} onChangeText={setArtist}></TextInput>
        <TouchableOpacity style={styles.addButton} onPress={addSong} > 
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>

      </View>
      <View style={styles.playlistContainer}>
        <FlatList
          data={playlist}
          renderItem={renderSong}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={itemSeparator}
          ListEmptyComponent={listEmptyComponent}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: "#262a2b",

  },
    headerContainer: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      paddingHorizontal: 10,
      paddingVertical: 12,
      margin: 5,
      backgroundColor: '#333',
  },
    titleInput: {
      flex: 1,
      minWidth: 80,
      height: 40,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      paddingHorizontal: 8,
      marginHorizontal: 5,
      color: '#fff',          
      backgroundColor: '#444', 
  },
  addButton: {
    backgroundColor: '#444444',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },

  addButtonText: {
    color: '#fff',
  },


  playlistContainer: {
    width: "100%",
    height: "90%",
    padding: 20,
  },

  separator : {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },

  listEmptyComponent : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  emptyText : {
    color: '#fff',
    fontSize: 18,
  },
});