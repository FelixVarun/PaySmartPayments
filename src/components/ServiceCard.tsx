import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { PRIMARY_BACKGROUND } from '../utils/Global';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 60) / 2;

interface ServiceCardProps {
  item: any;
  onAdd: (item: any) => void;
  existingItem?: any;
}

const ServiceCard = ({ item, onAdd, existingItem }: ServiceCardProps) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />

      <View style={styles.cardContent}>
        <Text style={styles.itemTitle} numberOfLines={1}>
          {item.title}
        </Text>

        <Text style={styles.itemPrice}>₹{item.price}</Text>

        <TouchableOpacity
          style={styles.addButton}
          activeOpacity={0.7}
          onPress={() => onAdd(item)}
        >
          <Text style={styles.addButtonText}>
            {existingItem ? `Added (${existingItem.quantity})` : 'Add to Cart'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ServiceCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    width: CARD_WIDTH,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 1,
    shadowColor: '#000',
    borderWidth: 1,
    borderColor: '#D4D4D4',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#eee',
  },
  cardContent: {
    padding: 12,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  itemPrice: {
    fontSize: 14,
    color: PRIMARY_BACKGROUND,
    fontWeight: '700',
    marginVertical: 5,
  },
  addButton: {
    backgroundColor: PRIMARY_BACKGROUND,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});