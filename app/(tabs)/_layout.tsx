import { Tabs } from 'expo-router';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function TabLayout() {
  const backgroundColor = useThemeColor({ light: '#A1CEDC', dark: '#1D3D47' }, 'background');
  const tabColor = useThemeColor({ light: '#0077B6', dark: '#90E0EF' }, 'tint');

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tabColor,
        headerStyle: { backgroundColor },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      {/* Add more tab screens as needed */}
    </Tabs>
  );
}

// You'll need to create this component or import from a library like @expo/vector-icons
function TabBarIcon(props: { name: string; color: string }) {
  // Replace with your actual icon implementation
  return null;
}
