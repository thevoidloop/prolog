const express = require('express');
const swipl = require('swipl');
const path = require('path');
const mysql = require('mysql2');

const app = express();
const port = 3000;

app.use(express.json());

// Ruta al archivo .pl
const prologFilePath = path.join(__dirname, 'data.pl');


let query;
let msj;
let sujetos = [];
let pronombres = [];
let hechos = [];

// Configuración de la conexión a MySQL
const dbConfig = {
    host: 'localhost',
    user: 'root', // Usuario de la base de datos
    password: 'Thev0idl00p!', // Contraseña de la base de datos
    database: 'prolog' // Nombre de la base de datos
};

const pool = mysql.createPool(dbConfig);

// Carga el archivo .pl al iniciar la aplicación  
async function loadPrologFile() {
    try {
        await swipl.call(`consult('${prologFilePath}')`);
        console.log(`File ${prologFilePath} loaded successfully`);
    } catch (error) {
      console.error(`Error loading ${prologFilePath}: ${error.message}`);
    }
  }

  loadPrologFile();

async function checkSujeto(sujeto) {
  try {
      const [rows] = await pool.promise().query('SELECT * FROM sujetos WHERE sujeto = ?', [sujeto]);

      if (rows.length > 0) {
        return { sujeto : rows[0].sujeto};
    } else {
        return null;
    }
  } catch (error) {
      throw new Error(error.message);
  }
}

async function checkPronombre(pronombre) {
  try {
      const [rows] = await pool.promise().query('SELECT * FROM pronombres WHERE pronombre = ?', [pronombre]);

        if (rows.length > 0) {
            return { pronombre:rows[0].pronombre, plural: rows[0].plural };
        } else {
            return null;
        }

  } catch (error) {
      throw new Error(error.message);
  }
}

async function checkHechos(sinonimo) {
  try {
      const [rows] = await pool.promise().query('SELECT SH.sinonimo, H.hecho FROM sinonimos_hechos AS SH INNER JOIN hechos H ON SH.id_hecho = H.id_hecho WHERE SH.sinonimo = ?', [sinonimo]);

      if (rows.length > 0) {
          return { sinonimo:rows[0].sinonimo, hecho: rows[0].hecho };
      } else {
          return null;
      }
  } catch (error) {
      throw new Error(error.message);
  }
}

async function prologConsult(query) {
  try {
      const result = await swipl.call(query);
      return { result };
  } catch (error) {
      throw new Error(error.message);
  }
}

//Endpoint para la operación con Prolog y MySQL
app.post('/prolog', async (req, res) => {
    const { query } = req.body;

    try {
        const result = await swipl.call(query);
        if (result) {
            res.json({ result });
        } else {
            res.status(400).json({ result });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.post('/analyze-text', async (req, res) => {
  const { text } = req.body;
  const words = text.split(' ');

  firstReg = true;
  query = ''; 
  msj = '';




  try {

      sujetos = [];
      pronombres = [];
      hechos = [];
      await Promise.all(words.map(async (word, index) => {
          console.log(word);
          const isSujeto = await checkSujeto(word);
          const hechoInfo = await checkHechos(word);
          const pronombreInfo = await checkPronombre(word);


          if (isSujeto) {
              sujetos.push(isSujeto);
          }

          if (pronombreInfo) {
            pronombres.push(pronombreInfo);
        }
          if (hechoInfo) {
            hechos.push(hechoInfo);
          }
      }));

      console.log('sujetos');
      console.log(sujetos);

      console.log('pronombres');
      console.log(pronombres);

      console.log('hechos');
      console.log(hechos);

      if ((sujetos.length > 1) && (hechos.length > 0)) {
        query = `${hechos[0].hecho}(${sujetos[0].sujeto}, ${sujetos[1].sujeto})`;
        response = await prologConsult(query);
        if(response.result){
          msj = `Estas en lo correcto, ${sujetos[0].sujeto} es ${hechos[0].hecho} de ${sujetos[1].sujeto}`;
        }else{
          msj = `No, ${sujetos[0].sujeto} no es ${hechos[0].hecho} de ${sujetos[1].sujeto}`;
        }
      } 

      if ((sujetos.length === 1) && (pronombres.length > 0) && (hechos.length > 0)) {
        query = `${hechos[0].hecho}(X , ${sujetos[0].sujeto})`;
        response = await prologConsult(query);
        console.log(query);
        console.log(response);
        if(response.result){
          msj = `El ${hechos[0].hecho} de ${sujetos[0].sujeto} es ${response.result.X}`;
        }else{
          msj = `Lo siento, ${sujetos[0].sujeto} no tiene ${hechos[0].hecho}`;
        }
      }
      

      res.json({msj})
  } catch (error) {
      msj = `Lo siento, no tengo informacion de lo que me hablas`; 
      res.json({msj})

  }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
