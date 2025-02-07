import React from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface DropdownRacaProps {
  data: { label: string; value: string }[];
  value: string | null;
  setValue: (value: string) => void;
}

const DropdownRaca: React.FC<DropdownRacaProps> = ({ data, value, setValue }) => {
  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Selecione uma raça"
      searchPlaceholder="Buscar..."
      value={value}
      onChange={(item: { value: string }) => setValue(item.value)}
      renderLeftIcon={() => (
        <MaterialCommunityIcons style={styles.icon} color="black" name="dog" size={24} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  dropdown: {
    width: '100%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    marginTop:25,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    fontSize: 16,
  },
  iconStyle: {
    marginRight: 10,
  },
  icon: {
    marginRight: 10,
    marginLeft:10,
    color: 'black',
  },
});

export default DropdownRaca;
