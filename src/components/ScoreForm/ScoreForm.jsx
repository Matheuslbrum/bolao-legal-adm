import { useState } from 'react';
import {
  Box,
  Input,
  Switch,
  Button,
  VStack,
  FormControl,
  FormLabel,
  HStack,
  AlertIcon,
  Alert,
  AlertDescription
} from '@chakra-ui/react';
import axios from 'axios';

function ScoreForm() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [results, setResults] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const handleSwitchChange = () => {
    setIsDisabled(!isDisabled);
  };

  const handleTeamChange = (index, field, value) => {
    const updatedResults = [...results];
    updatedResults[index] = { ...updatedResults[index], [field]: value };
    setResults(updatedResults);
  };

  const handleResultChange = (index, value) => {
    const updatedResults = [...results];
    updatedResults[index] = { ...updatedResults[index], result: value };
    setResults(updatedResults);
  };

  const handleAddInput = () => {
    setResults([...results, { team_one: '', team_two: '', result: '' }]);
  };

  const handleRemoveInput = (index) => {
    const updatedResults = [...results];
    updatedResults.splice(index, 1);
    setResults(updatedResults);
  };

  const handleSubmit = async () => {
    if(results.some((result) => !result.team_one || !result.team_two || !result.result)) {
      setShowAlert(true);
      return;
    }
    try {
      const response = await axios.post('https://expressjs-server-production-085c.up.railway.app/score', results);
      setShowAlert(false)
    } catch (error) {
      console.error('Erro ao enviar os dados para a API:', error);
    }
  };

  return (
    <Box maxWidth="500px" margin="0 auto">
      <FormControl display="flex" alignItems="center" justifyContent="flex-end" mb="2">
        <FormLabel htmlFor="disableSwitch" mb="0">
          Desabilitar
        </FormLabel>
        <Switch
          id="disableSwitch"
          isChecked={isDisabled}
          onChange={handleSwitchChange}
        />
      </FormControl>
      {results.map((result, index) => (
        <VStack key={index} spacing="4" mb="4">
          <HStack>
            <FormControl>
              <FormLabel>Time 1</FormLabel>
              <Input
                onChange={(e) => handleTeamChange(index, 'team_one', e.target.value)}
                isDisabled={isDisabled}
                isRequired
              />
            </FormControl>
            <FormControl>
              <FormLabel>Time 2</FormLabel>
              <Input
                value={result.team_two}
                onChange={(e) => handleTeamChange(index, 'team_two', e.target.value)}
                isDisabled={isDisabled}
                isRequired
              />
            </FormControl>
            <FormControl>
              <FormLabel>Resultado</FormLabel>
              <Input
                placeholder="Ex: 2X0"
                value={result.result}
                onChange={(e) => handleResultChange(index, e.target.value)}
                isDisabled={isDisabled}
                isRequired
              />
            </FormControl>
          </HStack>
          {!isDisabled && (
              <Button onClick={() => handleRemoveInput(index)}>Remover</Button>
            )}
        </VStack>
      ))}
      <Button onClick={handleAddInput} isDisabled={isDisabled}>
        Adicionar partida
      </Button>
      <Button onClick={handleSubmit} isDisabled={isDisabled}>
        Salvar
      </Button>
      {showAlert && (
        <Alert status="error" mt="4">
          <AlertIcon />
          <AlertDescription>Preencha todos os campos antes de enviar.</AlertDescription>
        </Alert>
      )}
    </Box>
    
  );
}

export default ScoreForm;