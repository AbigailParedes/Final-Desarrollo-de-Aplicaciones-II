// Importación de modelos y biblioteca de MongoDB
const Tarea= require('../models/tareasModels');
const mongoose = require('mongoose');


// Obtener todas las tareas
const getTareas = async (req, res)=> {
    try {
        const tareas = await Tarea.find();
        res.status(200).json(tareas);
    } catch (error) {
        console.log(error);
        res.status(500).send('error al obtener las tareas')
    }
};

// Crear una nueva tarea
const postTareas = async (req, res) => {
    try {
      // Quita _id del cuerpo de la solicitud antes de crear la nueva tarea
      const { _id, ...datosTarea } = req.body;
      const nuevaTarea = new Tarea(datosTarea);
      
      const guardarTarea = await nuevaTarea.save();
      res.status(201).json(guardarTarea);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error al crear la tarea');
    }
  };
  
// Actualizar una tarea existente por su ID
    const updateTareas = async (req, res)=>{
        try{
            const actualizarTarea = await Tarea.findByIdAndUpdate(req.params.id, req.body, {new: true});
            res.status(200).json(actualizarTarea);
        }catch(error){
            console.log(error);
            res.status(500).send('Error al actualizar la tarea');
        }
    };

// Eliminar una tarea por su ID
    const deleteTarea = async(req, res)=>{
        try{
            await Tarea.findByIdAndDelete(req.params.id);
            res.send('Tarea eliminada correctamente');
    }catch(error){
        console.log(error);
        res.status(500).send('Error al borrar la tarea');
    }
};

// Exportar los controladores de tareas

module.exports={
    getTareas,
    postTareas,
    updateTareas,
    deleteTarea
};
