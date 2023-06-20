import axios from "axios";
import { Box, Text, Switch, Grid, Heading, Input, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";

function AdmForm() {
  const [admData, setAdmData] = useState([]);
  const [editingEnabled, setEditingEnabled] = useState(false);

  const fetchAdmData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/adm");
      setAdmData(response.data)
    } catch (error) {
      console.error('error', error);
    }
  };

  const handleInputChange = (index, event) => {
    const updatedData = [...admData];
    updatedData[index] = event.target.value;
    setAdmData(updatedData);
  };

  const handleSave = async () => {
    try {
      await axios.put('http://localhost:3000/adm', admData); // substitua pela sua URL da API para atualizar os valores
      console.log('Valores atualizados com sucesso!');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
      fetchAdmData();
  }, []);

  return (
    <>
      <Box p={4} maxWidth="500px" margin="0 auto">
        <Switch
          isChecked={editingEnabled}
          onChange={() => setEditingEnabled(!editingEnabled)}
          colorScheme="teal"
          mb={4}
          mr={4}
          alignSelf="flex-end"
        >
          Habilitar/Desabilitar Edição
        </Switch>

        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          {admData.map((value, index) => (
            <Box key={index} p={4} borderWidth={1} borderRadius="md">
              <Heading size="md" mb={2} color={"blue"}>
                Configurações do bolão
              </Heading>
              {editingEnabled ? (
                <>
                <Text>Porcentual do adm</Text>
                <Input value={value.pool_admin_percentage} onChange={(event) => handleInputChange(index, event)} />
                <Text>Porcentagem do primeiro lugar</Text>
                <Input value={value.first_prize_percentage} onChange={(event) => handleInputChange(index, event)} />
                <Text>Porcentagem do Segundo lugar</Text>
                <Input value={value.second_prize_percentage} onChange={(event) => handleInputChange(index, event)} />
                <Text>Porcentagem das despesas</Text>
                <Input value={value.expenses_percentage} onChange={(event) => handleInputChange(index, event)} />
                <Text>Placar errado</Text>
                <Input value={value.completely_wrong_score} onChange={(event) => handleInputChange(index, event)} />
                <Text>Placar certo</Text>
                <Input value={value.correct_score} onChange={(event) => handleInputChange(index, event)} />
                <Text>Placar com empate</Text>
                <Input value={value.draw_score} onChange={(event) => handleInputChange(index, event)} />
                <Text>Placar errado mas acertou quem ganhou</Text>
                <Input value={value.partially_wrong_score} onChange={(event) => handleInputChange(index, event)} />
                </>
              ) : (
                <>
                <Text>Porcentual do adm</Text>
                <Text>{value.pool_admin_percentage}</Text>
                <Text>Porcentagem do primeiro lugar</Text>
                <Text>{value.first_prize_percentage}</Text>
                <Text>Porcentagem do Segundo lugar</Text>
                <Text>{value.second_prize_percentage}</Text>
                <Text>Porcentagem das despesas</Text>
                <Text>{value.expenses_percentage}</Text>
                <Text>Placar errado</Text>
                <Text>{value.completely_wrong_score}</Text>
                <Text>Placar certo</Text>
                <Text>{value.correct_score}</Text>
                <Text>Placar com empate</Text>
                <Text>{value.draw_score}</Text>
                <Text>Placar errado mas acertou quem ganhou</Text>
                <Text>{value.partially_wrong_score}</Text>
                </>
              )}
            </Box>
          ))}
        </Grid>

        {editingEnabled && (
          <Button colorScheme="teal" mt={4} onClick={handleSave}>
            Salvar
          </Button>
        )}
      </Box>
    </>
  );
}

export default AdmForm;