import { useCallback, useState } from "react";
import { FlatList, Text, Button, TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { AppLayout } from "../AppLayout/Component";

type ListPageTemplateProps<T extends { getId(): string }> = {
  title: string;
  fetchItems: () => Promise<T[]>;
  onPressAdd?: () => void;
  addButtonLabel?: string;
  onPressItem?: (item: T) => void;
  getItemTitle: (item: T) => string;
};

export function ListPageTemplate<T extends { getId(): string }>({
  title,
  fetchItems,
  onPressAdd,
  addButtonLabel = "Adicionar",
  onPressItem,
  getItemTitle,
}: ListPageTemplateProps<T>) {
  const [items, setItems] = useState<T[]>([]);

  const loadData = useCallback(async () => {
    const data = await fetchItems();
    setItems(data);
  }, [fetchItems]);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData]),
  );

  return (
    <AppLayout>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        {title}
      </Text>
      <FlatList
        data={items}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.getId()}
            onPress={() => onPressItem?.(item)}
          >
            <Text>{getItemTitle(item)}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
      {onPressAdd && <Button title={addButtonLabel} onPress={onPressAdd} />}
    </AppLayout>
  );
}
