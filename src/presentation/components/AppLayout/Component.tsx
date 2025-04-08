import { View } from "react-native";
import InlineAd from "../InlineAd/Component";

// AppLayout.tsx
export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>{children}</View>
      <InlineAd />
    </View>
  );
};
