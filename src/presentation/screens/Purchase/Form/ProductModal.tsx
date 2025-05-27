import { Product } from "@/models/Product";
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
import { Modal, View } from "react-native";
import { Form } from "@/components/organism/Form/Component";
import { ProductPurchasePresentationDTO } from "./dtos/ProductPurchasePresentationDTO";

export interface ProductModalRef {
  openModalAddMode: (product: Product) => void;
  openModalEditMode: (
    product: ProductPurchasePresentationDTO,
    productIndex: number,
  ) => void;
  closeModal: () => void;
}

interface ProductModalProps {
  onConfirm: (
    product: ProductPurchasePresentationDTO,
    productIndex?: number,
  ) => void;
}

const ProductModal = forwardRef<ProductModalRef, ProductModalProps>(
  ({ onConfirm }, ref) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [productIndex, setProductIndex] = useState<number | undefined>(
      undefined,
    );
    const [formData, setFormData] = useState<ProductPurchasePresentationDTO>(
      new ProductPurchasePresentationDTO(),
    );

    const openModalAddMode = useCallback((product: Product) => {
      setFormData(
        new ProductPurchasePresentationDTO({
          name: product.getName(),
          isOnSale: false,
          quantity: 1,
          unitPrice: 0,
        }),
      );
      setModalVisible(true);
      setProductIndex(undefined);
    }, []);

    const openModalEditMode = useCallback(
      (product: ProductPurchasePresentationDTO, productIndex: number) => {
        setFormData(product);
        setModalVisible(true);
        setProductIndex(productIndex);
      },
      [],
    );

    const closeModal = useCallback(() => {
      setModalVisible(false);
    }, []);

    useImperativeHandle(ref, () => ({
      openModalAddMode,
      closeModal,
      openModalEditMode,
    }));

    const handleConfirm = useCallback(() => {
      if (formData) {
        onConfirm(formData, productIndex);
        closeModal();
      }
    }, [formData, onConfirm, productIndex, closeModal]);

    return (
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white w-[90%] p-4 rounded-md gap-4">
            <Form
              data={formData}
              onSubmit={handleConfirm}
              onCancel={closeModal}
            />
          </View>
        </View>
      </Modal>
    );
  },
);

ProductModal.displayName = "ProductModal";

export default ProductModal;
