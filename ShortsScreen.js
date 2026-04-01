import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

const { height: screenHeight } = Dimensions.get('window');

export default function ShortsScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const shorts = [
    { id: 'dQw4w9WgXcQ', title: 'Rick Roll Short' },
    { id: '9bZkp7q19f0', title: 'Funny Cat' },
    // Add more shorts
  ];

  const onChangeState = (state, index) => {
    if (state === 'ended') {
      // Auto next
      setCurrentIndex((index + 1) % shorts.length);
    }
  };

  const renderShort = ({ item, index }) => (
    <View style={styles.shortContainer}>
      <YoutubePlayer
        height={screenHeight * 0.8}
        videoId={item.id}
        play={index === currentIndex}
        onChangeState={(state) => onChangeState(state, index)}
      />
      <Text style={styles.shortTitle}>{item.title}</Text>
    </View>
  );

  return (
    <FlatList
      data={shorts}
      renderItem={renderShort}
      keyExtractor={item => item.id}
      pagingEnabled
      horizontal={false}
      showsVerticalScrollIndicator={false}
      onMomentumScrollEnd={e => {
        const index = Math.round(e.nativeEvent.contentOffset.y / screenHeight);
        setCurrentIndex(index);
      }}
    />
  );
}

const styles = {
  shortContainer: {
    height: screenHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  shortTitle: {
    color: 'white',
    position: 'absolute',
    bottom: 100,
    left: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
};
