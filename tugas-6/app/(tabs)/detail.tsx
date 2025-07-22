import { StyleSheet, Text, View } from 'react-native';

interface RouteParams {
  name: string;
}

export default function DetailScreen({ route }: { route: { params: RouteParams } }) {
  const name = route?.params?.name || '';
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📄 Detail Screen (via Stack)</Text>
      <Text>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20 },
});
