import React, { useState, useEffect } from "react";
import VeiculoList from "../components/VeiculoList";
import AddVeiculoForm from "../components/AddVeiculoForm";
import Modal from "../components/Modal";
import "./Home.css";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const Home = () => {
  const [vehicles, setVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      const querySnapshot = await getDocs(collection(db, "vehicles"));
      const vehicleData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVehicles(vehicleData);
    };

    fetchVehicles();
  }, []);

  useEffect(() => {
    const filteredResults = vehicles.filter((vehicle) => {
      const searchTermLower = searchTerm.toLowerCase();
      return (
        (vehicle.plate?.toLowerCase() || '').includes(searchTermLower) ||
        (vehicle.name?.toLowerCase() || '').includes(searchTermLower) ||
        (vehicle.renavan?.toLowerCase() || '').includes(searchTermLower)
      );
    });
    setSearchResults(filteredResults);
  }, [searchTerm, vehicles]);

  const handleSearch = () => {
    // The search is now handled automatically by the useEffect above
  };

  const handleAddVehicle = (newVehicle) => {
    setVehicles((prevVehicles) => [...prevVehicles, newVehicle]);
    setIsModalOpen(false);
  };

  const handleUpdateVehicle = (updatedVehicle) => {
    setVehicles((prevVehicles) =>
      prevVehicles.map((vehicle) =>
        vehicle.id === updatedVehicle.id ? updatedVehicle : vehicle
      )
    );
    setIsModalOpen(false);
    setEditingVehicle(null);
  };

  const handleDeleteVehicle = async (vehicleId) => {
    try {
      await deleteDoc(doc(db, "vehicles", vehicleId));
      setVehicles(vehicles.filter(vehicle => vehicle.id !== vehicleId));
    } catch (error) {
      console.error("Error deleting vehicle:", error);
    }
  };

  const handleEditVehicle = (vehicle) => {
    setEditingVehicle(vehicle);
    setIsModalOpen(true);
  };

  return (
    <div className="home">
      <main className="main-content">
        <h2>Lista de Veículos</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Pesquisar por Placa, Nome ou Renavan"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-btn" onClick={handleSearch}>
            Buscar
          </button>
        </div>
        <button className="add-vehicle-btn" onClick={() => {
          setEditingVehicle(null);
          setIsModalOpen(true);
        }}>
          Adicionar Veículo
        </button>
        <VeiculoList
          vehicles={searchResults.length > 0 ? searchResults : vehicles}
          onDeleteVeiculo={handleDeleteVehicle}
          onEditVeiculo={handleEditVehicle}
        />
        <Modal isOpen={isModalOpen} onClose={() => {
          setIsModalOpen(false);
          setEditingVehicle(null);
        }}>
          <AddVeiculoForm
            onAddVehicle={handleAddVehicle}
            onUpdateVehicle={handleUpdateVehicle}
            editingVehicle={editingVehicle}
          />
        </Modal>
      </main>
    </div>
  );
};

export default Home;

