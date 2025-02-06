import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts, Poppins_700Bold } from '@expo-google-fonts/poppins';

export default function ApiRacaDog() {
  const [breeds, setRacas] = useState([]); // Armazenamento das raças
  const [loading, setLoading] = useState(true); // Estado para o carregamento
  const [value, setValue] = useState<string | null>(null); // Estado para o item selecionado
  const [imageUrl, setImageUrl] = useState<string | null>(null); // URL da imagem
  const [loadingImage, setLoadingImage] = useState<boolean>(false); // Estado para o carregamento da imagem

  useEffect(() => {
    // Função para buscar as raças da API
    const buscaRacas = async () => {
      try {
        const response = await fetch("https://dog.ceo/api/breeds/list");
        const result = await response.json();

        // Formatando os dados para o dropdown
        const formattedData = result.message.map((breed: string) => ({
          label: breed,
          value: breed,
        }));

        setRacas(formattedData);
      } catch (error) {
        console.error("Erro ao buscar raças:", error);
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    buscaRacas();
  }, []);

  const BuscaIamgem = async () => {
    if (!value) return;
    setLoadingImage(true); // Inicia o carregamento da imagem

    try {
      const response = await fetch(`https://dog.ceo/api/breed/${value}/images/random`);
      const result = await response.json();
      setImageUrl(result.message); // Armazena a URL da imagem
    } catch (error) {
      console.error("Erro ao buscar imagem:", error);
    } finally {
      setTimeout(() => setLoadingImage(false), 3000); // Fim do carregamento após 3s
    }
  };

  return (
    
      
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Text style={styles.titulo}>Buscador de Doguinho</Text>

          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={breeds}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Selecione uma raça"
            searchPlaceholder="Buscar..."
            value={value}
            onChange={(item: { value: string }) => setValue(item.value)}
            renderLeftIcon={() => (
              <MaterialCommunityIcons
                style={styles.icon}
                color="black"
                name="dog"
                size={24}
              />
            )}
          />

          <TouchableOpacity style={styles.button} onPress={BuscaIamgem}>
            <Text style={styles.buttonText}>Buscar Imagem</Text>
          </TouchableOpacity>

          <View style={styles.imagemContainer}>
            {loadingImage ? (
              <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />
            ) : (
              imageUrl && (
                <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="contain"/>
              )
            )}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 150, 
    alignItems: 'center',
    padding: 50,
  },
  titulo: {
    marginBottom: 40,
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
  },
  dropdown: {
    width: '100%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  icon: { 
    marginRight: 10,
    marginLeft: 10,
    color: 'black',
  },
  inputSearchStyle: {
    fontSize: 16,
  },
  iconStyle: {
    marginRight: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  imagemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    marginTop: 20,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 10,
  },
});
