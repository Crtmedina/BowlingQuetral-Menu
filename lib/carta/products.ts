import type { CartaProduct, SectionId } from "./types";

export const HAPPY_HOUR_BANNER_IMAGE =
  "https://images.unsplash.com/photo-1636144924623-b3aea3c5f16c?q=80&w=1542&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export const SECTION_INTROS: Partial<Record<SectionId, string>> = {
  tablas: "Para compartir, todos incluyen papas fritas y tostadas.",
  tacos: "Todas incluyen tortillas de trigo, queso, guacamole y lechuga.",
  wraps: "Tortilla de 28 cm acompa?adas de salsas de la casa.",
  quesadillas: "2 quesadillas grandes acompa?adas de guacamole y jalape?o.",
  nachos: "Porci?n para 2 personas.",
  completos: "Incluye porci?n de papas fritas.",
  hamburguesas: "Incluye porci?n de papas fritas. Extra ba?o de queso $2.000.",
  pizzas: "Masa artesanal de la casa, 30 cm. Base de salsa de tomate y queso mozzarella.",
  sandwiches: "Pan frica acompa?ados con papas fritas. Extra ba?o de queso $2.000.",
  schopCerveza: "Schop 300 cc y 500 cc. Extra chelada o michelada $1.500.",
  cervezaBotella: "Botella 330 cc. Extra chelada o michelada $1.500.",
};

export const FONDOS_ACOMPANAMIENTOS: CartaProduct[] = [
  {
    name: "PAPAS FRITAS",
    description: "A elecci?n: 2 acompa?amientos por fondo.",
    price: "Incluido",
    image:
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "ENSALADAS VERDES",
    description: "A elecci?n: 2 acompa?amientos por fondo.",
    price: "Incluido",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "PANACH? DE VERDURAS",
    description: "A elecci?n: 2 acompa?amientos por fondo.",
    price: "Incluido",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80&auto=format&fit=crop",
  },
];

export const PAPAS_FRITAS_PEQUES: CartaProduct[] = [
  {
    name: "PAPITAS KIDS",
    description: "Papas fritas, pollo apanado, tomates cherry y palta.",
    price: "$8.500",
    image:
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "BURGER KIDS",
    description: "Papas fritas, mini burgers, lechuga y tomates.",
    price: "$8.500",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "SALCHIPAPAS",
    description: "Papas fritas con salchichas.",
    price: "$8.000",
    image:
      "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600&q=80&auto=format&fit=crop",
  },
];
export const PRODUCTS_BY_SECTION: Record<SectionId, CartaProduct[]> = {
  promos: [
    {
      name: "PISCO SOUR",
      description: "Pisco, lim?n, clara de huevo, amargo",
      price: "$7.500",
      deal: "2? $7.500",
      image:
        "https://images.unsplash.com/photo-1541546006121-5c3bc5e8c7b9?q=80&w=1167&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "MOSCOW MULE",
      description: "Vodka, ginger beer, lima, hielo",
      price: "$10.500",
      deal: "2? $10.500",
      image:
        "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80&auto=format&fit=crop",
    },
    {
      name: "PISCO SOUR CATEDRAL",
      description: "Pisco selecci?n, c?tricos, espuma arom?tica",
      price: "$12.000",
      deal: "2? $12.000",
      image:
        "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=400&q=80&auto=format&fit=crop",
    },
    {
      name: "LONDON MULE",
      description: "Gin, ginger beer, lima, hielo",
      price: "$10.500",
      deal: "2? $10.500",
      image:
        "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&q=80&auto=format&fit=crop",
    },
    {
      name: "TEQUILA MARGARITA",
      description: "Tequila, triple sec, lima, sal",
      price: "$9.000",
      deal: "2? $9.000",
      image:
        "https://images.unsplash.com/photo-1666025959723-a9e700cb1023?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "DAIQUIRI TRADICIONAL",
      description: "Ron blanco, lima, az?car",
      price: "$7.500",
      deal: "2? $7.500",
      image:
        "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&q=80&auto=format&fit=crop",
    },
    {
      name: "CAIPIRI?A",
      description: "Cacha?a, lima, az?car",
      price: "$7.500",
      deal: "2? $7.500",
      image:
        "https://images.unsplash.com/photo-1644809818228-e29aa5aa8151?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "SPLIT SANGRÍA",
      description: "Vino, frutas frescas, toque refrescante",
      price: "$10.500",
      deal: "2? $10.500",
      image:
        "https://images.unsplash.com/photo-1610935591098-9ce2b6d53f66?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ],
  tablas: [
    {
      name: "CARAMBOLA DE SABORES",
      description: "Slices de carne de res a la plancha, camarones apanados y ceviche de salm?n.",
      price: "$30.000",
      image:
        "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "TABLA FLECHA PICANTE",
      description: "12 unidades. Alitas de pollo BBQ con salsa de queso picante y lactonesa de cilantro.",
      price: "$22.000",
      image:
        "https://images.unsplash.com/photo-1773620496679-170116547ce5?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "BOWLING BITES",
      description: "Papas fritas con salsa de la casa, slices de pollo salteado y camarones apanados.",
      price: "$22.000",
      image:
        "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "PAPAS Y PINCHOS",
      description:
        "Papas fritas con queso cheddar, aros de cebolla, pinchos de pollo y res con lactonesa de cilantro.",
      price: "$15.000",
      image:
        "https://images.unsplash.com/photo-1598726465740-455ad9c05fbd?q=80&w=1178&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "RANCHERA",
      description:
        "Deliciosas papas fritas con salsa blanca, aros de cebolla, pollo apanado, aj? jalape?o y salsa de la casa.",
      price: "$17.000",
      image:
        "https://images.unsplash.com/photo-1774074645510-85a5256548cb?q=80&w=1097&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "QUETRAL BBQ BOX",
      description: "Deliciosas papas fritas, aros de cebolla, costillas BBQ y salsas de la casa.",
      price: "$17.000",
      image:
        "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600&q=80&auto=format&fit=crop",
    },
  ],
  tacos: [
    {
      name: "CHICKEN FAJITAS",
      description: "Pollo salteado, atomatado y crispy.",
      price: "$14.000/ $28.000",
      image:
        "https://images.unsplash.com/photo-1660180750968-4fbc84789a96?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "FAJITAS TEX MEX",
      description: "Carne de res, pollo.",
      price: "$16.000/ $30.000",
      image:
        "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80&auto=format&fit=crop",
    },
  ],
  wraps: [
    {
      name: "PIN DE POLLO",
      description: "Pollo a la plancha con champi??n, morr?n rojo y choclo.",
      price: "$9.000",
      image:
        "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "FULL STRIKE BBQ",
      description: "Pollo a la plancha, queso cheddar, tocino y salsa BBQ.",
      price: "$9.000",
      image:
        "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "L?NEA FRESH",
      description: "Pollo grillado, lechuga, guacamole y queso cheddar.",
      price: "$10.000",
      image:
        "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "BOLA R?STICA",
      description:
        "Carne de res a la plancha con tomate cherry, champi?ones y cebolla salteada.",
      price: "$12.000",
      image:
        "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&q=80&auto=format&fit=crop",
    },
  ],
  quesadillas: [
    {
      name: "QUESADILLA TRADICIONAL",
      description: "Queso fundido en tortilla de trigo.",
      price: "$12.000",
      image:
        "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "QUESADILLA CON POLLO",
      description: "Quesadilla con pollo.",
      price: "$14.000",
      image:
        "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "QUESADILLA CON CARNE DE RES",
      description: "Quesadilla con carne de res.",
      price: "$16.000",
      image:
        "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80&auto=format&fit=crop",
    },
  ],
  nachos: [
    {
      name: "NACHOS CON SALSA CHEDDAR Y TOCINO",
      description: "Nachos con salsa cheddar y tocino.",
      price: "$10.000",
      image:
        "https://images.unsplash.com/photo-1513459037197-854a87de0df9?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "NACHOS CON GUACAMOLE",
      description: "Nachos con guacamole.",
      price: "$10.000",
      image:
        "https://images.unsplash.com/photo-1513459037197-854a87de0df9?w=600&q=80&auto=format&fit=crop",
    },
  ],
  porciones: [
    {
      name: "PORCI?N DE POLLO CRISPY",
      description: "12 Unidades",
      price: "$8.000",
      image:
        "https://images.unsplash.com/photo-1765360024320-b2ab819c6f75?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "PORCI?N AROS DE CEBOLLA",
      description: "12 Unidades",
      price: "$7.000",
      image:
        "https://images.unsplash.com/photo-1581966626689-b63d790b3d49?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "PORCI?N CAMARONES APANADOS",
      description: "12 Unidades",
      price: "$10.000",
      image:
        "https://images.unsplash.com/photo-1669385184491-8ab70b39324e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ],
  papasFritas: [
    {
      name: "CHEDDAR",
      description: "Papas fritas, salsa de queso cheddar y chips de tocino.",
      price: "$10.000",
      image:
        "https://images.unsplash.com/photo-1598726465740-455ad9c05fbd?q=80&w=1178&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "CRISPY",
      description: "Papas fritas, pollo apanado, salsa de la casa.",
      price: "$11.000",
      image:
        "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "AZTECAS",
      description: "Papas fritas, carne, chorizo, jalape?o, guacamole.",
      price: "$14.000",
      image:
        "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "SALOU",
      description: "Papas fritas, carne de res, pollo, longaniza y salchichas.",
      price: "$14.000",
      image:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "CAMAR?N",
      description: "Papas fritas, camarones salteados en crema de queso.",
      price: "$14.000",
      image:
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80&auto=format&fit=crop",
    },
  ],
  completos: [
    {
      name: "HOT DOG",
      description: "Pan copihue y salchicha.",
      price: "$5.000",
      image:
        "https://images.unsplash.com/photo-1553909489-cd47e090f0d7?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "HOT DOG SALOU",
      description: "Salchicha, queso, tocino, tomate, palta.",
      price: "$8.000",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "COMPLETO",
      description: "Salchicha, palta, chucrut, tomate y mayonesa.",
      price: "$6.500",
      image:
        "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "COMPLETO ITALIANO",
      description: "Salchicha, tomate, palta.",
      price: "$6.500",
      image:
        "https://images.unsplash.com/photo-1551782450-17144efb9c50?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "AS ITALIANO",
      description: "Carne de res, tomate, palta.",
      price: "$9.000",
      image:
        "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80&auto=format&fit=crop",
    },
  ],
  hamburguesas: [
    {
      name: "BURGER LUCO",
      description: "Hamburguesa de la casa, queso.",
      price: "$10.500",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "BURGER ITALIANA",
      description: "Hamburguesa de la casa, tomate, palta y mayo.",
      price: "$12.000",
      image:
        "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "STRIKE COMPLETO",
      description: "Hamburguesa de la casa, queso cheddar, cebolla caramelizada y huevo frito.",
      price: "$12.000",
      image:
        "https://images.unsplash.com/photo-1551782450-17144efb9c50?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "SPARE VEGGIE",
      description: "Hamburguesa de garbanzos, queso, lechuga, tomates y palta.",
      price: "$9.500",
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "BOLA 8",
      description: "Hamburguesa de la casa, tomate, lechuga, cebolla morada y queso cheddar.",
      price: "$11.000",
      image:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80&auto=format&fit=crop",
    },
  ],
  pizzas: [
    {
      name: "PEPPERONI",
      description: "Pepperoni y or?gano.",
      price: "$13.000",
      image:
        "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "NAPOLITANA",
      description: "Jam?n, tomate y aceitunas.",
      price: "$13.000",
      image:
        "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "QUETRAL",
      description:
        "Pomodoro, queso mozzarella, carne de res, tomate cherry y pesto de la casa.",
      price: "$16.000",
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "VEGETARIANA",
      description: "Palmitos, morr?n, cebolla morada y choclo.",
      price: "$12.500",
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "DEL MAR",
      description: "Camarones salteados con ceboll?n, salm?n ahumado y aceitunas.",
      price: "$17.000",
      image:
        "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "DEL CORRAL",
      description: "Pollo, champi??n y crema.",
      price: "$14.000",
      image:
        "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "IB?RICA",
      description: "Jam?n serrano y tomate cherry.",
      price: "$15.000",
      image:
        "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=600&q=80&auto=format&fit=crop",
    },
  ],
  fondos: [
    {
      name: "FILETE SALOU",
      description: "Filete de res en reducci?n de vino tinto.",
      price: "$17.500",
      image:
        "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "COSTILLA DE CERDO BBQ",
      description: "Costillas de cerdo en salsa barbecue.",
      price: "$14.000",
      image:
        "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "SALM?N A LA PLANCHA",
      description: "Salm?n a la mantequilla con salsa de camarones salteados.",
      price: "$14.000",
      image:
        "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "CEVICHE VEGGIE",
      description:
        "C?trica de la casa, champi??n, palmitos, cebolla morada, morr?n y cilantro.",
      price: "$9.000",
      image:
        "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "CEVICHE DE SALM?N",
      description:
        "Salm?n, c?trica de la casa, cebolla morada, pimientos en brunoise, palta y cilantro.",
      price: "$12.000",
      image:
        "https://images.unsplash.com/photo-1535399831216-9a4b7a84e6f0?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "CEVICHE DE REINETA",
      description:
        "Reineta, alcaparras, aceite de s?samo, cebolla morada, cilantro y morr?n.",
      price: "$10.500",
      image:
        "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=600&q=80&auto=format&fit=crop",
    },
  ],
  sandwiches: [
    {
      name: "BARROS LUCO",
      description: "Carne de res y queso mantecoso.",
      price: "$13.000",
      image:
        "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "CHACARERO",
      description: "Carne de res, tomates, porotos verdes y aj? verde.",
      price: "$12.000",
      image:
        "https://images.unsplash.com/photo-1551782450-17144efb9c50?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "BARROS JARPA",
      description: "Jam?n y queso.",
      price: "$8.000",
      image:
        "https://images.unsplash.com/photo-1553909489-cd47e090f0d7?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "CHURRASCO ITALIANO",
      description: "Carne de res, tomate, palta y mayonesa.",
      price: "$13.000",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "TIRO AL BLANCO SALOU",
      description:
        "Carne de res, queso mantecoso, queso cheddar, tocino, pepinillo dill y salsa barbecue.",
      price: "$14.000",
      image:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "JUEGO PERFECTO",
      description: "Carne de res mechada, queso, champi?ones a la mantequilla y palta.",
      price: "$14.000",
      image:
        "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "MECHADA LUCO",
      description: "Carne de res mechada y queso.",
      price: "$12.000",
      image:
        "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "MECHADA ITALIANA",
      description: "Carne de res mechada, tomate, palta y mayonesa.",
      price: "$12.500",
      image:
        "https://images.unsplash.com/photo-1551782450-17144efb9c50?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "AVE MAYO",
      description: "Pechuga de pollo y mayonesa de la casa.",
      price: "$7.000",
      image:
        "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "AVE PIMENT?N",
      description: "Pechuga de pollo y pimientos.",
      price: "$7.000",
      image:
        "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "CRISPY CHICKEN",
      description: "Pechuga de pollo apanada, queso cheddar, salsa BBQ y palta.",
      price: "$10.500",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80&auto=format&fit=crop",
    },
  ],
  coctelSpritz: [
    {
      name: "APEROL",
      description: "Aperol, espumante, soda, jugo de naranja.",
      price: "$6.500",
      image:
        "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "RAMAZZOTTI",
      description: "Ramazzotti, espumante, soda, jugo de naranja.",
      price: "$6.500",
      image:
        "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "KIR ROYALE",
      description: "Licor de Cassis, espumante, cereza de marrasquino.",
      price: "$5.500",
      image:
        "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "HUGO SPRITZ",
      description: "Licor de flores de sauco, espumante, soda y jugo de limón.",
      price: "$6.500",
      image:
        "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "CHAMBORD",
      description: "Licor de frambuesa, espumante, soda y jugo de limón.",
      price: "$7.500",
      image:
        "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&q=80&auto=format&fit=crop",
    },
  ],
  coctelGin: [
    {
      name: "LONDON MULE",
      description: "Gin, jugo de limón, ginger beer.",
      price: "$7.000",
      image:
        "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "GIN TONIC",
      description: "Gin, tónica.",
      price: "$6.000",
      image:
        "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "FRENCH 75",
      description: "Gin, jugo de limón, sirope, espumante.",
      price: "$6.000",
      image:
        "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "TOM COLLINS",
      description: "Gin, jugo de limón, sirope, soda.",
      price: "$6.000",
      image:
        "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "DRY MARTINI",
      description: "Gin, vermut dry.",
      price: "$7.000",
      image:
        "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "NEGRONI",
      description: "Gin, Campari, vermut.",
      price: "$6.500",
      image:
        "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "HANKY PANKY",
      description: "Gin, vermut, Fernet Branca.",
      price: "$6.500",
      image:
        "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "TROPICAL GIN",
      description: "Gin, jugo de limón, maracuyá, sirope.",
      price: "$8.500",
      image:
        "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&q=80&auto=format&fit=crop",
    },
  ],
  coctelInternacional: [
    {
      name: "KIR ROYALE",
      description: "Licor de Cassis, espumante, cereza de marrasquino.",
      price: "$5.500",
      image:
        "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "CAIPIRI?A",
      description: "Cachaça, jugo de limón, azúcar.",
      price: "$5.500",
      image:
        "https://images.unsplash.com/photo-1644809818228-e29aa5aa8151?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "PISCO SOUR",
      description: "Pisco, jugo de limón, sirope.",
      price: "$5.000",
      image:
        "https://images.unsplash.com/photo-1575023782549-62ca0d244b39?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "SOUR CATEDRAL",
      description: "Pisco, jugo de limón, sirope.",
      price: "$8.500",
      image:
        "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "PALOMA",
      description: "Tequila, jugo de pomelo, jugo de limón, sirope.",
      price: "$6.000",
      image:
        "https://images.unsplash.com/photo-1666025959723-a9e700cb1023?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "BOULEVARDIER",
      description: "Bourbon, Campari, vermut.",
      price: "$7.000",
      image:
        "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "ESPRESSO MARTINI",
      description: "Vodka, kahlúa y café espresso.",
      price: "$6.500",
      image:
        "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "MARGARITA",
      description: "Tequila, triple sec, jugo de limón.",
      price: "$6.000",
      image:
        "https://images.unsplash.com/photo-1666025959723-a9e700cb1023?w=600&q=80&auto=format&fit=crop",
    },
  ],
  tragosCasa: [
    {
      name: "INSÓLITO SOUR",
      description: "Pisco, limón, reducción de vino estilo oporto.",
      price: "$6.000",
      image:
        "https://images.unsplash.com/photo-1575023782549-62ca0d244b39?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "SPLIT SANGRÍA",
      description:
        "Vino tinto, whisky de manzana, vermút, sirope de eucaliptos, pomelo y naranja.",
      price: "$7.000",
      image:
        "https://images.unsplash.com/photo-1610935591098-9ce2b6d53f66?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "FIORDO AUSTRAL",
      description:
        "Vodka, curaçao blue, limón, jengibre y Red Bull tradicional.",
      price: "$8.500",
      image:
        "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "BOSQUE QUEILEN",
      description:
        "Gin Far Away Citrus, maracuyá, mango, Ramazzotti violetto y jugo de limón.",
      price: "$7.500",
      image:
        "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "EL EDEN",
      description: "Whisky de manzana, curaçao blue, jugoso y tentador.",
      price: "$6.000",
      image:
        "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "MAQUI-A-BÉLICO",
      description: "Destilado de manzana chilota, maqui, té negro, oscuro y místico.",
      price: "$7.500",
      image:
        "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "BRAMBLE PATAGÓN",
      description: "Gin, maqui silvestre, limón, frutal y salvaje.",
      price: "$7.000",
      image:
        "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "EVA MULE",
      description: "Destilado de manzana chilota, limón, ginger beer, sirope.",
      price: "$7.000",
      image:
        "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "STRIKE 300",
      description: "Vodka, curaçao blue, pi?a, frambuesa y limón.",
      price: "$7.500",
      image:
        "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "BOLA 6",
      description: "Vodka melón, menta, frutal y refrescante.",
      price: "$6.000",
      image:
        "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "INFÜNCHE",
      description: "Tequila, mango, cacho de cabra, intenso y picante.",
      price: "$6.000",
      image:
        "https://images.unsplash.com/photo-1666025959723-a9e700cb1023?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "LA DIABLA",
      description: "Gin, arándano, Ramazzotti, frescura cítrica directa y seductora.",
      price: "$7.500",
      image:
        "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "ESPRESSO ACHILOTA'O",
      description:
        "Destilado de manzana chilota, café doble, canela, aromático y envolvente.",
      price: "$6.000",
      image:
        "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "CORAZÓN CHILOTE",
      description:
        "Destilados de manzana EVA, hibisco, rosa mosqueta y mango; un latido tropical que refresca el alma.",
      price: "$7.000",
      image:
        "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&q=80&auto=format&fit=crop",
    },
  ],
  destilados: [
    {
      name: "WHISKY SINGLE",
      description: "Shot premium 30 ml",
      price: "$5.000",
      image:
        "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "PISCO SOUR",
      description: "Clásico peruano / chileno",
      price: "$5.500",
      image:
        "https://images.unsplash.com/photo-1575023782549-62ca0d244b39?w=600&q=80&auto=format&fit=crop",
    },
  ],
  jarrasVerano: [
    {
      name: "MELÓN CON VINO",
      description: "Jarra de verano.",
      price: "$15.000",
      image:
        "https://images.unsplash.com/photo-1610935591098-9ce2b6d53f66?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "SPLIT SANGRÍA",
      description: "Jarra de verano.",
      price: "$20.000",
      image:
        "https://images.unsplash.com/photo-1610935591098-9ce2b6d53f66?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "CAIPIRI?A",
      description: "Jarra de verano.",
      price: "$24.000",
      image:
        "https://images.unsplash.com/photo-1644809818228-e29aa5aa8151?w=600&q=80&auto=format&fit=crop",
    },
  ],
  fentimans: [
    {
      name: "GINGER BEER",
      description: "Fentimans.",
      price: "$3.500",
      image:
        "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "TONIC WATER",
      description: "Fentimans.",
      price: "$3.500",
      image:
        "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "ROSE LEMONADE",
      description: "Fentimans.",
      price: "$3.500",
      image:
        "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&q=80&auto=format&fit=crop",
    },
  ],
  cafeteria: [
    {
      name: "AMERICANO SIMPLE",
      description: "Café americano.",
      price: "$2.500",
      image:
        "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "CAPUCCINO SIMPLE",
      description: "Capuccino.",
      price: "$3.100",
      image:
        "https://images.unsplash.com/photo-1572442388796-11668a67e4d1?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "CAPUCCINO MEDIANO",
      description: "Capuccino.",
      price: "$3.900",
      image:
        "https://images.unsplash.com/photo-1572442388796-11668a67e4d1?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "EXPRESO SIMPLE",
      description: "Café expreso.",
      price: "$2.500",
      image:
        "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "EXPRESO DOBLE",
      description: "Café expreso.",
      price: "$3.900",
      image:
        "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "CORTADO MEDIANO",
      description: "Cortado.",
      price: "$3.500",
      image:
        "https://images.unsplash.com/photo-1572442388796-11668a67e4d1?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "CORTADO PEQUE?O",
      description: "Cortado.",
      price: "$2.700",
      image:
        "https://images.unsplash.com/photo-1572442388796-11668a67e4d1?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "LATTE MEDIANO",
      description: "Latte.",
      price: "$3.900",
      image:
        "https://images.unsplash.com/photo-1572442388796-11668a67e4d1?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "MOCCACINO MEDIANO",
      description: "Moccacino.",
      price: "$4.200",
      image:
        "https://images.unsplash.com/photo-1572442388796-11668a67e4d1?w=600&q=80&auto=format&fit=crop",
    },
  ],
  schopCerveza: [
    {
      name: "KUNSTMANN TOROBAYO",
      description: "300 cc / 500 cc.",
      price: "$3.000 / $5.000",
      image:
        "https://images.unsplash.com/photo-1608270586620-24752439bc82?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "AUSTRAL CALAFATE",
      description: "300 cc / 500 cc.",
      price: "$3.000 / $5.000",
      image:
        "https://images.unsplash.com/photo-1608270586620-24752439bc82?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "STELLA ARTOIS",
      description: "300 cc / 500 cc.",
      price: "$2.500 / $4.000",
      image:
        "https://images.unsplash.com/photo-1608270586620-24752439bc82?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "CORONA",
      description: "300 cc / 500 cc.",
      price: "$2.500 / $4.000",
      image:
        "https://images.unsplash.com/photo-1608270586620-24752439bc82?w=600&q=80&auto=format&fit=crop",
    },
  ],
  cervezaBotella: [
    {
      name: "CORONA",
      description: "Botella 330 cc.",
      price: "$3.000",
      image:
        "https://images.unsplash.com/photo-1608270586620-24752439bc82?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "BUDWEISER",
      description: "Botella 330 cc.",
      price: "$3.000",
      image:
        "https://images.unsplash.com/photo-1608270586620-24752439bc82?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "KUNSTMANN TOROBAYO",
      description: "Botella 330 cc.",
      price: "$4.000",
      image:
        "https://images.unsplash.com/photo-1608270586620-24752439bc82?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "KUNSTMANN VALDIVIA",
      description: "Botella 330 cc.",
      price: "$3.000",
      image:
        "https://images.unsplash.com/photo-1608270586620-24752439bc82?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "AUSTRAL CALAFATE",
      description: "Botella 330 cc.",
      price: "$4.000",
      image:
        "https://images.unsplash.com/photo-1608270586620-24752439bc82?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "AUSTRAL LAGER",
      description: "Botella 330 cc.",
      price: "$3.500",
      image:
        "https://images.unsplash.com/photo-1608270586620-24752439bc82?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "ROYAL GUARD",
      description: "Botella 330 cc.",
      price: "$2.500",
      image:
        "https://images.unsplash.com/photo-1608270586620-24752439bc82?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "MODELO",
      description: "Botella 330 cc.",
      price: "$3.500",
      image:
        "https://images.unsplash.com/photo-1608270586620-24752439bc82?w=600&q=80&auto=format&fit=crop",
    },
  ],
  sinAlcohol: [
    {
      name: "HEINEKEN",
      description: "Sin alcohol.",
      price: "$2.500",
      image:
        "https://images.unsplash.com/photo-1608270586620-24752439bc82?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "KUNSTMANN",
      description: "Sin alcohol.",
      price: "$3.500",
      image:
        "https://images.unsplash.com/photo-1608270586620-24752439bc82?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "BUDWEISER",
      description: "Sin alcohol.",
      price: "$2.500",
      image:
        "https://images.unsplash.com/photo-1608270586620-24752439bc82?w=600&q=80&auto=format&fit=crop",
    },
  ]
};

