import { Tabs } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';
import { Chrome as Home, Users, BookOpen, Target, Bell, MessageCircle, BookCheck } from 'lucide-react-native';

export default function TabLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
        },
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="members"
        options={{
          title: 'Members',
          tabBarIcon: ({ color, size }) => <Users size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="books"
        options={{
          title: 'Books',
          tabBarIcon: ({ color, size }) => <BookOpen size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="targets"
        options={{
          title: 'Targets',
          tabBarIcon: ({ color, size }) => <Target size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="daily-activities"
        options={{
          title: 'Activities',
          tabBarIcon: ({ color, size }) => <BookCheck size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="notices"
        options={{
          title: 'Notices',
          tabBarIcon: ({ color, size }) => <Bell size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Messages',
          tabBarIcon: ({ color, size }) => <MessageCircle size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}