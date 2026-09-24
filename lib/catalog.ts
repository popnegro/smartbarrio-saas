export type Product={id:string;name:string;price:number;unit:string;category:string};
export type Commerce={slug:string;name:string;category:string;address:string;phone:string;whatsapp:string;hours:string;description:string;tags:string[];products:Product[]};
export const categories=[
 {slug:'kioscos',name:'Kioscos',description:'Bebidas, snacks, golosinas, recargas y productos de consumo diario.'},
 {slug:'talleres',name:'Talleres',description:'Service, mantenimiento, diagnóstico y reparación para vehículos.'},
 {slug:'repuestos',name:'Repuestos',description:'Repuestos y accesorios para las principales marcas y modelos.'},
 {slug:'ferreterias',name:'Ferreterías',description:'Herramientas, materiales y soluciones para obra y hogar.'},
 {slug:'almacenes',name:'Almacenes',description:'Productos de almacén y consumo cotidiano cerca de tu casa.'},
 {slug:'servicios',name:'Servicios',description:'Servicios locales para resolver necesidades del barrio.'}
];
export const commerces:Commerce[]=[
 {slug:'kiosco-la-esquina',name:'Kiosco La Esquina',category:'Kioscos',address:'Av. Boulogne Sur Mer 742, Las Heras',phone:'261 555 1040',whatsapp:'5492615551040',hours:'08:00–23:30',description:'Bebidas, snacks, golosinas y recargas cerca de casa.',tags:['Bebidas','Snacks','Recargas'],products:[
  {id:'coca-15',name:'Coca-Cola 1,5 L',price:2500,unit:'unidad',category:'Bebidas'},
  {id:'agua-15',name:'Agua mineral 1,5 L',price:1500,unit:'unidad',category:'Bebidas'},
  {id:'papas',name:'Papas fritas clásicas',price:1800,unit:'paquete',category:'Snacks'},
  {id:'alfajor',name:'Alfajor triple',price:1200,unit:'unidad',category:'Golosinas'},
  {id:'recarga',name:'Recarga celular',price:3000,unit:'operación',category:'Recargas'}]},
 {slug:'mendoza-motor',name:'Mendoza Motor',category:'Talleres',address:'Av. San Martín 1840, Las Heras',phone:'261 555 2211',whatsapp:'5492615552211',hours:'08:30–19:00',description:'Service, frenos y diagnóstico para tu vehículo.',tags:['Service','Frenos','Diagnóstico'],products:[
  {id:'service',name:'Service básico',price:45000,unit:'servicio',category:'Service'},
  {id:'diagnostico',name:'Diagnóstico computarizado',price:18000,unit:'servicio',category:'Diagnóstico'},
  {id:'frenos',name:'Revisión de frenos',price:12000,unit:'servicio',category:'Frenos'}]},
 {slug:'repuestos-cuyo',name:'Repuestos Cuyo',category:'Repuestos',address:'Videla Castillo 1120, Maipú',phone:'261 555 4477',whatsapp:'5492615554477',hours:'08:30–18:30',description:'Repuestos y accesorios para Fiat, Renault y Volkswagen.',tags:['Fiat','Renault','VW'],products:[
  {id:'filtro-aceite',name:'Filtro de aceite',price:8500,unit:'unidad',category:'Filtros'},
  {id:'pastillas',name:'Pastillas de freno',price:32000,unit:'juego',category:'Frenos'},
  {id:'escobillas',name:'Escobillas limpiaparabrisas',price:14000,unit:'par',category:'Accesorios'}]},
 {slug:'ferreteria-el-andino',name:'Ferretería El Andino',category:'Ferreterías',address:'Belgrano 1635, Maipú',phone:'261 555 6633',whatsapp:'5492615556633',hours:'08:00–19:30',description:'Herramientas, obra y hogar.',tags:['Herramientas','Obra','Hogar'],products:[
  {id:'taladro',name:'Taladro eléctrico 500W',price:68000,unit:'unidad',category:'Herramientas'},
  {id:'tornillos',name:'Tornillos surtidos',price:6500,unit:'caja',category:'Obra'},
  {id:'cinta',name:'Cinta métrica 5 m',price:9000,unit:'unidad',category:'Herramientas'}]}
];
export const money=(n:number)=>new Intl.NumberFormat('es-AR',{style:'currency',currency:'ARS',maximumFractionDigits:0}).format(n);
export const getCommerce=(slug:string)=>commerces.find(c=>c.slug===slug);
export const getCategory=(slug:string)=>categories.find(c=>c.slug===slug);
