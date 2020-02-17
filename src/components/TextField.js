import React from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';
import { s, vs, ms } from 'react-native-size-matters';
import PropTypes from 'prop-types';

const TextField = ({
  label,
  value,
  hint,
  onChangeText,
  secureTextEntry = false
}) => {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        hint={hint}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
        autoCompleteType="off"
        onChangeText={onChangeText}
      />
    </>
  );
};

TextField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  hint: PropTypes.string,
  onChangeText: PropTypes.func,
  secureTextEntry: PropTypes.bool
};

const styles = StyleSheet.create({
  label: { paddingVertical: vs(5) },
  input: {
    height: vs(40),
    borderColor: 'gray',
    borderWidth: s(1),
    borderRadius: ms(5),
    paddingHorizontal: s(8),
    fontSize: ms(14)
  }
});

export default TextField;
