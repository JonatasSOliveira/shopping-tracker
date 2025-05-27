import InlineAd from "@/components/atom/InlineAd/Component";
import { View } from "react-native";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <View className="flex-1">
      <InlineAd />
      <View className="flex-1 items-center flex-col gap-4 flex">
        {children}
      </View>
    </View>
  );
};
