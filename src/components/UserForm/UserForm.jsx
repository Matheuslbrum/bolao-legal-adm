import { useState, useEffect } from 'react';
import {
  Box,
  Input,
  Switch,
  Select,
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

function UserForm() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [name, setName] = useState('');
  const [bets, setBets] = useState([]);
  const [scoreData, setScoreData] = useState([]);
  const [showAlert, setShowAlert] = useState(false);


  const fetchScoreData = async () => {
    try {
      const response = await axios.get("https://expressjs-server-production-085c.up.railway.app/score");
      setScoreData(response.data)
    } catch (error) {
      console.error('error', error);
    }
  };

  const handleSwitchChange = () => {
    setIsDisabled(!isDisabled);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    console.log(e.target.value)
  };

  const handleTeamChange = (index, field, value) => {
    const updatedResults = [...bets];
    updatedResults[index] = { ...updatedResults[index], [field]: value };
    console.log('team', value)
    setBets(updatedResults);
  };

  const handleResultChange = (index, value) => {
    const updatedResults = [...bets];
    updatedResults[index] = { ...updatedResults[index], result: value };
    console.log('bets', value)
    setBets(updatedResults);
  };

  const handleAddInput = () => {
    setBets([...bets, { team_one: '', team_two: '', result: '' }]);
  };

  const handleRemoveInput = (index) => {
    const updatedResults = [...bets];
    updatedResults.splice(index, 1);
    setBets(updatedResults);
  };

  const handleSubmit = async () => {
    if(!name || bets.some((bet) => !bet.team_one || !bet.team_two || !bet.result)) {
      setShowAlert(true);
      return;
    }
    try {
      const response = await axios.post('https://expressjs-server-production-085c.up.railway.app/user', {
        name,
        bets,
      });
      setShowAlert(false);
    } catch (error) {
      console.error('Erro ao enviar os dados para a API:', error);
    }
  };

  useEffect(() => {
    fetchScoreData()
  }, [])

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
      <Input
        placeholder="Nome do usuário"
        value={name}
        onChange={handleNameChange}
        isDisabled={isDisabled}
        mb="4"
        isRequired
      />
      {bets.map((result, index) => (
        <VStack key={index} spacing="4" mb="4">
          <HStack>
            <FormControl>
              <FormLabel>Time 1</FormLabel>
              <Select
                value={result.team_one}
                onChange={(e) => handleTeamChange(index, 'team_one', e.target.value)}
                isDisabled={isDisabled}
                isRequired
              >
                {
  scoreData.length > 0 ? (
    <>
      <option value=''>---------</option>
      {scoreData.map((score) => (
        <option key={score.id} value={score.team_one}>{score.team_one}</option>
      ))}
    </>
  ) : (
    <option value="none">Sem time</option>
  )
}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Time 2</FormLabel>
              <Select
                value={result.team_two}
                onChange={(e) => handleTeamChange(index, 'team_two', e.target.value)}
                isDisabled={isDisabled}
                isRequired
              >
                                {
  scoreData.length > 0 ? (
    <>
      <option value=''>---------</option>
      {scoreData.map((score) => (
        <option key={score.id} value={score.team_two}>{score.team_two}</option>
      ))}
    </>
  ) : (
    <option value="none">Sem time</option>
  )
}
              </Select>
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
        Adicionar Usuário
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

export default UserForm;