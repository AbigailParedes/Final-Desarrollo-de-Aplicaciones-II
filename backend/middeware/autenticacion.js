const admin = require('firebase-admin');
const serviceAccount = require('./path/to/serviceAccountKey.json'); // Reemplaza con la ruta correcta

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // ... otras configuraciones según tu proyecto Firebase
});

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const idToken = authorization.split('Bearer ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.uid = decodedToken.uid; // Agrega el ID de usuario al objeto de solicitud
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = authenticate;
