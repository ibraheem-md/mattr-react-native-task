import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';

const FilterScreen = () => {
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedAgeRange, setSelectedAgeRange] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'Score', value: 'score' },
    { label: 'Date Joined', value: 'date_joined' }
  ]);
  
  const navigation = useNavigation();

  const applyFilters = () => {
    navigation.navigate('Activity', { gender: selectedGender, ageRange: selectedAgeRange, sortBy });
  };

  const clearFilters = () => {
    setSelectedGender(null);
    setSelectedAgeRange(null);
    setSortBy(null);
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.appBar}>
        <TouchableOpacity onPress={goBack} style={styles.appBarButton}>
          <Text style={styles.appBarButtonText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.appBarTitle}>Filter</Text>
        <TouchableOpacity onPress={clearFilters} style={styles.appBarButton}>
          <Text style={styles.appBarButtonText}>Clear All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Select Gender</Text>
        <View style={styles.row}>
          <TouchableOpacity 
            onPress={() => setSelectedGender('male')} 
            style={[styles.option, selectedGender === 'male' && styles.selectedOption]}
          >
            <Text style={styles.optionText}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setSelectedGender('female')} 
            style={[styles.option, selectedGender === 'female' && styles.selectedOption]}
          >
            <Text style={styles.optionText}>Female</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.title}>Select Age Range</Text>
        <View style={styles.row}>
          <TouchableOpacity 
            onPress={() => setSelectedAgeRange('(20-24)')} 
            style={[styles.option, selectedAgeRange === '(20-24)' && styles.selectedOption]}
          >
            <Text style={styles.optionText}>(20-24)</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setSelectedAgeRange('(25-30)')} 
            style={[styles.option, selectedAgeRange === '(25-30)' && styles.selectedOption]}
          >
            <Text style={styles.optionText}>(25-30)</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setSelectedAgeRange('(30-40)')} 
            style={[styles.option, selectedAgeRange === '(30-40)' && styles.selectedOption]}
          >
            <Text style={styles.optionText}>(30-40)</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setSelectedAgeRange('(40+)')} 
            style={[styles.option, selectedAgeRange === '(40+)' && styles.selectedOption]}
          >
            <Text style={styles.optionText}>(40+)</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.title}>Sort By</Text>
        <DropDownPicker
          open={open}
          value={sortBy}
          items={items}
          setOpen={setOpen}
          setValue={setSortBy}
          setItems={setItems}
          containerStyle={styles.dropdownContainer}
          style={styles.dropdown}
          dropDownStyle={styles.dropdown}
          placeholder="Select sorting option"
        />
      </View>
      <View style={styles.applyButtonContainer}>
        <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
          <Text style={styles.applyButtonText}>Apply Filters</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBE4E2',
  },
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#FBE4E2',
  },
  appBarButton: {
    padding: 8,  // Decreased padding
  },
  appBarButtonText: {
    fontSize: 14,  // Decreased font size
    color: '#007BFF',
  },
  appBarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    alignItems: 'flex-start',  // Align content to the left
    padding: 20,
  },
  title: {
    fontSize: 22,  // Slightly decreased font size
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  option: {
    paddingVertical: 8,  // Decreased padding
    paddingHorizontal: 20,  // Adjusted horizontal padding
    backgroundColor: '#ccc',
    margin: 5,  // Margin instead of vertical spacing
    borderRadius: 20,  // Slightly decreased border radius
    borderWidth: 1,  // Decreased border width
    borderColor: '#ccc',
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#007BFF',
    borderColor: '#007BFF',
  },
  optionText: {
    fontSize: 16,  // Slightly decreased font size
    color: '#fff',
  },
  applyButtonContainer: {
    padding: 100,
    alignItems: 'center',  // Center the apply button
    backgroundColor: '#FBE4E2',
  },
  applyButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: 'tomato',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'tomato',
  },
  applyButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,  // Slightly increased font size
  },
  dropdownContainer: {
    width: '100%',
    marginVertical: 10,
  },
  dropdown: {
    backgroundColor: '#ccc',
    borderColor: '#ccc',
   
  },
});

export default FilterScreen;
