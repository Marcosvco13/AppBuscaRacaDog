import React, { useState, useEffect, useCallback  } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import DropdownRaca from './components/DropdownRaca';

export default function ApiRacaDog() {
  const [breeds, setRacas] = useState([]); // Armazenamento das raças
  const [loading, setLoading] = useState(true); // Estado para o carregamento
  const [value, setValue] = useState<string | null>(null); // Estado para o item selecionado
  const [imageUrl, setImageUrl] = useState<string | null>(null); // URL da imagem
  const [loadingImage, setLoadingImage] = useState<boolean>(false); // Estado para o carregamento da imagem
  const [errorMessage, setErrorMessage] = useState<string | null>(null); //Estado para carregamento da mensagem de erro

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

  //Função que memoriza os dados para evitar que o dropdown fique renderizando
  const handleSetValue = useCallback((newValue: string | null) => {
    setValue(newValue);
  }, []);

  //Função para buscar a imagem do cachorro
  const BuscaIamgem = async () => {
    
    //Verificação se o value é null
    if (!value) {
      setErrorMessage("Por favor, selecione uma raça antes de buscar a imagem.");
      return;
    }
  
    //Limpeza das constantes caso passe na verificação
    setErrorMessage(null);
    setLoadingImage(true);
    setImageUrl(null);

    //Bloco try catch para tentar se conectar com a api e retornar a imagem desejada
    try {
      const response = await fetch(`https://dog.ceo/api/breed/${value}/images/random`);
      const result = await response.json();
  
      if (!result.message) {
        throw new Error("Nenhuma imagem encontrada.");
      }
  
      setImageUrl(result.message);
    } catch (error) {
      console.error("Erro ao buscar imagem:", error);
      setErrorMessage("Erro ao buscar a imagem. Tente novamente.");
    } finally {
      setTimeout(() => setLoadingImage(false), 3000);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Text style={styles.titulo}>Buscador de Doguinho</Text>

          {/*Aqui eu trago o componente de dropdown que criei*/}
          <DropdownRaca data={breeds} value={value} setValue={handleSetValue} />

          {/* Exibe a mensagem de erro caso o usuário não tenha selecionado uma raça */}
          {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

          {/*Botão para disparar a busca da imagem do cachorro */}
          <TouchableOpacity style={styles.button} onPress={BuscaIamgem}>
            <Text style={styles.buttonText}>Buscar Imagem</Text>
          </TouchableOpacity>

          {/*Loading e exebição da imagem que retornou da api*/}
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
    //justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F8F8F8',
  },
  
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    marginBottom: 20,
    marginTop:50,
    color: '#333',
  },
  
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  
  imagemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  
  loading: {
    marginTop: 20,
  },
  
  image: {
    width: 300,
    height: 300,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  
  errorText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  }
});
