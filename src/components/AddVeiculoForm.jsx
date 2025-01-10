import React, { useState, useEffect } from "react";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import './AddVeiculoForm.css'

const AddVehicleForm = ({ onAddVehicle, editingVehicle, onUpdateVehicle }) => {
  const [name, setName] = useState("");
  const [plate, setPlate] = useState("");
  const [renavan, setRenavan] = useState("");

  useEffect(() => {
    if (editingVehicle) {
      setName(editingVehicle.name);
      setPlate(editingVehicle.plate);
      setRenavan(editingVehicle.renavan);
    }
  }, [editingVehicle]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const vehicleData = {
        name,
        plate,
        renavan,
        updatedAt: new Date()
      };

      if (editingVehicle) {
        const vehicleRef = doc(db, "vehicles", editingVehicle.id);
        await updateDoc(vehicleRef, vehicleData);
        onUpdateVehicle({ id: editingVehicle.id, ...vehicleData });
      } else {
        vehicleData.createdAt = new Date();
        const docRef = await addDoc(collection(db, "vehicles"), vehicleData);
        onAddVehicle({ id: docRef.id, ...vehicleData });
      }
      
      setName("");
      setPlate("");
      setRenavan("");
    } catch (error) {
      console.error("Error adding/updating vehicle: ", error);
    }
  };

  return (
    <form className="add-vehicle-form" onSubmit={handleSubmit}>
      <h3>{editingVehicle ? "Editar Veículo" : "Adicionar Novo Veículo"}</h3>
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
      <button type="submit">
        {editingVehicle ? "Atualizar Veículo" : "Adicionar Veículo"}
      </button>
    </form>
  );
};

export default AddVehicleForm;

