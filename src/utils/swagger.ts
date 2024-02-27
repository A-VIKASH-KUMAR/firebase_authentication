import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import authRoute from "../routes/auth.route";
const router = express.Router();

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Your API Documentation',
      version: '1.0.0',
      description: 'Documentation for your API endpoints',
    },
  },
  apis: ["./routes/auth.route.ts"] // Path to the API routes folder
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerSpec));

export default router;
