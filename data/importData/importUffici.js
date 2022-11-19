const fs = import("fs");
const mongoose = import("mongoose");
const Uffici = import("./../../models/ufficiModel");

const dbString =
  "mongodb+srv://userFabio:FVcjQATT.7563@clusterappsorveglianza.bbp0dnd.mongodb.net/dbSorveglianza?retryWrites=true&w=majority";

mongoose.connect(dbString).then(() => console.log("DB connection successful!"));

// READ JSON FILE
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/Data/tabUffici.json`, "utf-8")
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Uffici.create(tours);
    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Uffici.deleteMany();
    console.log("Data successfully deleted!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}

// npm run ./data/importData/importUffici --delete
