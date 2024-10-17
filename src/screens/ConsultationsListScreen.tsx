import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

interface Consultation {
  id: number;
  date: string;
  doctor: string;
  specialty: string;
  status: string;
}

const ConsultationsListScreen = () => {
  const [consultations, setConsultations] = useState<Consultation[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Recupera o token armazenado

    if (!token) {
      console.log('Usuário não autenticado');
      return;
    }

    // Fetch consultations from the backend
    axios
      .get('http://localhost:3000/api/consultations', {
        headers: {
          Authorization: `Bearer ${token}`, // Adiciona o token no header
        },
      })
      .then((response) => {
        setConsultations(response.data); // Atualize esta linha para atribuir diretamente a resposta
      })
      .catch((error) => {
        console.error('Erro ao buscar consultas:', error);
      });
  }, []);

  const renderItem = ({ item }: { item: Consultation }) => (
    <View style={styles.consultationItem}>
      <Text>Data: {item.date}</Text>
      <Text>Médico: {item.doctor}</Text>
      <Text>Especialidade: {item.specialty}</Text>
      <Text>Status: {item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={consultations}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  consultationItem: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
});

export default ConsultationsListScreen;
