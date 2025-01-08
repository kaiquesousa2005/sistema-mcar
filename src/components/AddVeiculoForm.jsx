import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import './AddVeiculoForm.css'

const AddVehicleForm = ({ onAddVehicle }) => {
  const [name, setName] = useState("");
  const [plate, setPlate] = useState("");
  const [renavan, setRenavan] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newVehicle = {
        name,
        plate,
        renavan,
        createdAt: new Date()
      };

      const docRef = await addDoc(collection(db, "vehicles"), newVehicle);
      onAddVehicle({ id: docRef.id, ...newVehicle });
      
      setName("");
      setPlate("");
      setRenavan("");
    } catch (error) {
      console.error("Error adding vehicle: ", error);
    }
  };

  return (
    <form className="add-vehicle-form" onSubmit={handleSubmit}>
      <h3>Adicionar Novo Veículo</h3>
      <input
        type="text"
        placeholder="Nome do Veículo"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Placa"
        value={plate}
        onChange={(e) => setPlate(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Renavan"
        value={renavan}
        onChange={(e) => setRenavan(e.target.value)}
        required
      />
      <button type="submit">Adicionar Veículo</button>
    </form>
  );
};

export default AddVehicleForm;

