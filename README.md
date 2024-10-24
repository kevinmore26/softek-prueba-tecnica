Requisitos de Acceso
Para acceder a la aplicación, los usuarios deben proporcionar la siguiente información:

DNI: El único DNI permitido es 30216147. Cualquier otro DNI será rechazado.
Número de Teléfono: El número de teléfono debe ser un número peruano válido de 9 dígitos. Solo se aceptarán números que cumplan con la longitud requerida.
El formulario validará estos datos y negará el acceso si no se cumplen estos criterios.


Conclusión y Sustentación del Proyecto
Este proyecto ha sido desarrollado utilizando React para la gestión de componentes y estados, en conjunto con Tailwind CSS para el manejo eficiente y flexible de estilos, permitiendo un diseño responsivo y moderno. Se ha priorizado la simplicidad en la estructura del código, facilitando su escalabilidad y mantenimiento a futuro.

Justificación de Tecnologías
React fue elegido por su capacidad para crear interfaces dinámicas y su ecosistema maduro, que facilita el desarrollo modular de componentes reutilizables.
Tailwind CSS se utilizó para estilizar los componentes de manera eficiente, con un enfoque de "utility-first", lo que permite una personalización precisa de los elementos visuales sin tener que escribir una hoja de estilos CSS desde cero.
LocalStorage fue implementado para almacenar los datos del usuario y su selección de planes, lo que permite persistencia en la sesión del navegador y mejora la experiencia de usuario al no perder datos entre recargas.
Cumplimiento de Requisitos
Descuento dinámico: Se implementó un sistema que aplica automáticamente un descuento del 5% al seleccionar la opción "Para alguien más". Este descuento es dinámico y se refleja en el precio final del plan, mostrando también el precio anterior.

Validaciones de formularios: Se incorporaron validaciones tanto para el DNI como para el número de celular, asegurando que solo se permitan datos válidos y específicos para acceder a la plataforma.

Manejo de Planes: Se mostró la lista de planes con la posibilidad de seleccionar uno y navegar a la pantalla de resumen, almacenando la selección en localStorage para una experiencia fluida.

Posibles Mejoras Futuras
Optimización de Carga: Si bien se han simulado cargas dinámicas en los datos de planes con un skeleton, en un entorno real se podría optimizar aún más utilizando técnicas como lazy loading y mejoras en la gestión de estados con useMemo.
Mejoras en Accesibilidad: Ampliar las capacidades de accesibilidad del sitio, como la compatibilidad con lectores de pantalla y mejoras en el contraste de colores para asegurar que sea usable por cualquier persona, independientemente de sus capacidades físicas.
Pruebas Unitarias y End-to-End: Aunque se realizaron algunas pruebas unitarias, un enfoque más completo incluiría pruebas automatizadas para garantizar el correcto funcionamiento del sistema bajo diferentes condiciones.


Comenzando con Create React App
Este proyecto fue creado con Create React App.

Scripts Disponibles
En el directorio del proyecto, puedes ejecutar:

npm start
Inicia la aplicación en modo de desarrollo.
Abre http://localhost:3000 para verlo en el navegador.

La página se recargará si haces modificaciones.
También verás cualquier error de lint en la consola.

npm test
Lanza el corredor de pruebas en modo interactivo de watch.
Consulta la sección sobre ejecución de pruebas para más información.

npm run build
Construye la aplicación para producción en la carpeta build.
Empaqueta correctamente React en modo producción y optimiza la construcción para obtener el mejor rendimiento.

La construcción está minificada y los nombres de archivo incluyen los hashes.
¡Tu aplicación está lista para ser desplegada!

Consulta la sección sobre despliegue para más información.

npm run eject
Nota: esta es una operación irreversible. Una vez que ejecutes eject, no podrás volver atrás.

Si no estás satisfecho con la herramienta de compilación y las opciones de configuración, puedes ejecutar eject en cualquier momento. Este comando eliminará la dependencia de construcción única de tu proyecto.

En su lugar, copiará todos los archivos de configuración y las dependencias transitivas (webpack, Babel, ESLint, etc.) directamente en tu proyecto, para que tengas control total sobre ellos. Todos los comandos, excepto eject, seguirán funcionando, pero apuntarán a los scripts copiados para que puedas ajustarlos a tus necesidades. A partir de este punto, estarás por tu cuenta.

No es necesario que utilices eject. El conjunto de características seleccionadas es adecuado para despliegues pequeños y medianos, y no deberías sentir la obligación de usar esta función. Sin embargo, entendemos que esta herramienta no sería útil si no pudieras personalizarla cuando estés listo.



Aprende Más
Puedes aprender más en la documentación de Create React App.

Para aprender React, visita la documentación de React.