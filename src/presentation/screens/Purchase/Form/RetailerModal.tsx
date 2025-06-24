import { ServiceFacadeProvider } from "@/application/ServiceFacadeProvider";
import { Retailer } from "@/models/Retailer";
import { forwardRef, useEffect, useRef, useState } from "react";
import { Modal, TextInput, TouchableOpacity, View } from "react-native";

export interface RetailerModalRef {
  open: () => void;
}

interface RetailerModalProps {}

const retailerService = ServiceFacadeProvider.getCloud().getRetailerService();

const RetailerModal = forwardRef<RetailerModalRef, RetailerModalProps>(
  (props, ref) => {
    const [retailerName, setRetailerName] = useState("");
    const [retailersList, setRetailersList] = useState<Retailer[]>([]);
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
      if (!retailerName.trim()) return;

      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      debounceTimeout.current = setTimeout(async () => {
        const retailers = await retailerService.listByName(retailerName);
      }, 500); // tempo de debounce: 500ms

      return () => {
        if (debounceTimeout.current) {
          clearTimeout(debounceTimeout.current);
        }
      };
    }, [retailerName]);

    return (
      <Modal animationType="fade" transparent={true}>
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white w-[90%] p-4 rounded-md gap-4">
            <View>
              <TextInput
                value={retailerName}
                onChangeText={setRetailerName}
              ></TextInput>
              <TouchableOpacity onPress={() => {}}></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  },
);

RetailerModal.displayName = "RetailerModal";

export default RetailerModal;
