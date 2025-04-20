// createAdmin.js
const mongoose = require("mongoose");
const { User } = require("./models/UserClass");
const Bcryptjs = require("bcryptjs");

mongoose
  .connect("mongodb://localhost:27017/taller", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conexión a MongoDB establecida");
    createAdmin();
  })
  .catch((err) => {
    console.error("Error al conectar a MongoDB:", err.message);
    process.exit(1);
  });


const createAdmin = async () => {
  try {
    const adminData = {
      name: "Emmanuel Granara",
      email: "emanuelgranara@hotmail.com",
      password: "tallerEmma",
      role: "admin",
    };

    const existingAdmin = await User.findOne({ email: adminData.email });
    if (existingAdmin) {
      console.log("Ya existe un usuario admin con este email.");
      return;
    }

    const salt = Bcryptjs.genSaltSync();
    adminData.password = Bcryptjs.hashSync(adminData.password, salt);

    await new User(adminData).save();
    console.log("Admin creado exitosamente:", adminData.email);
  } catch (error) {
    console.error("Error al crear el admin:", error.message);
  } finally {
    mongoose.connection.close(); // Cierra la conexión al finalizar
  }
};
