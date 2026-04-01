import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

const { width } = Dimensions.get('window');
const VIDEO_DATA = [
  {
    id: 'dQw4w9WgXcQ',
    title: 'Rick Astley - Never Gonna Give You Up',
    channel: 'RickAstleyVEVO',
    views: '1.2B views',
    time: '4:03',
    thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
  },
  // Add more sample videos
];

export default function HomeScreen() {
  const [playingVideo, setPlayingVideo] = useState(null);
  const playerRef = useRef();

  const renderVideoItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.videoItem}
      onPress={() => setPlayingVideo(item)}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <View style={styles.videoInfo}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.channel}>{item.channel}</Text>
        <Text style={styles.details}>{item.views} • {item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {playingVideo ? (
        <>
          <YoutubePlayer
            ref={playerRef}
            height={250}
            videoId={playingVideo.id}
            play={false}
            onChangeState={state => {
              if (state === 'ended') setPlayingVideo(null);
            }}
          />
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => setPlayingVideo(null)}
          >
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </>
      ) : (
        <FlatList
          data={VIDEO_DATA}
          renderItem={renderVideoItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  videoItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  thumbnail: {
    width: 200,
    height: 110,
    borderRadius: 8,
    marginRight: 12,
  },
  videoInfo: { flex: 1, justifyContent: 'space-between' },
  title: { color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  channel: { color: 'gray', fontSize: 14 },
  details: { color: 'gray', fontSize: 12 },
  closeButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  closeText: { color: 'white', fontSize: 20 },
});
