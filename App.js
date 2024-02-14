import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Alert, Keyboard } from 'react-native';
import api from './src/service/api';

export default function App() {

  const [cep, setCep] = useState("");
  const inputRef = useState(null);
  const [cepUser, setCepUser] = useState(null);


  async function buscar() {

    if (cep == "") {
      alert("Digite um cep valido");
      setCep("");
      return;
    }

    try {

      const res = await api.get(`/${cep}/json/`);
      setCepUser(res.data);
      Keyboard.dismiss("");

    } catch (error) {
      console.log(error);
    }
  }

  function limpar() {
    setCep("");
    inputRef.current.focus();
    setCepUser(null);
  }


  return (
    <SafeAreaView style={styles.container}>

      <View style={{ alignItems: 'center' }}>
        <Text style={styles.textInput}>Digite o cep desejado</Text>

        <TextInput
          style={styles.input}
          placeholder='Ex: 00000001'
          value={cep}
          keyboardType='numeric'
          onChangeText={(item) => setCep(item)}
          ref={inputRef}
        />

      </View>

      <View style={styles.areaBtn}>

        <TouchableOpacity
          onPress={buscar}
          style={[styles.btn, { backgroundColor: '#1d75cd' }]}>
          <Text style={styles.botaoText}>Buscar</Text>

        </TouchableOpacity>

        <TouchableOpacity
          onPress={limpar}
          style={[styles.btn, { backgroundColor: '#cd3e1d' }]}
        >
          <Text style={styles.botaoText}>Limpar</Text>
        </TouchableOpacity>

      </View>

      {cepUser &&
        <View style={styles.resultado}>
          <Text style={styles.itemCep}>CEP: {cepUser.cep}</Text>
          <Text style={styles.itemCep}>Logradouro: {cepUser.logradouro} </Text>
          <Text style={styles.itemCep}>Bairro: {cepUser.bairro}</Text>
          <Text style={styles.itemCep}>Cidade: {cepUser.localidade}</Text>
          <Text style={styles.itemCep}>Estado: {cepUser.uf}</Text>
        </View>
      }

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40
  },
  textInput: {
    marginTop: 25,
    marginBottom: 15,
    fontSize: 25,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 5,
    width: '90%',
    padding: 10,
    fontSize: 18
  },
  areaBtn: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-around'
  },
  btn: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5
  },
  botaoText: {
    fontSize: 15,
    color: '#FFF'
  },
  resultado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemCep: {
    fontSize: 22
  }
});
