import InlineAd from "@/components/atom/InlineAd/Component";
import { View } from "react-native";

// AppLayout.tsx
export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>{children}</View>
      <InlineAd />
    </View>
  );
};
