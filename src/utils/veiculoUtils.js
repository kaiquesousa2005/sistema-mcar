export const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };
  
  export const validatePlate = (plate) => {
    // Implementar validação de placa (pode ser expandido no futuro)
    return plate.length === 7;
  };
  
  export const validateRenavan = (renavan) => {
    // Implementar validação de Renavan (pode ser expandido no futuro)
    return renavan.length === 11;
  };
  
  