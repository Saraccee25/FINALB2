# **Fashion Line** 💕
---
Fashion Line es una pequeña tienda de ropa que busca optimizar la gestión de su inventario mediante una solución tecnológica moderna y eficiente. Este documento detalla las tecnologías utilizadas, cómo ejecutar la aplicación y los beneficios de la implementación.

---

### Tecnologías Utilizadas 👩🏻‍💻

#### Backend:
- **Spring Boot**:
  Spring Boot es un marco de trabajo para desarrollar aplicaciones web en Java. Ofrece una configuración predefinida que facilita la creación de aplicaciones robustas y escalables. En esta aplicación, se utilizó Spring Boot para construir la API REST que maneja las operaciones CRUD (crear, leer, actualizar, eliminar) de los productos.

- **MongoDB**:
  MongoDB es una base de datos NoSQL que permite almacenar datos en un formato de documento flexible (JSON-like). Es ideal para aplicaciones que requieren escalabilidad y manejo de datos con estructuras diversas. En esta aplicación, MongoDB se utilizó para gestionar el inventario de productos.

#### Frontend:
- **HTML**:
  Se utilizó para estructurar la interfaz de usuario de la aplicación web.

- **CSS**:
  Se utilizó para estilizar los componentes de la interfaz y garantizar una experiencia de usuario agradable.

- **JavaScript**:
  Se utilizó para agregar interactividad en el frontend, incluyendo el consumo de la API REST para mostrar y actualizar datos en tiempo real.

#### Herramientas Adicionales:
- **Postman**:
  Se utilizó para probar y verificar los endpoints de la API.

- **Maven**:
  Herramienta de gestión de dependencias y construcción del proyecto Java.

---

### Guía para Correr la Aplicación 👀

#### Requisitos Previos:
1. **JDK 21** instalado en tu sistema.
2. **MongoDB** en ejecución local o en un servidor remoto.
3. Un navegador web moderno.

#### Pasos:
1. **Clonar el Repositorio**:
   - Descarga o clona el proyecto desde el repositorio donde se encuentra alojado.
     
     ```bash
     git clone https://github.com/Saraccee25/FINALB2.git

2. **Configurar MongoDB**:
   - Asegúrate de que MongoDB esté corriendo en el puerto por defecto (27017) o ajusta las credenciales en el archivo `application.properties` de Spring Boot.

     ```properties
     spring.data.mongodb.uri=mongodb://localhost:27017/fashionline
     

3. **Compilar y Ejecutar el Backend**:
  - Puedes usar [Visual Studio Code](https://code.visualstudio.com/) o [IntelliJ IDEA](https://www.jetbrains.com/idea/) como entornos de desarrollo integrados (IDEs).
  

4. **Ejecutar el Frontend**:
    - La aplicación estará disponible en `http://localhost:8080`.

---

### Por Qué Usar MongoDB

1. **Flexibilidad del Modelo de Datos**:
   MongoDB almacena datos en documentos JSON-like, lo que facilita manejar cambios en la estructura de los datos sin necesidad de modificar esquemas rigídos.

2. **Escalabilidad**:
   Es ideal para aplicaciones que podrán crecer en el futuro, ya que soporta la distribución de datos en múltiples servidores (sharding).

3. **Rendimiento**:
   MongoDB es altamente eficiente para operaciones de lectura y escritura, incluso con grandes volúmenes de datos.

4. **Facilidad de Integración con Spring Boot**:
   Spring Boot proporciona una integración fluida con MongoDB a través de su dependencia `spring-boot-starter-data-mongodb`, permitiendo realizar operaciones CRUD con mínimo esfuerzo.

---
### Colaboradores 👩🏻‍💻

- **Sara Castañeda**  
  [GitHub](https://github.com/Saraccee25)

- **Isabela Montoya**  
  [GitHub](https://github.com/IsaMontoya17)

--- 
### Conclusión ✅

Esta aplicación utiliza tecnologías modernas y escalables que aseguran un rendimiento óptimo y una experiencia de usuario fluida. MongoDB resulta ser la opción adecuada debido a su flexibilidad, escalabilidad y compatibilidad con Spring Boot, lo que facilita el manejo eficiente del inventario de la tienda.

